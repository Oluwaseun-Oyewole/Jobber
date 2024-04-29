/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import dynamic from "next/dynamic";
import { FC } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
type TCurve =
  | "smooth"
  | "straight"
  | "stepline"
  | "smooth"
  | "straight"
  | "stepline";

type Props = {
  id: string | "bar-chart";
  series: any | undefined;
  type?: "bar" | any;
  colors?: Array<string>;
  className?: string;
  dropShadowColor?: string;
  strokeColor?: Array<string>;
  height?: number | string;
  width?: number | string;
  stacked?: boolean;
  plotOptions?: boolean;
  showGrid?: boolean;
  categories?: Array<string>;
  label?: Array<string>;
  curve?: TCurve | TCurve[];
  showDownloads?: boolean;
};

export const CustomChart: FC<Props> = ({
  type,
  colors,
  id,
  series,
  className,
  height,
  showGrid,
  label,
  categories,
  curve,
  showDownloads,
  stacked,
}) => {
  const yaxisOptions = {
    show: true,
    labels: {
      show: true,
      style: {
        colors: "grey",
        fontSize: "13px",
        fontWeight: 100,
        fontFamily: "Outfit",
      },
      formatter: (value: any) => {
        return type !== "line" && type !== "area" && value > 0 ? value : value;
      },
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  };

  const options = {
    chart: {
      id: id,
      toolbar: {
        show: true,
        tools: {
          download: showDownloads ? true : false,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
      selection: {
        enabled: true,
        stroke: {},
      },
      background: "#FFF",
      dropShadow: {
        enabled: true,
        blur: 5,
        opacity: 0.2,
        color: "grey",
      },
      stacked: stacked,
    },
    labels: label,
    xaxis: {
      categories: categories || [],
      labels: {
        show: true,
        style: {
          fontFamily: `Outfit`,
          color: "grey",
          fontWeight: 300,
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: yaxisOptions,
    fill: {
      colors: colors,
    },

    states: {
      hover: {
        filter: { type: "none" },
      },
      active: {
        filter: { type: "none" },
      },
    },
    grid: {
      show: showGrid ?? true,
      borderColor: `${"#EAEAEA"}`,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        labels: {
          show: true,
          style: {
            fontSize: "13px",
            fontWeight: "300",
            fontFamily: "Outfit",
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      enabled: true,
      shared: false,
      show: false,
      style: {
        fontSize: "12px",
        fontFamily: "Outfit",
        background: "green",
      },
      x: {
        show: false,
      },
      y: {
        show: true,
        formatter: function (value: number) {
          return `${value}`;
        },
      },

      marker: { show: false },
      theme: "dark",
    },
    stroke: {
      show: true,
      colors: colors,
      curve: curve,
    },
    colors: colors,
  };

  return (
    <Chart
      options={options}
      series={series}
      type={type}
      height={height ?? 300}
      width={"100%"}
      className={className}
    />
  );
};
