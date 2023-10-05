import Modal from '../../common/modal/Modal';
import './Youtube.scss';
import Layout from '../../common/layout/Layout';
import { useEffect, useState } from 'react';

export default function Youtube() {
	const [Youtube, setYoutube] = useState([]);
	const [IsModal, setIsModal] = useState(false);
	const [Index, setIndex] = useState(0);

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
			<Layout title={'Youtube'}>
				{Youtube.map((data, idx) => {
					return (
						<article key={idx}>
							<h2>{data.snippet.title}</h2>
							<p>{data.snippet.description}</p>
							<div
								className='pic'
								onClick={() => {
									setIndex(idx);
									setIsModal(true);
								}}
							>
								<img src={data.snippet.thumbnails.standard.url} alt={data.title} />
							</div>
						</article>
					);
				})}
			</Layout>
			{IsModal && (
				<Modal setIsModal={setIsModal}>
					<iframe
						src={`https://www.youtube.com/embed/${Youtube[Index].snippet.resourceId.videoId}`}
						title='youtube'
					></iframe>
				</Modal>
			)}
		</>
	);
}
