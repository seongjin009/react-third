import Layout from '../../common/layout/Layout';
import { useParams } from 'react-router-dom';

export default function Detail() {
	const { id } = useParams();
	return (
		<Layout title={'Youtube Detail'}>
			<p>{id}</p>
		</Layout>
	);
}
