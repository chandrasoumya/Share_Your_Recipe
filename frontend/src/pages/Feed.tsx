import { useEffect, useState } from 'react'
import { api } from '../api/client'
import { Link } from 'react-router-dom'

type Recipe = {
	id: number
	title: string
	ingredients: string
	method: string
	author: { username: string }
	likedBy: Array<{ username: string }>
}

export default function Feed() {
	const [recipes, setRecipes] = useState<Recipe[]>([])

	useEffect(() => {
		api.get<Recipe[]>('/recipes').then(r => setRecipes(r.data))
	}, [])

	return (
		<div className="space-y-4">
			{recipes.map(r => (
				<div key={r.id} className="bg-white rounded border p-4">
					<div className="flex items-center justify-between">
						<Link to={`/recipes/${r.id}`} className="text-lg font-semibold">{r.title}</Link>
						<span className="text-sm text-gray-600">by {r.author?.username}</span>
					</div>
					<p className="mt-2 text-sm text-gray-700 line-clamp-3">{r.ingredients}</p>
					<div className="mt-3 text-sm text-gray-600">❤️ {r.likedBy?.length ?? 0}</div>
				</div>
			))}
		</div>
	)
}


