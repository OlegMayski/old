import React from "react";
import { Link } from "react-router-dom";
const CoursesPage = () => {
    return (
        <div>
            <h1>Курсы</h1>
            <ul>
                <li>
                    <Link to="/courses/1">Курс 1</Link>
                    <button>Зарегистрироваться</button>
                </li>
                <li>
                    <Link to="/courses/2">Курс 2</Link>
                    <button>Зарегистрироваться</button>
                </li>
            </ul>
        </div>
    );
};

export default CoursesPage;
