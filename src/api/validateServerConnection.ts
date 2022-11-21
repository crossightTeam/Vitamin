import axios from 'axios'

export default async function validateServerConnection() {
	const res = await axios('http://localhost:1337/api/users/count')
	return res
}
