import React, { useEffect, useState } from "react";
import axios from "axios";
import myData from "../myData.json";
import { useParams } from "react-router-dom";

const Post = (auth) => {
    const { postId } = useParams();
    const [DataPost, setDataPost] = useState([]);
    const [dataComments, setdataComments] = useState([]);
    const [commentContent, setCommentContent] = useState("");
    useEffect(() => {
        axios
            .get("/PHP/mySelect.php")
            .then((response) => {
                setDataPost(response.data);
            })
            .catch((error) => {
                console.error("Ошибка при получении данных:", error);
            });
        const formData1 = new FormData();
        formData1.append("id", postId);
        axios
            .post("/PHP/comments.php", formData1)
            .then((response) => {
                setdataComments(response.data);
            })
            .catch((error) => {
                console.error("Ошибка при получении данных:", error);
            });
    }, []);

    const post = DataPost.find(
        (item) => parseInt(item.id_image) === parseInt(postId)
    );
    if (!post) {
        return <div>Пост не найден</div>;
    }
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("id_image", postId);
        formData.append("id_user", auth.auth);
        formData.append("content", commentContent);
        axios
            .post("/PHP/addComment.php", formData)
            .then((response) => {
                console.log(response.data);
                setCommentContent("");
            })
            .catch((error) => {
                console.error("Ошибка при отправке комментария:", error);
            });
    };

    return (
        <div>
            <h1>Post {post.id_image}</h1>
            <img src={`${post.src}`} />
            {console.log(dataComments)}
            {auth.auth !== 0 && (
                <form
                    onSubmit={handleCommentSubmit}
                    style={{ marginTop: "20px" }}
                >
                    <textarea
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="Введите комментарий"
                        required
                        style={{
                            width: "98%",
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            marginTop: "10px",
                            padding: "10px 20px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        Отправить комментарий
                    </button>
                </form>
            )}
            <div>
                <h2>Комментарии:</h2>
                {dataComments.map((comment) => (
                    <div
                        key={comment.id_comment}
                        style={{
                            marginBottom: "10px",
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "5px",
                        }}
                    >
                        <div style={{ display: "flex", marginBottom: "5px" }}>
                            <p style={{ marginRight: "10px" }}>
                                Пользователь: {comment.login}
                            </p>
                            <p>Создан: {comment.date_comment}</p>
                        </div>
                        <div>
                            <p>{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Post;
