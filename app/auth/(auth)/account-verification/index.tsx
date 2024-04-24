"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import FormContent from "./formLayout";

const FormLayout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalStepNumber = 2;
  const step = +searchParams.get("step")!;
  const stepNumber = step <= 2 ? step : step <= -1 ? 1 : 1;

  const updateUrlStringOnPageLoad = (step: number) => {
    const sp = new URLSearchParams(searchParams);
    sp.set("step", step.toString());
    router.push(`?${sp.toString()}`);
  };
  useEffect(() => {
    updateUrlStringOnPageLoad(Number(stepNumber));
  }, [searchParams]);

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-center">
          <div className="w-full flex justify-between">
            {stepNumber === 2 && (
              <p
                onClick={() => {
                  router.push(`${pathname}?step=1`);
                }}
                className="cursor-pointer text-deepBlue text-sm"
              >
                Prev
              </p>
            )}
            {stepNumber <= 1 && (
              <p
                onClick={() => {
                  router.push(`${pathname}?step=2`);
                }}
                className="cursor-pointer text-deepBlue text-sm"
              >
                Next
              </p>
            )}
            <p className="self-end flex items-end justify-end text-deepBlue text-sm">
              0{stepNumber <= 0 ? 1 : stepNumber}/0{totalStepNumber}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center pt-8 pb-5"></div>
        <FormContent />
      </div>
    </>
  );
};

export default FormLayout;
