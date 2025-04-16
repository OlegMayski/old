import React from "react";
import { useState } from "react";

const App1 = () => {
    const typeCall = ["Входящие", "Исходящие", "на телефоны ГТС"];
    const dopPlata = ["Да", "Нет"];
    const freeCall = ["Да", "Нет"];
    const abonentPlata = ["400", "525", "700"];
    const solutions = {
        Входящие: {
            Да: {
                Да: {
                    525: "Тариф Больше стоит 525 рублей и включает в себя Входящие/Исходящие  безлимитные звонки",
                },
                Нет: {
                    400: "Тариф Простой стоит 400 рублей и включает в себя Входящие/Исходящие звонки с платой 1 рубль за минут внутри России",
                },
            },
            Нет: {
                Да: {
                    700: "Тариф Экстра стоит 700 рублей и включает в себя Входящие/Исходящие  безлимитные звонки, а также мобильный интернет",
                },
                Нет: {},
            },
        },
        Исходящие: {
            Да: {
                Да: {
                    525: "Тариф Больше стоит 525 рублей и включает в себя Входящие/Исходящие  безлимитные звонки",
                },
                Нет: {
                    400: "Тариф Простой стоит 400 рублей и включает в себя Входящие/Исходящие звонки с платой 1 рубль за минут внутри России",
                },
            },
            Нет: {
                Да: {
                    700: "Тариф Экстра стоит 700 рублей и включает в себя Входящие/Исходящие  безлимитные звонки, а также мобильный интернет",
                },
                Нет: {},
            },
        },
        "на телефоны ГТС": {
            Да: {
                Да: {
                    400: "Тариф Домашний стоит 400 рублей и включает в себя Входящие/Исходящие звонки с платой 1 рубль за минут внутри России",
                },
                Нет: {},
            },
            Нет: {
                Да: {
                    525: "Тариф Домашний+ стоит 525 рублей и включает в себя Входящие/Исходящие  безлимитные звонки",
                },
                Нет: {},
            },
        },
    };
    const [selectedCall, setSelectedCall] = useState("");
    const [selectedDopPlata, setSelectedDopPlata] = useState("");
    const [selectedAbonentPlata, setselectedAbonentPlata] = useState("");
    const [selectedFreeCall, setSelectedFreeCall] = useState("");
    const handlerCall = (e) => {
        setSelectedCall(e.target.value);
    };
    const handlerDopPlata = (e) => {
        setSelectedDopPlata(e.target.value);
    };
    const handlerAbonentPlata = (e) => {
        setselectedAbonentPlata(e.target.value);
    };
    const handlerFreeCall = (e) => {
        setSelectedFreeCall(e.target.value);
    };
    const output = (
        <div>
            <p>Предлагаемый тарифный план:</p>
            <p>
                {selectedCall &&
                selectedDopPlata &&
                selectedAbonentPlata &&
                selectedFreeCall &&
                solutions[selectedCall][selectedDopPlata][selectedFreeCall][
                    selectedAbonentPlata
                ]
                    ? solutions[selectedCall][selectedDopPlata][
                          selectedFreeCall
                      ][selectedAbonentPlata]
                    : "К сожалению нет подходящего тарифного плана под ваши запросы напишите в тех поддержку мы обязательно с вами свяжемся)"}
            </p>
        </div>
    );
    return (
        <div>
            <h2>Выбор тарифного плана </h2>
            Преобладающий тип звонков:
            <select value={selectedCall} onChange={handlerCall}>
                <option value="">Выберите тип звонков</option>
                {typeCall.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <br />
            Наличие платы за доп. минуты:
            <select value={selectedDopPlata} onChange={handlerDopPlata}>
                <option value="">Выберите наличие доп. платы</option>
                {dopPlata.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <br />
            Размер абонентской платы:
            <select value={selectedAbonentPlata} onChange={handlerAbonentPlata}>
                <option value="">Выберите размер абонентской платы</option>
                {abonentPlata.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <br />
            Бесплатные звонки на домашние телефоны города:
            <select value={selectedFreeCall} onChange={handlerFreeCall}>
                <option value="">Выберите наличие бесплатных звонков</option>
                {freeCall.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <hr />
            {output}
        </div>
    );
};

export default App1;
