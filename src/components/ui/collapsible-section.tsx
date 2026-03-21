"use client";

interface CollapsibleSectionProps {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function CollapsibleSection({
  title,
  description,
  defaultOpen = false,
  children,
}: CollapsibleSectionProps) {
  return (
    <details open={defaultOpen || undefined} className="group">
      <summary className="cursor-pointer list-none select-none">
        <div className="flex items-center gap-2">
          <span
            className="text-muted-foreground transition-transform duration-200 group-open:rotate-90"
            aria-hidden="true"
          >
            &#9654;
          </span>
          <h2 className="text-xl sm:text-2xl font-semibold text-primary inline">
            {title}
          </h2>
        </div>
        {description && (
          <p className="mt-1 ml-6 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </summary>
      <div className="mt-3 space-y-3">{children}</div>
    </details>
  );
}
