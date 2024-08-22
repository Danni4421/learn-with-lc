"use client";

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  useDisclosure,
} from "@chakra-ui/react";

interface DismissableAlertProps {
  status: "success" | "info" | "loading" | "error" | "warning";
  title: string;
  description: string;
}

export default function DismissableAlert({
  status = "success",
  title,
  description,
}: DismissableAlertProps) {
  const { isOpen: isVisible, onClose } = useDisclosure({ defaultIsOpen: true });

  return (
    isVisible && (
      <Alert status={status} rounded="lg" mt="3">
        <AlertIcon />
        <Box>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Box>
        <CloseButton
          alignSelf="flex-start"
          position="absolute"
          right={1.5}
          top={1.5}
          onClick={onClose}
        />
      </Alert>
    )
  );
}
