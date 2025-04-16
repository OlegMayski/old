import React from "react";
import { Link } from "react-router-dom";

const TagsForImage = ({ id, dataTags, dataCounts, settagSearch }) => {
    if (!dataTags || dataTags.length === 0) {
        return <div>Данные не загружены</div>;
    }

    const general = dataTags
        .filter((item) => parseInt(item.id_image) === id)
        .filter((item) => item.type_tag === "general")
        .map((item) => ({
            name_tag: item.name_tag,
            tag_count:
                dataCounts.find((count) => count.name_tag === item.name_tag)
                    ?.tag_count || 0,
        }))
        .sort((a, b) => b.tag_count - a.tag_count);
    const artists = dataTags
        .filter((item) => parseInt(item.id_image) === id)
        .filter((item) => item.type_tag === "artists")
        .map((item) => ({
            name_tag: item.name_tag,
            tag_count:
                dataCounts.find((count) => count.name_tag === item.name_tag)
                    ?.tag_count || 0,
        }))
        .sort((a, b) => b.tag_count - a.tag_count);
    const copyright = dataTags
        .filter((item) => parseInt(item.id_image) === id)
        .filter((item) => item.type_tag === "copyright")
        .map((item) => ({
            name_tag: item.name_tag,
            tag_count:
                dataCounts.find((count) => count.name_tag === item.name_tag)
                    ?.tag_count || 0,
        }))
        .sort((a, b) => b.tag_count - a.tag_count);
    const character = dataTags
        .filter((item) => parseInt(item.id_image) === id)
        .filter((item) => item.type_tag === "character")
        .map((item) => ({
            name_tag: item.name_tag,
            tag_count:
                dataCounts.find((count) => count.name_tag === item.name_tag)
                    ?.tag_count || 0,
        }))
        .sort((a, b) => b.tag_count - a.tag_count);
    if (
        general.length +
            artists.length +
            character.length +
            copyright.length ===
        0
    ) {
        return <div>Теги не найдены для данного изображения</div>;
    }
    return (
        <ul id="tag-sidebar">
            {Boolean(artists.length) && (
                <li className="tag" style={{ color: "rgb(210, 210, 210)" }}>
                    <h4>Artists</h4>
                </li>
            )}
            {artists &&
                artists.map((tag, index) => (
                    <li key={index} className="tag" style={{ color: "red" }}>
                        <span>
                            <Link
                                to="/posts"
                                className="tag-link"
                                onClick={() => settagSearch(tag.name_tag)}
                            >
                                {tag.name_tag + " " + tag.tag_count}
                            </Link>
                        </span>
                    </li>
                ))}
            {Boolean(copyright.length) && (
                <li className="tag" style={{ color: "rgb(210, 210, 210)" }}>
                    <h4>Copyrights</h4>
                </li>
            )}
            {copyright &&
                copyright.map((tag, index) => (
                    <li
                        key={index}
                        className="tag"
                        style={{ color: "lightpurple" }}
                    >
                        <span>
                            <Link
                                to="/posts"
                                className="tag-link"
                                onClick={() => settagSearch(tag.name_tag)}
                            >
                                {tag.name_tag + " " + tag.tag_count}
                            </Link>
                        </span>
                    </li>
                ))}
            {Boolean(character.length) && (
                <li className="tag" style={{ color: "rgb(210, 210, 210)" }}>
                    <h4>Characters</h4>
                </li>
            )}
            {character &&
                character.map((tag, index) => (
                    <li key={index} className="tag" style={{ color: "green" }}>
                        <span>
                            <Link
                                to="/posts"
                                className="tag-link"
                                onClick={() => settagSearch(tag.name_tag)}
                            >
                                {tag.name_tag + " " + tag.tag_count}
                            </Link>
                        </span>
                    </li>
                ))}
            {Boolean(general.length) && (
                <li className="tag" style={{ color: "rgb(210, 210, 210)" }}>
                    <h4>Generals</h4>
                </li>
            )}
            {general &&
                general.map((tag, index) => (
                    <li key={index} className="tag">
                        <span>
                            <Link
                                to="/posts"
                                className="tag-link"
                                onClick={() => settagSearch(tag.name_tag)}
                            >
                                {tag.name_tag + " " + tag.tag_count}
                            </Link>
                        </span>
                    </li>
                ))}
        </ul>
    );
};

export default TagsForImage;
