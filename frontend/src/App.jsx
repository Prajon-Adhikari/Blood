import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/api/auth/login" element={<SignInForm />} />
        <Route path="/api/auth/signup" element={<SignUpForm />} />
      </Routes>
    </BrowserRouter>
  );
}
