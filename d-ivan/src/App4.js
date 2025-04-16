import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CoursesPage from "./pr41/CoursesPage";
import CourseDetails from "./pr41/CourseDetails";
import ResultsPage from "./pr41/ResultsPage";
import ResultDetails from "./pr41/ResultDetails";
import TestsPage from "./pr41/TestsPage";
import TestDetails from "./pr41/TestDetails";
const App4 = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/courses">Курсы</Link>
                        </li>
                        <li>
                            <Link to="/tests">Тесты</Link>
                        </li>
                        <li>
                            <Link to="/results">Результаты</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/courses" Component={CoursesPage}></Route>
                    <Route
                        path="/courses/:courseId"
                        Component={CourseDetails}
                    ></Route>
                    <Route path="/tests" Component={TestsPage}></Route>
                    <Route
                        path="/tests/:testId"
                        Component={TestDetails}
                    ></Route>
                    <Route path="/results" Component={ResultsPage}></Route>
                    <Route
                        path="/results/:resultId"
                        Component={ResultDetails}
                    ></Route>
                </Routes>
                <Routes>
                    <Route
                        path="/courses/:courseId"
                        Component={CourseDetails}
                    ></Route>
                </Routes>
            </div>
        </Router>
    );
};
export default App4;
