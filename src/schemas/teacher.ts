import { z } from "zod";

export const StoreTeacherSchema = z.object({
  name: z
    .string({
      message: "Nama guru harus berupa karakter.",
    })
    .min(1, "Nama guru wajib diisi."),
  gender: z.enum(["lk", "pr"], {
    message: "Gender guru antara laki laki atau perempuan",
  }),
  role: z
    .string({
      message: "Peran guru harus berupa karakter.",
    })
    .min(1, {
      message: "Peran guru wajib diisi.",
    }),
  last_graduate_at: z
    .string({
      message: "Tempat pendidikan terakhir guru harus berupa karakter.",
    })
    .min(1, {
      message: "Tempat pendidikan terakhir guru wajib diisi.",
    }),
  image: z
    .custom<File>()
    .optional()
    .refine((file) => !file || (!!file && file.size <= 1 * 1024 * 1024), {
      message: "Maksimal ukuran foto guru adalah 1MB.",
    })
    .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
      message: "Hanya boleh menambahkan gambar.",
    }),
});

export const PutTeacherSchema = z.object({
  name: z
    .string({
      message: "Nama guru harus berupa karakter.",
    })
    .min(1, "Nama guru wajib diisi."),
  gender: z.string(
    z.enum(["lk", "pr"], {
      message: "Gender guru antara laki laki atau perempuan",
    })
  ),
  role: z
    .string({
      message: "Peran guru harus berupa karakter.",
    })
    .min(1, {
      message: "Peran guru wajib diisi.",
    }),
  last_graduate_at: z
    .string({
      message: "Tempat pendidikan terakhir guru harus berupa karakter.",
    })
    .min(1, {
      message: "Tempat pendidikan terakhir guru wajib diisi.",
    }),
  image: z
    .custom<File>()
    .refine((file) => !file || (!!file && file.size <= 1 * 1024 * 1024), {
      message: "Maksimal ukuran foto guru adalah 1MB.",
    })
    .refine((file) => !file || (!!file && file.type?.startsWith("image")), {
      message: "Hanya boleh menambahkan gambar.",
    }),
});
