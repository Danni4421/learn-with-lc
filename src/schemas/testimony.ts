import { z } from "zod";

export const StoreTestimonySchema = z.object({
  testimony: z
    .string({
      message: "Testimoni harus terdiri dari karakter.",
    })
    .min(1, {
      message: "Testimoni wajib diisi.",
    }),
  testimoner_name: z
    .string({
      message: "Nama testimoner harus terdiri dari karakter.",
    })
    .min(1, {
      message: "Nama testimoner wajib untuk diisi.",
    })
    .max(100, {
      message: "Nama testimoner maksimal 100 karakter.",
    }),
  last_graduate_at: z
    .string({
      message: "Tempat pendidikan terakhir harus berupa karakter.",
    })
    .min(1, {
      message: "Tempat pendidikan terakhir wajib diisi.",
    }),
  now_studied_at: z
    .string({
      message: "Tempat pendidikan saat ini harus berupa karakter.",
    })
    .min(1, {
      message: "Tempat pendidikan saat ini wajib diisi.",
    }),
  image: z
    .custom<File>()
    .optional()
    .refine((file) => !file || (!!file && file.size <= 3 * 1024 * 1024), {
      message: "Maksimal ukuran foto testimoner adalah 3 MB.",
    })
    .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
      message: "Hanya boleh menambahkan gambar.",
    }),
});

export const EditTestimonySchema = z.object({
  testimony: z
    .string({
      message: "Testimoni harus terdiri dari karakter.",
    })
    .min(1, { message: "Testimoni minimal harus 1 karakter." }),
  testimoner_name: z
    .string({
      message: "Nama testimoner harus terdiri dari karakter.",
    })
    .max(100, {
      message: "Nama testimoner maksimal 100 karakter.",
    }),
  last_graduate_at: z.string({
    message: "Tempat pendidikan terakhir harus berupa karakter.",
  }),
  now_studied_at: z.string({
    message: "Tempat pendidikan saat ini harus berupa karakter.",
  }),
  image: z
    .custom<File>()
    .optional()
    .refine((file) => !file || (!!file && file.size <= 3 * 1024 * 1024), {
      message: "Maksimal ukuran foto testimoner adalah 3 MB.",
    })
    .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
      message: "Hanya boleh menambahkan gambar.",
    }),
});
