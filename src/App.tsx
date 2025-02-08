import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  </Layout>
);

export default App;
