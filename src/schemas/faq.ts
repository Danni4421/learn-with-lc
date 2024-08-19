import { z } from "zod";

export const StoreFAQSchema = z.object({
  question: z
    .string({
      message: "Pertanyaan harus terdiri dari karakter.",
    })
    .min(1, {
      message: "Pertanyaan wajib untuk diisi.",
    }),
  answer: z
    .string({
      message: "Jawaban harus terdiri dari karakter.",
    })
    .min(1, {
      message: "Jawaban wajib diisi.",
    }),
});

export const PutFAQSchema = z.object({
  question: z
    .string({
      message: "Pertanyaan harus terdiri dari karakter.",
    })
    .min(1, {
      message: "Pertanyaan wajib diisi.",
    }),
  answer: z
    .string({
      message: "Jawaban harus terdiri dari karakter.",
    })
    .min(1, {
      message: "Jawaban wajib diisi.",
    }),
});
