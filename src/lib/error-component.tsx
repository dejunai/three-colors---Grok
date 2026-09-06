import type { ErrorComponentProps } from "@tanstack/react-router";
import { TriangleAlert } from "lucide-react";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-ink px-6 text-center text-bone">
      <span className="text-lantern" aria-hidden="true">
        <TriangleAlert className="size-10" strokeWidth={2} />
      </span>
      <h1 className="font-display text-lg tracking-wide text-paper">A fault in the record</h1>
      <p className="max-w-md text-sm break-words text-fog">
        {error.message || "An unexpected error occurred. Reload and begin again."}
      </p>
    </main>
  );
}
