import BrandWordmark from "@/components/BrandWordmark";

const BRAND_REGEX = /(BuildUNIX|BuildUnix)/g;

export default function BrandText({
  text,
  wordmarkClassName = "",
  unixClassName = ""
}) {
  if (typeof text !== "string") {
    return text;
  }

  const parts = text.split(BRAND_REGEX);

  return parts.map((part, index) => {
    if (!part) {
      return null;
    }

    if (part === "BuildUNIX" || part === "BuildUnix") {
      return (
        <BrandWordmark
          key={`brand-${index}`}
          className={wordmarkClassName}
          unixClassName={unixClassName}
        />
      );
    }

    return (
      <span key={`text-${index}`} className="brandTextChunk">
        {part}
      </span>
    );
  });
}
