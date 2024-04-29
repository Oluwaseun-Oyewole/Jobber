"use client";
import { useSearchParams } from "next/navigation";
import FormStepOne from "./step-one";
import FormStepTwo from "./step-two";

const FormContent = () => {
  const searchParams = useSearchParams();
  const step = +searchParams.get("step")! ?? 1;

  const renderForm = () => {
    if (step === 1) {
      return <FormStepOne />;
    } else if (step === 2) {
      return <FormStepTwo />;
    } else if (step > 2 || step <= 1) {
      return <FormStepOne />;
    }
  };
  return <div>{renderForm()}</div>;
};

export default FormContent;
