import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import ImageList from "./Components/ImageList";
import Login from "./Components/Login";
import Post from "./Components/Post";
import Tags from "./Components/Tags";
import FileUploads from "./Components/FileUploads";
import Registration from "./Components/Registration";
const App5 = () => {
    const [myDataImages, setmyData] = useState([]);
    const [myDataTags, setmyDataTags] = useState([]);
    const [myDataCountsTags, setmyDataCountsTags] = useState([]);
    const [tag, setTag] = useState(""); // Состояние для хранения значения тега
    const [tagSearch, settagSearch] = useState("");
    const [auth, setAuth] = useState(null);
    const handleSearch = (e) => {
        e.preventDefault();
        settagSearch(tag);
    };
    useEffect(() => {
        axios
            .get("/PHP/mySelect.php")
            .then((response) => {
                setmyData(response.data);
            })
            .catch((error) => {
                console.error("Ошибка при получении данных:", error);
            });
        axios
            .get("/PHP/selectCountTags.php")
            .then((response) => {
                setmyDataCountsTags(response.data);
            })
            .catch((error) => {
                console.error("Ошибка при получении данных:", error);
            });
        axios
            .get("/PHP/selectTags.php")
            .then((response) => {
                setmyDataTags(response.data);
            })
            .catch((error) => {
                console.error("Ошибка при получении данных:", error);
            });
        axios
            .post("/PHP/CheckLogin.php")
            .then((response) => {
                setAuth(response.data);
            })
            .catch((error) => {
                console.error("Ошибка при получении данных:", error);
            });
    }, []);
    const handleLogout = async () => {
        try {
            await axios.get("/PHP/logout.php");
            // Перезагрузка страницы после успешного выхода из системы
            window.location.reload();
        } catch (error) {
            console.error("Ошибка при выходе из системы:", error);
        }
    };
    console.log("login: " + auth);
    return (
        <Router>
            <div>
                <header>
                    <nav>
                        <menu>
                            <li>
                                {auth === 0 ? (
                                    <a href="/login">Login</a>
                                ) : (
                                    <a onClick={handleLogout}>Logout</a>
                                )}
                            </li>
                            <li>
                                <a href="/posts">posts</a>
                            </li>
                            <li>
                                <a href="/uploadkartinka">Upload</a>
                            </li>
                        </menu>
                    </nav>
                </header>
                <div id="post-list">
                    <div className="sidebar">
                        <div className="tag-search">
                            <form onSubmit={handleSearch}>
                                {/* Ввод тега */}
                                <input
                                    value={tag}
                                    onChange={(e) => setTag(e.target.value)}
                                />
                                <Link
                                    to="/posts"
                                    className="tag-link"
                                    onClick={() => settagSearch(tag)}
                                >
                                    <button type="submit">search</button>
                                </Link>
                            </form>
                        </div>
                        <div>
                            <Routes>
                                <Route
                                    path="/posts/:postId"
                                    element={
                                        <Tags
                                            settagSearch={settagSearch}
                                            dataCounts={myDataCountsTags}
                                            dataTags={myDataTags}
                                        />
                                    }
                                ></Route>
                                <Route
                                    path="/posts"
                                    element={
                                        <Tags
                                            settagSearch={settagSearch}
                                            dataCounts={myDataCountsTags}
                                            dataTags={myDataTags}
                                        />
                                    }
                                ></Route>
                                <Route
                                    path="/"
                                    element={
                                        <Tags
                                            settagSearch={settagSearch}
                                            dataCounts={myDataCountsTags}
                                            dataTags={myDataTags}
                                        />
                                    }
                                ></Route>
                            </Routes>
                        </div>
                    </div>
                    <div className="content">
                        <Routes>
                            <Route path="/" element={<ImageList />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/registration"
                                element={<Registration />}
                            />
                            <Route
                                path="/posts"
                                element={<ImageList tags={tagSearch} />}
                            />
                            <Route
                                path="/posts/:postId"
                                element={<Post auth={auth} />}
                            />
                            <Route
                                path="/uploadKartinka"
                                element={<FileUploads auth={auth} />}
                            ></Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};
export default App5;
