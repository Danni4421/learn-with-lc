"use client";

import { z } from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

/** Components */
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import ApplicationLogo from "@/components/logo";

/** Schemas */
import { LoginSchema } from "@/schemas/login";

/** Server Action */
import { login } from "@/actions/login";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function Page() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = ({ email, password }: z.infer<typeof LoginSchema>) => {
    setSuccess("");
    setError("");

    startTransition(async () => {
      try {
        const response = await login({ email, password });

        if (response?.error) {
          setError(response?.error);
        }

        if (response?.success) {
          router.push(DEFAULT_LOGIN_REDIRECT);
        }
      } catch (error) {
        setError("Gagal login");
      }
    });
  };

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2">
      <ApplicationLogo className="absolute w-28 top-8 left-8" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 px-24 min-h-screen justify-center"
      >
        <Box textAlign="center" marginBottom={5}>
          <Heading as="h2" fontSize={24}>
            Login
          </Heading>
          <Text fontSize={12}>
            Gunakan Email aktif Anda untuk login dan dapatkan manfaat belajar
          </Text>
        </Box>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel fontSize={12}>Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="Masukkan email Anda"
            _placeholder={{
              fontSize: 12,
            }}
            disabled={isPending}
            {...register("email")}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormLabel fontSize={12}>Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Masukkan password Anda"
            _placeholder={{
              fontSize: 12,
            }}
            disabled={isPending}
            {...register("password")}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600"
          fontSize={12}
          textColor="white"
          disabled={isPending}
        >
          Login
        </Button>
      </form>
      <Box
        bgColor="gray.100"
        className="hidden lg:flex items-center justify-center"
      >
        <Image
          src="../../images/login_ilustration.png"
          w={600}
          alt="Lentera Cendekia Login Image"
        />
      </Box>
    </main>
  );
}
