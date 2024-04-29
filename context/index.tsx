"use client";
import {
  StepOneJobPostFormValues,
  StepTwoJobPostFormValues,
} from "@/lib/schema/post-job";
import { PropsWithChildren, createContext, useContext, useState } from "react";

interface FormContextType {
  formValues: StepOneJobPostFormValues;
  stepTwoFormValues: Partial<StepTwoJobPostFormValues>;
  setFormValues: React.Dispatch<React.SetStateAction<StepOneJobPostFormValues>>;
  setStepTwoFormValues: React.Dispatch<
    React.SetStateAction<StepTwoJobPostFormValues>
  >;
}
const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

export const FormProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [formValues, setFormValues] = useState<StepOneJobPostFormValues>({
    jobTitle: "",
    jobType: "parttime",
    salary: 0,
    hired: 1,
    companyName: "",
    location: "",
    country: "",
    position: "Remote",
    experience: "Expert",
    applicationLink: "",
    imageSrc: "",
  });

  const [stepTwoFormValues, setStepTwoFormValues] =
    useState<StepTwoJobPostFormValues>({
      agreement: false,
      jobInfo: "",
      jobRole: "",
      skills: "",
      compensation: "",
      process: "",
      aboutCompany: "",
      datePosted: new Date(),
    });

  return (
    <FormContext.Provider
      value={{
        formValues,
        setFormValues,
        stepTwoFormValues,
        setStepTwoFormValues,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormContext;
