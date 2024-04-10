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
    <div className="flex items-center flex-col lg:flex-row justify-between max-w-6xl mx-auto h-[90vh] overflow-y-scroll">
      <Image
        src={imageUrl}
        alt="Image"
        className={`${imagePosition === "left" ? "order-1" : "order-2"}`}
        width={600}
        height={600}
      />
      <div className={`${imagePosition === "left" ? "order-2" : "order-1"}`}>
        {text}
      </div>
    </div>
  );
};
