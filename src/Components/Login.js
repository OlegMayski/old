import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Login = ({ setLocation }) => {
    const [data, setData] = useState({ login: "", password: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        axios
            .post("/PHP/login.php", data)
            .then((response) => {
                const check = parseInt(response.data);
                console.log(response.data);
                if (check !== 0) {
                    window.location.assign("/");
                } else {
                    setErrorMessage("Неверные учетные данные");
                }
            })
            .catch((error) => {
                console.error("Ошибка при получении данных:", error);
            });
    };

    const handleInputChange = (e, field) => {
        setData({ ...data, [field]: e.target.value });
    };

    return (
        <main
            style={{
                display: "flex",
                padding: "20px 0px",
                justifyContent: "center",
                alignItems: "flex-start",
                height: "100vh",
            }}
        >
            <div
                style={{
                    width: "300px",
                    padding: "20px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
                    Авторизация
                </h2>
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: "15px" }}>
                        <input
                            type="text"
                            value={data.login}
                            onChange={(e) => handleInputChange(e, "login")}
                            placeholder="Логин"
                            style={{
                                width: "97%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        />
                    </div>
                    <div style={{ marginBottom: "15px" }}>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => handleInputChange(e, "password")}
                            placeholder="Пароль"
                            style={{
                                width: "97%",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                            }}
                        />
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button
                            type="submit"
                            style={{
                                padding: "10px 20px",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Войти
                        </button>
                    </div>
                    {errorMessage && (
                        <p
                            style={{
                                color: "red",
                                textAlign: "center",
                                marginTop: "10px",
                            }}
                        >
                            {errorMessage}
                        </p>
                    )}
                </form>
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <a href="/registration" style={{ color: "#007bff" }}>
                        Зарегистрироваться
                    </a>
                </div>
            </div>
        </main>
    );
};

export default Login;
