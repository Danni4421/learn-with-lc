import { z } from "zod";

export const StoreProgramSchema = z.object({
  name: z
    .string({
      message: "Nama program harus berupa karakter.",
    })
    .min(1, {
      message: "Nama program wajib diisi.",
    }),
  description: z
    .string({
      message: "Deskripsi program harus berupa karakter.",
    })
    .min(1, {
      message: "Deskripsi program wajib diisi.",
    }),
  image: z
    .custom<File>()
    .refine((file) => !file || (!!file && file.size <= 1 * 1024 * 1024), {
      message: "Maksimal ukuran foto program adalah 1MB.",
    })
    .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
      message: "Hanya boleh menambahkan gambar.",
    }),
});

export const PutProgramSchema = z.object({
  name: z
    .string({
      message: "Nama program harus berupa karakter.",
    })
    .min(1, {
      message: "Nama program wajib diisi.",
    }),
  description: z
    .string({
      message: "Deskripsi program harus berupa karakter.",
    })
    .min(1, {
      message: "Deskripsi program wajib diisi.",
    }),
  image: z
    .custom<File>()
    .optional()
    .refine((file) => !file || (!!file && file.size <= 1 * 1024 * 1024), {
      message: "Maksimal ukuran foto program adalah 1MB.",
    })
    .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
      message: "Hanya boleh menambahkan gambar.",
    }),
});
