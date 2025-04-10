import { Routes, Route } from "react-router-dom";
import Navigation from "./components/NavBar";
import FormPage from "./pages/FormPage";
import DisplayPage from "./pages/DisplayPage";
import AboutUs from "./pages/AboutUs";
import DefaultPage from "./pages/DefaultPage";
import MedicineOrderPage from "./pages/MedicineOrderPage";
import LabTestPage from "./pages/Labtests";
import HealthProductPage from "./pages/HealthCarePage";
import CovidCarePage from "./pages/CovidCarePage";
import DiabetesCarePage from "./pages/DiabetesCarePage";
const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/form" element={<FormPage />} />
        <Route path="/display" element={<DisplayPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/" element={<DefaultPage />} />
        <Route path="/order" element={<MedicineOrderPage />} />
        <Route path="/labtest" element={<LabTestPage />} />
        <Route path="/health" element={<HealthProductPage />} />
        <Route path="/covid" element={<CovidCarePage />} />
        <Route path="/diabetes" element={<DiabetesCarePage />} />
      </Routes>
    </>
  );
};

export default App;
