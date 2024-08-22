interface HeadingProps {
  head?: string;
  subhead: string;
  id?: string;
  className?: string;
}

export default function Heading({
  head,
  subhead,
  id,
  className = "",
}: HeadingProps) {
  return (
    <div
      id={id}
      className={`font-default font-bold text-center mt-16 mb-6 w-full md:w-3/5 mx-auto ${className}`}
    >
      <span className="text-indigo-700 text-sm lg:text-lg">{head}</span>
      <p className="text-xl lg:text-2xl">{subhead}</p>
    </div>
  );
}
