import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import "./Css/Linux.css";
const linuxQuestions = [
    {
        question: "Какой командой можно получить список файлов и директорий в текущей директории?",
        options: [
            "ls",
            "cd",
            "pwd",
            "mkdir"
        ],
        answer: 0
    },
    {
        question: "Какой командой можно сменить текущую директорию?",
        options: [
            "ls",
            "cd",
            "pwd",
            "mkdir"
        ],
        answer: 1
    },
    {
        question: "Какой командой можно создать новую директорию?",
        options: [
            "ls",
            "cd",
            "pwd",
            "mkdir"
        ],
        answer: 3
    },
    {
        question: "Какой командой можно удалить файл?",
        options: [
            "rm",
            "delete",
            "remove",
            "del"
        ],
        answer: 0
    },
    {
        question: "Какой командой можно просмотреть содержимое файла?",
        options: [
            "cat",
            "view",
            "open",
            "read"
        ],
        answer: 0
    },
    {
        question: "Какой командой можно переместить или переименовать файл?",
        options: [
            "mv",
            "move",
            "rename",
            "transfer"
        ],
        answer: 0
    },
    {
        question: "Какой командой можно изменить права доступа к файлу?",
        options: [
            "chmod",
            "chown",
            "chgrp",
            "chaccess"
        ],
        answer: 0
    },
    {
        question: "Какой командой можно изменить владельца файла?",
        options: [
            "chmod",
            "chown",
            "chgrp",
            "chaccess"
        ],
        answer: 1
    },
    {
        question: "Какой командой можно отобразить текущий путь?",
        options: [
            "ls",
            "cd",
            "pwd",
            "path"
        ],
        answer: 2
    },
    {
        question: "Какой командой можно просмотреть сетевые интерфейсы?",
        options: [
            "ifconfig",
            "netstat",
            "ipconfig",
            "network"
        ],
        answer: 4
    }
];

const Linux = ({ auth }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const handleOptionChange = (event) => {
        setSelectedOption(parseInt(event.target.value));
    };

    const handleNextQuestion = () => {
        if (selectedOption === linuxQuestions[currentQuestion].answer) {
            setScore(score + 1);
        }
        setSelectedOption(null);
        if (currentQuestion + 1 < linuxQuestions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
            const formData = new FormData();
                formData.append("user", auth);
                formData.append("id_test", 3);
                formData.append("score",  score);
                console.log(score);
                formData.append("length",  linuxQuestions.length);
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
    <div className="linux-quiz-container">
        {showResult ? (
            <div className="result-container">
                <h2 className="result-title">Ваш результат: {score} из {linuxQuestions.length}</h2>
            </div>
        ) : (
            <div className="question-container">
                <h2 className="question-title">Вопрос {currentQuestion + 1} из {linuxQuestions.length}</h2>
                <p className="question-text">{linuxQuestions[currentQuestion].question}</p>
                <div className="options-container">
                    {linuxQuestions[currentQuestion].options.map((option, index) => (
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
                    {currentQuestion + 1 === linuxQuestions.length ? "Завершить" : "Следующий"}
                </button>
            </div>
        )}
    </div>
    );
};

export default Linux;