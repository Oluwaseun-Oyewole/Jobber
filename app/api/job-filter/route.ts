import { jobType } from "@/components/custom/filter/jobs.data";
import { NextRequest, NextResponse } from "next/server";

enum JobType {
  fulltime = "fulltime",
  parttime = "parttime",
  internship = "internship",
  volunteer = "volunteer",
  contract = "contract",
}

enum Experience {
  Fresh = "Fresh",
  Beginner = "Beginner",
  Intermediate = "Intermediate",
  Expert = "Expert",
  Guru = "Guru",
}

enum Position {
  Onsite = "Onsite",
  Remote = "Remote",
  Hybrid = "Hybrid",
}

export const GET = async (req: NextRequest) => {
  const { searchParams } = await new URL(req.url);
  const job_type = searchParams.get("jobType")! ?? "FullTime";
  const experience = searchParams.get("experience")! ?? "Expert";
  const position = searchParams.get("position")! ?? "Onsite";
  const location = searchParams.get("location");
  const price_min = +searchParams.get("price_min")!;
  const price_max = +searchParams.get("price_max")!;
  const filter__attr = searchParams.get("filter__attr")!;
  let page = +searchParams.get("page")!;
  let resultsPerPage = +searchParams.get("resultsPerPage")!;

  if (!resultsPerPage || resultsPerPage === 0) {
    resultsPerPage += 4;
  }
  if (!page || page <= 0) {
    page += 1;
  }
  let jobs;

  try {
    if (filter__attr === "top-salary" && price_max && price_min) {
      jobs = await prisma.job.findMany({
        where: {
          AND: [
            { OR: [{ country: location?.trim() }, { location: "Remote" }] },
          ],
          salary: { gte: price_min, lte: price_max },
        },
        orderBy: {
          salary: "desc",
        },
        skip: (page - 1) * resultsPerPage,
        take: resultsPerPage,
      });
    } else if (filter__attr === "most-recent" && price_max && price_min) {
      jobs = await prisma.job.findMany({
        where: {
          AND: [
            { OR: [{ country: location?.trim() }, { location: "Remote" }] },
          ],
          salary: { gte: price_min, lte: price_max },
        },
        orderBy: {
          datePosted: "desc",
        },
        skip: (page - 1) * resultsPerPage,
        take: resultsPerPage,
      });
    } else if (filter__attr === "a-z" && price_max && price_min) {
      jobs = await prisma.job.findMany({
        where: {
          AND: [
            { OR: [{ country: location?.trim() }, { location: "Remote" }] },
          ],
          salary: { gte: price_min, lte: price_max },
        },
        orderBy: {
          jobTitle: "asc",
        },
        skip: (page - 1) * resultsPerPage,
        take: resultsPerPage,
      });
    } else if (filter__attr === "trending" && price_max && price_min) {
      jobs = await prisma.job.findMany({
        where: {
          AND: [
            { OR: [{ country: location?.trim() }, { location: "Remote" }] },
          ],
          salary: { gte: price_min, lte: price_max },
        },
        orderBy: {
          datePosted: "asc",
        },
        skip: (page - 1) * resultsPerPage,
        take: resultsPerPage,
      });
    } else if (filter__attr === "most-recent") {
      jobs = await prisma.job.findMany({
        where: {
          OR: [{ country: location?.trim() }, { location: "Remote" }],
        },
        orderBy: {
          datePosted: "desc",
        },
        skip: (page - 1) * resultsPerPage,
        take: resultsPerPage,
      });
    } else if (filter__attr === "top-salary") {
      jobs = await prisma.job.findMany({
        where: {
          OR: [
            { country: location?.trim() },
            { location: "Remote" },
            { AND: [{ salary: { gte: price_min, lte: price_max } }] },
          ],
        },
        orderBy: {
          salary: "desc",
        },
        skip: (page - 1) * resultsPerPage,
        take: resultsPerPage,
      });
    } else if (filter__attr === "trending") {
      jobs = await prisma.job.findMany({
        where: { OR: [{ country: location?.trim() }, { location: "Remote" }] },
        orderBy: {
          datePosted: "asc",
        },
        skip: (page - 1) * resultsPerPage,
        take: resultsPerPage,
      });
    } else if (filter__attr === "a-z") {
      jobs = await prisma.job.findMany({
        where: { OR: [{ country: location?.trim() }, { location: "Remote" }] },
        orderBy: {
          jobTitle: "asc",
        },
        skip: (page - 1) * resultsPerPage,
        take: resultsPerPage,
      });
    } else if (price_min && price_max) {
      jobs = await prisma.job.findMany({
        where: {
          AND: [
            { OR: [{ country: location?.trim() }, { location: "Remote" }] },
          ],
          salary: { gte: price_min, lte: price_max },
        },
        skip: (page - 1) * resultsPerPage,
        take: resultsPerPage,
      });
    } else if (jobType) {
      console.log("running from here else job type ");
      jobs = await prisma.job.findMany({
        where: {
          AND: [
            { OR: [{ country: location?.trim() }, { location: "Remote" }] },
          ],
          jobType: job_type as JobType,
        },
        skip: (page - 1) * resultsPerPage,
        take: resultsPerPage,
      });
    } else {
      jobs = await prisma.job.findMany({
        where: {
          country: location?.trim(),
          OR: [
            {
              salary: {
                gte: price_min,
                lte: price_max,
              },
            },
            {
              jobType: job_type as JobType,
            },
            { experience: experience as Experience },

            { position: position as Position },
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
    console.log("error from jib filter -- ", error);
    return NextResponse.json(
      { message: "Oops, an error occurred" },
      { status: 501 },
    );
  }
};
