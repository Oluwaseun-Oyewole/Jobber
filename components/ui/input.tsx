import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import * as React from "react";

type IProps = {
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  value?: string | number | null;
} & InputProps;

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, IProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border-none outline-none bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
        {type === "search" && (
          <Search className="text-sm absolute top-5 w-4 h-4 left-3 text-gray-400" />
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
