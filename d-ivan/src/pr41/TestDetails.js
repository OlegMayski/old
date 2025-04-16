import React from "react";
import { useParams } from "react-router-dom";

const TestDetails = () => {
    const { testId } = useParams();

    return (
        <div>
            <h1>Детали теста {testId}</h1>
        </div>
    );
};

export default TestDetails;
