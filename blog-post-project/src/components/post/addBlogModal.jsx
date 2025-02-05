import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AddBlogModal = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const postData = {
                title: formData.title,
                description: formData.description,
            }

            const res = await axios.post("http://127.0.0.1:5000/posts", postData);

            if (res.status === 201) {
                toast("Post created", {
                    style: {
                        borderRadius: "20px",
                        backgroundColor: "white",
                        color: "black",
                        border: "2px solid black"
                    },
                });
                setFormData({ title: "", description: "" })
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        } catch (error) {
            toast(error.message, {
                style: {
                    borderRadius: "20px",
                    backgroundColor: "red",
                    color: "black",
                },
            });
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <button type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop" className="modalBTN">
                Add Blog
            </button>

            <div className="modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modalHeader">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Post</h1>
                            <button type="button" className="btn-close closeBTN" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form 
                        onSubmit={handleSubmit}
                        className="modalInput">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                            <button type="submit" onClick={handleSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}