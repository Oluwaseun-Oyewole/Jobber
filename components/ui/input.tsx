import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import * as React from "react";

type IProps = {
  name: string;
} & InputProps;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, IProps>(
  ({ className, type, name, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          name={name}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border-transparent outline-none bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black placeholder:font-[300] focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  focus:border-blue-400 transition-all ease-in-out duration-500",
            className,
          )}
          ref={ref}
          {...props}
        />
        {type === "search" && (
          <Search className="text-sm absolute top-[20px] w-4 h-4 left-3 text-gray-400" />
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
