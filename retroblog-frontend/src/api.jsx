import { useEffect } from "react";

useEffect(() => {
    fetch("http://localhost:8000/api/posts/")
        .then(res => res.json())
        .then(data => sendPost(data));
}, []);