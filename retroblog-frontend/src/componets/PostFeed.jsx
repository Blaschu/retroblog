import { useEffect, useRef, useCallback, useState } from "react";
import "./PostFeed.css";

const PAGE_SIZE = 10; // cuantos posts se muestran por "pagina" de scroll

function PostFeed() {
    const [allPosts, setAllPosts] = useState([]); // todos los posts traidos del backend
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE); // cuantos se muestran ahora
    const [loading, setLoading] = useState(true);
    const observerTarget = useRef(null);

    // Trae todos los posts una sola vez. Si tu backend soporta paginacion real
    // (ej: /api/posts/?page=1), lo ideal es pedir de a paginas en vez de traer todo.
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/posts/")
            .then((response) => response.json())
            .then((data) => {
                setAllPosts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
                setLoading(false);
            });
    }, []);

    const loadMore = useCallback(() => {
        setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, allPosts.length));
    }, [allPosts.length]);

    // Observa un elemento "sentinela" al final de la lista; cuando entra en pantalla, carga mas.
    useEffect(() => {
        const target = observerTarget.current;
        if (!target) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    loadMore();
                }
            },
            { root: null, rootMargin: "100px", threshold: 0 }
        );

        observer.observe(target);
        return () => observer.disconnect();
    }, [loadMore]);

    const visiblePosts = allPosts.slice(0, visibleCount);
    const hasMore = visibleCount < allPosts.length;

    return (
        <div className="post-feed">
            <h1 className="post-feed-title">¡Blog Stream!</h1>

            <div className="post-scroll-area">
                {loading && <p className="post-feed-status">Loading posts...</p>}

                {!loading && visiblePosts.length === 0 && (
                    <p className="post-feed-status">No posts yet.</p>
                )}

                <ul className="post-list">
                    {visiblePosts.map((post) => (
                        <li key={post.id} className="post-card">
                            <h2 className="post-card-title">{post.title}</h2>
                            <p className="post-card-content">{post.content}</p>
                        </li>
                    ))}
                </ul>

                {/* Elemento sentinela: cuando se vuelve visible, dispara loadMore() */}
                {hasMore && (
                    <div ref={observerTarget} className="post-feed-sentinel">
                        Loading more...
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostFeed;
