import { FlexComponent } from "@/components/custom/flex";
import LoginComponent from "@/components/custom/login";
import { Suspense } from "react";
import LoginImage from "../../../../assets/login.svg";
const Login = () => {
  return (
    <Suspense>
      <FlexComponent
        imageUrl={LoginImage}
        text={<LoginComponent />}
        imagePosition="left"
      />
    </Suspense>
  );
};

export default Login;
