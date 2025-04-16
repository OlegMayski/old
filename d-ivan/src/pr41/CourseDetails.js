import React from "react";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
    const { courseId } = useParams();

    return (
        <div>
            <h1>Детали курса {courseId}</h1>
            {console.log(courseId)}
            {/* Здесь вы можете загрузить данные о курсе с использованием courseId */}
        </div>
    );
};

export default CourseDetails;
