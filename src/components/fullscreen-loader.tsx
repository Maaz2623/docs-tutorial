import { LoaderIcon } from "lucide-react";

interface FullscreenLoaderProps {
  label?: string;
}

export const FullscreenLoader = ({ label }: FullscreenLoaderProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
      <LoaderIcon className="size-6 text-muted-foreground animate-spin text-green-600" />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
};
