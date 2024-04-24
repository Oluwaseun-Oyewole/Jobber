import { FlexComponent } from "@/components/custom/flex";
import Loader from "@/components/custom/loader";
import { Suspense } from "react";
import FormLayout from ".";
import LoginImage from "../../../../assets/login.svg";
const AccountVerification = () => {
  return (
    <Suspense fallback={<Loader />}>
      <FlexComponent
        imageUrl={LoginImage}
        text={<FormLayout />}
        imagePosition="left"
      />
    </Suspense>
  );
};

export default AccountVerification;
