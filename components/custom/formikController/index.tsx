import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage } from "formik";
import { FC } from "react";
import FormError from "../formError";

interface IFormikControlProps {
  control: "input" | "select" | "area" | "password" | "textarea";
  [key: string]: any;
}

const FormikController: FC<IFormikControlProps> = (props) => {
  const { control, name, value, type, ...rest } = props;
  switch (control) {
    case "input":
      return (
        <>
          <Input
            {...rest}
            name={name}
            type={type ? type : "text"}
            value={value}
          />
          <ErrorMessage name={name}>
            {(msg) => <div>{<FormError error={msg} />}</div>}
          </ErrorMessage>
        </>
      );

    case "password":
      return (
        <>
          <PasswordInput {...rest} name={name} value={value} />
          <ErrorMessage name={name}>
            {(msg) => <div>{<FormError error={msg} />}</div>}
          </ErrorMessage>
        </>
      );

    case "textarea":
      return (
        <>
          <Textarea {...rest} name={name} />
          <ErrorMessage name={name}>
            {(msg) => <div>{<FormError error={msg} />}</div>}
          </ErrorMessage>
        </>
      );
    default:
      return null;
  }
};

export default FormikController;
