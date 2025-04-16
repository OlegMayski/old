import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pr4/Home";
import About from "./pr4/About";
import Contact from "./pr4/Contact";
import Menu from "./pr4/Menu";
const App3 = () => {
    return (
        <Router>
            <div>
                <Menu></Menu>
                <Routes>
                    <Route exact path="/" Component={Home} />
                    <Route path="/about" Component={About} />
                    <Route path="/contact" Component={Contact} />
                </Routes>
            </div>
        </Router>
    );
};
export default App3;
