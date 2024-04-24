"use client";
import Mail from "@/assets/email.svg";
import FormikController from "@/components/custom/formikController";
import Loader from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import {
  ForgotPasswordFormValues,
  forgotPasswordValidationSchema,
} from "@/lib/schema/forgot-password";
import { forgotPassword } from "@/services/auth";
import { Toastify } from "@/utils/toasts";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";

const ForgotPassword = () => {
  const router = useRouter();
  const validateForm = (values: ForgotPasswordFormValues) => {
    try {
      forgotPasswordValidationSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  const handleSubmit = async (
    values: ForgotPasswordFormValues,
    { resetForm }: any,
  ) => {
    try {
      const response = await forgotPassword({ email: values.email });
      if (response?.status === 200) {
        Toastify.success(response.message);
        resetForm();
        router.push("/auth/login");
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center justify-center  bg-white h-[320px] md:h-[370px] w-full md:w-[500px] rounded-xl shadow-lg p-10">
        <h1 className="font-medium text-sm md:text-2xl py-8">
          Forgot Password
        </h1>
        <div className="w-full">
          <Formik
            initialValues={{
              email: "",
            }}
            validate={validateForm}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              return (
                <Form className={`flex flex-col gap-4 w-full`}>
                  <div>
                    <div className="relative">
                      <FormikController
                        control="input"
                        type="email"
                        placeholder="email address"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="border-[1.5px] border-gray-200 !py-7 pl-12"
                      />
                      <Image
                        src={Mail}
                        alt="email"
                        className="absolute top-4 left-4"
                      />
                    </div>
                  </div>

                  <Button
                    disabled={!formik.isValid}
                    className="pt-5 !disabled:cursor-not-allowed w-full py-7 bg-deepBlue hover:bg-lightBlue transition-all ease-in-out duration-500 flex items-center gap-2"
                  >
                    {formik.isSubmitting && <Loader />}
                    submit
                  </Button>
                </Form>
              );
            }}
          </Formik>
          <div className="pt-5 flex justify-end gap-3">
            <Link href="/auth/login" className="text-deepPurple">
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
