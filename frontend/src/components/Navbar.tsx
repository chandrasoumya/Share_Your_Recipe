import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Navbar() {
	const { token, user, signOut } = useAuth()
	const navigate = useNavigate()
	return (
		<nav className="bg-white border-b">
			<div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
				<Link to="/" className="font-bold text-xl">ShareYourRecipe</Link>
				<div className="flex items-center gap-3">
					{token ? (
						<>
							<Link to="/new" className="px-3 py-1.5 rounded bg-indigo-600 text-white">New</Link>
							<span className="text-sm text-gray-600">{user?.username}</span>
							<button className="px-3 py-1.5 rounded border" onClick={() => { signOut(); navigate('/signin') }}>Sign out</button>
						</>
					) : (
						<>
							<Link to="/signin" className="px-3 py-1.5 rounded border">Sign in</Link>
							<Link to="/signup" className="px-3 py-1.5 rounded bg-indigo-600 text-white">Sign up</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	)
}


