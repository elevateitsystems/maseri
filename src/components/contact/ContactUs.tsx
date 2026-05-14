import Image from "next/image";
import Features from "../home/components/Features";
import ContactForm from "./components/contract-form";

export default function ContactUs() {
  return (
    <section className="relative w-full overflow-hidden py-16 md:py-24">
      {/* Decorative Background Images */}
      <div className=" absolute left-0 top-0 h-full w-[150px] md:w-[250px] lg:w-[300px] opacity-60 pointer-events-none">
        <Image
          src="/assets/contacts_us_left_image.avif"
          alt=""
          fill
          quality={75}
          loading="lazy"
          sizes="(max-width: 768px) 150px, 300px"
          className="object-contain object-left-top"
        />
      </div>
      <div className=" absolute right-0 top-0 h-full w-[150px] md:w-[250px] lg:w-[300px] opacity-60 pointer-events-none">
        <Image
          src="/assets/contacts_us_right_image.avif"
          alt=""
          fill
          quality={75}
          loading="lazy"
          sizes="(max-width: 768px) 150px, 300px"
          className="object-contain object-right-top"
        />
      </div>

      {/* Contact Form Section */}
      <div className="container px-6 lg:px-10 full mx-auto text-center">
        <h1 className="text-[40px] md:text-[60px] font-bold text-black mb-10 mt-8">
          اتصل بنا
        </h1>

        <ContactForm />
      </div>

      {/* Features Section */}
      <div className="mt-8 md:mt-12">
        <Features />
      </div>
    </section>
  );
}
