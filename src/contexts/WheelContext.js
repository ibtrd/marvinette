import React, { createContext, useContext, useEffect, useState } from 'react';
import { useError } from '../hooks/useError';
import { ProfileContext } from './ProfileContext';


export const WheelContext = createContext();

export const WheelProvider = ({ children }) => {

	const [cells, setCells] = useState([]);
	const [hash, sethash] = useState();
	const [goal, setGoal] = useState(null);
	const [reward, setReward] = useState(null);

	const { me } = useContext(ProfileContext);
	const { showError } = useError();

	useEffect(() => {
		if (me && me.nextSpin && me.nextSpin > Date.now())
		{
			handleReward({nextSpin: me.nextSpin});
		}
	}, [me]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/wheel/cells');
			if (response.ok)
			{
				const data = await response.json();
				setCells(data.cells);
				sethash(data.hash);
			}
			else {
				showError("Error, please try again later.");
			}
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getGoal = async () => {
		if (goal)
			return;
		setReward(null);
		const response = await fetch(`/wheel/goal/${hash}`);
		try {
			const data = await response.json();
			if (response.ok)
			{
				setGoal(data);
				return data;
			}
			else {
				showError(data.error);
			}
			return null;
		}
		catch (e) {
			window.location.reload();
		}
	}

	const handleReward = async (reward) => {
		setReward(reward);
		if (reward)
			setGoal(null);
	}

	return (
		<WheelContext.Provider value={{ cells, getGoal, goal, reward, setReward: handleReward }}>
			{children}
		</WheelContext.Provider>
	);
};