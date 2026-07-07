import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import PostFeed from './componets/PostFeed';
import CreatePost from './componets/CreatePost';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <h1 className="app-title">Retro Blog</h1>

                <div className="app-content">
                    <nav className="app-menu">
                        <span className="app-menu-label">Menu</span>
                        <h2 className="app-menu-title">Actions</h2>

                        <NavLink
                            to="/create"
                            className={({ isActive }) =>
                                isActive ? 'menu-btn menu-btn-active' : 'menu-btn'
                            }
                        >
                            New Post
                        </NavLink>

                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive ? 'menu-btn menu-btn-active' : 'menu-btn'
                            }
                        >
                            Profile
                        </NavLink>

                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive ? 'menu-btn menu-btn-active' : 'menu-btn'
                            }
                        >
                            My Post's
                        </NavLink>

                        <NavLink
                            to="/logout"
                            className={({ isActive }) =>
                                isActive ? 'menu-btn menu-btn-active' : 'menu-btn'
                            }
                        >
                            Logout
                        </NavLink>
                    </nav>

                    <main className="app-main">
                        <Routes>
                            <Route path="/" element={<PostFeed />} />
                            <Route path="/create" element={<CreatePost />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
