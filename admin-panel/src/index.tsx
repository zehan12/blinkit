import { render } from 'preact';
import "./style.css";

export function App() {
	return (
		<div>
			<h1>Admin App</h1>
		</div>
	);
}

render(<App />, document.getElementById('app'));
