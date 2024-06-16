import Roulette from "../components/roulette/Roulette";
import '../App.css'
import RoulettePointer from "../components/roulette/RoulettePointer";

export default function Home() {

  return (
    <div className='Home'>
      <Roulette />
      <RoulettePointer />
    </div>
    
  );
}
