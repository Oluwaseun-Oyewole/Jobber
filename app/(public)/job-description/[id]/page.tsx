"use client";
import { useGetJobDetailsQuery } from "@/app/store/query";
import Image from "next/image";
import Saved from "../../../../assets/fav.svg";
import Share from "../../../../assets/share.svg";

interface IProps {
  params: {
    id: string;
  };
}

const JobDetails = ({ params: { id } }: IProps) => {
  const { data } = useGetJobDetailsQuery(id);

  return (
    <div className=" bg-white max-w-3xl mx-auto mt-5 p-10 h-[85vh] overflow-y-scroll">
      <div className="flex justify-between">
        <div className="flex gap-4 sticky top-0 left-0">
          <h1 className="font-extrabold text-2xl">{data?.data?.jobTitle}</h1>
          <Image
            src={data?.data?.imageSrc}
            alt="netflix"
            className="w-8"
            height={50}
            width={50}
          />
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
            <p>{data?.data?.companyName}</p>
          </div>

          <p className="bg-[rgba(83,116,231,0.1)] text-[#5374E7] rounded-sm py-3 w-[60%] lg:w-[25%] flex items-center justify-center font-[300] text-sm my-3">
            {data?.data?.hired}
          </p>
        </div>
        <div>
          <h2 className="font-extrabold pt-6 text-lg">Job Details</h2>
        </div>
        <div className="pt-4 pb-6 border__bottom font-[300] flex flex-col gap-5">
          <div className="w-[90%] flex justify-between items-center">
            <div>
              <h1 className="font-bold text-base">Job Type</h1>
              <p className="text-sm pt-1">{data?.data?.jobType}</p>
            </div>

            <div>
              <h1 className="font-bold text-base">Position</h1>
              <p className="text-sm pt-1">{data?.data?.position}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 pb-6 border__bottom font-[300] flex flex-col gap-5">
          <div className="w-[90%] flex justify-between items-center">
            <div>
              <h1 className="font-bold text-base">Location</h1>
              <p className="text-sm pt-1">{data?.data?.location}</p>
            </div>

            <div>
              <h1 className="font-bold text-base">Salary</h1>
              <p className="text-sm pt-1">&#36; {data?.data?.salary}K</p>
            </div>
          </div>
        </div>
        <div className="py-6 border__bottom font-[400] text-base">
          <div className="py-2">
            <h2 className="font-bold text-xl">Full job description</h2>
            <p className="pt-4 font-[300] text-sm leading-6">
              {/* We are seeking a talented and motivated UI/UX Designer to join our
              team. Core responsibilities include user interaction design, based
              on research and analysis in order to communicate design
              motivations/decisions to various stakeholders Core
              responsibilities include user interaction design, based on
              research and analysis in order to communicate design
              motivations/decisions to various stakeholders... */}

              {data?.data?.jobInfo}
            </p>
          </div>

          <div className="py-2">
            <h3>About Data Services at Relativity</h3>
            <p className="font-[300] text-sm leading-6">
              {data?.data?.aboutJob}
              {/* In the past couple of years, billions of documents have already
              benefited from the insights of Relativity AI – and we are just
              getting started on our journey to use AI to improve each user
              experience, product, matter, and investigation at Relativity. We
              are focused on helping our users discover truth more quickly and
              act on it. In Data Services, we power the data and machine
              learning capabilities behind our AI. We are creating robust data
              architecture and tooling to support AI and insight generation at
              scale of billions of documents. */}
            </p>
          </div>
          <div className="py-2">
            <h3>About the Role</h3>
            <p className="font-[300] text-sm leading-6">
              {data?.data?.aboutRole}
              {/* The Manager, Software Engineering builds and leads a team of
              engineers and works with departmental contacts to support the
              demands of the department and meet the goals of product
              development. The manager is accountable for the team’s delivery of
              a highly scalable and reliable jobs and services and maintaining
              operational excellence. They are an expert in the product features
              the team will develop. The engineering manager oversees the
              professional development of their reports. */}
            </p>
          </div>
        </div>
        <div className="py-6 border__bottom font-[400] text-base">
          <div className="py-2">
            <h2 className="font-bold text-xl"> Your Skills</h2>
            <p className="pt-4 font-[300] text-sm leading-6">
              {data?.data?.aboutSkill}
              {/* 2+ years of experience managing software product development teams
              Experience working in data engineering space as a manager or
              individual contributor In-depth knowledge of Agile product
              development methodologies 10+ years of software development of
              commercial grade systems with experience with leading successful
              engineering teams Excellent knowledge of software discipline,
              including the latest programming languages, object-oriented
              programming, hands-on architecture, high-performance,
              fault-tolerant distributed systems, data structures, and
              algorithms, operating systems, and cloud environments */}
            </p>
          </div>
          <div className="py-2">
            <h3>Compensation:</h3>
            <p className="font-[300] text-sm leading-6">
              {data?.data?.compensation}
              {/* Compensation Relativity is committed to competitive, fair and
              equitable compensation practices This position is eligible for
              total compensation which includes a competitive base salary,
              annual performance bonus target of 10%, and long-term incentives.
              The expected salary range for this role is between 255,000 and
              345,000 PLN gross/year (Employment Contract). The final offered
              salary will be based on several factors, including but not limited
              to the candidate’s depth of experience, skill set, qualifications,
              and internal pay equity. Hiring at the top end of the range would
              not be typical, to allow for future meaningful salary growth in
              this position. */}
            </p>
          </div>
          <div className="py-2">
            <h3> Benefit Highlights:</h3>
            <p className="font-[300] text-sm leading-6">
              {data?.data?.benefit}
              {/* Benefit Highlights: Comprehensive health, dental, and vision plans
              Parental leave for primary and secondary caregivers Flexible work
              arrangements Two, week-long company breaks per year Unlimited time
              off Long-term incentive program Training investment program */}
            </p>
          </div>

          <div>
            <p className="font-[300] text-sm leading-6">
              {data?.data?.process}
              {/* All qualified applicants will receive consideration for employment
              without regard to race, color, religion, sex, sexual orientation,
              gender identity, or national origin, disability or protected
              veteran status, or any other legally protected basis, in
              accordance with applicable law. */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
