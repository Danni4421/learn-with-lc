import Heading from "@/components/heading";
import Navbar from "@/components/navigations/navbar";
import Footer from "@/components/footer";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import StrengthsSection from "@/components/sections/strengths";
import ProgramsSection from "@/components/sections/programs";
import FacilitiesSection from "@/components/sections/facilities";
import ActivitiesSection from "@/components/sections/activities";
import TestimonialsSection from "@/components/sections/testimonials";
import FaqsSection from "@/components/sections/faqs";
import content from "@/utils/content.json";
import { fecthLBB } from "@/lib/lbb";
import { fetchAllProgram } from "@/lib/programs";
import { fetchAllTestimonial } from "@/lib/testimonials";
import { fetchAllQuestion } from "@/lib/faq";

export default async function Home() {
  const lbb = await fecthLBB();
  const programs = await fetchAllProgram();
  const testimonials = await fetchAllTestimonial();
  const faqs = await fetchAllQuestion();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-100">
      <Navbar isLanding />

      {/* Hero */}
      <HeroSection lbb={lbb} className="mt-24 px-8 overflow-hidden" />

      {/* About */}
      <AboutSection
        abouts={content.aboutUs}
        className="px-8 mx-auto scroll-m-24"
      />

      {/* Strengths */}
      <>
        <Heading head="Keunggulan LC" subhead="Kenapa Harus Pilih LC?" />
        <StrengthsSection
          strengths={content.strengths}
          className="scroll-m-48"
        />
      </>

      {/* Programs */}
      <>
        <Heading
          head="Program Unggulan"
          subhead="Apa Aja Sih Program Unggulan Kami?"
        />
        <ProgramsSection programs={programs} className="scroll-m-48" />
      </>

      {/* Facilities */}
      <FacilitiesSection
        facilities={content.facilities}
        className="bg-indigo-700 w-full mt-20 px-5 py-16 scroll-m-12"
      />

      {/* Activities */}
      <>
        <Heading
          head="Keseruan Bersama LC"
          subhead="Banyak Hal Seru di Lentera Cendekia"
        />
        <ActivitiesSection activities={lbb.activities} />
      </>

      {/* Testimonials */}
      <>
        <Heading head="Testimoni Siswa" subhead="Apa Kata Mereka?" />
        <TestimonialsSection
          testimonials={testimonials}
          className="w-10/12 my-8 scroll-m-52"
        />
      </>

      {/* Faqs */}
      <>
        <Heading head="FAQ" subhead="Hal yang Sering Ditanyakan" />
        <FaqsSection faqs={faqs} className="scroll-m-48" />
      </>

      {/* Footer */}
      <Footer className="mt-24 bg-inherit" />
    </main>
  );
}
