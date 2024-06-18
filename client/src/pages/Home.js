import Roulette from "../components/roulette/Roulette";
import '../App.css'
import RoulettePointer from "../components/roulette/RoulettePointer";
import { useEffect, useState } from "react";
import RouletteFooter from "../components/roulette/RouletteFooter";

export default function Home() {

  const [cells, setCells] = useState([])
  const [lastUpdate, setLastUpdate] = useState([])
  const [goal, setGoal] = useState([])
  
	useEffect(() => {
    // try {
    //   fetch(`http://localhost:4000/session/status`,
    //     {
    //       credentials: 'include',
    //     }
    //   )
    //   .then(async (res) => {
    //     if(res.status === 200)
    //     {
    //       const status = (await res.json()).loggedIn;
    //       console.log(status);
    //       if (false === status)
    //         {
    //           window.location.replace(`/login`);
    //           return ;
    //         }
    //     }
    //   })
    // } catch (err) {
    //   console.log(err);
    // }
		fetch('/cells')
    .then(async (res) => {
      if (res.status === 200)
      {
        const cells = await res.json();
        console.log(cells)
        setCells(cells.cells);
        setLastUpdate(cells.lastUpdate);
      }
      else
        console.error('Error')
    })
	}, []);

  return (
    <div className='Home'>
      <Roulette cells={cells} goal={goal}
        setGoal={setGoal} lastUpdate={lastUpdate}
      />
      <RoulettePointer />
      <RouletteFooter />
    </div>
    
  );
}
