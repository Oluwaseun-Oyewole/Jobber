"use client";
import Mail from "@/assets/email.svg";
import Lock from "@/assets/lock.svg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { LoginFormValues, loginValidationSchema } from "@/lib/schema/login";
import { login } from "@/services/auth";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import FormikController from "../formikController";
import Loader from "../loader";
import OAuth from "../oauth";

const LoginComponent = () => {
  const router = useRouter();
  const validateForm = (values: LoginFormValues) => {
    try {
      loginValidationSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  const handleSubmit = async (values: LoginFormValues, { resetForm }: any) => {
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      });

      if (response?.status === 200) {
        resetForm();
        router.push("/dashboard");
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className="bg-white w-[400px] md:w-[470px] min-h-[500px] shadow-lg rounded-xl my-10 md:my-0">
      <div className="flex flex-col items-center justify-around p-5 md:p-10">
        <h1 className="font-extrabold text-xl md:text-2xl">Login</h1>
        <OAuth />
        <div className="w-full">
          <Formik
            initialValues={{
              email: "",
              password: "",
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

                    <div className="relative">
                      <FormikController
                        control="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="password"
                        className="border-[1.7px] border-gray-300 !py-7 pl-12"
                      />
                      <Image
                        src={Lock}
                        alt="lock"
                        className="absolute top-4 left-4"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center w-full py-5 font-[300]">
                    <div className="flex items-center gap-2">
                      <Checkbox />
                      <Label>Remember Me?</Label>
                    </div>
                    <Link
                      href="/auth/forgot-password"
                      className="text-sm text-deepBlue font-[400]"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <Button
                    disabled={!formik.isValid}
                    className="pt-5 !disabled:cursor-not-allowed w-full py-6 bg-deepBlue hover:bg-lightBlue transition-all ease-in-out duration-500 flex items-center gap-2"
                  >
                    {formik.isSubmitting && <Loader />}
                    login
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>

        <div className="pt-5 flex justify-between gap-3">
          <p>New Job Seekers?</p>
          <Link href="/auth/register" className="text-deepPurple">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
