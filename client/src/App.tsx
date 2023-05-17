import { useState } from 'react';
import reactLogo from './assets/react.svg';
import { Homepage } from './pages/Home';

function App() {
	const [count, setCount] = useState(0);

	return (
		<Homepage />
	);
}

export default App;
