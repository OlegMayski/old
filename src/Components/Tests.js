import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import './Css/Tests.css';
import ShareButtons from './ShareButtons';

const Tests = ({ auth }) => {

    const [myData, setmyData] = useState([]);
    const [hollandResult, setHollandResult] = useState(null);

    useEffect(() => {
        axios
            .get("/PHP/selectTests.php")
            .then((response) => {
                setmyData(response.data.tests);
                setHollandResult(response.data.holland);
                console.log(response.data);
            })
            .catch((error) => {
                console.error("Ошибка при получении данных:", error);
            });
      }, []);
    const getCourseRecommendation = (type) => {
        const recommendedTests = myData.filter(test => test.tags === type);
        return recommendedTests.map(test => (
            <p key={test.id}>Рекомендуемый курс: <a href={`/Tests/${test.name}`}>{test.name}</a></p>
        ));
    };
    if(auth==0 || auth == null){
        return (
            <div>Вы не авторизированы</div>
        )
    }
    const shareUrl = window.location.href;
    const shareTitle = "Результаты теста Голланда";
    return (
        <div className="tests-container">
            <div className="available-tests">
                <h2 className="centered">Доступные тесты</h2>
                {myData.map((item) => (
                <span key={item.id} className="test-item">
                    <a href={`/Tests${item.src}`} className="test-link">{item.name}</a>
                    <p className="test-description">{item.description}</p>
                    {item.score !== null ? (
                        <p className="test-result">
                            Последний результат: {item.score} из {item.length}, дата: {item.date}
                        </p>
                    ) : (
                        <p className="test-result">Результатов нет</p>
                    )}
                </span>
                ))}
            </div>
            {hollandResult && (
            <div className="holland-results">
                <h2 className="centered">Результаты теста Голланда</h2>
                <p>Тип личности: {hollandResult.type}</p>
                <p>Реалистичный: {hollandResult.Realistic}</p>
                <p>Интеллектуальный: {hollandResult.Intelligency}</p>
                <p>Артистичный: {hollandResult.Artistic}</p>
                <p>Социальный: {hollandResult.Social}</p>
                <p>Предпринимательский: {hollandResult.Enterprise}</p>
                <p>Конвенциональный: {hollandResult.Convencial}</p>
                {hollandResult.type && getCourseRecommendation(hollandResult.type)}
                <div className="share-container">
                    <h3>Поделиться результатами</h3>
                    <ShareButtons/>
                </div>
            </div>
            )}
        </div>
    );
};

export default Tests;