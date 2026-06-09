type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "start";
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-start";

  return (
    <div className={`max-w-3xl mb-12 ${alignClass}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-medium tracking-wide text-cube-gold">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl font-bold md:text-4xl ${
          light ? "text-white" : "text-cube-navy"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-white/85" : "text-cube-body"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
