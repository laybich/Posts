import React, { useEffect, useState } from 'react'
import AppRouter from './components/AppRouter'
import { BrowserRouter } from 'react-router-dom'
import './styles/App.css'
import { AuthContext } from './context'

function App() {
	const [isAuth, setIsAuth] = useState(false)

	useEffect(() => {
		if (sessionStorage.getItem('auth')) {
			setIsAuth(true)
		}
	}, [])

	return (
		<AuthContext.Provider value={{
			isAuth,
			setIsAuth,
		}}>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</AuthContext.Provider>
	);
}

export default App;
