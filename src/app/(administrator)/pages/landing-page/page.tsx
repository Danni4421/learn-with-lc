"use server";

/** Components */
import PrimaryButton from "@/components/ui/buttons/primary";
import HeroSection from "@/components/ui/sections/hero";
import FAQsTable from "@/components/ui/tables/faqs";
import TeacherTable from "@/components/ui/tables/teachers";
import TestimonialTable from "@/components/ui/tables/testimonials";
import EditablePrograms from "@/components/ui/sections/editable-programs";
import EditableActivities from "@/components/ui/sections/editable-activities";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

/** Libraries */
import { fecthLBB } from "@/lib/lbb";
import { fetchAllProgram } from "@/lib/programs";
import { fetchAllTeacher } from "@/lib/teachers";
import { fetchAllTestimonial } from "@/lib/testimonials";
import { fetchAllQuestion } from "@/lib/faqs";

export default async function LandingPage() {
  const lbb = await fecthLBB();
  const programs = await fetchAllProgram();
  const activities = lbb.activities;
  const teachers = await fetchAllTeacher();
  const testimonials = await fetchAllTestimonial();
  const faqs = await fetchAllQuestion();

  return (
    <Box className="flex flex-col gap-8">
      <Flex flexDirection="column">
        <Heading fontSize=".8rem" mb="6">
          Bagian Hero
        </Heading>
        <HeroSection
          lbb={lbb}
          className="bg-white p-8 rounded-lg"
          hideActionButton
        />
      </Flex>

      {/* Program Table Management */}
      <Box>
        <Heading fontSize=".8rem" mb="6">
          Bagian Program
        </Heading>
        <EditablePrograms initialData={programs} />
      </Box>

      {/* Activities Management */}
      <>
        <EditableActivities __activities={activities} />
      </>

      {/* Teacher Table Management */}
      <Box>
        <Box className="flex justify-between items-center mb-3">
          <Heading fontSize=".8rem" mb="6">
            Tabel Manajemen Pengajar
          </Heading>
          <PrimaryButton href="/teachers/store">
            <FaPlus />
            <span className="ms-2">Tambah Pengajar</span>
          </PrimaryButton>
        </Box>
        <TeacherTable initialData={teachers} />
      </Box>

      {/* Testimonial Table Management */}
      <Box>
        <Box className="flex justify-between items-center mb-3">
          <Heading fontSize=".8rem" mb="6">
            Tabel Manajemen Testimoni
          </Heading>
          <PrimaryButton href="/testimonials/store">
            <FaPlus />
            <span className="ms-2">Tambah testimoni</span>
          </PrimaryButton>
        </Box>
        <TestimonialTable initialData={testimonials} />
      </Box>

      {/* Frequently Asked Question Table Management */}
      <Box>
        <Box className="flex justify-between items-center mb-3">
          <Heading fontSize=".8rem" mb="6">
            Tabel Manajemen FAQ
          </Heading>
          <PrimaryButton href="/faqs/store">
            <FaPlus />
            <span className="ms-2">Tambah FAQ</span>
          </PrimaryButton>
        </Box>
        <FAQsTable initialData={faqs} />
      </Box>
    </Box>
  );
}
