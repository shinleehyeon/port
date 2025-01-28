import type { NextPage } from 'next';
import HeroSection from "@/components/sections/hero/HeroSection";
import Navbar from "@/components/layout/navigation/Navbar";
import AboutSection from "@/components/sections/about/AboutSection";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import EmailSection from "@/components/sections/contact/EmailSection";
import Footer from "@/components/layout/Footer";
import StrengthsSection from "@/components/sections/strengths/StrengthsSection";

const Home: NextPage = () => {
    return (
        <main className="relative flex min-h-screen flex-col bg-[#fff]">
            <Navbar />
            <div className="container mx-auto px-10 py-4 max-w-6xl mt-[96px]">
                <HeroSection />
                <AboutSection />
                <StrengthsSection />
                <ProjectsSection />
                <EmailSection />
            </div>
            <Footer />
        </main>
    );
};

export default Home;