import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type AuthContextType = {
	token: string | null
	user: { username: string; email: string } | null
	signIn: (token: string, user: { username: string; email: string }) => void
	signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))
	const [user, setUser] = useState<{ username: string; email: string } | null>(() => {
		const raw = localStorage.getItem('user')
		return raw ? JSON.parse(raw) : null
	})

	useEffect(() => {
		if (token) localStorage.setItem('token', token)
		else localStorage.removeItem('token')
	}, [token])

	useEffect(() => {
		if (user) localStorage.setItem('user', JSON.stringify(user))
		else localStorage.removeItem('user')
	}, [user])

	const value = useMemo<AuthContextType>(() => ({
		token,
		user,
		signIn: (t, u) => { setToken(t); setUser(u) },
		signOut: () => { setToken(null); setUser(null) },
	}), [token, user])

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error('useAuth must be used within AuthProvider')
	return ctx
}


