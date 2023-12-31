import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import { Link, NavLink } from 'react-router-dom';

import './Detail.scss';

export default function Detail() {
	//url로 전단될 parameter값을 비구조화할당으로 받을 수 있음
	const { id } = useParams();
	const [Data, setData] = useState(null);

	useEffect(() => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const baseURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
		//youtbue 페이지와는 다르게 요청 url의 옵션값이 playListId가 아닌 id방식
		//전체 목록이 아닌 특정 id값에 대한 유튜브 데이터 객체 하나만 받아오기 위함
		fetch(`${baseURL}?key=${api_key}&id=${id}&part=snippet`)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.items[0].snippet);
				setData(json.items[0].snippet);
			});
	}, [id]);
	return (
		<Layout title={'Detail'}>
			<div className='arti'>
				<div className='tit'>
					<div className='hdar'>
						<h2>{Data?.title}</h2>
					</div>
					<div className='subar'>
						<p>{Data?.description}</p>
					</div>
					<div className='txtBox'>
						<span>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, excepturi
							provident fugit maiores iste veritatis!
						</span>
					</div>
				</div>
				<div className='vidBox'>
					<iframe
						src={`https://www.youtube.com/embed/${Data?.resourceId.videoId}`}
						title='youtube'
					></iframe>
				</div>
			</div>
			<div className='btmBox'>
				<p>
					<NavLink to='/Youtube' activeClassName='active'>
						close
					</NavLink>
				</p>
			</div>
		</Layout>
	);
}
