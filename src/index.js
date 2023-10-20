import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './redux/modalSlick';
import menuReducer from './redux/menuSlice';

//youtubeReducer반환한 데이터를 youtube property담아서 객체형태로 store에 등록
//store에는 하나의 객체만 등록가능하기 때문에 여러개의 데이터 카테고리는 reducer로 통합해서 등록
const store = configureStore({
	reducer: {
		modal: modalReducer,
		menu: menuReducer,
	},
});
ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<App />
		</Provider>
	</BrowserRouter>,
	document.getElementById('root')
);

/*
1.csr방식에 대해서 설명하시오
-Client Side Rendering cs (SercerSide Rendering)
-예전 SSR방식은 각 페이지마다 html파일을 직접 만들어놓은 뒤 사용자가 url입력시 직접 서버에서 가각의 html파일을 불러와서 랜더링 하는 방식 
--사용자가 브라우저에 url입력해서 페이지요청하면 빈 html파일만 서버쪽에서 가져오고 그와동시에 jsx를 반환하는 리엑트 컴포넌트를 파일을 같이 불러옴 
-리엑트 컴포넌트가 모두 동작되면 빈 html문서에 동적으로 모든 컴포넌트가 랜더링 됨
-초기 모든서브페이지에 대한 파일들을 모두 가져와서 url요청에 따라서 미리 가져온 리액트 컴포넌트를 바꾸면서 화면을 변경

2. SSR방식에 비해 csr방식으 장점과 단점에 대해서 설명 
- 초기로딩속도가 SSR방식에 비해서는 오래걸림
- 처음에 빈 HTML파일을 가져오고 모든리액트 컴포넌트가 마운트 되기 전까지 사용자는 빈 화면을 봐야되고 --> 검색엔진에 안좋음
- 해결방법 (Next.js라는 frame을 이횽해서 SSR, CSR방식이 결합된 hydration을 활용)
- 해결방법 index.html을 불러오고 공적인 react리액트 컴포넌트가 마운트되기 전까지 static데이터를 미리 출력해서 검색엔진 최적화

3. react 프로젝트에서 public,src폴더를 통해서 어떤식으로 빌드되면서 화면 렌더링
- index.js를 구동파일로 해서 App.js모든 컴포넌트를 불러온다음에 내부적으로 내장되어있는 webpack이라는 번들러에 의해서 하나의 js파일로 번들링되고 번들링된 파일은 index.js에 의해서 public폴더 안쪽에 있는 index.html에 합치면서 최종빌드가 완료된
- 그럼 브라우저에서는 빌드완료된 index.html을 읽어서 화면 렌더링
*/
