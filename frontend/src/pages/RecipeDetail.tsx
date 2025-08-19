import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../api/client'
import { useAuth } from '../auth/AuthContext'

type Recipe = {
	id: number
	title: string
	ingredients: string
	method: string
	author: { username: string }
	likedBy: Array<{ username: string }>
	comments: Array<{ id: number; content: string; author: { username: string } }>
}

export default function RecipeDetail() {
	const { id } = useParams()
	const [recipe, setRecipe] = useState<Recipe | null>(null)
	const [comment, setComment] = useState('')
	const { token, user } = useAuth()
	const navigate = useNavigate()

	async function fetchRecipe() {
		if (!id) return
		const res = await api.get<Recipe[]>('/recipes')
		const r = res.data.find(x => String(x.id) === id) || null
		setRecipe(r)
	}

	useEffect(() => { fetchRecipe() }, [id])

	async function like() {
		await api.post(`/recipes/${id}/like`)
		fetchRecipe()
	}
	async function unlike() {
		await api.post(`/recipes/${id}/unlike`)
		fetchRecipe()
	}
	async function favorite() {
		await api.post(`/recipes/${id}/favorite`)
	}
	async function unfavorite() {
		await api.post(`/recipes/${id}/unfavorite`)
	}
	async function deleteRecipe() {
		await api.delete(`/recipes/${id}`)
		navigate('/')
	}
	async function addComment() {
		if (!comment.trim()) return
		await api.post(`/recipes/${id}/comments`, { content: comment })
		setComment('')
		fetchRecipe()
	}
	async function deleteComment(commentId: number) {
		await api.delete(`/recipes/comments/${commentId}`)
		fetchRecipe()
	}

	if (!recipe) return <div>Loading...</div>

	const hasLiked = !!recipe.likedBy?.find(l => l.username === user?.username)
	const isAuthor = recipe.author?.username === user?.username

	return (
		<div className="space-y-4">
			<div className="bg-white border rounded p-4">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-semibold">{recipe.title}</h1>
					<div className="text-sm text-gray-600">by {recipe.author?.username}</div>
				</div>
				<div className="mt-3">
					<h2 className="font-semibold">Ingredients</h2>
					<p className="whitespace-pre-wrap text-gray-800">{recipe.ingredients}</p>
				</div>
				<div className="mt-3">
					<h2 className="font-semibold">Method</h2>
					<p className="whitespace-pre-wrap text-gray-800">{recipe.method}</p>
				</div>
				<div className="mt-4 flex gap-2 items-center">
					<span>❤️ {recipe.likedBy?.length ?? 0}</span>
					{token && (
						<>
							{hasLiked ? (
								<button onClick={unlike} className="px-3 py-1.5 rounded border">Unlike</button>
							) : (
								<button onClick={like} className="px-3 py-1.5 rounded border">Like</button>
							)}
							<button onClick={favorite} className="px-3 py-1.5 rounded border">Favourite</button>
							<button onClick={unfavorite} className="px-3 py-1.5 rounded border">Unfavourite</button>
							{isAuthor && <button onClick={deleteRecipe} className="px-3 py-1.5 rounded bg-red-600 text-white">Delete</button>}
						</>
					)}
				</div>
			</div>

			<div className="bg-white border rounded p-4">
				<h2 className="font-semibold mb-2">Comments</h2>
				<div className="space-y-3">
					{recipe.comments?.map(c => (
						<div key={c.id} className="border rounded p-2">
							<div className="text-sm text-gray-600 mb-1">{c.author?.username}</div>
							<p>{c.content}</p>
							{token && (c.author?.username === user?.username || isAuthor) && (
								<button onClick={() => deleteComment(c.id)} className="mt-1 text-sm text-red-600">Delete</button>
							)}
						</div>
					))}
				</div>
				{token && (
					<div className="mt-3 flex gap-2">
						<input className="flex-1 border rounded px-3 py-2" placeholder="Add a comment" value={comment} onChange={e => setComment(e.target.value)} />
						<button onClick={addComment} className="px-3 py-2 rounded bg-indigo-600 text-white">Post</button>
					</div>
				)}
			</div>
		</div>
	)
}


