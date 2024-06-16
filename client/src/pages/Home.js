import Roulette from "../components/roulette/Roulette";
import '../App.css'
import RoulettePointer from "../components/roulette/RoulettePointer";
import { useEffect, useState } from "react";

export default function Home() {

  const [cells, setCells] = useState([])
  const [lastUpdate, setLastUpdate] = useState([])
  const [goal, setGoal] = useState([])

	useEffect(() => {
		fetch('http://localhost:4000/cells')
    .then(async (res) => {
      if (res.status === 200)
      {
        const cells = await res.json();
        setCells(cells.cells);
        setLastUpdate(cells.lastUpdate);
      }
      else
        console.error('Error')
    })
	}, []);


  return (
    <div className='Home'>
      <Roulette cells={cells} goal={goal} setGoal={setGoal} lastUpdate={lastUpdate}/>
      <RoulettePointer />
    </div>
    
  );
}
