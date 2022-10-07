import React from 'react';
import { Admin, Resource } from 'react-admin';
import authProvider from '../API/AuthProvider';
import jsonServerProvider from 'ra-data-json-server';
import { 
	List,
	Edit,
	Create,
	Datagrid,
	TextField,
	TextInput,
	EditButton,
	DeleteButton,
	SimpleForm,
} from 'react-admin';
import { Card, CardContent, CardHeader } from '@mui/material';

const filters = [<TextInput label='Search' source='q' alwaysOn />];

const PostList = () => (
	<List filters={filters}>
		 <Datagrid>
			  <TextField source='id' />
			  <TextField source='title' />
			  <TextField source='pubDate' label='Public Date' />
			  <EditButton />
			  <DeleteButton />
		 </Datagrid>
	</List>
);

const PostEdit = () => (
	<Edit>
		<SimpleForm>
			<TextInput disabled source='id' />
			<TextInput source='title' />
			<TextInput multiline source='description' />
			<TextInput source='link' />
			<TextInput source='creator' />
			<TextInput source='categories' />
		</SimpleForm>
	</Edit>
)

const PostCreate = props => (
	<Create {...props}>
		<SimpleForm>
			<TextInput source='title' />
			<TextInput multiline source='description' />
			<TextInput source='link' />
			<TextInput source='categories' />
		</SimpleForm>
	</Create>
)

const Dashboard = () => (
	<Card>
		 <CardHeader title="Welcome to the administration" />
		 <CardContent>Lorem ipsum sic dolor amet...</CardContent>
	</Card>
);

const dataProvider = jsonServerProvider('http://localhost:4000/api/admin');

function AdminPanel() {
	return (
		<Admin basename='/admin' dataProvider={dataProvider} authProvider={authProvider} dashboard={Dashboard}>
			<Resource name='posts' list={PostList} edit={PostEdit} create={PostCreate} />
		</Admin>
	)
}
export default AdminPanel;