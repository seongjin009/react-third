import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import { FaBars } from 'react-icons/fa';
import { useGlobalData } from '../../../hooks/useGlobalContext';

export default function Header({ isMain }) {
	const { MenuOpen, setMenuOpen, setTheme, Theme } = useGlobalData();
	return (
		<header className='header myScroll'>
			<h1>
				<Link to='/'>LOGO</Link>
			</h1>
			<ul>
				<li>
					<NavLink to='/department' activeClassName='active'>
						<div className='clickBox'>Department</div>
					</NavLink>
				</li>
				<li>
					<NavLink to='/community' activeClassName='active'>
						<div className='clickBox'>Community</div>
					</NavLink>
				</li>
				<li>
					<NavLink to='/gallery' activeClassName='active'>
						<div className='clickBox'>Gallery</div>
					</NavLink>
				</li>
				<li>
					<NavLink to='/youtube' activeClassName='active'>
						<div className='clickBox'>Youtube</div>
					</NavLink>
				</li>
				<li>
					<NavLink to='/members' activeClassName='active'>
						<div className='clickBox'>Members</div>
					</NavLink>
				</li>
				<li>
					<NavLink to='/contact' activeClassName='active'>
						<div className='clickBox'>Contact</div>
					</NavLink>
				</li>
			</ul>

			<FaBars
				className='bars'
				fontSize={22}
				color={'#333'}
				onClick={() => setMenuOpen(!MenuOpen)}
			/>
			{/*<span className='btnTheme' onClick={() => setTheme(!Theme)}>
				Theme
	</span>*/}
		</header>
	);
}
