import React, { createContext, useContext, useEffect, useState } from 'react';
import { useError } from '../hooks/useError';
import { ProfileContext } from "../contexts/ProfileContext";

export const WheelContext = createContext();

export const WheelProvider = ({ children }) => {

	const [cells, setCells] = useState([]);
	const [hash, sethash] = useState();
	const [goal, setGoal] = useState();
	const [reward, setReward] = useState(null);

	const { showError, showWarning } = useError();
	const {setLastReward, setNextSpin} = useContext(ProfileContext);

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
		setReward(null);
		const response = await fetch(`/wheel/goal/${hash}`);
		if (response.ok)
		{
			const data = await response.json();
			setGoal(data);
			setLastReward(data);
			setNextSpin(data.nextSpin)
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

	return (
		<WheelContext.Provider value={{ cells, getGoal, goal, reward, setReward }}>
			{children}
		</WheelContext.Provider>
	);
};