import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useState, useEffect, useRef } from 'react';
import Masonry from 'react-masonry-component';
import Modal from '../../common/modal/Modal';

export default function Gallery(opt) {
	const refInput = useRef(null);

	const [Pics, setPics] = useState([]);

	const my_id = '199282986@N03';

	const refbtnSet = useRef(null);

	const [ActiveURL, setActiveURL] = useState('');

	const [IsModal, setIsModal] = useState(false);

	const [IsUser, setIsUser] = useState(true);

	const fetchData = async (opt) => {
		let url = '';
		const api_key = '3d01d56ea3c92153f235a2985a9776f6';
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';
		const num = 50;

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
					<button onClick={handleClickMy}>My Gallery</button>

					<button className='on' onClick={handleClickInterest}>
						Interest Gallery
					</button>
				</div>

				<div className='picFrame'>
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
												setIsModal(true);
											}}
										/>
										<h2>{data.title}</h2>
										<div className='profile'>
											<img
												src={`http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg`}
												alt={data.owner}
												onError={(e) => {
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
			{IsModal && (
				<Modal setIsModal={setIsModal}>
					<img src={ActiveURL} alt='img' />
				</Modal>
			)}
		</>
	);
}
/*
	클릭한 버튼을 또 클릭했을 때 같은 데이터를 불필요하게 또다시 fetching요청하지 않도록
	클릭한 버튼에 on이 붙어있을 때 함수 호출을 강제 중지

	현재 출력되는 갤러리 방식이 user type 갤러리일 때 같은 사용자의 갤러리가 보이는 형태이므로 
	사용자 아이디를 클릭하게되면 같은 데이터 요청을 보내게됨
	---사용자 타입의 갤러리를 호출할 때 마다 IsUser state값을 true로 변경해서
	---- 이벤트가 발생할 때마다 IsUser값이 true 사용자 아이디 클릭 이벤트 핸들러 제거
*/
