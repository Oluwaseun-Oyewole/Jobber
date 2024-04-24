"use client";
import Mail from "@/assets/email.svg";
import FormError from "@/components/custom/formError";
import FormikController from "@/components/custom/formikController";
import Loader from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { OTPFormValues, otpValidationSchema } from "@/lib/schema/otp";
import { verifyOTP } from "@/services/auth";
import { Toastify } from "@/utils/toasts";
import { ErrorMessage, Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";

const otpIndexes = [
  {
    index: 0,
  },
  {
    index: 1,
  },
  {
    index: 2,
  },
  {
    index: 3,
  },
  {
    index: 4,
  },
  {
    index: 5,
  },
];
const VerifyOTP = () => {
  const router = useRouter();
  const validateForm = (values: OTPFormValues) => {
    try {
      otpValidationSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  const handleSubmit = async (values: OTPFormValues, { resetForm }: any) => {
    try {
      const response = await verifyOTP({
        email: values.email,
        otp: values.otp,
      });

      if (response?.status === 200) {
        resetForm();
        Toastify.success(response.message);
        router.push("/auth/login");
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className="bg-white w-[400px] md:w-[470px] min-h-[350px] shadow-lg rounded-xl my-10 md:my-0">
      <div className="flex flex-col items-center justify-around p-5 md:p-10">
        <h1 className="font-medium text-xl md:text-xl">OTP Verification</h1>
        <p className="text-sm font-light text-deepBlue mt-3">
          Enter the otp code sent to your mail
        </p>

        <div className="w-full mt-5">
          <Formik
            initialValues={{
              email: "",
              otp: "",
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

                      <div className="w-full py-4">
                        <InputOTP
                          maxLength={6}
                          className="flex justify-between !w-full"
                          name="otp"
                          value={formik.values.otp}
                          onChange={(value) =>
                            formik.setFieldValue("otp", value)
                          }
                          onBlur={formik.handleBlur}
                        >
                          <InputOTPGroup className="w-full">
                            {otpIndexes?.map((otp, index) => {
                              return (
                                <InputOTPSlot
                                  key={index}
                                  index={otp.index}
                                  className="w-full p-7 font-light !border-gray-200"
                                />
                              );
                            })}
                          </InputOTPGroup>
                        </InputOTP>
                        <ErrorMessage name="otp">
                          {(msg) => <div>{<FormError error={msg} />}</div>}
                        </ErrorMessage>
                      </div>
                    </div>
                  </div>

                  <Button
                    disabled={!formik.isValid}
                    className="pt-5 !disabled:cursor-not-allowed w-full py-6 bg-deepBlue hover:bg-lightBlue transition-all ease-in-out duration-500 flex items-center gap-2"
                  >
                    {formik.isSubmitting && <Loader />}
                    verify-otp
                  </Button>
                </Form>
              );
            }}
          </Formik>
          <div className="flex justify-end mt-3">
            <Link
              href="/auth/login"
              className="text-deepBlue font-light flex gap-2"
            >
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
