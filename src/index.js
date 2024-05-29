import React from 'react'
import ReactDOM from 'react-dom'
import './index.css' // Optional: for global styles
import App from './App'

// Render the App component into the DOM element with id 'root'
ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)
