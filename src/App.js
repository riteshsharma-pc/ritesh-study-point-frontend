import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navibtn from "./components/Navibtn";
import AddQnA from "./components/admin/AddQnA";
import QnaState from "./context/qna/QnaState"
import ShowQna from "./components/admin/ShowQna";
import { Home } from "./components/Home";
import AddTheory from "./components/admin/theory/AddTheory";
import TheoryState from "./context/theory/TheoryState";
import ShowTheory from "./components/admin/theory/ShowTheory";

function App() {
  return (
    <>
      <TheoryState>
        <QnaState>
          <BrowserRouter>
            <Navibtn />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/addqna" element={<AddQnA />} />
              <Route path="/addtheory" element={<AddTheory />} />
              <Route path="/showqna" element={<ShowQna />} /> 
              <Route path="/showtheory" element={<ShowTheory />} /> 
            </Routes>
          </BrowserRouter>
        </QnaState>
      </TheoryState>
    </>
  );
}

export default App;
