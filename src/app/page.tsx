import { HeroSlider } from "@/components/home/HeroSlider";
import { BentoCategories } from "@/components/home/BentoCategories";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { ShoppableInterior } from "@/components/home/ShoppableInterior";
import { Advantages } from "@/components/home/Advantages";
import { PromoBlock } from "@/components/home/PromoBlock";
import { StatsCounter } from "@/components/home/StatsCounter";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-0">
      <HeroSlider />
      <AnimateOnScroll><BentoCategories /></AnimateOnScroll>
      <AnimateOnScroll><ProductCarousel /></AnimateOnScroll>
      <AnimateOnScroll><ShoppableInterior /></AnimateOnScroll>
      <AnimateOnScroll><Advantages /></AnimateOnScroll>
      <StatsCounter />
      <AnimateOnScroll><PromoBlock /></AnimateOnScroll>
    </main>
  );
}
