import './Visual.scss';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useState } from 'react';

function Visual() {
	const { data } = useSelector((store) => store.youtube);
	const [Index, setIndex] = useState(0);

	return (
		<section className='visual'>
			<div className='titBox'>
				<ul>
					{data.map((tit, idx) => {
						if (idx >= 5) return null;
						return (
							<li key={idx} className={idx === Index ? 'on' : ''}>
								{tit.snippet.title}
								<br></br>
								<button>VIEW</button>
							</li>
						);
					})}
				</ul>
			</div>

			<Swiper
				slidesPerView={3}
				spaceBetween={50}
				loop={true}
				centeredSlides={true}
				//swiper loop기능을 적용하는 순간 실제 연결되어있는 패널갯수보다 동적으로 패널이 생성되면서 일반적인 방법으로는 활성화패널의 순서값을 구할 수 없기 때믄에 아래와 같은 방법으로 순서값을 구함
				onSlideChange={(el) => setIndex(el.realIndex)}
			>
				{data.map((vid, idx) => {
					if (idx >= 10) return null;
					return (
						<SwiperSlide key={idx} className={idx === Index ? 'on' : ''}>
							<div className='pic'>
								<img src={vid.snippet.thumbnails.standard.url} alt={vid.title} />
								<img src={vid.snippet.thumbnails.standard.url} alt={vid.title} />
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</section>
	);
}
export default Visual;
