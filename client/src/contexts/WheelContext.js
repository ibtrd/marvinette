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
	const { showError, showWarning } = useError();

	useEffect(() => {
		if (me && me.lastReward && me.lastReward.nextSpin > Date.now())
		{
			handleReward(me.lastReward);
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
			else
				showError("Couldn't fetch cells. Please try again later.");
		};
		fetchData();
	}, []);

	const getGoal = async () => {
		if (goal)
			return;
		setReward(null);
		const response = await fetch(`/wheel/goal/${hash}`);
		if (response.ok)
		{
			const data = await response.json();
			setGoal(data);
			console.log('goal', data);
			return data;
		}
		else if (response.status === 409)
			showWarning("Wheel may have changed... Please refresh the page.");
		else
			showError("Couldn't fetch goal. Please try again later.");
		return null;
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