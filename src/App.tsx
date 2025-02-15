import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Task from "./components/Task";
import PublicRoute from "./auth/PublicRoute";
import PrivateRoute from "./auth/PrivateRoute";

const App = () => (
  <Layout>
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route
          path="/"
          element={
            <>
              <h1 className="text-3xl">
                Create a task or continue with the dues.
              </h1>
            </>
          }
        />
        <Route path="/tasks/:id" element={<Task />} />
      </Route>
    </Routes>
  </Layout>
);

export default App;
