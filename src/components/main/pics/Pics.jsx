import { useRef, useEffect } from 'react';
import './Pics.scss';
function Pics() {
	const frame = useRef(null);
	const box = useRef(null);
	const handleScroll = () => {
		const pos = frame.current.offsetTop;
		let scroll = window.scrollY;
		let scroll2 = scroll - pos;

		//가로 스크롤 wrapping 섹션 안에 들어왔을때
		if (scroll >= pos && scroll < pos + frame.current.clientHeight - window.innerWidth) {
			console.log('활성화영역 안쪽으로 들어옴');
			box.current.style.position = 'fixed';
			box.current.style.left = -scroll2 + 'px';
			box.current.style.top = '0px';
			//활성화 영역 스크롤 아래쪽으로 벗어났을떄
		} else if (scroll >= pos + frame.current.clientHeight - window.innerWidth) {
			console.log('활성화 섹션 아래쪽으로 벗어남');
			box.current.style.position = 'absolute';

			box.current.style.top = frame.current.clientHeight - window.innerWidth + 'px';
			box.current.style.left = -window.innerWidth * 3 + 'px';
			//활성화 영역 스크롤 위쪽으로 벗어났을때
		} else {
			console.log('활성화 영역 위쪽으로 벗어남');
			box.current.style.position = 'absolute';

			box.current.style.top = '0px';
			box.current.style.left = '0px';
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		// return () => {
		// 	window.removeEventListener('scroll', handleScroll);
		// };
	}, []);
	return (
		<section className='myScroll pics' ref={frame}>
			<article ref={box}>
				<div>
					<h2>Hello</h2>
				</div>
				<div>
					<h2>Hello</h2>
				</div>
				<div>
					<h2>Hello</h2>
				</div>
				<div>
					<h2>Hello</h2>
				</div>
			</article>
		</section>
	);
}
export default Pics;
