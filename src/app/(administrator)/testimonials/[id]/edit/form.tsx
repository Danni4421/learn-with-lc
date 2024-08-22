"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { startTransition, useState } from "react";

/** Components */
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import WarningButton from "@/components/ui/buttons/warning";
import SecondaryButton from "@/components/ui/buttons/secondary";
import DismissableAlert from "@/components/ui/alerts/dismissable-alert";
import { FaRegFloppyDisk } from "react-icons/fa6";
import { MdKeyboardBackspace } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";

/** Schemas */
import { EditTestimonySchema } from "@/schemas/testimony";

/** Types */
import { Testimony } from "@/types";

/** Server Action */
import { update } from "@/actions/testimonials";

interface TestimonyProps {
  testimony: Testimony;
}

export default function EditTestimonyForm({ testimony }: TestimonyProps) {
  const [success, setOnSuccess] = useState<string | undefined>("");
  const [error, setOnError] = useState<string | undefined>("");
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    testimony.image
  );

  const { handleSubmit, register, setValue, getValues } = useForm<
    z.infer<typeof EditTestimonySchema>
  >({
    defaultValues: {
      testimony: testimony.testimony,
      testimoner_name: testimony.testimoner_name,
      last_graduate_at: testimony.last_graduate_at,
      now_studied_at: testimony.now_studied_at,
    },
    resolver: zodResolver(EditTestimonySchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof EditTestimonySchema>> = (
    data
  ) => {
    setOnSuccess("");
    setOnError("");

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

        const result = await update(formData, testimony.id);

        setOnSuccess(result?.success);
        setOnError(result?.error);
      } catch (error) {
        setOnError(
          "Gagal memperbarui testimoni, terjadi kesalahan pada proses pembaruan."
        );
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
      >
        {/* Form Control Testimony */}
        <FormControl mb="3">
          <FormLabel fontSize=".8rem">Testimoni</FormLabel>
          <Input
            type="text"
            defaultValue={getValues().testimony}
            {...register("testimony")}
          />
        </FormControl>

        {/* Form Control Testimoner Name */}
        <FormControl mb="3">
          <FormLabel fontSize=".8rem">Nama testimoner</FormLabel>
          <Input
            type="text"
            defaultValue={getValues().testimoner_name}
            {...register("testimoner_name")}
          />
        </FormControl>

        {/* Form Control Last Graduate At */}
        <FormControl mb="3">
          <FormLabel fontSize=".8rem">Tempat pendidikan sebelum</FormLabel>
          <Input
            type="text"
            defaultValue={getValues().last_graduate_at}
            {...register("last_graduate_at")}
          />
        </FormControl>

        {/* Form Control Now Studied At */}
        <FormControl mb="3">
          <FormLabel fontSize=".8rem">Tempat pendidikan saat ini</FormLabel>
          <Input
            type="text"
            defaultValue={getValues().now_studied_at}
            {...register("now_studied_at")}
          />
        </FormControl>

        {/* Upload Photo */}
        <Box className="max-w-full">
          <FormLabel fontSize=".8rem">Foto testimoner</FormLabel>

          {imagePreview && (
            <Image
              src={imagePreview}
              className="my-3"
              alt="Preview for uploaded testimoner image"
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
          <WarningButton type="submit">
            <FaRegFloppyDisk />
            <span className="ms-2">Ubah testimoni</span>
          </WarningButton>
          <SecondaryButton href="/pages/landing-page">
            <MdKeyboardBackspace />
            <span className="ms-2">Kembali</span>
          </SecondaryButton>
        </Flex>
      </form>
    </>
  );
}
