import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navibtn from "./components/Navibtn";
import AddQnA from "./components/admin/AddQnA";
import QnaState from "./context/general/QnaState"
import ShowQna from "./components/admin/ShowQna";
import { Home } from "./components/Home";

function App() {
  return (
    <>
      <QnaState>
        <BrowserRouter>
          <Navibtn />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addqna" element={<AddQnA />} />
            <Route path="/showqna" element={<ShowQna />} />
          </Routes>
        </BrowserRouter>
      </QnaState>
    </>
  );
}

export default App;
