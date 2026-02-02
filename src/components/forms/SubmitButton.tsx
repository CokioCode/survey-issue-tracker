import Image from "next/image";

import { Button } from "@/components/ui/button";

interface ButtonProps {
  isLoading: boolean;
  isValid?: boolean;
  className?: string;
  children: React.ReactNode;
  form?: string;
}

export const SubmitButton = ({
  isLoading,
  isValid,
  className,
  children,
  form,
}: ButtonProps) => {
  return (
    <Button
      form={form}
      type="submit"
      disabled={isLoading || !isValid}
      className={className ?? "shad-primary-btn w-full"}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
