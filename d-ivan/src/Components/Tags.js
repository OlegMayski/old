import React, { useEffect, useState } from "react";
import axios from "axios";
import myData from "../myData.json";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import TagsForImage from "./TagsForImage";

const Tags = ({ settagSearch, dataTags, dataCounts }) => {
    const { postId } = useParams();

    if (!postId) {
        const general = dataCounts
            .filter((item) => item.type_tag === "general")
            .sort((a, b) => b.tag_count - a.tag_count);
        const artists = dataCounts
            .filter((item) => item.type_tag === "artists")
            .sort((a, b) => b.tag_count - a.tag_count);
        const copyright = dataCounts
            .filter((item) => item.type_tag === "copyright")
            .sort((a, b) => b.tag_count - a.tag_count);
        const character = dataCounts
            .filter((item) => item.type_tag === "character")
            .sort((a, b) => b.tag_count - a.tag_count);
        return (
            <ul id="tag-sidebar">
                <li className="tag" style={{ color: "rgb(210, 210, 210)" }}>
                    <h3>Artists</h3>
                </li>
                {artists.map((tags, index) => (
                    <li key={index} className="tag" style={{ color: "red" }}>
                        <span>
                            <Link
                                to="/posts"
                                className="tag-link"
                                onClick={() => settagSearch(tags.name_tag)}
                            >
                                {tags.name_tag + " " + tags.tag_count}
                            </Link>
                        </span>
                    </li>
                ))}
                <li className="tag" style={{ color: "rgb(210, 210, 210)" }}>
                    <h3>Copyrights</h3>
                </li>
                {copyright.map((tags, index) => (
                    <li
                        key={index}
                        className="tag"
                        style={{ color: "lightpurple" }}
                    >
                        <span>
                            <Link
                                to="/posts"
                                className="tag-link"
                                onClick={() => settagSearch(tags.name_tag)}
                            >
                                {tags.name_tag + " " + tags.tag_count}
                            </Link>
                        </span>
                    </li>
                ))}
                <li className="tag" style={{ color: "rgb(210, 210, 210)" }}>
                    <h3>Characters</h3>
                </li>
                {character.map((tags, index) => (
                    <li key={index} className="tag" style={{ color: "green" }}>
                        <span>
                            <Link
                                to="/posts"
                                className="tag-link"
                                onClick={() => settagSearch(tags.name_tag)}
                            >
                                {tags.name_tag + " " + tags.tag_count}
                            </Link>
                        </span>
                    </li>
                ))}
                <li className="tag" style={{ color: "rgb(210, 210, 210)" }}>
                    <h3>Generals</h3>
                </li>
                {general.map((tags, index) => (
                    <li key={index} className="tag">
                        <span>
                            <Link
                                to="/posts"
                                className="tag-link"
                                onClick={() => settagSearch(tags.name_tag)}
                            >
                                {tags.name_tag + " " + tags.tag_count}
                            </Link>
                        </span>
                    </li>
                ))}
            </ul>
        );
    }
    return (
        <TagsForImage
            id={parseInt(postId)}
            dataTags={dataTags}
            dataCounts={dataCounts}
            settagSearch={settagSearch}
        />
    );
};

export default Tags;
