import { Hero } from "@/presentation/sections/Hero";
import Squares from "../presentation/components/Squares";


export default function Home() {
  return (
    <main className="w-screen h-screen relative">
      <Squares
        speed={0.5}
        direction={"right"}
        squareSize={40}
        borderColor={"#999"}
        hoverFillColor={"#222"}
      />
      <Hero />
    </main>
  );
}

