import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import './Css/AES.css';
import myDataTestAES from "../myDataTestAES.json"
const aesQuestions = myDataTestAES

const Aes = ({ auth }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const handleOptionChange = (event) => {
        setSelectedOption(parseInt(event.target.value));
    };

    const handleNextQuestion = () => {
        if (selectedOption === aesQuestions[currentQuestion].answer) {
            setScore(score + 1);
        }
        setSelectedOption(null);
        if (currentQuestion + 1 < aesQuestions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
            const formData = new FormData();
                formData.append("user", auth);
                formData.append("id_test", 1);
                formData.append("score",  score);
                console.log(score);
                formData.append("length",  aesQuestions.length);
                axios
                    .post("/PHP/saveTestResult.php", formData)
                    .then((response) => {
                        console.log("File uploaded without errors:", response.data);
                        alert(response.data);
                    })
                    .catch((error) => {
                        console.error("Error uploading file:", error);
                        alert(error);
                });
        }
    };
    if(auth==0 || auth == null){
        return (
            <div>Вы не авторизированы</div>
        )
    }
    return (
    <div className="aes-quiz-container">
        {showResult ? (
            <div className="result-container">
                <h2 className="result-title">Ваш результат: {score} из {aesQuestions.length}</h2>
            </div>
        ) : (
            <div className="question-container">
                <h2 className="question-title">Вопрос {currentQuestion + 1} из {aesQuestions.length}</h2>
                <p className="question-text">{aesQuestions[currentQuestion].question}</p>
                <div className="options-container">
                    {aesQuestions[currentQuestion].options.map((option, index) => (
                        <div key={index} className="option">
                            <input
                                type="radio"
                                id={`option-${index}`}
                                name="option"
                                value={index}
                                checked={selectedOption === index}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor={`option-${index}`} className="option-label">{option}</label>
                        </div>
                    ))}
                </div>
                <button
                    className="next-button"
                    onClick={handleNextQuestion}
                    disabled={selectedOption === null}
                >
                    {currentQuestion + 1 === aesQuestions.length ? "Завершить" : "Следующий"}
                </button>
            </div>
        )}
    </div>
    );
};

export default Aes;