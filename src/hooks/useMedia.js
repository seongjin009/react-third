import { useEffect, useRef } from 'react';

export const useMedia = () => {
	const device = useRef('');
	const getClientWid = () => {
		let wid = window.innerWidth;
		if (wid >= 1000 && wid < 1400) return 'laptop';
		if (wid >= 640 && wid < 1000) return 'tablet';
		if (wid < 640) return ' mobile';
	};
	useEffect(() => {
		window.addEventListener('resize', () => getClientWid);
	}, []);
	return device.current;
};
