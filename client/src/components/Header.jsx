import React from 'react'
import { useNavigate } from 'react-router-dom'
import SearchInput from './UI/SearchInput'
import Logo from './UI/Logo'
import {
	Toolbar,
	Button,
} from '@mui/material';

function Header({filter, setFilter}) {
	const route = useNavigate()

	return (
		<Toolbar>
			<Logo />
			<div className="flex-1">
				<SearchInput
					filter={filter.query}
					setFilter={setFilter}
				/>
			</div>
			<div className="flex items-center h-100 ml-auto">
				<Button onClick={() => route('/admin/login')}>Log in</Button>
			</div>
		</Toolbar>
	);
}

export default Header;