"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Filter from "./Filter";

const FilterPanel = () => {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  if (isMobile) {
    return (
      <div className="w-full">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between text-sm sm:text-base bg-[#FFFCF7] border-stone-200"
            >
              Фильтры
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[92vw] max-w-md max-h-[85vh] overflow-y-auto px-4 pb-6 pt-5 sm:px-6">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">
                Фильтрация
              </DialogTitle>
            </DialogHeader>
            <Filter showTitle={false} className="pt-2" />
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="w-full md:w-[200px] lg:w-[250px] shrink-0">
      <Filter />
    </div>
  );
};

export default FilterPanel;
