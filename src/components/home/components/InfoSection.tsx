import React from "react";
import Image from "next/image";
import aboutUsImage from "../../../../assets/about-us-image.png";
import aboutUsIcon from "../../../../assets/about-us-icon.png";

const InfoSection = () => {
  return (
    <section className="overflow-hidden bg-gradient-to-t from-[#F2F2F2] via-[#DED1C1] to-[#F2F2F2]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center gap-20">
          {/* RIGHT SIDE (Image + Icon) */}
          <div className="relative flex justify-center lg:justify-start">
            {/* Wrapper that reserves space for the icon */}
            <div className="relative pr-[140px]">
              {/* Main Image */}
              <div className="relative w-[376px] h-[534px] overflow-hidden">
                <Image
                  src={aboutUsImage}
                  alt="About Maseri"
                  width={376}
                  height={534}
                  className="object-cover"
                />
              </div>

              {/* Floating Icon (now inside layout) */}
              <div className="absolute top-1/3 -translate-y-1/2 right-0 w-[233px] h-[233px] bg-[#F2F2F2] rounded-full flex items-center justify-center p-4 shadow-sm">
                <Image
                  src={aboutUsIcon}
                  alt="Quality Icon"
                  width={233}
                  height={233}
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* LEFT SIDE (Text) */}
          <div className="sm:flex-1 flex flex-col items-start text-start space-y-8">
            <h2 className="text-[56px] font-semibold text-black leading-tight">
              حيث تلتقي
            </h2>

            <p className="text-[20px] font-medium text-black/70 leading-relaxed max-w-[600px]">
              حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي
              الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة
              بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة
              حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي
              الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة
              بالاستدامة حيث تلتقي الموضة بالاستدامة حيث تلتقي الموضة بالاستدامة
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
