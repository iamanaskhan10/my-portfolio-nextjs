import Link from "next/link";

/** One CTA treatment for native buttons, section anchors, and page links. */
export default function PortfolioButton({ href, size, variant = "primary", className = "", children, ...props }) {
  const Component = href ? (href.startsWith("/") && !props.download && !props.target ? Link : "a") : "button";
  return <Component {...props} {...(href ? { href } : { type: props.type || "button" })}
    className={`portfolio-button${size ? ` portfolio-button--${size}` : ""} portfolio-button--${variant} ${className}`}>
    {children}
  </Component>;
}
