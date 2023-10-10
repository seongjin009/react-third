import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-component';

export default function Gallery() {
	const [Pics, setPics] = useState([]);

	const fetchData = async () => {
		const api_key = '3d01d56ea3c92153f235a2985a9776f6';
		const method_interest = 'flickr.interestingness.getList';
		const num = 500;
		const url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;


		//만약 특정함수가 promise를 반환한다면 wrappin함수로 묶어준뒤 async 지정
		//각각의 promise 반환 함수 앞쪽에 await를 붙이기만 하면 해당코드가 동기화됨
		const data = await fetch(url);
			const json = await (data.json);
				console.log(json.photos.photo);
				setPics(json.photos.photo);
			};
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<Layout title={'Gallery'}>
			<div className='picFrame'>
				<Masonry
					className={'my-gallery-class'} // maysonry로 wapping후 세팅
					elementType={'ul'} // masonry컴포넌트가 변환될 태그명 지정
					options={{ transitionDuration: '0,5s' }} // 박스모션시 transition 시간 설정
					disableImagesLoaded={false} //true이미지로딩 처리 안함
					updateOnEachImageLoad={false} //true각 이미지의 로딩처리 안함
				>
					{Pics.map((data, idx) => {
						return (
							<article key={idx}>
								<div className='inner'>
									<img
										className='pic'
										src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`}
										alt={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`}
									/>
									<h2>{data.title}</h2>
									<div className='profile'>
										<img
											src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg`}
											alt={data.owner}
										/>
										<span>{data.owner}</span>
									</div>
								</div>
							</article>
						);
					})}
				</Masonry>
			</div>
		</Layout>
	);
}
