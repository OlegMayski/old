import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import "./Css/Holland.css";
const hollandQuestions = [
    { question: "Работы на легковом автомобиле", type: "Реалистичный" },
    { question: "Ремонт электроприборов", type: "Реалистичный" },
    { question: "Работы на дачном участке", type: "Реалистичный" },
    { question: "Работа автомеханика", type: "Реалистичный" },
    { question: "Работа сварщика", type: "Реалистичный" },
    { question: "Работа инженер-механика", type: "Реалистичный" },

    { question: "Работа в лаборатории", type: "Исследовательский" },
    { question: "Читать научные книги и журналы", type: "Исследовательский" },
    { question: "Размышлять над научными проблемами", type: "Исследовательский" },
    { question: "Работа физика", type: "Исследовательский" },
    { question: "Работа химика", type: "Исследовательский" },
    { question: "Работа научным сотрудником ", type: "Исследовательский" },

    { question: "Игра на музыкальном инструменте", type: "Артистичный" },
    { question: "Писать для газеты или журнала", type: "Артистичный" },
    { question: "Заниматься рисунком или живописью", type: "Артистичный" },
    { question: "Работа музыканта", type: "Артистичный" },
    { question: "Работа художника", type: "Артистичный" },
    { question: "Работа актера", type: "Артистичный" },

    { question: "Работать в сфере социальной поддержки и защиты", type: "Социальный" },
    { question: "Преподавать в учебных учреждениях", type: "Социальный" },
    { question: "Дискутировать по вопросам отношений между людьми", type: "Социальный" },
    { question: "Работа психолога", type: "Социальный" },
    { question: "Работа социолога", type: "Социальный" },
    { question: "Работать преподавателем института", type: "Социальный" },

    { question: "Быть руководителем проекта или мероприятия", type: "Предпринимательский" },
    { question: "Руководить работой других", type: "Предпринимательский" },
    { question: "Организовывать собственное дело и управлять им", type: "Предпринимательский" },
    { question: "Работа адвоката", type: "Предпринимательский" },
    { question: "Работа управляющим фирмой", type: "Предпринимательский" },
    { question: "Работа управляющим магазином", type: "Предпринимательский" },

    { question: "Записывать свои расходы", type: "Конвенциональный" },
    { question: "Заполнять стандартные формы", type: "Конвенциональный" },
    { question: "Содержать свой рабочий стол и помещение в полном порядке", type: "Конвенциональный" },
    { question: "Работа секретаря", type: "Конвенциональный" },
    { question: "Работа экономиста", type: "Конвенциональный" },
    { question: "Работа бухгалтера", type: "Конвенциональный" },
    
];

const Holland = ({ auth }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState({
        Реалистичный: 0,
        Исследовательский: 0,
        Артистичный: 0,
        Социальный: 0,
        Предпринимательский: 0,
        Конвенциональный: 0,
    });
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const handleOptionChange = (event) => {
        setSelectedOption(parseInt(event.target.value));
    };

    const handleNextQuestion = () => {
        if (selectedOption !== null) {
            const updatedScore = { ...score };
            updatedScore[hollandQuestions[currentQuestion].type] += selectedOption;
            setScore(updatedScore);
            setSelectedOption(null);
            if (currentQuestion + 1 < hollandQuestions.length) {
                setCurrentQuestion(currentQuestion + 1);
            } else {
                setShowResult(true);
                const formData = new FormData();
                formData.append("user", auth);
                formData.append("type", getHighestScoreType());
                formData.append("score",  JSON.stringify(updatedScore));
                axios
                    .post("/PHP/saveTestHolland.php", formData)
                    .then((response) => {
                        console.log("File uploaded without errors:", response.data);
                        alert(response.data);
                    })
                    .catch((error) => {
                        console.error("Error uploading file:", error);
                        alert(error);
                });
            }
        }
    };

    const getHighestScoreType = () => {
        return Object.keys(score).reduce((a, b) => (score[a] > score[b] ? a : b));
    };
    if(auth==0 || auth == null){
        return (
            <div>Вы не авторизированы</div>
        )
    }
    return (
        <div className="holland-quiz-container">
            {showResult ? (
                <div className="result-container">
                    <h2 className="result-title">Ваш тип личности: {getHighestScoreType()}</h2>
                    {Object.entries(score).map(([type, value]) => (
                            <p key={type} className="result-text">{type}: {value}</p>
                    ))}
                </div>
            ) : (
                <div className="question-container">
                    <h2 className="question-title">Вопрос {currentQuestion + 1} из {hollandQuestions.length}
                        <br/>Ответьте на вопрос вам нравится
                    </h2>
                    <p className="question-text">{hollandQuestions[currentQuestion].question}</p>
                    <div className="options-container">
                        <label className="option-label">
                            <input
                                type="radio"
                                value="1"
                                checked={selectedOption === 1}
                                onChange={handleOptionChange}
                            />
                            Да
                        </label>
                        <label className="option-label">
                            <input
                                type="radio"
                                value="0"
                                checked={selectedOption === 0}
                                onChange={handleOptionChange}
                            />
                            Нет
                        </label>
                    </div>
                    <button
                        className="next-button"
                        onClick={handleNextQuestion}
                        disabled={selectedOption === null}
                    >
                        {currentQuestion + 1 === hollandQuestions.length ? "Завершить" : "Следующий"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Holland;