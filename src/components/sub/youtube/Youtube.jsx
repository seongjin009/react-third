import Layout from '../../common/layout/Layout';
import Modal from '../../common/modal/Modal';
import './Youtube.scss';
import { useEffect, useState, useRef } from 'react';
/*
리엑트는 단방향 데이터 바인딩
-부모에서 자식으로 데이터 전달가능하지만 자식에서 부모로는 데이터를 전달 불가
-props전달, children 전달

리엑트에서 자식 컴포넌트에서는 직접적으로 부모 ㅂ컴포넌트의 state값 변경이 불가
-해결방법 부모의 state변경함수를 자식 컴포넌트로 전달
-자식 컴포넌트에서는 전달받은 state변경함수로 간접적으로 부모 state값 변경가능

useRef로 jsx참조 객체에 담을 수 있음
컴포넌트를 useRef를 통한 참조객체 감는것이 불가
 */

export default function Youtube() {
	const refEl = useRef(null);
	const [Youtube, setYoutube] = useState([]);
	const [IsModal, setIsModal] = useState(false);

	const fetchYoutube = () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
		const pid = `PLJ0_dUpwgnHGNKFN5G2r6rsMf51JmkB7M`;
		const num = 5;
		const resultURL = `${baseURL}?key=${api_key}&part=snippet&playlistId=${pid}&maxResult=${num}`;

		fetch(resultURL)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.items);
				setYoutube(json.items);
			});
	};

	useEffect(() => {
		fetchYoutube();
	}, []);
	return (
		<>
			<Modal setIsModal={setIsModal} ref={refEl}></Modal>

			<Layout title={'Youtube'}>
				{Youtube.map((data, idx) => {
					return (
						<article key={idx}>
							<h2 onClick={() => console.log(refEl)}>{data.snippet.title}</h2>
							<p ref={refEl}>{data.snippet.description}</p>
							<div className='pic' onClick={() => refEl.current.open()}>
								<img src={data.snippet.thumbnails.standard.url} alt={data.title} />
							</div>
						</article>
					);
				})}
			</Layout>
		</>
	);
}
