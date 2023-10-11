import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-component';
import Modal from '../../common/modal/Modal';

export default function Gallery(opt) {
	let count = 0;

	const refInput = useRef(null);

	const refFrame = useRef(null);

	const [Loader, setLoader] = useState(true);

	const [Pics, setPics] = useState([]);

	const my_id = '199282986@N03';

	const refbtnSet = useRef(null);

	const [Fix, setFix] = useState(false);

	const [ActiveURL, setActiveURL] = useState('');

	const [Open, setOpen] = useState(false);

	const [IsUser, setIsUser] = useState(true);

	const fetchData = async (opt) => {
		setLoader(true);

		refFrame.current.classList.remove('on');
		let url = '';
		const api_key = '3d01d56ea3c92153f235a2985a9776f6';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const num = 10;

		if (opt.type === 'interest') {
			url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;
		}
		if (opt.type === 'user') {
			url = `https://www.flickr.com/services/rest/?method=${method_user}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&user_id=${opt.id}`;
		}
		if (opt.type === 'search') {
			url = `https://www.flickr.com/services/rest/?method=${method_search}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json&tags=${opt.tags}`;
		}

		const data = await fetch(url);
		const json = await data.json();
		console.log(json.photos.photo);
		if (json.photos.photo.length === 0) {
			return alert('해당 검색어의 결과값이 없습니다');
		}
		setPics(json.photos.photo);

		const imgs = refFrame.current?.querySelectorAll('img');

		imgs.forEach((img) => {
			img.onload = () => {
				++count;
				console.log('현재 로딩된 img갯수', count);

				if (count === (Fix ? imgs.length / 2 - 1 : imgs.length - 2)) {
					console.log('모든 이미지 소스 렌더링 완료!');

					setLoader(false);
					refFrame.current.classList.add('on');
				}
			};
		});
	};

	//submit 이벤트 발생시 실행할 함수
	const handleSubmit = (e) => {
		e.preventDefault();

		setIsUser(false);
		const btns = refbtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));

		if (refInput.current.value.trim() === '') {
			return alert('검색어를 입력하세요.');
		}
		fetchData({ type: 'search', tags: refInput.current.value });
		refInput.current.value = '';
	};

	const handleClickMy = (e) => {
		setIsUser(true);
		if (e.target.classList.contains('on')) return;
		const btns = refbtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');
		fetchData({ type: 'user', id: my_id });
	};

	const handleClickInterest = (e) => {
		setIsUser(false);

		if (e.target.classList.contains('on')) return;
		const btns = refbtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');
		fetchData({ type: 'interest' });
	};

	const handleClickProfile = (e) => {
		if (IsUser) return;
		fetchData({ type: 'user', id: e.target.innerText });
		setIsUser(true);
	};

	useEffect(() => {
		fetchData({ type: 'search', tags: 'house' });
	}, []);

	return (
		<>
			<Layout title={'Gallery'}>
				<div className='searchBox'>
					<form onSubmit={handleSubmit}>
						<input ref={refInput} type='text' placeholder='검색어를 입력하세요' />
						<button>검색</button>
					</form>
				</div>

				<div className='btnSet' ref={refbtnSet}>
					<button className='on' onClick={handleClickMy}>
						My Gallery
					</button>

					<button onClick={handleClickInterest}>Interest Gallery</button>
				</div>

				{Loader && (
					<img
						className='loading'
						src={`${process.env.PUBLIC_URL}/img/loading.gif`}
						alt='loading'
					/>
				)}
				<div className='picFrame' ref={refFrame}>
					<Masonry
						elementType={'div'}
						options={{ transitionDuration: '0.5s' }}
						disableImagesLoaded={false}
						updateOnEachImageLoad={false}
					>
						{Pics.map((data, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<img
											className='pic'
											src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`}
											alt={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`}
											onClick={(e) => {
												setActiveURL(e.target.getAttribute('alt'));
												setOpen(true);
											}}
										/>
										<h2>{data.title}</h2>
										<div className='profile'>
											<img
												src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg`}
												alt={data.owner}
												onError={(e) => {
													setFix(true);
													//만약 사용자가 프로필 이미지를 올리지 않았을때 엑박이 뜨므로
													//onError이벤트를 연결해서 대체이미지 출력
													e.target.setAttribute(
														'src',
														'https://www.flickr.com/images/buddyicon.gif'
													);
												}}
											/>
											<span onClick={handleClickProfile}>{data.owner}</span>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</Layout>

			{Open && (
				<Modal>
					<img src={ActiveURL} alt='img' />
				</Modal>
			)}
		</>
	);
}
