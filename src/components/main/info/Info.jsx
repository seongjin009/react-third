import './Info.scss';
import { useSelector } from 'react-redux';

function Info() {
	const { data } = useSelector((store) => store.flickr);

	return (
		<section className='info myScroll'>
			<div className='wrap '>
				{data.map((pic, idx) => {
					if (idx >= 4) return null;
					return (
						<article key={idx}>
							<div className='pic'>
								<img
									src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
									alt={pic.title}
								/>
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
}
export default Info;
