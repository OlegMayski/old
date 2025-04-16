import React from "react";
import { Link } from "react-router-dom";
const ResultDetails = () => {
    return (
        <div>
            <h1>Результаты</h1>
            <ul>
                <li>
                    <Link to="/results/1">Результат 1</Link>
                </li>
                <li>
                    <Link to="/results/2">Результат 2</Link>
                </li>
            </ul>
        </div>
    );
};

export default ResultDetails;
