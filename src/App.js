import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./pages/Details";
import BlogListing from "./components/BlogListing";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BlogListing />} />
          <Route path="/details/:slug/:slug" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
