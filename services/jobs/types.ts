enum JobType {
  "fulltime",
  "parttime",
  "internship",
  "volunteer",
  "contract",
}
enum Experience {
  "Fresh",
  "Beginner",
  "Intermediate",
  "Expert",
}

enum Position {
  "onSite",
  "Hybrid",
  "Remote",
}

export interface IJob {
  id: string;
  imageSrc: string;
  jobTitle: string;
  jobType: JobType;
  datePosted: string;
  salary: number;
  jobInfo: string;
  jobRole: string;
  experience: Experience;
  compensation: string;
  process: string;
  position: Position;
  companyName: string;
  location: string;
  country: string;
  aboutCompany: string;
  applicationLink: string;
}

export interface JobResponseInterface {
  jobs: IJob[];
  totalResults: number;
  totalPages: number;
  page: number;
  resultsPerPage: number;
  status: number;
}

export interface JobResponseBody {
  data: {
    message: string;
    data: JobResponseInterface;
  };
}

export interface JobRequestBody {
  resultsPerPage: number;
  page: number;
  location: string;
}
