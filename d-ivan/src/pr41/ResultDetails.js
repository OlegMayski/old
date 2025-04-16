import React from "react";
import { useParams } from "react-router-dom";

const ResultsPage = () => {
    const { resultId } = useParams();
    return (
        <div>
            <h1>Результаты {resultId}</h1>
        </div>
    );
};

export default ResultsPage;
