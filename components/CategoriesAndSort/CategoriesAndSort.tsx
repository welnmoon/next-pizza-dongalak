"use client";

import { useHeaderVisibility } from "@/context/HeaderVisibilityContext";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProductCategoriesTab from "./ProductCategoriesTab";
import Container from "../Container";
import Sort from "./Sort";

const CategoriesAndSort = () => {
  const { showMiniLogo } = useHeaderVisibility();

  return (
    <div className="sticky top-0 bg-[#F7F3EE]/90 backdrop-blur py-4 sm:py-5 z-10 border-b border-stone-200 w-full mb-6 sm:mb-10">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between transition-all duration-300">
        <div className="flex items-center gap-2 w-full sm:flex-1">
          <AnimatePresence>
            {showMiniLogo && (
              <motion.div
                key="mini-logo"
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Image src="/pizzaIcon.png" alt="Logo" width={32} height={32} />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            layout
            className="w-full"
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: showMiniLogo ? 20 : 0 }}
            exit={{ opacity: 0, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCategoriesTab />
          </motion.div>
        </div>

        <Sort />
      </Container>
    </div>
  );
};

export default CategoriesAndSort;
