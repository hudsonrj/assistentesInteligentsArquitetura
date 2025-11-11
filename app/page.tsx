import Hero from "@/components/sections/Hero";
import DeliveryFormats from "@/components/sections/DeliveryFormats";
import PricingModels from "@/components/sections/PricingModels";
import Providers from "@/components/sections/Providers";
import Architecture from "@/components/sections/Architecture";
import BusinessModels from "@/components/sections/BusinessModels";
import Sectors from "@/components/sections/Sectors";
import ChatDemo from "@/components/sections/ChatDemo";
import Simulator from "@/components/sections/Simulator";

export default function Home() {
  return (
    <>
      <Hero />
      <DeliveryFormats />
      <PricingModels />
      <Providers />
      <Architecture />
      <BusinessModels />
      <Sectors />
      <Simulator />
      <ChatDemo />
    </>
  );
}

