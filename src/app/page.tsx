import CarouselSection from "@/components/CarouselSection";
import HeroSection from "@/components/HeroSection";
import ImageSection from "@/components/ImageSection";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ImageSection />
      <CarouselSection />
    </>
  );
}
