import { useEffect, useState } from 'react';

export const useMedia = (mobile = 640, tablet = 1000, laptop = 1400) => {
	const [Type, setType] = useState('');

	const getClientWid = () => {
		let wid = window.innerWidth;
		if (wid >= tablet && wid < laptop) setType('laptop');
		if (wid >= mobile && wid < tablet) setType('tablet');
		if (wid >= 0 && wid < mobile) setType('mobile');
	};

	useEffect(() => {
		getClientWid();
		window.addEventListener('resize', getClientWid);

		return () => window.removeEventListener('resize', getClientWid);
	}, []);
	return Type;
};
