import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Task from "./components/Task";
import PublicRoute from "./auth/PublicRoute";

const App = () => (
  <Layout>
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route path="/tasks/:id" element={<Task />} />
    </Routes>
  </Layout>
);

export default App;
