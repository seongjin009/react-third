//1. 해당 페이지를 어떤식으로 작업했고 어떤 이슈가 있었는지 설명?
//답변 - 정적인 데이터라서 굳이 fetch를 통해서 데이터를 가져오지 않고 static하게 컨텐츠를 집어넣을까 고민도 했지만
//데이터 기반으로 모든 화면단이 종적으로 생성되게 하고 싶어서 fetch를 통해서 데이터가 변경되더라도 자동으로 화면이 갱신되도록 작업을 했다.

import Layout from '../../common/layout/Layout';
import { useEffect, useState } from 'react';
import './Department.scss';
const path = process.env.PUBLIC_URL;

export default function Department() {
	const [Department, setDepartment] = useState([]);
	const [IsPics, setIsPics] = useState(false);
	const [number, setnumber] = useState(0);
	useEffect(() => {
		fetch(`${path}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				setDepartment(json.members);
			});
	}, []);

	return (
		<Layout title={'Department'}>
			<div className='subPic'>
				<div className='Picover'></div>
				<img src='https://i.pinimg.com/564x/b5/f5/ac/b5f5aca4c3958e2b8a3424ed11bb2dff.jpg' />
				<div className='line2'></div>
			</div>
			<span className='subtit'>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem velit laboriosam non
				aliquid eligendi.
				<div className='line1'></div>
			</span>

			<div className='memberBox'>
				{Department.map((member, idx) => {
					return (
						<article key={idx}>
							<div className='pic'>
								<img src={`${path}/img/${member.pic}`} alt={member.name} />
							</div>
							<h2>{member.name}</h2>
							<p>
								<span>position</span> : {member.position}
							</p>
							<p>
								<span>address</span> : {member.address}
							</p>
							<p>
								<span>phone</span> : {member.phone}
							</p>
							<div className='line3'></div>
						</article>
					);
				})}
				<div className='directior'>directior : iseongjin009</div>
			</div>
		</Layout>
	);
}

/**
1. hook의 개념
- 리엑트에서는 크게 2가지 종류의 파일이 존재
-- 컴포넌트(화면에 가상돔을 랜더링하는 JSX를 무조건 리턴)
-- hook(JSX를 리턴하는 것이 아닌 각 컴포넌트마다 자주쓰는 기능의 함수나 특정 값을 리턴하는 기능파일)
2. useState, useEffect, useRef 가 하는 일 (리액트에서 제일 많이사용하는 기본 hook)
- useState: 화면의 랜더링을 담당하는 중요한 정보를 담아주고 변경해주는 기능의 훅 (state가 변경되면 컴포넌트는 재호출되면서 화면 랜더링)
- useEffect: 컴포넌트의 생성, 변경, 소멸시 (컴포넌트 생명주기마다 ) 특정 구문을 호출할 수 있는 hook
- useRef: 참조객체에 실시간으로 특정 정보값을 담기위한 hook ( 해당 랜더링 사이클에서최신 가상돔을 담을 때, 특정 값을 담아두고 변경을 할 때 컴포넌트를 재랜더링 시키고 싶지 않을 때 (모션))
3. 컴포넌트가 하는 역활(JSX)
- 자바스크립트 종적 DOM을 만들때 편의성을 위해 HTML 형식을 따와서 편하게 동적 DOM생성을 위한 리액트만의 표현식
4. false문을 useEffect안쪽에서 호출하는 이유
- 가상돔 생성은링액트 기반의 스크립트가 처리해주지만 외부데이터를 가져오는 것은 web API(브라우저)가 처리하기 때문에 
- 컴포넌트가 실제 브라우저상에 마운트가 되고 브라우저가 작업준비가 되야지만 fetch를 실행할 수 있기 때문에
- useEffect 컴포넌트가 마운트 되어야지만 CSR방식으로 외부데이터를 가져올 수 있음.
컴포넌트 작성 순서{
	import로 외부 모듈, 컴포넌트 불러오기
	export default function  컴포넌트이름(){
		필요시 hook 호출 ( hook안에서 hook호출 불가, 핸들러 안쪽에서 호출 불가)
		필요시 핸들러함수 정의
		useEffect(()=>{
			핸들러함수 호출(fetch,이벤트연결)
		})
		return JSX
	}
}
fetch: ES6에서 기본문법으로 포함된 동기적으로 외부데이터를 가져오는 내장함수 
fetch는 promise반환 promise가 반환되야지 .then구문 호출가능
.then구문을 호출해야지만 동기적으로 다음코드 실행가능
JSON(Javascript Object Notation) 자바스크립트 객체 표현식
- 자바스크립트의 객체를 문자열형태로 관리하는 데이터 형식
- 문자형식으로 되어있는 JSON는 다시 객체형식으로 변환 (parsing)
promise : 데이터의 상태값을 추적할 수 있는 객체
	promise의 3가지 상태
	pending: 요청을 보내고 응답을 받기까지의 대기상태
	fulfilled: pending이 끝나고 요청에 대한 응답을 성공적으로 받은 상태
	rejected: pending이 끝나고 요청에 대한 응답을 받긴 하지만 에러를 반환받은 상태를 rejected
 */
