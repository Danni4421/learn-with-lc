"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

type NavLinkProps = {
  href?: string;
  active: boolean | Function;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function NavLink({
  href,
  active = false,
  onClick: handleOnClick,
  children,
}: NavLinkProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (typeof active === "boolean") {
      setIsActive(active);
    } else if (typeof active === "function") {
      const result = active();
      setIsActive(result);
    }
  }, [active]);

  const commonClass = clsx(
    "inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none cursor-pointer hover:border-b-2 hover:border-indigo-600",
    isActive && "border-b-2 border-indigo-600"
  );

  if (href) {
    return (
      <Link
        href={href}
        className={commonClass}
        onClick={() => {
          if (handleOnClick) handleOnClick();
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <span
      className={commonClass}
      onClick={() => {
        if (handleOnClick) handleOnClick();
      }}
    >
      {children}
    </span>
  );
}
