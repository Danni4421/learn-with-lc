"use client";

import { useState } from "react";

/** Components */
import ProgramTable from "@/components/ui/tables/programs";
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import PrimaryButton from "@/components/ui/buttons/primary";
import { FaPlus } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

/** Types */
import { type Program } from "@/types";

/** Libraries */
import { deleteProgramById } from "@/lib/programs";

/** Utils */
import Swal from "sweetalert2";

interface EditableProgramProps {
  initialData: Program[];
}

export function EditablePrograms({ initialData }: EditableProgramProps) {
  const [programs, setPrograms] = useState<Program[]>(initialData);

  const DeleteButton = ({ id }: { id: string }) => {
    const onClick = () => {
      Swal.fire({
        title: "Apakah Anda yakin menghapus program?",
        text: "Program akan terhapus jika Anda menyetujui",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Iya, Hapus!",
        cancelButtonText: "Batalkan",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            await deleteProgramById(id);

            // Update state after deletion
            setPrograms((prevPrograms) =>
              prevPrograms.filter((program) => program.id !== id)
            );

            Swal.fire({
              title: "Terhapus",
              text: "Program berhasil dihapus.",
              icon: "success",
            });
          } catch (error) {
            Swal.fire({
              title: "Gagal",
              text: "Gagal menghapus program.",
              icon: "error",
            });
          }
        }
      });
    };

    return (
      <Button
        onClick={onClick}
        className="absolute -top-2 -right-2 w-4 h-10 rounded-full bg-red-300 hover:bg-red-500 text-white font-bold"
      >
        <FaX />
      </Button>
    );
  };

  return (
    <Box>
      <section className="p-5 bg-slate-50 my-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {programs?.map((program) => (
            <Card maxW="sm" key={program.id} className="relative">
              <CardBody>
                <Image
                  src={program.image}
                  alt={program.name}
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">{program.name}</Heading>
                  <Text>{program.description}</Text>
                </Stack>
              </CardBody>

              <DeleteButton id={program.id} />
            </Card>
          ))}
        </div>
        {programs.length === 0 && (
          <Center className="mx-auto">There are no record to display</Center>
        )}
      </section>
      <Box>
        <Flex justifyContent="space-between" alignItems="center" my="3">
          <Heading fontSize=".8rem" mb="6">
            Tabel Manajemen Program
          </Heading>
          <PrimaryButton href="/programs/store">
            <FaPlus />
            <span className="ms-2">Tambah Program</span>
          </PrimaryButton>
        </Flex>
        <ProgramTable initialData={programs} />
      </Box>
    </Box>
  );
}
