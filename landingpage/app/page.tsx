import React from 'react'
import HeroSection from '@/components/Homepage/Herosection'
import MisconceptionsSection from '@/components/Homepage/Critical'
import StudentFinanceSection from '@/components/Homepage/StudentFinance'
import SimpleStepsSection from '@/components/Homepage/Steps'
import TestimonialsSection from '@/components/Homepage/Reviews'
import ThisIsForYouSection from '@/components/Homepage/Thisforyou'
import FAQSection from '@/components/Homepage/FAQ'
import CTASection from '@/components/Homepage/Cta'
import RepaymentsSection from '@/components/Homepage/Repay'
import TrustedProviders from '@/components/Homepage/Partners'


const page = () => {
  return (
    <main>
      <HeroSection/>
      <MisconceptionsSection/>
      <StudentFinanceSection/>
      <RepaymentsSection/>
      <SimpleStepsSection/>
      <TestimonialsSection/>
      <ThisIsForYouSection/>
      <TrustedProviders/>
      <FAQSection/>
      <CTASection/>
      
    </main>
  )
}

export default page