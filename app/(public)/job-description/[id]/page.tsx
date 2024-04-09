import Image from "next/image";
import Netflix from "../../../../assets/Net.svg";
import Saved from "../../../../assets/fav.svg";
import Share from "../../../../assets/share.svg";

const JobDetails = () => {
  return (
    <div className=" bg-white max-w-3xl mx-auto mt-5 p-10 h-[85vh] overflow-y-scroll">
      <div className="flex justify-between">
        <div className="flex gap-4 sticky top-0 left-0">
          <h1 className="font-extrabold text-2xl">UI/UX Designer</h1>
          <Image src={Netflix} alt="netflix" className="w-8" />
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Image src={Share} alt="netflix" />
            <Image src={Saved} alt="netflix" />
          </div>
        </div>
      </div>
      <div className="font-[400] flex flex-col ">
        <div className="flex gap-2 flex-col border__bottom">
          <div className="text-sm font-[300] text-gray-500 pt-3">
            <p>Netflix</p>
          </div>

          <p className="bg-[rgba(83,116,231,0.1)] text-[#5374E7] rounded-sm py-3 w-[25%] flex items-center justify-center font-[300] text-sm my-3">
            1000+ Applicants
          </p>
        </div>
        <div>
          <h2 className="font-extrabold pt-6 text-lg">Job Details</h2>
        </div>

        <div className="pt-4 pb-6 border__bottom font-[300] flex flex-col gap-5">
          <div className="w-[70%] flex justify-between items-center">
            <div>
              <h1 className="font-bold text-base">Job Type</h1>
              <p className="text-sm pt-1">Full-Time</p>
            </div>
          </div>
        </div>

        <div className="pt-4 pb-6 border__bottom font-[300] flex flex-col gap-5">
          <div className="w-[70%] flex justify-between items-center">
            <div>
              <h1 className="font-bold text-base">Location</h1>
              <p className="text-sm pt-1">New York</p>
            </div>
          </div>
        </div>

        <div className="py-6 border__bottom font-[400] text-base">
          <div className="py-2">
            <h2 className="font-bold text-xl">Full job description</h2>
            <p className="pt-4 font-[300] text-sm">
              We are seeking a talented and motivated UI/UX Designer to join our
              team. Core responsibilities include user interaction design, based
              on research and analysis in order to communicate design
              motivations/decisions to various stakeholders Core
              responsibilities include user interaction design, based on
              research and analysis in order to communicate design
              motivations/decisions to various stakeholders...
            </p>
          </div>

          <div className="py-2">
            <h3>About Data Services at Relativity</h3>
            <p className="font-[300] text-sm leading-7">
              In the past couple of years, billions of documents have already
              benefited from the insights of Relativity AI – and we are just
              getting started on our journey to use AI to improve each user
              experience, product, matter, and investigation at Relativity. We
              are focused on helping our users discover truth more quickly and
              act on it. In Data Services, we power the data and machine
              learning capabilities behind our AI. We are creating robust data
              architecture and tooling to support AI and insight generation at
              scale of billions of documents.
            </p>
          </div>
          <div className="py-2">
            <h3>About the Role</h3>
            <p className="font-[300] text-sm leading-7">
              The Manager, Software Engineering builds and leads a team of
              engineers and works with departmental contacts to support the
              demands of the department and meet the goals of product
              development. The manager is accountable for the team’s delivery of
              a highly scalable and reliable jobs and services and maintaining
              operational excellence. They are an expert in the product features
              the team will develop. The engineering manager oversees the
              professional development of their reports.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
