import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import StrengthsSection from "./components/StrengthsSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#fff]">
      <Navbar />
      <div className="container mt-24 mx-auto  px-4 py-4 max-w-6xl">
        <HeroSection />
        <AboutSection />
          <StrengthsSection />
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </main>
  );
}
