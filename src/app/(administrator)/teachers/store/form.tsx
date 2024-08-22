"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";

/** Components */
import DismissableAlert from "@/components/ui/alerts/dismissable-alert";
import PrimaryButton from "@/components/ui/buttons/primary";
import SecondaryButton from "@/components/ui/buttons/secondary";
import { FaFileUpload } from "react-icons/fa";
import { FaRegFloppyDisk } from "react-icons/fa6";
import { MdKeyboardBackspace } from "react-icons/md";
import { PiGenderFemaleBold, PiGenderMaleBold } from "react-icons/pi";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";

/** Schemas */
import { PutTeacherSchema } from "@/schemas/teacher";

/** Server Action */
import { store } from "@/actions/teachers";

export default function EditTeacherForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm<z.infer<typeof PutTeacherSchema>>({
    defaultValues: {
      name: "",
      gender: "lk",
      role: "",
      last_graduate_at: "",
    },
    resolver: zodResolver(PutTeacherSchema),
  });

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [previewImage, setPreviewImage] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof PutTeacherSchema>> = (data) => {
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

        startTransition(async () => {
          const response = await store(formData);

          setError(response?.error);
          setSuccess(response?.success);

          if (!!response?.success) {
            reset();
            setPreviewImage("");
          }
        });
      } catch (error) {
        setError("Terjadi kesalahan.");
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
        {/* Form Control Name */}
        <FormControl mb="3" isInvalid={!!errors.name}>
          <FormLabel fontSize=".8rem">Nama tentor</FormLabel>

          <Input
            type="text"
            {...register("name")}
            placeholder="Masukkan nama pengajar"
          />

          {errors.name && (
            <FormErrorMessage fontSize={12}>
              {errors.name.message}
            </FormErrorMessage>
          )}
        </FormControl>

        {/* Form Control Gender */}
        <FormControl mb="3" isInvalid={!!errors.gender}>
          <FormLabel fontSize=".8rem">Jenis kelamin</FormLabel>

          <RadioGroup defaultValue="lk">
            <Stack spacing={4} direction="row">
              <Radio colorScheme="yellow" value="lk">
                <span className="w-8 h-8 bg-indigo-300/30 text-indigo-600 rounded-full flex justify-center items-center">
                  <PiGenderMaleBold />
                </span>
              </Radio>
              <Radio colorScheme="yellow" value="pr">
                <span className="w-8 h-8 bg-pink-300/30 text-pink-600 rounded-full flex justify-center items-center">
                  <PiGenderFemaleBold />
                </span>
              </Radio>
            </Stack>
          </RadioGroup>

          {errors.gender && (
            <FormErrorMessage fontSize={12}>
              {errors.gender.message}
            </FormErrorMessage>
          )}
        </FormControl>

        {/* Form Control Role */}
        <FormControl mb="3" isInvalid={!!errors.role}>
          <FormLabel fontSize=".8rem">Peran mengajar</FormLabel>

          <Input
            type="text"
            {...register("role")}
            placeholder="Masukkan peran mengajar"
          />

          {errors.role && (
            <FormErrorMessage fontSize={12}>
              {errors.role.message}
            </FormErrorMessage>
          )}
        </FormControl>

        {/* Form Control Last Graduate At */}
        <FormControl mb="3" isInvalid={!!errors.role}>
          <FormLabel fontSize=".8rem">
            Tempat pendidikan terakhir pengajar
          </FormLabel>

          <Input
            type="text"
            {...register("last_graduate_at")}
            placeholder="Masukkan tempat pendidikan terakhir pengajar"
          />

          {errors.last_graduate_at && (
            <FormErrorMessage fontSize={12}>
              {errors.last_graduate_at.message}
            </FormErrorMessage>
          )}
        </FormControl>

        {/* Upload Photo */}
        <Box className="max-w-full">
          <FormLabel fontSize=".8rem">Foto testimoner</FormLabel>

          <Flex alignItems="center" gap={4}>
            {previewImage && (
              <Image
                src={previewImage}
                className="my-3 w-48 h-48"
                alt="Preview for uploaded teacher image"
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
                    setPreviewImage(imageUrl);
                    setValue("image", image);
                  }
                }}
              />
            </FormLabel>
          </Flex>
          {errors.image && (
            <span className="text-red-500">{errors.image.message}</span>
          )}
        </Box>

        <Flex gap="2" mt="6">
          <PrimaryButton type="submit" disabled={isPending}>
            <FaRegFloppyDisk />
            <span className="ms-2">Tambah pengajar</span>
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
