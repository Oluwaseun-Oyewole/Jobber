"use client";
import Lock from "@/assets/lock.svg";
import FormikController from "@/components/custom/formikController";
import Loader from "@/components/custom/loader";
import { Button } from "@/components/ui/button";
import {
  PasswordResetFormValues,
  passwordResetValidationSchema,
} from "@/lib/schema/password-reset";
import { resetPassword } from "@/services/auth";
import { Toastify } from "@/utils/toasts";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";

const PasswordResetForm = ({ jwt }: { jwt: string }) => {
  const router = useRouter();
  const validateForm = (values: PasswordResetFormValues) => {
    try {
      passwordResetValidationSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  const handleSubmit = async (
    values: PasswordResetFormValues,
    { resetForm }: any,
  ) => {
    try {
      const response = await resetPassword({
        jwtUserId: jwt,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });
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
    <div className="bg-white w-[400px] md:w-[470px] min-h-[410px] shadow-lg rounded-xl my-10 md:my-0">
      <div className="flex flex-col items-center justify-around p-5 md:p-10">
        <h1 className="font-medium text-xl md:text-2xl">Password Reset</h1>
        <div className="w-full mt-12">
          <Formik
            initialValues={{
              jwtUserId: "",
              oldPassword: "",
              newPassword: "",
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
                        control="password"
                        name="oldPassword"
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="old password"
                        className="border-[1.7px] border-gray-300 !py-7 pl-12"
                      />
                      <Image
                        src={Lock}
                        alt="lock"
                        className="absolute top-4 left-4"
                      />
                    </div>
                    <div className="relative">
                      <FormikController
                        control="password"
                        name="newPassword"
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="new password"
                        className="border-[1.7px] border-gray-300 !py-7 pl-12"
                      />
                      <Image
                        src={Lock}
                        alt="lock"
                        className="absolute top-4 left-4"
                      />
                    </div>
                  </div>

                  <Button
                    disabled={!formik.isValid}
                    className="mt-5 !disabled:cursor-not-allowed w-full py-7 bg-deepBlue hover:bg-lightBlue transition-all ease-in-out duration-500 flex items-center gap-2"
                  >
                    {formik.isSubmitting && <Loader />}
                    submit
                  </Button>
                </Form>
              );
            }}
          </Formik>
          <div className="pt-5 flex justify-end items-end gap-3">
            <Link href="/auth/login" className="text-deepBlue">
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetForm;
