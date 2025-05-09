import { use, useEffect } from "react";

function PostFeed() {
    cosnt [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/posts/")
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.error("Error fetching posts:", error));
    }, []);

    return(
        <div className="post-feed">
            <h1>RetroBlog</h1>
            <ul>
            {posts.map((post) => (
                <li key={post.id} className="post">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </li>
            ))}
            </ul>
        </div>
    );
}
export default PostFeed;