import { FC } from "react";

type IFormErrorProps = {
  error?: string;
};

const FormError: FC<IFormErrorProps> = ({ error = "" }) => {
  return (
    <p className="!text-red-600 mt-[5px] flex items-center text-xs">
      <p className="!text-red-600 inline-block mr-1 text-base leading-4" />
      {error}
    </p>
  );
};

export default FormError;
