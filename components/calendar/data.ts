const date = new Date();
export const TODAY = `${date.getFullYear()}-${date.getMonth() + 1}-${`${date.getDate()}`.padStart(
	2,
	'0',
)}`;
