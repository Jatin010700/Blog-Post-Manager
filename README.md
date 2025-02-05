# **Blog Post Manager**

### Objective:
```
Build a Full-Stack Blog Post Manager that allows
users to add, view, update, and delete blog posts,
ensuring a smooth and interactive user experience
while following best practices in both frontend and
backend development.
```
#
### **NOTE:**
```
I have tried my best to align with the description.
```
- **FRONT:** \blog-post-project\npm run dev
- **BACK:** \blog-post-server\py server.py

#
### **FEATURES**

**Create a Blog Post:**
- Click the **Add Blog** button to open a modal.
- Fill in the title and description, then submit to create a new post.
- The post will be displayed immediately after submission.
#
**View Blog Posts:**
- On the Home page, all blog posts are displayed.
- On my **My Blog** page, all blog posts are also displayed, but users have the option to edit or delete their own posts.
(Normally, this wouldn't be allowed if a user authentication system were implemented unless they login.)
#
**Update a Blog Post**
- Navigate to the **My Blog** page.
- Click the edit (pen) icon to modify a post.
- Once clicked, the post's title and description become editable, and a Save button appears.
- Click Save to update the post in the database.
#
**Delete a Blog Post:**
- Navigate to the **My Blog** page.
- Click the delete (trash) icon to remove a post permanently.
#
### **Tech Used**
**Frontend (React + Vite)**
- Scss:  Used for styling.
- Bootstrap: Provides icons and modals
- Toaster: Displays notifications (exp: errors, success messages)
- React-router: Enables navigation between pages (Home and My Blog).
- Masonary.js: Handles responsive grid layout for blog posts
- Axios: Handles API requests to the Flask backend
#
**Backend (Flask + MongoDB)**
- Flask: Handles API requests and responses
- Python
- dotenv: Secures sensitive information
- Gitignore: Prevents unnecessary files from being committed
- MongoDB: Stores blog post data
- Pymongo: Connects Flask with MongoDB