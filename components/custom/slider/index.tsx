"use client";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState } from "react";

interface SliderTooltipProps {
  children?: React.ReactNode;
  theme: any;
}

const SliderTooltip: React.FC<SliderTooltipProps> = ({
  children,
  theme = {},
}) => {
  const themeTooltip = {
    ...theme,
    color: theme.color || "red",
    fontSize: theme.fontSize || "14px",
    fontFamily: theme.fontFamily || "Source Sans Pro, mono",
    whiteSpace: theme.whiteSpace || "nowrap",
    position: "relative",
    bottom: "100%",
    paddingTop: "50px",
    transform: "translate(-50%, -10px)",
  };
  return <div style={themeTooltip}>{children}</div>;
};

const SliderComponent = () => {
  const [sliderRange, setSliderRange] = useState([10, 1000000]);
  return (
    <div>
      <Slider
        defaultValue={[10, 1000000]}
        min={10}
        max={1000000}
        // value={[100, 100000]}s
        range
        onChange={(e: any) => setSliderRange(e)}
        handleRender={(renderProps) => {
          return (
            <div {...renderProps.props}>
              <SliderTooltip
                theme={{
                  color: "#0049FC",
                  fontWeight: "medium",
                }}
              ></SliderTooltip>
            </div>
          );
        }}
      />
      <div className="flex items-center justify-between mt-6 text-deepBlue font-medium text-[14px]">
        <p>&#36;{sliderRange[0]}</p>
        <p>&#36;{sliderRange[1]}</p>
      </div>
    </div>
  );
};

export default SliderComponent;
