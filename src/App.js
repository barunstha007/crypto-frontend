import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
	const [cryptos, setCryptos] = useState([])
	const [watchlist, setWatchlist] = useState([])
	const [notifications, setNotifications] = useState([])
	const [search, setSearch] = useState('')

	useEffect(() => {
		fetchCryptos()
		fetchWatchlist()
		fetchNotifications()
	}, [])

	const fetchCryptos = async () => {
		try {
			const response = await axios.get('/api/crypto')
			setCryptos(response.data)
		} catch (error) {
			console.error('Error fetching cryptocurrencies:', error)
		}
	}

	const fetchWatchlist = async () => {
		try {
			const response = await axios.get('/api/watchlist')
			setWatchlist(response.data)
		} catch (error) {
			console.error('Error fetching watchlist:', error)
		}
	}

	const fetchNotifications = async () => {
		try {
			const response = await axios.get('/api/notifications')
			setNotifications(response.data)
		} catch (error) {
			console.error('Error fetching notifications:', error)
		}
	}

	const addToWatchlist = async (crypto) => {
		const minPrice = prompt('Enter minimum price for ' + crypto.code)
		const maxPrice = prompt('Enter maximum price for ' + crypto.code)

		try {
			await axios.post('/api/watchlist', {
				code: crypto.code,
				min_price: minPrice,
				max_price: maxPrice,
			})
			fetchWatchlist()
		} catch (error) {
			console.error('Error adding to watchlist:', error)
		}
	}

	const handleSearch = (event) => {
		setSearch(event.target.value)
	}

	const filteredCryptos = cryptos.filter((crypto) =>
		crypto.name.toLowerCase().includes(search.toLowerCase())
	)

	return (
		<div className="App">
			<h1>Cryptocurrency Notifier</h1>
			<div>
				<input
					type="text"
					placeholder="Search for a cryptocurrency..."
					value={search}
					onChange={handleSearch}
				/>
				<ul>
					{filteredCryptos.map((crypto) => (
						<li key={crypto.code}>
							<img src={crypto.img} alt={crypto.name} width="20" />
							{crypto.name} ({crypto.code}) - ${crypto.price}
							<button onClick={() => addToWatchlist(crypto)}>
								Add to Watchlist
							</button>
						</li>
					))}
				</ul>
			</div>
			<h2>Watchlist</h2>
			<ul>
				{watchlist.map((item) => (
					<li key={item._id}>
						{item.code} - Min: ${item.min_price}, Max: ${item.max_price}
					</li>
				))}
			</ul>
			<h2>Notifications</h2>
			<ul>
				{notifications.map((notification) => (
					<li key={notification._id}>{notification.message}</li>
				))}
			</ul>
		</div>
	)
}

export default App
