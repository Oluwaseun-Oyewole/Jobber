import EmailChangeImage from "@/assets/signup.svg";
import { FlexComponent } from "@/components/custom/flex";
import EmailChange from ".";

const Login = () => {
  return (
    <>
      <FlexComponent
        imageUrl={EmailChangeImage}
        text={<EmailChange />}
        imagePosition="right"
      />
    </>
  );
};

export default Login;
