import { Button, ButtonProps as ChakraButtonProps } from "@chakra-ui/react";

interface ButtonProps extends ChakraButtonProps {
  href?: string;
  children: React.ReactNode;
}

export default function SuccessButton({
  children,
  href,
  ...rest
}: ButtonProps) {
  const defaultClassName =
    "bg-green-200 hover:bg-green-400 text-green-500 hover:text-white bg-opacity-50 text-xs";

  if (href !== undefined) {
    return (
      <Button {...rest} as="a" href={href} className={defaultClassName}>
        {children}
      </Button>
    );
  }

  return (
    <Button {...rest} as="button" className={defaultClassName}>
      {children}
    </Button>
  );
}
