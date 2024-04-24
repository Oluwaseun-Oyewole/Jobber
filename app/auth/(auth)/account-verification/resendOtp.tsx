"use client";
import Mail from "@/assets/email.svg";
import FormikController from "@/components/custom/formikController";
import Loader from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import {
  OTPResendFormValues,
  otpResendValidationSchema,
} from "@/lib/schema/otp";
import { resendOTP } from "@/services/auth";
import { Toastify } from "@/utils/toasts";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";

const ResendOTP = () => {
  const router = useRouter();
  const validateForm = (values: OTPResendFormValues) => {
    try {
      otpResendValidationSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };
  const handleSubmit = async (
    values: OTPResendFormValues,
    { resetForm }: any,
  ) => {
    try {
      const response = await resendOTP({
        email: values.email,
      });

      if (response?.status === 200) {
        Toastify.success(response.message);
        resetForm();
        router.push(`/auth/account-verification?step=2`);
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className="bg-white w-[400px] md:w-[470px] min-h-[300px] shadow-lg rounded-xl my-10 md:my-0">
      <div className="flex flex-col items-center justify-around p-5 md:p-10">
        <h1 className="font-medium text-xl md:text-xl">Resend OTP</h1>
        <p className="font-light mt-2 text-sm">Generate new otp code </p>

        <div className="w-full mt-5">
          <Formik
            initialValues={{
              email: "",
            }}
            validate={validateForm}
            onSubmit={handleSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <div
                    className={`flex flex-col ${formik.isValid ? "gap-4" : "gap-2"} w-full`}
                  >
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
                    className="my-4 pt-5 !disabled:cursor-not-allowed w-full py-6 bg-deepBlue hover:bg-lightBlue transition-all ease-in-out duration-500 flex items-center gap-2"
                  >
                    {formik.isSubmitting && <Loader />}
                    send-otp
                  </Button>
                </Form>
              );
            }}
          </Formik>
          <div className="flex justify-end mt-3">
            <Link href="/auth/login" className="text-deepBlue font-light">
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResendOTP;
