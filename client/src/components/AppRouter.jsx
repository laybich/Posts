import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from '../router'

function AppRouter() {
	return (
		<Routes>
			{publicRoutes.map(route =>
				<Route path={route.path} element={route.element} key={route.path} />
			)}
		</Routes>
	)
}

export default AppRouter