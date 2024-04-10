import Image from "next/image";
import Link from "next/link";
import Netflix from "../../../assets/Net.svg";
import Dollar from "../../../assets/dollar.svg";
import Saved from "../../../assets/fav.svg";
import Google from "../../../assets/google.svg";

// type CardType = {
//   jobTitle: string;
//   company: string;
//   jobType: Array<string>;
//   salary: string;
//   time: string;
// };

const Cards = () => {
  return (
    <div className="grid grid-flow-row gap-4 pb-7">
      <div className="grid grid-cols-[100%] gap-4 lg:gap-3 md:grid-flow-col md:grid-cols-[49%_49%]">
        <Link href="/job-description/1" className="md:hidden">
          <div className="min-h-[260px] bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-between px-5 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <Image src={Netflix} alt="netflix" />
                <div>
                  <h1>UI/UX Designer</h1>
                  <p className="font-[300] text-sm py-1">Netflix</p>
                </div>
              </div>

              <Image src={Saved} alt="netflix" />
            </div>

            <div className="flex justify-between items-center w-[90%] font-[400] text-sm">
              <h3 className=" bg-lightGray rounded-sm py-2 px-3 text-sm md:text-base">
                Full-Time
              </h3>
            </div>

            <div>
              <p className="text-sm font-[300]">
                We are seeking a talented and motivated UI/UX Designer to join
                our team...
              </p>
            </div>

            <div className="flex justify-between items-center font-[400] text-sm">
              <div className="flex gap-2 items-center">
                <Image src={Dollar} alt="netflix" />
                <p className="text-sm font-[300]">$10K/month</p>
              </div>
              <div>
                <p className="text-sm font-[300]">2 mins ago</p>
              </div>
            </div>
          </div>
        </Link>
        <div className="hidden min-h-[240px] bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer md:flex flex-col justify-between px-5 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image src={Netflix} alt="netflix" />
              <div>
                <h1>UI/UX Designer</h1>
                <p className="font-[300] text-sm py-1">Netflix</p>
              </div>
            </div>

            <Image src={Saved} alt="netflix" />
          </div>

          <div className="flex justify-between items-center w-[90%] font-[400] text-sm">
            <h3 className=" bg-lightGray rounded-sm py-2 px-3">Full-Time</h3>
          </div>

          <div>
            <p className="text-sm font-[300]">
              We are seeking a talented and motivated UI/UX Designer to join our
              team...
            </p>
          </div>

          <div className="flex justify-between items-center font-[400] text-sm">
            <div className="flex gap-2 items-center">
              <Image src={Dollar} alt="netflix" />
              <p className="text-sm font-[300]">$10K/month</p>
            </div>
            <div>
              <p className="text-sm font-[300]">2 mins ago</p>
            </div>
          </div>
        </div>
        <div className="min-h-[240px] bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-between px-5 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image src={Netflix} alt="netflix" />
              <div>
                <h1>UI/UX Designer</h1>
                <p className="font-[300] text-sm py-1">Netflix</p>
              </div>
            </div>

            <Image src={Saved} alt="netflix" />
          </div>

          <div>
            <p className="font-[300] text-sm">London</p>
          </div>

          <div className="flex justify-between items-center w-[90%] font-[400] text-sm">
            <h3 className=" bg-lightGray rounded-sm py-2 px-3">Full-Time</h3>
          </div>

          <div>
            <p className="text-sm font-[300]">
              We are seeking a talented and motivated UI/UX Designer to join our
              team...
            </p>
          </div>

          <div className="flex justify-between items-center font-[400] text-sm">
            <div className="flex gap-2 items-center">
              <Image src={Dollar} alt="netflix" />
              <p className="text-sm font-[300]">$10K/month</p>
            </div>
            <div>
              <p className="text-sm font-[300]">2 mins ago</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[100%] gap-4 lg:gap-3 md:grid-flow-col md:grid-cols-[49%_49%]">
        <div className="min-h-[240px] bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-between px-5 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image src={Google} alt="netflix" />
              <div>
                <h1>UI/UX Designer</h1>
                <p className="font-[300] text-sm py-1">Google</p>
              </div>
            </div>

            <Image src={Saved} alt="netflix" />
          </div>

          <div className="flex justify-between items-center w-[90%] font-[400] text-sm">
            <h3 className=" bg-lightGray rounded-sm py-2 px-3">Full-Time</h3>
          </div>

          <div>
            <p className="text-sm font-[300]">
              We are seeking a talented and motivated UI/UX Designer to join our
              team...
            </p>
          </div>

          <div className="flex justify-between items-center font-[400] text-sm">
            <div className="flex gap-2 items-center">
              <Image src={Dollar} alt="netflix" />
              <p className="text-sm font-[300]">$10K/month</p>
            </div>
            <div>
              <p className="text-sm font-[300]">2 mins ago</p>
            </div>
          </div>
        </div>
        <div className="min-h-[240px] bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-between px-5 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image src={Google} alt="netflix" />
              <div>
                <h1>UI/UX Designer</h1>
                <p className="font-[300] text-sm py-1">Google</p>
              </div>
            </div>

            <Image src={Saved} alt="netflix" />
          </div>

          <div>
            <p className="font-[300] text-sm">London</p>
          </div>

          <div className="flex justify-between items-center w-[90%] font-[400] text-sm">
            <h3 className=" bg-lightGray rounded-sm py-2 px-3">Full-Time</h3>
          </div>

          <div>
            <p className="text-sm font-[300]">
              We are seeking a talented and motivated UI/UX Designer to join our
              team...
            </p>
          </div>

          <div className="flex justify-between items-center font-[400] text-sm">
            <div className="flex gap-2 items-center">
              <Image src={Dollar} alt="netflix" />
              <p className="text-sm font-[300]">$10K/month</p>
            </div>
            <div>
              <p className="text-sm font-[300]">2 mins ago</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[100%] gap-4 lg:gap-3 md:grid-flow-col md:grid-cols-[49%_49%]">
        <div className="min-h-[240px] bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-between px-5 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image src={Netflix} alt="netflix" />
              <div>
                <h1>UI/UX Designer</h1>
                <p className="font-[300] text-sm py-1">Netflix</p>
              </div>
            </div>

            <Image src={Saved} alt="netflix" />
          </div>

          <div className="flex justify-between items-center w-[90%] font-[400] text-sm">
            <h3 className=" bg-lightGray rounded-sm py-2 px-3">Full-Time</h3>
          </div>

          <div>
            <p className="text-sm font-[300]">
              We are seeking a talented and motivated UI/UX Designer to join our
              team...
            </p>
          </div>

          <div className="flex justify-between items-center font-[400] text-sm">
            <div className="flex gap-2 items-center">
              <Image src={Dollar} alt="netflix" />
              <p className="text-sm font-[300]">$10K/month</p>
            </div>
            <div>
              <p className="text-sm font-[300]">2 mins ago</p>
            </div>
          </div>
        </div>
        <div className="min-h-[240px] bg-white rounded-lg shadow-md hover:shadow-lg cursor-pointer flex flex-col justify-between px-5 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Image src={Netflix} alt="netflix" />
              <div>
                <h1>UI/UX Designer</h1>
                <p className="font-[300] text-sm py-1">Netflix</p>
              </div>
            </div>

            <Image src={Saved} alt="netflix" />
          </div>

          <div>
            <p className="font-[300] text-sm">London</p>
          </div>

          <div className="flex justify-between items-center w-[90%] font-[400] text-sm">
            <h3 className=" bg-lightGray rounded-sm py-2 px-3">Full-Time</h3>
          </div>

          <div>
            <p className="text-sm font-[300]">
              We are seeking a talented and motivated UI/UX Designer to join our
              team...
            </p>
          </div>

          <div className="flex justify-between items-center font-[400] text-sm">
            <div className="flex gap-2 items-center">
              <Image src={Dollar} alt="netflix" />
              <p className="text-sm font-[300]">$10K/month</p>
            </div>
            <div>
              <p className="text-sm font-[300]">2 mins ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
