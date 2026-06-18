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
    <div className={`mb-8 max-w-3xl sm:mb-12 ${alignClass}`}>
      {eyebrow && (
        <p className="mb-2 text-sm font-medium tracking-wide text-cube-gold sm:mb-3">
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-2xl font-bold sm:text-3xl md:text-4xl ${
          light ? "text-white" : "text-cube-navy"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-base leading-relaxed sm:mt-4 sm:text-lg ${
            light ? "text-white/85" : "text-cube-body"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
