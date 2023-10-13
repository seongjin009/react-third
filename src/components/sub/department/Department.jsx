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
			<div className='line'></div>

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
