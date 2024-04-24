import { FlexComponent } from "@/components/custom/flex";
import { Button } from "@/components/ui/button";
import { verifyJwt } from "@/lib/utils";
import Link from "next/link";
import PasswordResetForm from ".";
import ResetImage from "../../../../../assets/login.svg";

interface IProps {
  params: {
    jwt: string;
  };
}

const Page = ({ params: { jwt } }: IProps) => {
  const payload = verifyJwt(jwt);
  if (!payload) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="mt-10 bg-white h-[300px] lg:h-[350px] w-[90%] md:w-[80%] rounded-lg">
          <div className="flex items-center justify-center flex-col h-full">
            <h2 className="font-extrabold pt-2 text-xl">
              Oops, sorry, we can't find this page
            </h2>
            <p className="w-[90%] md:w-[60%] font-[300] py-4 text-center text-sm md:text-base">
              The reason for this error might be because your verification link
              has
              <span className="text-red-500 font-bold px-1">expired</span> or
              <span className="text-red-500 font-bold px-1">
                your url params was changed.
              </span>
            </p>

            <p className=" pb-4 text-center text-sm md:text-base font-medium text-deepBlue">
              Your solution might be to request for a new token.
            </p>
            <Link href="/auth/forgot-password">
              <Button className="!bg-deepBlue !px-5">Request a new link</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <FlexComponent
        imageUrl={ResetImage}
        text={<PasswordResetForm jwt={jwt} />}
        imagePosition="left"
      />
    </>
  );
};

export default Page;
