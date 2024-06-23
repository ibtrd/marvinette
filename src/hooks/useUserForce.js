import { useEffect, useState } from "react";
import { useError } from "./useError";

export const useUserForce = () => {
	
	const [cells, setCells] = useState([]);
	const {showError, showSuccess} = useError();

	useEffect(() => {
		const fetchCells = async () => {
			const response = await fetch('/admin/cells');
			const data = await response.json();
			setCells(data.cells);
		};
		fetchCells();
	}, []);

	const forceUser = async (login, cell) => {
		const res = await fetch('/admin/force', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ login, index: cell.id})
		});
		if (res.ok)
			showSuccess('User forced : ' + login + ' ' + cell.name);
		else
			showError('Error forcing user : ' + login);
	}

	return [ cells, forceUser ];
};