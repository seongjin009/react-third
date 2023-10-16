import './Visual.scss';

function Visual() {
	return (
		<section className='visual'>
			<main>
				<img className='backimg' src='./././img/mainBack.jpeg' />
				<h1 className='title'>
					My Portfolio
					<div className='line1'></div>
					<span>Lorem ipsum dolor sit amet.</span>
				</h1>
				<div className='director'>
					<h2>Design By Seongjin</h2>
				</div>
				<div className='bar'>
					<p>2023</p>
					<div className='line'></div>
				</div>
			</main>
		</section>
	);
}

export default Visual;
