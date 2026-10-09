/** Consistent display typography without changing a section's semantics. */
export default function SectionHeading({ as: Tag = "h2", className = "", children, ...props }) {
  return <Tag {...props} className={`portfolio-heading ${className}`}>{children}</Tag>;
}
