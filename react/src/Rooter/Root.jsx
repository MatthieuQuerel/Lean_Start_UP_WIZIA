import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "../Page/Welcome.jsx";
import Service from "../Page/Service.jsx";
import Error from "../Page/Error.jsx";
import Test from "../Page/Test.jsx";
import Connexion from "../Page/Connexion.jsx";
import CreateCompte from "../Page/CreateCompte.jsx";

const Root = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Connexion />} />
        <Route path="/CreateCompte" element={<CreateCompte />} />
        <Route path="/Dashboard" element={<Welcome />} />
        <Route path="/Service" element={<Service />} />
        <Route path="/Test" element={<Test />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Root;
