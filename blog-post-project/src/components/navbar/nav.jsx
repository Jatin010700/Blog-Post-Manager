import React from "react";
import { AddBlogModal } from "../post/addBlogModal";

export const NavBar = () => {
    return (
        <>
        <div className="navBar">
            <h2>Blog Post Manager</h2>

            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/viewMyBlog">My blog</a></li>
            </ul>

            <div className="wrapNavBTN">
                <AddBlogModal/>
                <button>Login</button>
            </div>
        </div>
        </>
    )
}