import React, { Fragment } from "react";
import { Component, useState } from "react";
import styles from "./App.module.css";
import { Button, Card } from "antd";
import Img from "./images.jpg";

class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = { time: new Date().toLocaleTimeString() };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            time: new Date().toLocaleTimeString(),
        });
    }

    render() {
        return (
            <Card className={`${styles.card}`}>
                <h1>Текущее время:</h1>
                <h3>{this.state.time}</h3>
            </Card>
        );
    }
}
class Item extends Component {
    render() {
        return <li>{this.props.name}</li>;
    }
}

class SearchPlugin extends Component {
    constructor(props) {
        super(props);
        this.onTextChanged = this.onTextChanged.bind(this);
    }

    onTextChanged(e) {
        var text = e.target.value.trim();
        this.props.filter(text);
    }

    render() {
        return <input placeholder="Поиск" onChange={this.onTextChanged} />;
    }
}
class ItemList extends Component {
    constructor(props) {
        super(props);
        this.state = { items: this.props.data.items };
        this.filterlist = this.filterlist.bind(this);
    }

    componentWillMount() {
        console.log("componentWillMount ItemList");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate ItemList");
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate ItemList");
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate ItemList");
    }

    componentWillUnmount() {
        console.log("componentWillUnmount ItemList");
    }

    filterlist(text) {
        var filterlist = this.props.data.items.filter(function (item) {
            return item.toLowerCase().search(text.toLowerCase()) !== -1;
        });
        this.setState({ items: filterlist });
    }

    render() {
        console.log("render ItemList");
        return (
            <Card className={`${styles.card}`}>
                <h1>{this.props.data.title}</h1>
                <SearchPlugin filter={this.filterlist} />
                <ul>
                    {this.state.items.map((item) => (
                        <Item key={item} name={item} />
                    ))}
                </ul>
            </Card>
        );
    }
}
const propsValues = {
    title: "Список тренеров",
    items: [
        "Иван Темнохолмов +79622126221",
        "Билли Харитонов +79622126222",
        "Райн Гослингов +79622126223",
        "Рикардо Милов +79622126224",
        `Даниил "Казуя" Ли +79622126225`,
        "Метро Люблино +79622126226",
    ],
};

const App = () => {
    const [event1, setEvent1] = useState(false);
    const [event2, setEvent2] = useState(false);
    const user = {
        firstName: "Billy",
        lastName: "Herrington",
        age: "43",
    };
    const [agility, setAgility] = useState(10);
    const [strength, setStrength] = useState(10);
    const strengthArr = [
        "20 отжиманий, 20 приседаний, 20 пресс",
        "40 отжиманий, 40 приседаний, 40 пресс",
        "60 отжиманий, 60 приседаний, 60 пресс",
        "80 отжиманий, 80 приседаний, 80 пресс",
    ];
    const agilityArr = [
        "20 скручиваний, 20 прыжков, 2 км бег",
        "40 скручиваний, 40 прыжков, 4 км бег",
        "60 скручиваний, 60 прыжков, 6 км бег",
        "80 скручиваний, 80 прыжков, 8 км бег",
    ];
    const event1Handler = (e) => {
        e.preventDefault();
        setEvent1(!event1);
        setEvent2(false);
    };
    const event2Handler = (e) => {
        e.preventDefault();
        setEvent1(false);
        setEvent2(!event2);
    };
    const strengthHandler = (num) => {
        setStrength((prev) => prev + num + 1);
    };
    const agilityHandler = (num) => {
        setAgility((prev) => prev + num + 1);
    };

    const strengthMonth = strengthArr.map((value, index) => {
        return (
            <Card key={`Тренировка ${index + 1}`} className={styles.card}>
                <h3>Тренировка {index + 1}</h3>
                {value}
                <Button
                    onClick={() => strengthHandler(index)}
                    className={styles.btns}
                >
                    Пройти треннировку {index + 1}
                </Button>
            </Card>
        );
    });
    const agilityMonth = agilityArr.map((value, index) => {
        return (
            <Card key={`Тренировка ${index + 1}`} className={styles.card}>
                <h3>Тренировка {index + 1}</h3>
                {value}
                <Button
                    onClick={() => agilityHandler(index)}
                    className={styles.btns}
                >
                    Пройти треннировку {index + 1}
                </Button>
            </Card>
        );
    });

    class ClickButton extends Component {
        constructor(props) {
            super(props);
            this.state = { class: "off", label: "Нажми" };
            this.press = this.press.bind(this);
        }

        componentWillMount() {
            console.log("componentWillMount ClickButton");
        }

        shouldComponentUpdate(nextProps, nextState) {
            console.log("shouldComponentUpdate ClickButton");
            return true;
        }

        componentWillUpdate(nextProps, nextState) {
            console.log("componentWillUpdate ClickButton");
        }

        componentDidUpdate(prevProps, prevState) {
            console.log("componentDidUpdate ClickButton");
        }

        componentWillUnmount() {
            console.log("componentWillUnmount ClickButton");
        }

        press() {
            let className = this.state.class === "off" ? "on" : "off";
            this.setState({ class: className });
            setEvent1(false);
            setEvent2(false);
        }

        render() {
            console.log("render ClickButton");
            return (
                <button onClick={this.press} className={this.state.class}>
                    {this.state.label}
                </button>
            );
        }
    }
    return (
        <Fragment>
            <div className={styles.btns}>
                <Button onClick={event1Handler}>Силовые упражнения</Button>
                <Button onClick={event2Handler}>Кардио</Button>
            </div>
            <div className={styles.text}>
                {event1 && (
                    <div>
                        <h2>Упражнения Strength</h2>
                        {strengthMonth}
                    </div>
                )}
                {event2 && (
                    <div>
                        <h2>Упражнения Agility</h2>
                        {agilityMonth}
                    </div>
                )}
                <Card className={`${styles.card}`}>
                    <div className={styles.cardUser}>
                        <img src={Img} className={styles.imgCard}></img>
                        <div>
                            <p>
                                Фио: {user.firstName} {user.lastName}
                            </p>
                            <p>Возраст: {user.age} </p>
                            <p>Agility:{agility}</p>
                            <p>Strength:{strength}</p>
                        </div>
                    </div>
                </Card>
                <ItemList data={propsValues} />
                <Clock />
                <ClickButton />
            </div>
        </Fragment>
    );
};

export default App;
