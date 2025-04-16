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
        <div className="registration-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleRegistration} className="registration-form">
                <div className="input-group">
                    <input
                        type="text"
                        id="login"
                        value={data.login}
                        onChange={(e) => handleInputChange(e, "login")}
                        placeholder="Логин"
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        id="password"
                        value={data.password}
                        onChange={(e) => handleInputChange(e, "password")}
                        placeholder="Пароль"
                    />
                </div>
                <button type="submit" className="submit-button">
                    Зарегистрироваться
                </button>{" "}
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default Registration;
