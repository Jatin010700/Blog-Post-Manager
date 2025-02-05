import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ViewMyBlog } from "./components/post/ViewMyBlog";
import { Homepage } from "./components/MainPage";

function App() {

  return (
    <>
    <Router>
      <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/viewMyBlog" element={<ViewMyBlog />} />
        </Routes>
    </Router>
    </>
  )
}

export default App
