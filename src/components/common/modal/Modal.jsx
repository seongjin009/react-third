import './Modal.scss';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { close } from '../../../redux/modalSlick';
import { AnimatePresence, motion } from 'framer-motion';

const Modal = ({ children }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		document.body.style.overflow = 'hidden';

		return () => {
			document.body.style.overflow = 'auto';
		};
	}, []);

	return (
		<AnimatePresence>
			<motion.aside
				className='modal'
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
			>
				<div className='con'>{children}</div>
				<span onClick={() => dispatch(close())}>close</span>
			</motion.aside>
		</AnimatePresence>
	);
};
export default Modal;
