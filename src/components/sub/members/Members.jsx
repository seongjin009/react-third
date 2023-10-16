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

	const [Val, setVal] = useState(initVal);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};
	return (
		<Layout title={'Members'}>
			<form>
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
										value={Val.userid}
										onChange={handleChange}
									/>
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
								</td>
							</tr>

							{/*btnSet */}
							<tr>
								<th colSpan='2'>
									<input type='reset' defaultValue='cancel' />
									<input type='submit' defaultValue='send' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}
