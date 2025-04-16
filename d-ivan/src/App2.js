import React, { Fragment } from "react";
import { Component, useState } from "react";
import styles from "./App.module.css";
const App2 = () => {
    const tarifs = {
        tarif1: ["Входящие", true, "400", false],
        tarif2: ["Входящие", true, "525", true],
        tarif3: ["Входящие", false, "700", false],
        tarif5: ["ГТС", true, "400", false],
        tarif6: ["ГТС", true, "525", true],
    };
    const [inputValue1, setInputValue1] = useState("");
    const [inputValue2, setInputValue2] = useState("");
    const [checkValue1, setCheckValue1] = useState(false);
    const [checkValue2, setCheckValue2] = useState(false);
    const [inputName, setNameValue] = useState("");
    const [answer, setAnswer] = useState("");
    const [showall, setShowall] = useState(false);
    const handleInputChange1 = (event) => {
        setInputValue1(event.target.value);
    };
    const handleInputChange2 = (event) => {
        setInputValue2(event.target.value);
    };
    const handleCheckChange1 = (event) => {
        setCheckValue1(event.target.checked);
    };
    const handleCheckChange2 = (event) => {
        setCheckValue2(event.target.checked);
    };
    const handleNameChange = (event) => {
        setNameValue(event.target.value);
    };
    const handleSubmit1 = () => {
        setShowall(false);
        const call = [inputValue1, checkValue1, inputValue2, checkValue2];
        for (let key in tarifs) {
            if (call.toString() == tarifs[key].toString()) {
                setAnswer(key);
                console.log("ura");
                break;
            }
            setAnswer("");
        }
        Object.entries(tarifs).map(([tarif, details]) =>
            details.map((detail) => console.log(detail))
        );
    };
    const handleSubmit2 = () => {
        setAnswer("");
        setShowall(true);
    };
    const handleSubmit3 = () => {
        const call = [inputValue1, checkValue1, inputValue2, checkValue2];
        tarifs[inputName] = call;
        console.log(tarifs.keys);
    };
    const output = (
        <div>
            {answer && <p>Предлагаемый тарифный план:</p>}
            {answer}
            {answer && <p>Данный пакет содержит</p>}
            {answer && (
                <p>
                    Тип звонков {tarifs[answer][0]}
                    <br /> Дополнительная плата {tarifs[answer][1].toString()}
                    <br />
                    Цена {tarifs[answer][2]} <br />
                    Бесплатные минуты
                    {tarifs[answer][3].toString()}
                </p>
            )}
            {showall &&
                Object.entries(tarifs).map(([tarif, details]) => (
                    <tr key={tarif}>
                        <td>{tarif}</td>
                        {details.map((detail, index) => (
                            <td key={index}>{detail.toString()}</td>
                        ))}
                    </tr>
                ))}
        </div>
    );

    return (
        <div>
            <h2>Выбор тарифного плана </h2>
            Тип звонков
            <input
                type="text"
                value={inputValue1}
                onChange={handleInputChange1}
            ></input>
            <br />
            Наличие дополнительной платы
            <input
                type="checkbox"
                checked={checkValue1}
                onChange={handleCheckChange1}
            ></input>
            <br />
            Размер абонентской платы:
            <input
                type="text"
                value={inputValue2}
                onChange={handleInputChange2}
            ></input>
            <br />
            Бесплатные звонки на домашние телефоны города:
            <input
                type="checkbox"
                checked={checkValue2}
                onChange={handleCheckChange2}
            ></input>
            <br />
            <button onClick={handleSubmit1}>Найти</button>
            <button onClick={handleSubmit2}>Показать все</button>
            <button onClick={handleSubmit3}>Добавить</button>
            <input
                type="text"
                value={inputName}
                onChange={handleNameChange}
            ></input>
            {output}
        </div>
    );
};
export default App2;
