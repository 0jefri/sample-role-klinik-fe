import Layout from './components/Layout';
import { Header } from './components/Header';
import { Form } from './components/Form';
import { PageRoles } from './route/roles';

function App() {
	return (
		<>
			<Layout>
				<Header />
				{/* <Form /> */}
				<PageRoles />
			</Layout>
		</>
	);
}

export default App;
