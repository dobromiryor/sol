interface SkipToContentProps {
  destination: string;
  href: string;
}

export const SkipToContent = ({ href, destination }: SkipToContentProps) => {
  return (
    <a
      href={href}
      className="fixed bottom-2 right-2 p-2 rounded-lg bg-primary transition-opacity opacity-0 focus:opacity-100 pointer-events-none focus:pointer-events-auto z-10"
    >
      Skip to {destination}
    </a>
  );
};
