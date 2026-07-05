import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


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
            .catch((error) => console.error('Error creating post:', error))}

    return(
        <form onSubmit={handleSubmit} className="create-post-form">
            <h1>Create a New Post</h1>
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="content">Content:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
            </div>
            <button type="submit">Create Post</button>
        </form>
    )
}; 

export default CreatePost