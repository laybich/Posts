import React from 'react'

function SearchInput({filter, setFilter}) {
	return (
		<input
			className='search-input'
			placeholder='Search...'
			value={filter.query}
			onChange={e => setFilter({...filter, query: e.target.value})}
		/>
	);
}

export default SearchInput;