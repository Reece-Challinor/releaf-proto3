import { Header } from "@/components/Header";
import { StateSelector } from "@/components/StateSelector";
import { AutomationDemo } from "@/components/AutomationDemo";
import { SecondaryFeatures } from "@/components/SecondaryFeatures";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StateSelector />
        <AutomationDemo />
        <SecondaryFeatures />
      </main>
      
      <Footer />
    </div>
  );
}
