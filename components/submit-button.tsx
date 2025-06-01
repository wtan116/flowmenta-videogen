"use client";

import { Button } from "@/components/ui/button";
import { type ComponentProps, useState } from "react";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  onClick,
  ...props
}: Props) {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      setIsPending(true);
      try {
        await onClick(e);
      } finally {
        setIsPending(false);
      }
    }
  };

  return (
    <Button 
      type="submit" 
      aria-disabled={isPending} 
      onClick={handleClick}
      {...props}
    >
      {isPending ? pendingText : children}
    </Button>
  );
}
