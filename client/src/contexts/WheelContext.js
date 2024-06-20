import React, { createContext, useEffect, useState } from 'react';
import { useError } from '../hooks/useError';

export const WheelContext = createContext();

export const WheelProvider = ({ children }) => {

	const [cells, setCells] = useState([]);
	const [lastUpdate, setLastUpdate] = useState();
	const [goal, setGoal] = useState();
	
	const { showError, showWarning } = useError();

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('/cells');
			if (response.ok)
			{
				const data = await response.json();
				setCells(data.cells);
				setLastUpdate(data.lastUpdate);
			}
			else
				showError("Couldn't fetch cells. Please try again later.");
		};
		fetchData();
	}, []);

	const getGoal = async () => {
		const response = await fetch(`/goal/${lastUpdate}`);
		if (response.ok)
		{
			const data = await response.json();
			setGoal(data);
			return data;
		}
		else if (response.status === 409)
		{
			showWarning("Wheel may have changed... Please refresh the page.");
		}
		else
			showError("Couldn't fetch goal. Please try again later.");
		return null;
	}

	const [reward, setReward] = useState(null);

	return (
		<WheelContext.Provider value={{ cells, getGoal, goal, reward, setReward }}>
			{children}
		</WheelContext.Provider>
	);
};