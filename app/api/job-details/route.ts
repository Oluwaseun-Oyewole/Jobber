// export const maxDuration = 10;

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = await new URL(req.url);
  const id = searchParams.get("id")!;
  const location = searchParams.get("location");

  if (!id || !location) return;

  try {
    const job = await prisma.job.findUnique({
      where: {
        OR: [{ country: location?.trim() }, { location: "Remote" }],
        id,
      },
    });
    return NextResponse.json(
      { message: "success", data: job },
      { status: 200 },
    );
  } catch (error) {
    console.log("error - eeror ", error);
    return NextResponse.json(
      { message: "Oops, something went wrong" },
      { status: 501 },
    );
  }
};
