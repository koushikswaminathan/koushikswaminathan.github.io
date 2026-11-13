"use client";

// The address is assembled on click so it never appears in the static HTML,
// which keeps it away from simple scrapers while still being clickable.
const user = "koushik.swaminathan";
const domain = "protonmail.com";

export default function EmailLink({ className, label }: { className?: string; label?: string }) {
  return (
    <a
      className={className}
      href="#contact"
      aria-label={`Email ${user.replace(".", " dot ")} at ${domain.replace(".", " dot ")}`}
      onClick={(event) => {
        event.preventDefault();
        window.location.href = `mailto:${user}@${domain}`;
      }}
    >
      {label ?? "koushik [dot] swaminathan [at] protonmail [dot] com"}
    </a>
  );
}
