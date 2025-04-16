import React, { useEffect, useState } from "react";
import axios from "axios";
import myData from "../myData.json";
const ImageList = ({ tags }) => {
    const [myDataImageList, setmyDataImageList] = useState([]);
    const [myDataTags, setmyDataTags] = useState([]);
    useEffect(() => {
        axios
            .get("/PHP/mySelect.php")
            .then((response) => {
                setmyDataImageList(response.data);
            })
            .catch((error) => {
                console.error("Ошибка при получении данных:", error);
            });
        axios
            .get("/PHP/selectTags.php")
            .then((response) => {
                setmyDataTags(response.data);
            })
            .catch((error) => {
                console.error("Ошибка при получении данных:", error);
            });
    }, []);
    const filterPostsByTag = (posts, tag) => {
        if (!tag) return posts;

        const filteredIds = myDataTags
            .filter((item) => item.name_tag === tag)
            .map((item) => item.id_image);

        const postsArray = Array.isArray(posts) ? posts : [posts];
        return postsArray.filter((item) => filteredIds.includes(item.id_image));
    };
    const filteredPosts = filterPostsByTag(myDataImageList, tags);
    return (
        <div className="image-list">
            {filteredPosts.map((item) => {
                return (
                    <span className="thumb" key={item.id_image}>
                        <a href={`/posts/${item.id_image}`}>
                            <img
                                src={`${item.src}`}
                                alt={`Post ${item.id_image}`}
                            />
                        </a>
                    </span>
                );
            })}
            <br />
        </div>
    );
};

export default ImageList;
