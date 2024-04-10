import { FlexComponent } from "@/components/custom/flex";
import RegisterComponent from "@/components/custom/register";
import SignUpImage from "../../../../assets/signup.svg";

const Register = () => {
  return (
    <FlexComponent
      imageUrl={SignUpImage}
      text={<RegisterComponent />}
      imagePosition="right"
    />
  );
};

export default Register;
