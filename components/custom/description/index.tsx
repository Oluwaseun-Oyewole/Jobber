import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Netflix from "../../../assets/Net.svg";
import Saved from "../../../assets/fav.svg";
import Share from "../../../assets/share.svg";

const Description = () => {
  return (
    <div className="hidden md:block bg-white rounded-lg h-[84vh] overflow-scroll shadow-md p-5 font-[400]">
      <div className="flex justify-between">
        <div>
          <Image src={Netflix} alt="netflix" />
        </div>
        <div className="flex gap-2 items-center">
          <Image src={Share} alt="netflix" />
          <Image src={Saved} alt="netflix" />
        </div>
      </div>

      <div className="py-6 flex gap-2 flex-col border__bottom">
        <h1 className="font-bolder text-xl">UI/UX Designer</h1>
        <div className="flex text-sm font-[300] text-gray-500">
          <p>Netflix</p>
          <p>New York, US</p>
        </div>

        <p className="bg-[rgba(83,116,231,0.1)] text-[#5374E7] rounded-full py-3 w-[50%] flex items-center justify-center font-[300] text-sm">
          1000+ Applicants
        </p>
      </div>

      <div className="py-6 border__bottom font-[300] flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold">Job Type</h1>
            <p className="text-sm pt-1">Full-Time</p>
          </div>
          <div>
            <h1 className="font-bold">Experience</h1>
            <p className="text-sm pt-1">Expert</p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold">Position</h1>
            <p className="text-sm pt-1">Remote</p>
          </div>
          <div>
            <h1 className="font-bold">Date Posted</h1>
            <p className="text-sm pt-1">29 Sep, 2023</p>
          </div>
        </div>
      </div>

      <div className="py-6 border__bottom font-[300]">
        <h2 className="font-bold text-xl">Job Description</h2>
        <p className="text-sm pt-4 leading-5 text-gray-600">
          We are seeking a talented and motivated UI/UX Designer to join our
          team. Core responsibilities include user interaction design, based on
          research and analysis in order to communicate design
          motivations/decisions to various stakeholders...
          <span className="text-blue-500 cursor-pointer">read more</span>
        </p>
      </div>

      <div className="py-6 border__bottom font-[300]">
        <h2 className="font-bold text-xl">Base Salary</h2>
        <p className="text-sm pt-4 leading-5 text-gray-600">10K/month</p>

        <Link href="/job-description/1">
          <Button className="bg-lightBlue w-full mt-4 h-[50px] transition-all ease-in-out duration-500">
            Read More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Description;
