import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useState } from 'react';

export default function Members() {
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
	};
	const [Errs, setErrs] = useState({});

	const [Val, setVal] = useState(initVal);

	const resetForm = (e) => {
		e.preventDefault();
		setVal(initVal);
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		//현재 onChange이벤트가 발생하고 있는 form요소의 name값을 객체안에서 변수로 가져오소 value값도 가져온뒤 기존의 state값을 deep copy하고있는 input의 property값만 덮어쓰기
		setVal({ ...Val, [name]: value });
	};

	const handleRadio = (e) => {
		const { name, checked } = e.target;
		setVal({ ...Val, [name]: checked });
	};

	//인수값으로 state를 전달받아서 각 데이터별로 인증처리 후
	//만약 인증에러가 발생하면 해당 name값으로 에러문구를 생성해서 반환하는 함수
	const check = (value) => {
		const num = /[0-9]/; //0-9까지의 모든 값을 정규표현식으로 범위 지정
		const txt = /[a-zA-Z]/; //대소문자 구분없이 모든문자 범위 지정
		const spc = /[!@#$%^&*()_]/; //모든 특수문자 지정
		const errs = {};

		if (value.userid.length < 5) {
			errs.userid = '아이디는 최소 5글자 이상 입력하세요.';
		}

		//비밀번호 인증 (5글자 이상, 문자, 숫자, 특수문ㅁ자 모두 포함)
		if (
			value.pwd1.length < 5 ||
			!num.test(value.pwd1) ||
			!txt.test(value.pwd1) ||
			!spc.test(value.pwd1)
		) {
			errs.pwd1 = '비밀번호는 5글자이상, 문자, 숫자, 특수문자를 모두 포함하세요';
		}

		//2차 비밀번호 인증
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '2개의 비밀번호를 같게 입력하세요.';
		}

		//이메일 인증
		if (!value.email || !/@/.test(value.email)) {
			errs.email = '이메일은 무조건 @를 포함해야 합니다.';
		} else {
			if (!value.email.split('@')[0] || !value.email.split('@')[1]) {
				errs.email = '이메일에 @앞뒤로 문자값이 있어야 합니다.';
			} else {
				if (!value.email.split('@')[1].split('.')[0] || !value.email.split('@')[1].split('.')[1]) {
					errs.email = '이메일 . 앞뒤로 문자값이 있어야 합니다.';
				}
			}
		}
		//성별인증
		if (!value.gender) {
			errs.gender = '성별을 하나이상 체크해주세요';
		}
		return errs;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (Object.keys(check(Val)).length === 0) {
			alert('인증통과');
		} else {
			setErrs(check(Val));
		}
	};
	return (
		<Layout title={'Members'}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend className='h'>회원가입 폼 양식</legend>
					<table border={1}>
						<tbody>
							{/*userid */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>userid</label>
								</th>
								<td>
									<input
										type='text'
										id='userid'
										name='userid'
										//onChange가 발생할때마다 실시간으로 변경되고 있는 value값만 출력
										value={Val.userid}
										onChange={handleChange}
									/>
									{Errs.userid && <p>{Errs.userid}</p>}
								</td>
							</tr>

							{/*password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>password</label>
								</th>
								<td>
									<input
										type='password'
										id='pwd1'
										name='pwd1'
										value={Val.pwd1}
										onChange={handleChange}
									/>
									{Errs.pwd1 && <p>{Errs.pwd1}</p>}
								</td>
							</tr>

							{/*re_password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>re_password</label>
								</th>
								<td>
									<input
										type='text'
										id='pwd2'
										name='pwd2'
										value={Val.pwd2}
										onChange={handleChange}
									/>
									{Errs.pwd2 && <p>{Errs.pwd2}</p>}
								</td>
							</tr>
							{/*email */}
							<tr>
								<th scope='row'>
									<label htmlFor='email'>e-mail</label>
								</th>
								<td>
									<input
										type='text'
										id='email'
										name='email'
										value={Val.email}
										onChange={handleChange}
									/>
									{Errs.email && <p>{Errs.email}</p>}
								</td>
							</tr>

							<tr>
								<th>gender</th>
								<td>
									<label htmlFor='female'>female</label>
									<input type='radio' name='gender' id='female' onChange={handleRadio} />
									<label htmlFor='female'>male</label>
									<input type='radio' name='gender' id='male' onChange={handleRadio} />
									{Errs.gender && <p>{Errs.gender}</p>}
								</td>
							</tr>

							{/*btnSet */}
							<tr>
								<th colSpan='2'>
									<input type='reset' defaultValue='cancel' onClick={resetForm} />
									<input type='submit' defaultValue='send' onClick={resetForm} />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}
