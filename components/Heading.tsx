export default function Heading({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <h1
      className={`sub-heading font-medium font-FoundersGrotesk text-secondry ${className}`}
    >
      {/* {"Budget Ndio Story"} */}
			{title}
    </h1>
  );
}
