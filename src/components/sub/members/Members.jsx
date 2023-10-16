import Layout from '../../common/layout/Layout';
import './Members.scss';

export default function Members() {
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
									<input type='text' id='userid' name='userid' />
								</td>
							</tr>

							{/*password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd1'>password</label>
								</th>
								<td>
									<input type='password' id='pwd1' name='pwd1' />
								</td>
							</tr>

							{/*re_password */}
							<tr>
								<th scope='row'>
									<label htmlFor='pwd2'>re_password</label>
								</th>
								<td>
									<input type='text' id='pwd2' name='pwd2' />
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
