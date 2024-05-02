"use client";
import Google from "@/assets/google.svg";
import LinkedIn from "@/assets/linkedIn.svg";
import { login_redirect } from "@/routes";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa6";

const OAuth = () => {
  return (
    <div className="flex gap-3 py-3 md:py-5">
      <div
        // onClick={() => {
        //   signIn("linkedin", { callbackUrl: login_redirect });
        // }}
        className="bg-transparent hover:bg-transparent"
      >
        <Image src={LinkedIn} alt="linkedin" className="cursor-not-allowed" />
      </div>
      <div
        className="bg-transparent hover:bg-transparent"
        onClick={() => {
          signIn("google", { callbackUrl: login_redirect });
        }}
      >
        <Image src={Google} alt="google" className="cursor-pointer" />
      </div>

      <FaGithub
        size={22}
        className="mt-3 cursor-pointer"
        onClick={() => {
          signIn("github", { callbackUrl: login_redirect });
        }}
      />
    </div>
  );
};

export default OAuth;
