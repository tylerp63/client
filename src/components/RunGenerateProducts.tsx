"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { createProduct, runScraper } from "@/app/dashboard/actions";
import { startTransition, useTransition } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { cn } from "@/lib/utils";

export default function RunGenerateProducts() {
  const [isPending, startTransition] = useTransition();
  function handleClick() {
    startTransition(async () => {
      const data = await runScraper();
      const result = await createProduct(
        data.productName,
        data.price,
        data.boughtPastMonth,
        data.imageSrc
      );
    });
  }

  return (
    <div>
      <Button onClick={handleClick}>
        Generate Products
        <AiOutlineLoading3Quarters
          className={cn("animate-spin ", { hidden: !isPending })}
        />
      </Button>
    </div>
  );
}
