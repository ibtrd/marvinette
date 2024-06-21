import {
  Button,
} from '@chakra-ui/react'
import './RewardModal.css'
import { useSpring, animated, easings } from 'react-spring';
import { useEffect, useState } from 'react';

export default function RewardModal({onClose, reward}) {

  const nextSpin = Date.now() + 120000;
	const [time, setTime] = useState(nextSpin - Date.now());

	useEffect(() => {
		const timer = setInterval(() => {
			if (nextSpin - Date.now() <= 0)
			{
				setTime(0);
				clearInterval(timer);
			}
			else{
				setTime(nextSpin - Date.now());
			}
		}, 500);
		return () => {
			clearInterval(timer);
		}
	}, []);

	const [spring, api] = useSpring(() => ({
    from: {
      scale: 0
    },
    to: {
      scale: 1
    },
    config: {
      duration: 200,
      ease: easings.easeInOutExpo,
    }
  }));

  const onClick = () => {
    if (time > 0)
      return;
    api.start({
			from: {
				scale: 1,
			},
			to: {
				scale: 0,
			},
			config: {
				duration: 200,
			},
			onRest: () => {
				onClose();
			}
    });
  }

	return (
        <animated.div div className='RewardModal' style={{...spring}}>
          <div>
            <img src={reward.img} alt={reward.alt} />
            <p>{reward.description}</p>
          </div>
          <Button
            colorScheme='blue' onClick={() => onClick()}
            boxShadow='0 0 10px rgba(0, 0, 0, 0.1)'
            bg={time > 0 ? 'blue.800' : 'blue.500'}
          >
            {time > 0 ?
              Math.floor(time / 1000 / 60).toString().padStart(2, '0') + ':' + Math.floor(time / 1000 % 60).toString().padStart(2, '0')
            : 'Close'}
          </Button>
        </animated.div>
	);
  }

