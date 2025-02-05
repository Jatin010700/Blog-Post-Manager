import axios from "axios";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";

export const Homepage = () => {
    const [postLists, setPostLists] = useState([]);

    useEffect(() => {
        const getBlogPost = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:5000/posts");
                    if (res.status === 200) {
                        setPostLists(res.data);
                    }
            } catch (error) {
                toast(error.message, {
                    style: {
                        borderRadius: "20px",
                        backgroundColor: "red",
                        color: "black"
                    },
                });
            }
        }

        getBlogPost();
    }, []);

    const mapListPost = postLists.map((list) => ({
        title: list.title,
        description: list.description
    }));


    const breakpointColumnsObj = {
        default: 4,
        768: 2,
        480: 1,
    };

    return (
        <>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                columnClassName="masonry-column"
                className="homepageMasonry">
                {mapListPost.map((post, index) => (
                    <div key={index}
                    className="wrapMasonry">
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                    </div>
                ))}
            </Masonry>
        </>
    );
};
