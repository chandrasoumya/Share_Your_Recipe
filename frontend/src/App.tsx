import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Feed from './pages/Feed'
import NewRecipe from './pages/NewRecipe'
import RecipeDetail from './pages/RecipeDetail'
import Navbar from './components/Navbar'
import { AuthProvider, useAuth } from './auth/AuthContext'

function ProtectedRoute({ children }: { children: JSX.Element }) {
	const { token } = useAuth()
	if (!token) return <Navigate to="/signin" />
	return children
}

export default function App() {
	return (
		<AuthProvider>
			<div className="min-h-screen">
				<Navbar />
				<div className="max-w-3xl mx-auto px-4 py-6">
					<Routes>
						<Route path="/" element={<Feed />} />
						<Route path="/signin" element={<SignIn />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/new" element={<ProtectedRoute><NewRecipe /></ProtectedRoute>} />
						<Route path="/recipes/:id" element={<RecipeDetail />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</div>
			</div>
		</AuthProvider>
	)
}


