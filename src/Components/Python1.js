import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import "./Css/Python1.css"

const questions = [
    {
        question: "Что делает функция `len()` в Python?",
        options: [
            "Возвращает длину строки или списка",
            "Возвращает сумму элементов списка",
            "Возвращает тип объекта",
            "Возвращает первый элемент списка"
        ],
        answer: 0
    },
    {
        question: "Как объявить функцию в Python?",
        options: [
            "function myFunc():",
            "def myFunc():",
            "func myFunc():",
            "declare myFunc():"
        ],
        answer: 1
    },
    {
        question: "Что означает `if __name__ == '__main__':`?",
        options: [
            "Проверяет, что модуль запущен напрямую, а не импортирован",
            "Определяет главную функцию в программе",
            "Указывает, что модуль содержит глобальные переменные",
            "Проверяет, что модуль импортирован"
        ],
        answer: 0
    },
    {
        question: "Как создать список в Python?",
        options: [
            "myList = {}",
            "myList = []",
            "myList = ()",
            "myList = <>"
        ],
        answer: 1
    },
    {
        question: "Как добавить элемент в конец списка?",
        options: [
            "list.append(element)",
            "list.add(element)",
            "list.insert(element)",
            "list.push(element)"
        ],
        answer: 0
    },
    {
        question: "Что возвращает функция `range(5)`?",
        options: [
            "Последовательность от 0 до 5",
            "Последовательность от 1 до 5",
            "Последовательность от 0 до 4",
            "Последовательность от 1 до 4"
        ],
        answer: 2
    },
    {
        question: "Как создать словарь в Python?",
        options: [
            "myDict = []",
            "myDict = ()",
            "myDict = {}",
            "myDict = <>"
        ],
        answer: 2
    },
    {
        question: "Что такое `None` в Python?",
        options: [
            "Тип данных для представления пустого значения",
            "Функция для удаления переменной",
            "Оператор для сравнения значений",
            "Специальный метод класса"
        ],
        answer: 0
    },
    {
        question: "Как можно перехватить исключение в Python?",
        options: [
            "try...except",
            "try...catch",
            "try...finally",
            "try...error"
        ],
        answer: 0
    },
    {
        question: "Как объявить переменную в Python?",
        options: [
            "let variable = value",
            "var variable = value",
            "variable = value",
            "declare variable = value"
        ],
        answer: 4
    }
];

const Python = ({ auth }) => {


    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const handleOptionChange = (event) => {
        setSelectedOption(parseInt(event.target.value));
    };

    const handleNextQuestion = () => {
        if (selectedOption === questions[currentQuestion].answer) {
            setScore(score + 1);
        }
        setSelectedOption(null);
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
            const formData = new FormData();
                formData.append("user", auth);
                formData.append("id_test", 2);
                formData.append("score",  score);
                console.log(score);
                formData.append("length",  questions.length);
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
    console.log("Python auth:",auth);
    if(auth==0 || auth == null){
        return (
            <div>Вы не авторизированы</div>
        )
    }
    return (
        <div className="python-quiz-container">
            {showResult ? (
                <div className="result-container">
                    <h2 className="result-title">Ваш результат: {score} из {questions.length}</h2>
                </div>
            ) : (
                <div className="question-container">
                    <h2 className="question-title">Вопрос {currentQuestion + 1} из {questions.length}</h2>
                    <p className="question-text">{questions[currentQuestion].question}</p>
                    <div className="options-container">
                        {questions[currentQuestion].options.map((option, index) => (
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
                        {currentQuestion + 1 === questions.length ? "Завершить" : "Следующий"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Python;