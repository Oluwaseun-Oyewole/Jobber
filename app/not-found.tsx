import { Button } from "@/components/ui/button";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div>
      <div className="h-[85vh] flex items-center justify-center">
        <div className="mt-10 bg-white h-[300px] lg:h-[350px] w-[90%] md:w-[50%] rounded-lg">
          <div className="flex items-center justify-center flex-col h-full">
            <h2 className="font-extrabold pt-2 text-xl">
              Oops, sorry, we can't find this page
            </h2>
            <p className="w-[90%] md:w-[60%] font-[300] py-4 text-center text-sm md:text-base">
              It looks like this page doesn't exist or isn't available right
              now. Check the URL for any typos or choose an option below.
            </p>
            <Link href="/">
              <Button className="">Return Home</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
