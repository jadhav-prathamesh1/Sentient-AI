import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { FeaturesSection } from "@/components/home/features-section";
import { AboutSection } from "@/components/home/about-section";
import { TrustSection } from "@/components/home/trust-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
}