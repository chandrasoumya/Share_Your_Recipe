import { FormEvent, useState } from 'react'
import { api, JwtResponse } from '../api/client'
import { useAuth } from '../auth/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function SignIn() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState<string | null>(null)
	const { signIn } = useAuth()
	const navigate = useNavigate()

	async function handleSubmit(e: FormEvent) {
		e.preventDefault()
		setError(null)
		try {
			const res = await api.post<JwtResponse>('/auth/signin', { username, password })
			signIn(res.data.token, { username: res.data.username, email: res.data.email })
			navigate('/')
		} catch (err: any) {
			setError(err?.response?.data?.message ?? 'Invalid credentials')
		}
	}

	return (
		<div className="max-w-md mx-auto">
			<h1 className="text-2xl font-semibold mb-4">Sign in</h1>
			<form onSubmit={handleSubmit} className="space-y-3">
				<input className="w-full border rounded px-3 py-2" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
				<input type="password" className="w-full border rounded px-3 py-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
				{error && <div className="text-red-600 text-sm">{error}</div>}
				<button className="w-full bg-indigo-600 text-white rounded px-3 py-2">Sign in</button>
			</form>
			<p className="text-sm mt-3 text-gray-600">No account? <Link to="/signup" className="text-indigo-600">Sign up</Link></p>
		</div>
	)
}


