import { z } from "zod";

export const StoreActivitySchema = z.object({
  activities: z
    .array(
      z
        .custom<File>()
        .refine((file) => file.size <= 2 * 1024 * 1024, {
          message: "Maksimal ukuran foto aktifitas adalah 2 MB.",
        })
        .refine((file) => file.type.startsWith("image"), {
          message: "Hanya boleh mengirimkan foto.",
        }),
    )
    .min(1, { message: "Minimal satu file harus diunggah." }),
});
