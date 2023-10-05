import './Modal.scss';
import { forwardRef, useImperativeHandle, useState } from 'react';
//forwardRef : forwaedRef(( props,ref)=>{})
//forwardRef안쪽에서 ref로 연결한 요소를 역으로 부모컴포넌트에 전달 가능 (자식 커뮤ㅗ넌트의 jsx요소를 부모로 전달)
//useImperativeHandle : 자식요소의 특정 객체값을 역으로 부모 컴포넌트에 전달

const Modal = forwardRef(({ children, setIsModal }, ref) => {
	const [Open, setOpen] = useState(false);
	useImperativeHandle(ref, () => {
		return { open: () => setOpen(true) };
	});
	return (
		<>
			{Open && (
				<aside className='modal'>
					<div className='con'>{children}</div>
					<span onClick={() => setOpen(false)}>close</span>
				</aside>
			)}
		</>
	);
});

export default Modal;
