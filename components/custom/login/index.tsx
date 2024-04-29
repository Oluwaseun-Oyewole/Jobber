"use client";
import Mail from "@/assets/email.svg";
import Lock from "@/assets/lock.svg";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LoginFormValues, loginValidationSchema } from "@/lib/schema/login";
import { login } from "@/services/auth";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { ZodError } from "zod";
import FormikController from "../formikController";
import Loader from "../loader";
import OAuth from "../oauth";

const LoginComponent = () => {
  const session = useSession();
  console.log("session status -- ", session.status);
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
  const [credentials, setCredentials] = useState(false);
  const email =
    typeof window !== "undefined" ? localStorage.getItem("email") : "";
  const password =
    typeof window !== "undefined" ? localStorage.getItem("password") : "";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const credential = localStorage.getItem("savedCredentials");
      setCredentials(JSON.parse(credential!));
    }
  }, []);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials(e.target.checked);
  };

  const handleSubmit = async (values: LoginFormValues, { resetForm }: any) => {
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      });
      if (response?.status === 200) {
        if (credentials) {
          localStorage.setItem("email", values.email);
          localStorage.setItem("password", values.password);
          localStorage.setItem("savedCredentials", String(true));
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
          localStorage.removeItem("savedCredentials");
        }

        resetForm();
        setCredentials(false);
        router.push("/dashboard");
      }
    } catch (error) {
      return;
    }
  };

  return (
    <div className="bg-white w-full overflow-x-hidden md:w-[480px] min-h-[500px] shadow-lg rounded-xl my-5 lg:my-0">
      <div className="flex flex-col items-center justify-around p-5 md:p-10">
        <h1 className="font-medium text-xl md:text-2xl">Login</h1>
        <OAuth />
        <div className="w-full">
          <Formik
            initialValues={{
              email: email ?? "",
              password: password ?? "",
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

                  <div className="flex justify-end items-end w-full font-[300] py-3">
                    <Link
                      href="/auth/account-verification?step=2"
                      className="text-xs text-deepBlue font-[400]"
                    >
                      Activate your account
                    </Link>
                  </div>

                  <div className="flex justify-between items-center w-full pb-5 font-[300]">
                    <div className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        onChange={handleCheckboxChange}
                        name="savedCredentials"
                        checked={credentials}
                        className="h-[15px] w-[15px] cursor-pointer"
                      />
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
