"use client";
import Mail from "@/assets/email.svg";
import Facebook from "@/assets/face.svg";
import Google from "@/assets/google.svg";
import LinkedIn from "@/assets/linkedIn.svg";
import Lock from "@/assets/lock.svg";
import { Button } from "@/components/ui/button";
import {
  RegisterFormValues,
  registerValidationSchema,
} from "@/lib/schema/register";
import { Form, Formik } from "formik";
import { UserRoundPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ZodError } from "zod";
import FormikController from "../formikController";
import Loader from "../loader";

const RegisterComponent = () => {
  const validateForm = (values: RegisterFormValues) => {
    try {
      registerValidationSchema.parse(values);
    } catch (error) {
      if (error instanceof ZodError) {
        return error.formErrors.fieldErrors;
      }
    }
  };

  const handleSubmit = async (
    values: RegisterFormValues,
    { resetForm }: any,
  ) => {
    console.log(values);
    resetForm();
  };

  return (
    <div className="bg-white w-[400px] md:w-[470px] min-h-[500px] shadow-lg rounded-xl my-10 md:my-0">
      <div className="flex flex-col items-center justify-around h-full p-10">
        <h1 className="font-extrabold text-sm md:text-2xl">Registration</h1>
        <div className="flex gap-3 md:py-5">
          <Image src={LinkedIn} alt="linkedin" className="cursor-pointer" />
          <Image src={Google} alt="google" className="cursor-pointer" />
          <Image src={Facebook} alt="facebook" className="cursor-pointer" />
        </div>
        {/* <p className="md:pb-3 hidden md:block">or</p> */}
        <div className="w-full">
          <Formik
            initialValues={{
              agreement: false,
              name: "",
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
                        type="text"
                        placeholder="username"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="border-[1.5px] border-gray-200 !py-7 pl-12"
                      />
                      <div className="absolute top-4 left-4">
                        <UserRoundPlus size={25} />
                      </div>
                    </div>
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
                    {/* <div className="flex gap-2 items-center">
                      <Checkbox
                        name="agreement"
                        checked={formik.values.agreement}
                        onChange={formik.handleChange}
                        value={formik.values.agreement.toString()}
                        onBlur={formik.handleBlur}
                        onCheckedChange={() =>
                          formik.handleChange(
                            formik.values.agreement.toString(),
                          )
                        }
                      />
                      <Label>I agree with the terms and conditions</Label>
                    </div> */}

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
                    className="pt-5 !disabled:cursor-not-allowed w-full py-6 bg-deepBlue hover:bg-lightBlue transition-all ease-in-out duration-500 flex items-center gap-2"
                  >
                    {formik.isSubmitting && <Loader />}
                    Signup
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </div>

        <div className="pt-5 flex justify-between gap-3">
          <p>Already have an account?</p>
          <Link href="/auth/login" className="text-deepPurple">
            login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
