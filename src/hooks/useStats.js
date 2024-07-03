import { useEffect, useState } from "react";
import { useError } from "./useError";


export const useStats = () => {

	const [stats, setStats] = useState();
	const { showError } = useError();

	const getStats = async () => {
		const response = await fetch('/stats');
		if (response.ok) {
			const data = await response.json();
			setStats(data);
		} else {
			showError('Failed to fetch stats');
		}
	}

	useEffect(() => {
		getStats();
	}, []);

	return { stats };
};