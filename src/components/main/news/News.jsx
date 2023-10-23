import './News.scss';
import { useEffect, useState, useCallback, useMemo } from 'react';

function News() {
	const dyndata1 = useMemo(() => {
		return [
			{
				title: 'jeonghyn',
				content: "hello jeonghyun i'm seongjin",
				data: new Date(),
			},
			{
				title: 'jeonghyn',
				content: "hello jeonghyun i'm seongjin",
				data: new Date(),
			},
			{
				title: 'jeonghyn',
				content: "hello jeonghyun i'm seongjin",
				data: new Date(),
			},
			{
				title: 'jeonghyn',
				content: "hello jeonghyun i'm seongjin",
				data: new Date(),
			},
		];
	}, []);
	//프로젝트가 처음 구동되면 무조건 메인페이지에 갔다가 커뮤니티페이지에 넘어가는 구조
	//해당 페이지에 있는 함수가 처음 구동될 시로컬저장소에 값이 없으므로
	//저장소값이 없을 때 빈배열이 반환되는 구문을 추가 (중요)
	const getLocalData = useCallback(() => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dyndata1;
	}, [dyndata1]);

	const [Post, setPost] = useState(getLocalData());

	useEffect(() => {
		setPost(getLocalData());
	}, [getLocalData]);

	return (
		<section className='news myScroll'>
			<img src='../../../img/zoe.jpg' />
			<h2>News</h2>
			<div className='postWrap'>
				{Post.map((el, idx) => {
					if (idx >= 4) return null;
					else
						return (
							<article key={idx}>
								<h2>{el.title}</h2>
								<p>{el.content}</p>
							</article>
						);
				})}
			</div>
		</section>
	);
}
export default News;
