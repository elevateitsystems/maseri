"use client";

import dynamic from "next/dynamic";

const FeaturesSlider = dynamic(() => import("./FeaturesSlider"), {
  ssr: false,
});

export default FeaturesSlider;
