import Layout from '../../common/layout/Layout';
import Modal from '../../common/modal/Modal';
import './Gallery.scss';
import { useState, useRef } from 'react';
import Masonry from 'react-masonry-component';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFlickr } from '../../../redux/flickrslice';
import { open } from '../../../redux/modalSlick';

export default function Gallery() {
	const dispatch = useDispatch();
	const Pics = useSelector((store) => store.flickr.data);
	const refInput = useRef(null);
	const refBtnSet = useRef(null);
	const [ActiveURL, setActiveURL] = useState('');
	const [IsUser, setIsUser] = useState(true);
	const IsModal = useSelector((store) => store.modal.isOpen);
	const my_id = '199282986@N03';

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsUser(false);
		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		if (refInput.current.value.trim() === '') {
			return alert('검색어를 입력하세요.');
		}

		dispatch(fetchFlickr({ type: 'search', tags: refInput.current.value }));
		refInput.current.value = '';
	};

	//myGallery 클릭 이벤트 발생시 실행할 함수
	const handleClickMy = (e) => {
		setIsUser(true);
		if (e.target.classList.contains('on')) return;
		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');

		dispatch(fetchFlickr({ type: 'user', id: my_id }));
	};

	//Interest Gallery 클릭 이벤트 발생시 실행할 함수
	const handleClickInterest = (e) => {
		setIsUser(false);
		if (e.target.classList.contains('on')) return;
		const btns = refBtnSet.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e.target.classList.add('on');

		dispatch(fetchFlickr({ type: 'interest' }));
	};

	//profile 아이디 클릭시 실행할 함수
	const handleClickProfile = (e) => {
		if (IsUser) return;

		dispatch(fetchFlickr({ type: 'user', id: e.target.innerText }));
		setIsUser(true);
	};

	return (
		<>
			<Layout title={'Gallery'}>
				<div className='searchBox'>
					<form onSubmit={handleSubmit}>
						<input ref={refBtnSet} type='text' placeholder='검색어를 입력하세요' />
						<button>검색</button>
					</form>
				</div>

				<div className='btnSet' ref={refBtnSet}>
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
												dispatch(open());
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
				<Modal>
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

/*
유튜브 컴포넌트 작업을 하면서 비동기 데이터를 redux-tookit을 이용해서 전역 데이터 관리하는게 익숙해서 flickr도 시고해봤다
이슈사항 1 - flickr데이터를 가져온다음에 버튼을 클릭하거나 검색어 입력등이 이벤트가 발생할 때마다 실시간으로 전역store에 데이터를 변경 요청해야되는게 많이 어려웠다.
어려웠던 이유 : 
유튜브나 구글링을 해도 해당 내용이 없어서 혼자서 해결해야 되는 부분이 어려ㅜ었다.
이벤트가 발생할 때 마다 생성된 액션객체를 계쏙해서 dispatch로 reducer에 데이터 변경 요청을 하도록 처리했다.

이슈사항2 : 내 아이디 갤러리나 사용자 아이디를 클릭해서 출력하는  user타입의 갤러리 랜더링시에는 사용자 아이디를 클릭할 떄마다 중복데이터 호출이 일어나기 때문에 해당 문제점을 해결하기 위해서 user타입의 갤러리가 랜더링될때에만 state값 변경하고 state에 따라서 사용자 아이디의 클릭 이벤트를 막음으로서 불필요한 서버호출을 방지했다.

*/
