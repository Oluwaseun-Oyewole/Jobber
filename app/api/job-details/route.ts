import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = await new URL(req.url);
  const id = searchParams.get("id")!;

  try {
    const job = await prisma.job.findUnique({
      where: {
        id,
      },
    });
    return NextResponse.json(
      { message: "success", data: job },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Oops, something went wrong" },
      { status: 501 },
    );
  }
};
