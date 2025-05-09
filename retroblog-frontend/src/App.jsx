import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostFeed from './componets/PostFeed';
import CreatePost from './componets/CreatePost';
import './App.css'

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PostFeed />} />
        <Route path="/create" element={<CreatePost />} />
      </Routes>
    </Router>
  
  );
}

export default App;
