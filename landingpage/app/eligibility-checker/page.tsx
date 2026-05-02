'use client'
import React from "react";
import EligibilityQuizPage from "@/components/quiz/Hero";
import { usePathname } from "next/navigation";

const Page = () => {
const pathname = usePathname();
  return (
    <main className="pt-[80px]"> 
      <EligibilityQuizPage  key={pathname}/>
    </main>
  );
};

export default Page;
