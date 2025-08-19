import axios from 'axios'
import { useAuth } from '../auth/AuthContext'

export const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8080'

export const api = axios.create({ baseURL: `${API_BASE}/api` })

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token')
	if (token) config.headers.Authorization = `Bearer ${token}`
	return config
})

export type JwtResponse = { token: string; username: string; email: string }


