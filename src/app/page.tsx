import { HeroSlider } from "@/components/home/HeroSlider";
import { BentoCategories } from "@/components/home/BentoCategories";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { ShoppableInterior } from "@/components/home/ShoppableInterior";
import { Advantages } from "@/components/home/Advantages";
import { PromoBlock } from "@/components/home/PromoBlock";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-0">
      <HeroSlider />
      <BentoCategories />
      <ProductCarousel />
      <ShoppableInterior />
      <Advantages />
      <PromoBlock />
    </main>
  );
}
