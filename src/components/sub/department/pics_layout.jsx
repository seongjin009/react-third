import './pics_layout.scss';
import { useEffect } from 'react';

const Pics = ({ children, setIsPics }) => {
	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);
	return (
		<aside className='Pics'>
			<div className='con'>{children}</div>
			<span onClick={() => setIsPics(false)}>close</span>
		</aside>
	);
};
export default Pics;
