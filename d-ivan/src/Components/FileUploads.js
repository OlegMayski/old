import React, { useState, useEffect } from "react";
import axios from "axios";

const FileUploads = ({ auth }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [deleteId, setDeleteId] = useState("");
    const [updateId, setUpdateId] = useState("");
    const [action, setAction] = useState("add");
    const [general, setGeneral] = useState("");
    const [artists, setArtists] = useState("");
    const [copyright, setCopyright] = useState("");
    const [character, setCharacter] = useState("");

    useEffect(() => {
        if (auth) {
            axios
                .get(`/PHP/getUserPosts.php?id_user=${auth}`)
                .then((response) => {
                    setUserPosts(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching user posts:", error);
                });
        }
    }, [auth]);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    const handleDeleteIdChange = (event) => {
        setDeleteId(event.target.value);
    };
    const handleUpdateIdChange = (event) => {
        setUpdateId(event.target.value);
    };
    const handleArtistsChange = (event) => {
        setArtists(event.target.value);
    };
    const handleCopyrightChange = (event) => {
        setCopyright(event.target.value);
    };
    const handleCharacterChange = (event) => {
        setCharacter(event.target.value);
    };
    const handleGeneralChange = (event) => {
        setGeneral(event.target.value);
    };

    const handleActionChange = (event) => {
        setAction(event.target.value);
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("user", auth);
        formData.append("general", general);
        formData.append("artists", artists);
        formData.append("copyright", copyright);
        formData.append("character", character);

        if (action === "add") {
            // Добавление нового поста
            axios
                .post("/PHP/upload.php", formData)
                .then((response) => {
                    console.log("File uploaded without errors:", response.data);
                    alert(response.data);
                })
                .catch((error) => {
                    console.error("Error uploading file:", error);
                    alert(error);
                });
        } else if (action === "update") {
            // Обновление существующего поста
            formData.append("id_image", updateId);
            axios
                .post("/PHP/upload.php", formData)
                .then((response) => {
                    console.log("Post updated without errors:", response.data);
                    alert(response.data);
                })
                .catch((error) => {
                    console.error("Error updating post:", error);
                    alert(error);
                });
        }
    };

    const handleDelete = () => {
        const formData = new FormData();
        formData.append("id_image", deleteId);
        formData.append("id_user", auth.auth);

        axios
            .post("/PHP/deletePost.php", formData)
            .then((response) => {
                console.log("Post deleted without errors:", response.data);
                alert(response.data);
                setUserPosts(
                    userPosts.filter(
                        (post) => post.id_image !== parseInt(deleteId)
                    )
                );
            })
            .catch((error) => {
                console.error("Error deleting post:", error);
                alert(error);
            });
    };

    return (
        <div style={{ marginTop: "20px" }}>
            {auth ? (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ marginBottom: "10px" }}
                    />
                    <input
                        type="text"
                        placeholder="Enter artists"
                        value={artists}
                        onChange={handleArtistsChange}
                        className="inputStyle"
                    />
                    <input
                        type="text"
                        placeholder="Enter copyright"
                        value={copyright}
                        onChange={handleCopyrightChange}
                        className="inputStyle"
                    />
                    <input
                        type="text"
                        placeholder="Enter character"
                        value={character}
                        onChange={handleCharacterChange}
                        className="inputStyle"
                    />
                    <input
                        type="text"
                        placeholder="Enter general"
                        value={general}
                        onChange={handleGeneralChange}
                        className="inputStyle"
                    />
                    <select
                        value={action}
                        onChange={handleActionChange}
                        className="inputStyle"
                        style={{ marginBottom: "10px" }}
                    >
                        <option value="add">Add Post</option>
                        <option value="update">Update Post</option>
                    </select>
                    {action === "add" ? (
                        <button onClick={handleSubmit} className="buttonStyle">
                            Add
                        </button>
                    ) : (
                        <div>
                            <select
                                value={updateId}
                                onChange={handleUpdateIdChange}
                                className="inputStyle"
                                style={{ marginBottom: "10px" }}
                            >
                                <option value="">Select post to update</option>
                                {userPosts.map((post) => (
                                    <option
                                        key={post.id_image}
                                        value={post.id_image}
                                    >
                                        {post.id_image} - {post.src}
                                    </option>
                                ))}
                            </select>
                            <button
                                onClick={handleSubmit}
                                className="buttonStyle"
                            >
                                Update
                            </button>
                        </div>
                    )}
                    <div className="deleteDiv">
                        <h3>Delete Post</h3>
                        <select
                            value={deleteId}
                            onChange={handleDeleteIdChange}
                            className="inputStyle"
                            style={{ marginBottom: "10px" }}
                        >
                            <option value="">Select post to delete</option>
                            {userPosts.map((post) => (
                                <option
                                    key={post.id_image}
                                    value={post.id_image}
                                >
                                    {post.id_image} - {post.src}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleDelete} className="buttonStyle">
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                <div style={{ textAlign: "center" }}>
                    <p>Войдите в аккаунт</p>
                </div>
            )}
        </div>
    );
};

export default FileUploads;
