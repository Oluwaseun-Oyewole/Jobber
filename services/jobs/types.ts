enum JobType {
  "FullTime",
  "PartTime",
  "Internship",
  "Volunteer",
  "Contract",
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
  location: string;
  imageSrc: string;
  jobTitle: string;
  jobType: JobType;
  datePosted: string;
  salary: number;
  jobInfo: string;
  experience: Experience;
  position: Position;
  companyName: string;
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
}
