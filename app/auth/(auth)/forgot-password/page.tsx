import { FlexComponent } from "@/components/custom/flex";
import ForgotPassword from ".";
import LoginImage from "../../../../assets/signup.svg";
const Login = () => {
  return (
    <>
      <FlexComponent
        imageUrl={LoginImage}
        text={<ForgotPassword />}
        imagePosition="right"
      />
    </>
  );
};

export default Login;
