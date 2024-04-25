import Image from "next/image";
import React, { ReactNode } from "react";

interface FlexProps {
  imageUrl: string;
  text: ReactNode;
  imagePosition?: "left" | "right";
}

export const FlexComponent: React.FC<FlexProps> = ({
  imageUrl,
  text,
  imagePosition = "left",
}) => {
  return (
    <div className="w-full flex items-center flex-col lg:flex-row justify-between md:max-w-6xl md:mx-auto h-[90vh] overflow-y-scroll">
      <Image
        src={imageUrl}
        alt="Image"
        className={`${imagePosition === "left" ? "order-1" : "order-2"} lg:basis-1/2 w-[500px] xl:w-[590px]`}
        width={600}
        height={600}
      />
      <div
        className={`${imagePosition === "left" ? "order-2" : "order-1"} lg:basis-1/2 w-[95%] flex justify-center`}
      >
        {text}
      </div>
    </div>
  );
};
