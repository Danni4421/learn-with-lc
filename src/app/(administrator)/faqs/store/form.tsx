"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState, useTransition } from "react";

/** Components */
import { FaRegFloppyDisk } from "react-icons/fa6";
import { MdKeyboardBackspace } from "react-icons/md";
import DismissableAlert from "@/components/ui/alerts/dismissable-alert";
import PrimaryButton from "@/components/ui/buttons/primary";
import SecondaryButton from "@/components/ui/buttons/secondary";
import { Editor } from "@/components/tiptap";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";

/** Server Actions */
import { store } from "@/actions/faqs";

/** Schemas */
import { StoreFAQSchema } from "@/schemas/faq";

export default function StoreQuestionForm() {
  const [success, setOnSuccess] = useState<string | undefined>("");
  const [error, setOnError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<z.infer<typeof StoreFAQSchema>>({
    defaultValues: {
      question: "",
      answer: "",
    },
    resolver: zodResolver(StoreFAQSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof StoreFAQSchema>> = (
    data,
    event
  ) => {
    event?.preventDefault();

    setOnSuccess("");
    setOnError("");

    try {
      startTransition(async () => {
        const response = await store(data);

        setOnSuccess(response?.success);
        setOnError(response?.error);

        if (response?.success) {
          reset();
        }
      });
    } catch (error) {
      setOnError("Terjadi kesalahan");
    }

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
        {/* Form Control Question */}
        <FormControl mb="3" isInvalid={!!errors.question}>
          <FormLabel fontSize=".8rem">Pertanyaan</FormLabel>
          <Textarea
            placeholder="Masukkan testimoni"
            _placeholder={{ fontSize: 12 }}
            autoFocus={false}
            {...register("question")}
          ></Textarea>

          {errors.question && (
            <FormErrorMessage fontSize={12}>
              {errors.question.message}
            </FormErrorMessage>
          )}
        </FormControl>

        {/* Editor Answer */}
        <FormControl isInvalid={!!errors.answer}>
          <FormLabel fontSize=".8rem">Jawaban</FormLabel>

          <Editor
            content={getValues().answer}
            setContent={(html) => setValue("answer", html)}
            placeholder="Masukkan jawaban pertanyaan"
          />

          {errors.answer && (
            <FormErrorMessage fontSize={12}>
              {errors.answer.message}
            </FormErrorMessage>
          )}
        </FormControl>

        <Flex gap="2" mt="6">
          <PrimaryButton type="submit" disabled={isPending}>
            <FaRegFloppyDisk />
            <span className="ms-2">Tambah testimoni</span>
          </PrimaryButton>
          <SecondaryButton href="/pages/landing-page">
            <MdKeyboardBackspace />
            <span className="ms-2">Kembali</span>
          </SecondaryButton>
        </Flex>
      </form>
    </>
  );
}
