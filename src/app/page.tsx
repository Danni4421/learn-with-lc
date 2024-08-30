import { auth } from "@/auth";

/** Components */
import Heading1 from "@/components/heading";
import Navbar from "@/components/ui/navigations/navbar";
import Footer from "@/components/footer";
import { Hero as HeroSection } from "@/components/ui/sections/hero";
import { About as AboutSection } from "@/components/ui/sections/about";
import { Strengths as StrengthsSection } from "@/components/ui/sections/strengths";
import { Programs as ProgramsSection } from "@/components/ui/sections/programs";
import { Facilities as FacilitiesSection } from "@/components/ui/sections/facilities";
import { Activities as ActivitiesSection } from "@/components/ui/sections/activities";
import { TeacherSection } from "@/components/ui/sections/teachers";
import { Testimonials as TestimonialsSection } from "@/components/ui/sections/testimonials";
import { Faqs as FaqsSection } from "@/components/ui/sections/faqs";

/** Libraries */
import { fecthLBB } from "@/lib/lbb";
import { fetchAllProgram } from "@/lib/programs";
import { fetchAllTestimonial } from "@/lib/testimonials";
import { fetchAllQuestion } from "@/lib/faqs";
import { fetchAllTeacher } from "@/lib/teachers";
import { Tooltip } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";

/** Utilities */
import content from "@/utils/content.json";

export default async function Home() {
  const lbb = await fecthLBB();
  const programs = await fetchAllProgram();
  const teachers = await fetchAllTeacher();
  const testimonials = await fetchAllTestimonial();
  const faqs = await fetchAllQuestion();
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gray-100">
      <Navbar isLanding user={session?.user} />

      {/* Hero */}
      <HeroSection lbb={lbb} className="w-10/12 mt-24 px-8 overflow-hidden" />

      {/* About */}
      <AboutSection
        abouts={content.aboutUs}
        className="w-10/12 mx-auto scroll-m-24"
      />

      {/* Strengths */}
      <>
        <Heading1 head="Keunggulan LC" subhead="Kenapa Harus Pilih LC?" />
        <StrengthsSection
          strengths={content.strengths}
          className="w-10/12 scroll-m-48"
        />
      </>

      {/* Programs */}
      <>
        <Heading1
          head="Program Unggulan"
          subhead="Apa Aja Sih Program Unggulan Kami?"
        />
        <ProgramsSection programs={programs} className="w-[85vw] scroll-m-48" />
      </>

      {/* Facilities */}
      <FacilitiesSection
        facilities={content.facilities}
        className="bg-black w-full mt-20 px-5 py-16 scroll-m-12"
      />

      {/* Activities */}
      <>
        <Heading1
          head="Keseruan Bersama LC"
          subhead="Banyak Hal Seru di Lentera Cendekia"
        />
        <ActivitiesSection activities={lbb.activities} />
      </>

      {/* Teachers */}
      <>
        <Heading1
          head="Team Teaching"
          subhead="Kenalan Sama Team Teaching LC!"
        />
        <TeacherSection
          teachers={teachers}
          className="w-10/12 my-8 scroll-m-24"
        />
      </>

      {/* Testimonials */}
      <>
        <Heading1 head="Testimoni Siswa" subhead="Apa Kata Mereka?" />
        <TestimonialsSection
          testimonials={testimonials}
          className="w-10/12 my-8 scroll-m-52"
        />
      </>

      {/* Faqs */}
      <>
        <Heading1 head="FAQ" subhead="Hal yang Sering Ditanyakan" />
        <FaqsSection faqs={faqs} className="scroll-m-48" />
      </>

      <div className="fixed bottom-5 right-5 md:bottom-10 md:right-10 z-50 h-16 w-16 bg-emerald-300 rounded-full flex items-center justify-center text-white text-4xl hover:bg-emerald-400 transition-all">
        <Tooltip content="Hubungi Kami" placement="left">
          <a href="#home">
            <FaWhatsapp />
          </a>
        </Tooltip>
      </div>

      {/* Footer */}
      <Footer
        className="mt-24 bg-slate-50"
        contacts={content.footer.contacts}
        navigations={content.footer.navigations}
        popularCourses={content.footer.popularCourses}
      />
    </main>
  );
}
