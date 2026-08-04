import heroImage from "../../assets/images/hero.png";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section
      className="relative h-[650px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55"></div>

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-6">
        <HeroContent />
      </div>
    </section>
  );
}