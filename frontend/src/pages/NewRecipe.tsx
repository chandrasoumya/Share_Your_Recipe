import { FormEvent, useState } from 'react'
import { api } from '../api/client'
import { useNavigate } from 'react-router-dom'

export default function NewRecipe() {
	const [title, setTitle] = useState('')
	const [ingredients, setIngredients] = useState('')
	const [method, setMethod] = useState('')
	const [error, setError] = useState<string | null>(null)
	const navigate = useNavigate()

	async function submit(e: FormEvent) {
		e.preventDefault()
		setError(null)
		try {
			const res = await api.post('/recipes', { title, ingredients, method })
			navigate(`/recipes/${res.data.id}`)
		} catch (err: any) {
			setError(err?.response?.data?.message ?? 'Could not create recipe')
		}
	}

	return (
		<div className="max-w-2xl mx-auto">
			<h1 className="text-2xl font-semibold mb-4">New Recipe</h1>
			<form onSubmit={submit} className="space-y-3">
				<input className="w-full border rounded px-3 py-2" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
				<textarea className="w-full border rounded px-3 py-2 h-28" placeholder="Ingredients" value={ingredients} onChange={e => setIngredients(e.target.value)} />
				<textarea className="w-full border rounded px-3 py-2 h-36" placeholder="Method" value={method} onChange={e => setMethod(e.target.value)} />
				{error && <div className="text-red-600 text-sm">{error}</div>}
				<button className="px-4 py-2 rounded bg-indigo-600 text-white">Publish</button>
			</form>
		</div>
	)
}


