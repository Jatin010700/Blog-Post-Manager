import axios from "axios";
import { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import toast from "react-hot-toast";

export const ViewMyBlog = () => {
    const [postLists, setPostLists] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const [editData, setEditData] = useState({ title: "", description: "" });

    // GET POST
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
        };

        getBlogPost();
    }, []);

    // UPDATE POST
    const handleEdit = (post) => {
        setEditingPost(post._id);
        setEditData({ title: post.title, description: post.description });
    };

    const handleEditChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSaveEdit = async (postId) => {
        try {
            const res = await axios.put(`http://127.0.0.1:5000/posts/${postId}`, editData);
            if (res.status === 200) {
                toast("Post updated", {
                    style: {
                        borderRadius: "20px",
                        backgroundColor: "white",
                        color: "black",
                        border: "2px solid black"
                    },
                });
                setPostLists(
                    postLists.map((post) =>
                        post._id === postId ? { ...post, ...editData } : post
                    )
                );
                setEditingPost(null);
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
    };

    // DELETE POST
    const handleDelete = async (postId) => {
        try {
            const res = await axios.delete(`http://127.0.0.1:5000/posts/${postId}`);
            if (res.status === 204) {
                toast("Post deleted", {
                    style: {
                        borderRadius: "20px",
                        backgroundColor: "white",
                        color: "black",
                        border: "2px solid black"
                    },
                });
                postLists.filter((post) => post._id !== postId)
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
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
    };

    const breakpointColumnsObj = {
        default: 3,
        768: 2,
        480: 1,
    };

    return (
        <>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                columnClassName="masonry-column"
                className="homepageMasonry">
                {postLists.map((post) => (
                    <div key={post._id} className="wrapMasonry">
                        {editingPost === post._id ? (
                            <div className="editContainer">
                                <input
                                    type="text"
                                    name="title"
                                    value={editData.title}
                                    onChange={handleEditChange}
                                />
                                <input
                                    type="text"
                                    name="description"
                                    value={editData.description}
                                    onChange={handleEditChange}
                                />
                                <button onClick={() => handleSaveEdit(post._id)}>
                                    Save
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h2>{post.title}</h2>
                                <p>{post.description}</p>
                                <div className="wrapBTN">
                                    <button onClick={() => handleEdit(post)}>
                                        <i className="bi bi-pen-fill"></i>
                                    </button>
                                    <button onClick={() => handleDelete(post._id)}>
                                        <i className="bi bi-trash-fill"></i>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </Masonry>
        </>
    );
};
