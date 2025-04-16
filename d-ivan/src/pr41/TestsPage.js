import React from "react";
import { Link } from "react-router-dom";

const TestDetails = () => {
    return (
        <div>
            <h1>Тесты</h1>
            <ul>
                <li>
                    <Link to="/tests/1">Тест 1</Link>
                </li>
                <li>
                    <Link to="/tests/2">Тест 2</Link>
                </li>
            </ul>
        </div>
    );
};

export default TestDetails;
