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
        <main className="relative flex flex-col min-h-screen bg-white"> 
            <Navbar />
            <HeroSection />

            <div className="container mx-auto px-10 py-4 max-w-[1400px]">
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
