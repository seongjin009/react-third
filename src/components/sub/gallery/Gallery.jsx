import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useState, useEffect } from 'react';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	const api_key = '3d01d56ea3c92153f235a2985a9776f6';
	const method_interest = `flickr.interestingness.getList`;
	const num = 100;
	const url = `https://www.flickr.com/services/rest/?method=${method_interest}&api_key=${api_key}&per_page=${num}&nojsoncallback=1&format=json`;

	useEffect(() => {
		fetch(url)
			.then((data) => data.json())
			.then((json) => {
				console.log(json.photos.photo);
				setPics(json.photos.photo);
			});
	});

	return (
		<Layout title={'Gallery'}>
			{Pics.map((data, idx) => {
				return (
					<article key={idx}>
						<h2>{data.title}</h2>
						<img
							src={`https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`}
							alt={data.title}
						/>
					</article>
				);
			})}
		</Layout>
	);
}
