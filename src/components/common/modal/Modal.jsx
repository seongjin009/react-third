import './Modal.scss';
import { useEffect } from 'react';
import { useGlobalData } from '../../../hooks/useGlobalContext';
import { AnimatePresence, motion } from 'framer-motion';

const Modal = ({ children }) => {
	const { ModalOpen, setModalOpen } = useGlobalData();
	useEffect(() => {
		ModalOpen ? (document.body.style.overflow = 'hidden') : (document.body.style.overflow = 'auto');
	}, [ModalOpen]);
	return (
		<AnimatePresence>
			{ModalOpen && (
				<motion.aside
					className='modal'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
				>
					<div className='con'>{children}</div>
					<span onClick={() => setModalOpen(false)}>close</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
};
export default Modal;
