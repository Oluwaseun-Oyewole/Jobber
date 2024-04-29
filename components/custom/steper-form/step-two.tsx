"use client";
import FormikController from "@/components/custom/formikController";
import Loader from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import {
  StepOneJobPostFormValues,
  StepTwoJobPostFormValues,
  StepTwoJobPostValidationSchema,
} from "@/lib/schema/post-job";
import { createJob } from "@/services/jobs";
import { Toastify } from "@/utils/toasts";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";

const CreateJob = () => {
  const router = useRouter();
  const validateForm = (values: StepTwoJobPostFormValues) => {
    try {
      StepTwoJobPostValidationSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };
  const localStorageFormValues: StepOneJobPostFormValues =
    typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("formValues") || "{}");

  const session = useSession();
  const email = session?.data?.user?.email;
  const handleSubmit = async (
    values: StepTwoJobPostFormValues,
    { resetForm }: any,
  ) => {
    try {
      const response = await createJob({
        agreement: values.agreement,
        email: email!,
        hired: localStorageFormValues?.hired,
        imageSrc: localStorageFormValues.imageSrc!,
        jobRole: values.jobRole,
        skills: values.skills,
        compensation: values.compensation,
        process: values.process,
        aboutCompany: values.aboutCompany,
        applicationLink: localStorageFormValues?.applicationLink,
        location: localStorageFormValues?.location,
        country: localStorageFormValues?.country,
        companyName: localStorageFormValues?.companyName,
        jobTitle: localStorageFormValues?.jobTitle,
        jobType: localStorageFormValues?.jobType,
        datePosted: values.datePosted,
        salary: localStorageFormValues?.salary,
        jobInfo: values.jobInfo,
        experience: localStorageFormValues?.experience,
        position: localStorageFormValues?.position,
      });
      if (response?.status === 200) {
        Toastify.success(response?.message);
        router.push("/dashboard");
        resetForm();
        localStorage.removeItem("formValues");
      }
    } catch (error) {
      return;
    }
  };

  return (
    <>
      <div className="w-full ml-5">
        <Button
          className="!bg-transparent !text-deepBlue"
          onClick={() => {
            router.push("/dashboard/post-job?step=1");
          }}
        >
          Prev
        </Button>
      </div>
      <div className="h-[75vh] overflow-y-scroll p-5 md:p-10">
        <div className="w-full">
          <Formik
            initialValues={{
              agreement: false,
              jobInfo: "",
              jobRole: "",
              skills: "",
              compensation: "",
              process: "",
              aboutCompany: "",
              datePosted: new Date(),
            }}
            validate={validateForm}
            onSubmit={handleSubmit}
            validateOnChange
            validateOnMount
          >
            {(formik) => {
              return (
                <Form>
                  <div
                    className={`flex flex-col ${formik.isValid ? "gap-4" : "gap-2"} w-full`}
                  >
                    <div className="flex flex-col md:flex-row w-full mx-auto gap-4">
                      <div className="md:w-[450px]">
                        <FormikController
                          control="textarea"
                          placeholder="a brief details about the company"
                          name="aboutCompany"
                          value={formik.values.aboutCompany}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="md:w-full"
                        />
                      </div>
                      <div className="md:w-[450px]">
                        <FormikController
                          control="textarea"
                          placeholder="job information"
                          name="jobInfo"
                          value={formik.values.jobInfo}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row w-full mx-auto gap-4">
                      <div className="w-full">
                        <FormikController
                          control="textarea"
                          placeholder="quick description about the job role"
                          name="jobRole"
                          value={formik.values.jobRole}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      <div className="w-full">
                        <FormikController
                          control="textarea"
                          placeholder="List the skills required"
                          name="skills"
                          value={formik.values.skills}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row w-full mx-auto gap-4">
                      <div className="w-full">
                        <FormikController
                          control="textarea"
                          placeholder="what's your compensation like"
                          name="compensation"
                          value={formik.values.compensation}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                      <div className="w-full">
                        <FormikController
                          control="textarea"
                          placeholder="how to applicants apply"
                          name="process"
                          value={formik.values.process}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full py-4 font-[400] mx-auto text-deepBlue">
                    <label className="flex gap-2 text-sm">
                      <input
                        type="checkbox"
                        name="agreement"
                        checked={formik.values.agreement}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      I agree to the terms and conditions
                    </label>
                  </div>

                  <Button
                    disabled={!formik.isValid}
                    className="!disabled:cursor-not-allowed w-full md:w-[40%] py-7 bg-deepBlue hover:bg-deepBlue transition-all ease-in-out duration-500 flex items-center gap-2"
                  >
                    {formik.isSubmitting && <Loader />}
                    Post Job
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default CreateJob;
