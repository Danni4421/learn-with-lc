import clsx from "clsx";

type MobileNavLinkProps = {
  destination?: string;
  active: boolean;
  onClick?: () => void;
  children: React.ReactNode;
};

export default function MobileNavLink({
  destination = "#",
  active = false,
  onClick: handleOnClick,
  children,
}: MobileNavLinkProps) {
  return (
    <a
      href={destination}
      onClick={() => {
        if (handleOnClick) handleOnClick();
      }}
      className={clsx(
        "w-full flex items-start ps-3 pe-4 py-2 border-l-4",
        "text-base font-medium focus:outline-none transition duration-150 ease-in-out",
        active &&
          "border-indigo-400 text-indigo-700 bg-indigo-50 focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700",
        !active &&
          "border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300"
      )}
    >
      {children}
    </a>
  );
}
