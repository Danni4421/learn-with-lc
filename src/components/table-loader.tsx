import clsx from "clsx";

interface TableLoaderProps {
  className?: string;
}

export default function TableLoader({ className = "" }: TableLoaderProps) {
  return <span className={clsx("table-loader", className)}></span>;
}
