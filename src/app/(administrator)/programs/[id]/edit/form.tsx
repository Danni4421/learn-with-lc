"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useState, useTransition } from "react";

/** Components */
import DismissableAlert from "@/components/ui/alerts/dismissable-alert";
import PrimaryButton from "@/components/ui/buttons/primary";
import SecondaryButton from "@/components/ui/buttons/secondary";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FaFileUpload } from "react-icons/fa";
import { FaRegFloppyDisk } from "react-icons/fa6";
import { MdKeyboardBackspace } from "react-icons/md";

/** Schemas */
import { PutProgramSchema } from "@/schemas/program";

/** Types */
import { Program } from "@/types";

/** Server Action */
import { update } from "@/actions/programs";
import WarningButton from "@/components/ui/buttons/warning";

interface EditProgramFormProps {
  program: Program;
}

export default function EditProgramForm({ program }: EditProgramFormProps) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    program.image
  );
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<z.infer<typeof PutProgramSchema>>({
    defaultValues: {
      name: program.name,
      description: program.description,
    },
    resolver: zodResolver(PutProgramSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof PutProgramSchema>> = (data) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const formData = new FormData();

      try {
        Object.keys(data).forEach((key) => {
          const typedKey = key as keyof typeof data;
          const value = data[typedKey];

          if (value instanceof File) {
            formData.append(typedKey, value);
          } else if (typeof value === "string") {
            formData.append(typedKey, value);
          }
        });

        const response = await update(formData, program.id);

        setError(response?.error);
        setSuccess(response?.success);
      } catch (error) {
        setError("Terjadi kesalahan");
      }
    });

    window.scrollTo({ top: 0 });
  };

  return (
    <>
      {error && (
        <DismissableAlert
          status="error"
          title="Terjadi kesalahan!"
          description={error}
        />
      )}
      {success && (
        <DismissableAlert
          status="success"
          title="Berhasil!"
          description={success}
        />
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-5 rounded-lg mt-5"
        encType="multipart/formdata"
      >
        {/* Form Control Nama Program */}
        <FormControl mb="3" isInvalid={!!errors.name}>
          <FormLabel fontSize=".8rem">Nama program</FormLabel>
          <Input
            type="text"
            placeholder="Masukkan nama program"
            _placeholder={{ fontSize: 12 }}
            {...register("name")}
          />

          {errors.name && (
            <FormErrorMessage fontSize={12}>
              {errors.name.message}
            </FormErrorMessage>
          )}
        </FormControl>

        {/* Form Control Deskripsi */}
        <FormControl mb="3" isInvalid={!!errors.description}>
          <FormLabel fontSize=".8rem">Deskripsi program</FormLabel>
          <Textarea
            placeholder="Masukkan deskripsi program"
            _placeholder={{ fontSize: 12 }}
            {...register("description")}
          ></Textarea>

          {errors.description && (
            <FormErrorMessage fontSize={12}>
              {errors.description.message}
            </FormErrorMessage>
          )}
        </FormControl>

        {/* Upload Photo */}
        <Box className="max-w-full">
          <FormLabel fontSize=".8rem">Foto program</FormLabel>

          {imagePreview && (
            <Image
              src={imagePreview}
              className="my-3"
              alt="Preview for uploaded program image"
            />
          )}

          <FormLabel className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
            <Text className="flex items-center space-x-2">
              <FaFileUpload className="text-gray-500" />
              <span className="font-medium text-gray-500 flex text-xs">
                Drop files to Attach, or
                <span className="text-blue-600 underline ms-2">browse</span>
              </span>
            </Text>
            <Input
              type="file"
              display="none"
              onChange={(event) => {
                if (event.target.files && event.target.files[0]) {
                  const image = event.target.files[0];
                  const imageUrl = URL.createObjectURL(image);
                  setImagePreview(imageUrl);
                  setValue("image", image);
                }
              }}
            />
          </FormLabel>
        </Box>

        <Flex gap="2" mt="6">
          <WarningButton type="submit" disabled={isPending}>
            <FaRegFloppyDisk />
            <span className="ms-2">Ubah program</span>
          </WarningButton>
          <SecondaryButton href="/pages/landing-page" disabled={isPending}>
            <MdKeyboardBackspace />
            <span className="ms-2">Kembali</span>
          </SecondaryButton>
        </Flex>
      </form>
    </>
  );
}
