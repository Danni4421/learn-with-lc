"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

/** Components */
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
import SecondaryButton from "@/components/ui/buttons/secondary";
import PrimaryButton from "@/components/ui/buttons/primary";
import DismissableAlert from "@/components/ui/alerts/dismissable-alert";
import { MdKeyboardBackspace } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { FaRegFloppyDisk } from "react-icons/fa6";

/** Schemas */
import { StoreTestimonySchema } from "@/schemas/testimony";

/** Server Action */
import { store } from "@/actions/testimonials";

export default function StoreTestimonyForm() {
  const [success, setOnSuccess] = useState<string | undefined>("");
  const [error, setOnError] = useState<string | undefined>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<z.infer<typeof StoreTestimonySchema>>({
    defaultValues: {
      testimony: "",
      testimoner_name: "",
      last_graduate_at: "",
      now_studied_at: "",
      image: undefined,
    },
    resolver: zodResolver(StoreTestimonySchema),
  });

  const onSubmit = (data: z.infer<typeof StoreTestimonySchema>) => {
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

        const response = await store(formData);

        setOnSuccess(response?.success);
        setOnError(response?.error);

        setImagePreview(null);
        reset();
      } catch (error) {
        setOnError("Terjadi kesalahan");
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
        {/* Form Control Testimony */}
        <FormControl mb="3" isInvalid={!!errors.testimony}>
          <FormLabel fontSize=".8rem">Testimoni</FormLabel>
          <Textarea
            placeholder="Masukkan testimoni"
            _placeholder={{ fontSize: 12 }}
            {...register("testimony")}
          ></Textarea>

          {errors.testimony && (
            <FormErrorMessage fontSize={12}>
              {errors.testimony.message}
            </FormErrorMessage>
          )}
        </FormControl>

        {/* Form Control Testimoner Name */}
        <FormControl mb="3" isInvalid={!!errors.testimoner_name}>
          <FormLabel fontSize=".8rem">Nama testimoner</FormLabel>
          <Input
            type="text"
            placeholder="Masukkan nama testimoner"
            _placeholder={{ fontSize: 12 }}
            {...register("testimoner_name")}
          />

          {errors.testimoner_name && (
            <FormErrorMessage fontSize={12}>
              {errors.testimoner_name.message}
            </FormErrorMessage>
          )}
        </FormControl>

        {/* Form Control Last Graduate At */}
        <FormControl mb="3" isInvalid={!!errors.last_graduate_at}>
          <FormLabel fontSize=".8rem">Tempat pendidikan sebelum</FormLabel>
          <Input
            type="text"
            placeholder="Masukkan tempat pendidikan terakhir testimoner"
            _placeholder={{ fontSize: 12 }}
            {...register("last_graduate_at")}
          />

          {errors.last_graduate_at && (
            <FormErrorMessage fontSize={12}>
              {errors.last_graduate_at.message}
            </FormErrorMessage>
          )}
        </FormControl>

        {/* Form Control Now Studied At */}
        <FormControl mb="3" isInvalid={!!errors.now_studied_at}>
          <FormLabel fontSize=".8rem">Tempat pendidikan saat ini</FormLabel>
          <Input
            type="text"
            placeholder="Masukkan tempat pendidikan yang sedang ditempuh"
            _placeholder={{ fontSize: 12 }}
            {...register("now_studied_at")}
          />

          {errors.now_studied_at && (
            <FormErrorMessage fontSize={12}>
              {errors.now_studied_at.message}
            </FormErrorMessage>
          )}
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
          <PrimaryButton type="submit" disabled={isPending}>
            <FaRegFloppyDisk />
            <span className="ms-2">Tambah testimoni</span>
          </PrimaryButton>
          <SecondaryButton href="/pages/landing-page" disabled={isPending}>
            <MdKeyboardBackspace />
            <span className="ms-2">Kembali</span>
          </SecondaryButton>
        </Flex>
      </form>
    </>
  );
}
