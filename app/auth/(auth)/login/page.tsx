import { FlexComponent } from "@/components/custom/flex";
import LoginComponent from "@/components/custom/login";
import LoginImage from "../../../../assets/login.svg";
const Login = () => {
  return (
    <>
      <FlexComponent
        imageUrl={LoginImage}
        text={<LoginComponent />}
        imagePosition="left"
      />
    </>
  );
};

export default Login;
