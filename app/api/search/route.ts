import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = await new URL(req.url);
  const query = searchParams.get("searchQuery")!;
  const location = searchParams.get("location")!;
  const searchLocation = searchParams.get("searchLocation")!;
  let page = +searchParams.get("page")!;
  let resultsPerPage = +searchParams.get("resultsPerPage")!;
  if (!resultsPerPage || resultsPerPage === 0) {
    resultsPerPage += 4;
  }
  if (page <= 0) {
    page += 1;
  }
  let jobs;
  try {
    if (query && location && !searchLocation) {
      jobs = await prisma.job.findMany({
        where: {
          AND: [
            {
              OR: [{ country: location?.trim() }, { location: "Remote" }],
            },
            {
              OR: [
                { jobTitle: { contains: query, mode: "insensitive" } },
                { companyName: { contains: query, mode: "insensitive" } },
              ],
            },
          ],
        },
        skip: (page - 1) * resultsPerPage,
        take: resultsPerPage,
      });
    } else if (location && searchLocation && !query) {
      jobs = await prisma.job.findMany({
        where: {
          AND: [
            {
              OR: [{ country: location?.trim() }, { location: "Remote" }],
            },
            {
              OR: [
                { location: { contains: searchLocation, mode: "insensitive" } },
              ],
            },
          ],
        },
        skip: (page - 1) * resultsPerPage,
        take: resultsPerPage,
      });
    } else {
      jobs = await prisma.job.findMany({
        where: {
          OR: [
            {
              AND: [
                { OR: [{ country: location?.trim() }, { location: "Remote" }] },
                { companyName: { contains: query, mode: "insensitive" } },
                { location: { contains: searchLocation } },
              ],
            },

            {
              AND: [
                { OR: [{ country: location?.trim() }, { location: "Remote" }] },
                { jobTitle: { contains: query, mode: "insensitive" } },
                { location: { contains: searchLocation } },
              ],
            },

            {
              AND: [
                { OR: [{ country: location?.trim() }, { location: "Remote" }] },
                { location: { contains: searchLocation } },
              ],
            },
          ],
        },
        skip: (page - 1) * resultsPerPage,
        take: resultsPerPage,
      });
    }

    const totalResults = jobs.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const total = page > totalPages ? 0 : totalResults;
    return NextResponse.json(
      {
        message: "success",
        data: {
          jobs,
          totalResults: page > totalPages ? total : totalResults,
          totalPages: totalPages === null ? 1 : totalPages,
          page,
          resultsPerPage,
          status: 200,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Oops, an error occurred" },
      { status: 501 },
    );
  }
};
