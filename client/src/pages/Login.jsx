import React, { useContext } from 'react'
import { AuthContext } from '../context'
import MyInput from '../components/UI/input/MyInput'
import MyButton from '../components/UI/button/MyButton'

function Login() {
	const { setIsAuth } = useContext(AuthContext)

	const login = event => {
		event.preventDefault()
		sessionStorage.setItem('auth', 'true')
		setIsAuth(true)
	}

	return (
		<div>
			<h1>Sign in</h1>
			<form onSubmit={login}>
				<MyInput type="text" placeholder='Login' />
				<MyInput type="password" placeholder='Password' />
				<MyButton>Sign in</MyButton>
			</form>
		</div>
	)
}

export default Login