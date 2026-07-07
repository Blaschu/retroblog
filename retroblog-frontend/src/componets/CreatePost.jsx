import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CreatePost.css'

function CreatePost() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://127.0.0.1:8000/api/posts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`)
                }
                return response.json()
            })
            .then(() => {
                navigate('/')
            })
            .catch((error) => console.error('Error creating post:', error))
    }

    return (
        <form onSubmit={handleSubmit} className="create-post-form">
            <h1 className="create-post-title">¡New Post!</h1>

            <div className="create-post-body">
                {/* Campo título, oculto visualmente como input pero funcional */}
                <input
                    type="text"
                    id="title"
                    className="create-post-title-input"
                    placeholder="Title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    id="content"
                    className="create-post-textarea"
                    placeholder="Start writing your thoughts..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
            </div>

            <div className="create-post-actions">
                <button
                    type="button"
                    className="btn-logout"
                    onClick={() => navigate('/')}
                >
                    Logout
                </button>
                <button type="submit" className="btn-post">
                    Post
                </button>
            </div>
        </form>
    )
}

export default CreatePost
