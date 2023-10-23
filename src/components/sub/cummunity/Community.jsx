import Layout from '../../common/layout/Layout';
import './Community.scss';
import { useRef, useState, useEffect } from 'react';

export default function Community() {
	const dyndata1 = [
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
	//로컬데이터의 값을 parsing해서
	const getLocalDate = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dyndata1;
	};
	const refInput = useRef(null);
	const refTextarea = useRef(null);
	const refEditInput = useRef(null);
	const refEditTextarea = useRef(null);
	//해당 컴포넌트가 처음 마운트시에는 로컬저장소에 값이 없기 때문에 빈배열 리턴
	//저장소에 값이 있으면 해당값을 parsing된 데이터가 있는 배열값이 리턴
	const [Posts, setPosts] = useState(getLocalDate());
	const [Allowed, setAllowed] = useState(true);

	const resetForm = () => {
		refInput.current.value = '';
		refTextarea.current.value = '';
	};
	const createPost = () => {
		if (!refInput.current.value.trim() || !refTextarea.current.value.trim()) {
			resetForm();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		//기존 Posts 배열값을 Deep copy해서 가져온뒤, 그 뒤에 추가로 방금 입력한 객체를 배열에 추가
		setPosts([
			{
				title: refInput.current.value,
				content: refTextarea.current.value,
				data: new Date(),
			},
			...Posts,
		]);
		resetForm();
	};
	const deletePost = (delIndex) => {
		if (window.confirm('정말 해당 게시글을 삭제하겠습니까?')) {
			//기존의 포스트 배열값을 반복 돌면서 인수로 전달된 삭제 순번값과 현재 반복되는 배열의 순번값이 같이 않은 것만 리턴
			setPosts(Posts.filter((_, idx) => delIndex !== idx));
		}
	};

	//해당 글을 수정모드로 변경시키는 함수
	const enableUpdate = (editIndex) => {
		if (!Allowed) return;
		setAllowed(false);
		//일단 수정모드에 진입하면 Allowed가 true아니면 return으로 함수 강제 종료
		setPosts(
			//Posts 배열값을 반복돌면서 인수로 전달된 수정할 포스트의 순번값과 현재반복도는 포스트 순번값이 일치하면
			//해당글을 수정처리 해야되느로 해당 객체에 enableUpdate =true값을 추가
			Posts.map((post, idx) => {
				if (editIndex === idx) post.enableUpdate = true;

				return post;
			})
		);
	};
	//해당 글을 출력모드로 만드는 함수
	const disableUpdate = (editIndex) => {
		setAllowed(true);
		setPosts(
			Posts.map((post, idx) => {
				if (editIndex === idx) post.enableUpdate = false;
				return post;
			})
		);
	};
	//실제 글 수정하는 함수
	const updatePost = (updateIndex) => {
		//setPosts로 기존 Post배열같은 덮어쓰기해서 변경
		//리엑트에서는 참조형 자료는 무조건 배열값을 Deep copy 한뒤 변경
		setPosts(
			Posts.map((post, idx) => {
				if (updateIndex === idx) {
					post.title = refEditInput.current.value;
					post.content = refEditTextarea.current.value;
				}
				return post;
			})
		);
	};

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	return (
		<Layout title={'Community'}>
			<div className='inputBox'>
				<input ref={refInput} type='text' placeholder='제목을 입력하세요.' />
				<br />
				<textarea ref={refTextarea} cols='30' rows='3' placeholder='본문을 입력하세요.'></textarea>

				<nav className='btnSet'>
					<button onClick={resetForm}>cancel</button>
					<button onClick={createPost}>write</button>
				</nav>
			</div>

			<div className='showBox'>
				{Posts.map((post, idx) => {
					const string = JSON.stringify(post.data);

					const [year, month, date] = string.split('T')[0].split('"')[1].split('-');
					let [hour, min, sec] = string.split('T')[1].split('.')[0].split(':');
					hour = parseInt(hour) + 9;
					hour >= 24 && (hour = hour - 24);

					if (post.enableUpdate) {
						return (
							<article key={idx}>
								<div className='txt'>
									<input type='text' defaultValue={post.title} ref={refEditInput} />
									<br />
									<textarea defaultValue={post.content} ref={refEditTextarea} />

									<button onClick={() => disableUpdate(idx)}>Cancel</button>
									<button
										onClick={() => {
											updatePost(idx);
											disableUpdate(idx);
										}}
									>
										Update
									</button>
								</div>
							</article>
						);
					}
					return (
						<article key={idx}>
							<div className='txt'>
								<h2>{post.title}</h2>
								<p>{post.content}</p>
								<p>{`글 작성일 : ${year}-${month}-${date}`}</p>
								<p>{`글 작성시간 : ${hour}:${min}:${sec}`}</p>
							</div>
							<nav className='btnSet'>
								<button onClick={() => enableUpdate(idx)}>Edit</button>
								<button onClick={() => deletePost(idx)}>Delete</button>
							</nav>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}
/*
  Create : 게시글 저장
  Read : 게시글 보기
  Update : 게시글 수정
  Delete : 게시글 삭제
  localStorage : 모든 브라우저가 가지고 있는 경량의 저장소 (문자열: 5MB)

	로컬 저장소에 데이터 저장
	localStorage.setItem({key:'value})

	로컬 저장소에 데이터 가져옴
	localStorage.getItem(key)
	문자화되어있는 객체를 다시 parsing해서 호출 
*/
