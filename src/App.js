import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import Img from './test.png';
import FirstPage from "./Components/FirstPage";
import Holland from "./Components/Holland"
import Tests from "./Components/Tests"
import Python from "./Components/Python1"
import Linux from "./Components/Linux"
import Aes from "./Components/Aes"
import Login from "./Components/Login";
import Registration from "./Components/Registration";

function App() {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
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
        window.location.reload();
    } catch (error) {
        console.error("Ошибка при выходе из системы:", error);
    }
  };
  console.log(auth);
  return (
    <Router>
      <div className="main">
            <div>
                <div className="log"
                    ><img
                        src={Img}
                    />
                    <a href="/" className="spec">
                        Балаковский инженерно-технологический институт <br />
                        филиал НИЯУ МИФИ
                    </a>
                    <div className="spec2">
                      {auth === 0 ? (
                        <a href="/login">Войти в профиль</a>
                      ) : (
                        <a onClick={handleLogout}>Выйти из профиля</a>
                      )}
                    </div>
                </div>
            </div>
            <nav>
                <a href="/">Главная</a>
                <a href="/Holland">Тестирование Голланда</a>
                <a href="/Tests">Тесты</a>
            </nav>
      <div className="container">
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/Holland" element={<Holland auth={auth} />} />
        <Route path="/Tests" element={<Tests auth={auth} />} />
        <Route path="/Tests/python" element={<Python auth={auth} />} />
        <Route path="/Tests/linux" element={<Linux auth={auth} />} />
        <Route path="/Tests/aes" element={<Aes auth={auth} />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registration" element={<Registration/>} />
      </Routes>
      </div>
      </div>

    </Router>
  );
}

export default App;
