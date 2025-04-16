import React, { useState } from "react";
import axios from "axios";

const Registration = () => {
    const [data, setData] = useState({ login: "", password: "" });
    const [message, setMessage] = useState("");

    const handleRegistration = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/PHP/registration.php", data);
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Произошла ошибка при регистрации");
            console.error("Ошибка при отправке запроса:", error);
        }
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
            <div style={{
                width: "300px",
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "5px",
            }}>
                <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Регистрация</h2>
                <form onSubmit={handleRegistration} >
                    <div style={{ marginBottom: "15px" }}>
                        <input
                            type="text"
                            id="login"
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
                            id="password"
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
                        <button type="submit" style={{
                                padding: "10px 20px",
                                backgroundColor: "#007bff",
                                color: "#fff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}>
                            Зарегистрироваться
                        </button>{" "}
                    </div>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </main>
    );
};

export default Registration;
