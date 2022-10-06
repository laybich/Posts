import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../router'
import { AuthContext } from '../context'

function AppRouter() {
	const { isAuth, isLoading } = useContext(AuthContext)

	if (isLoading) {
		return <h1>Loading...</h1>
	}

	return (
		isAuth
		?
		<Routes>
			{privateRoutes.map(route => 
				<Route
					path={route.path}
					element={route.element}
					key={route.path}
				/>
			)}
		</Routes>
		:
		<Routes>
			{publicRoutes.map(route => 
				<Route
					path={route.path}
					element={route.element}
					key={route.path}
				/>
			)}
		</Routes>
	)
}

export default AppRouter