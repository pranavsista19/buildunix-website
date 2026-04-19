export default function BrandWordmark({
  as: Tag = "span",
  className = "",
  unixClassName = "",
  ...props
}) {
  const rootClassName = ["brandWordmark", className].filter(Boolean).join(" ");
  const unixClasses = ["brandWordmarkUnix", unixClassName].filter(Boolean).join(" ");

  return (
    <Tag className={rootClassName} {...props}>
      <span className="brandWordmarkBuild">Build</span>
      <span className={unixClasses}>UNIX</span>
    </Tag>
  );
}
