import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./pages/App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Pomodoro from "./pages/Pomodoro.jsx";
import TasksList from "./pages/TasksList.jsx";
import Noteslist from "./pages/Noteslist.jsx";
import Trashlist from "./pages/TrashList.jsx";
import Workspace from "./pages/Workspace.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/change-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/client" element={<PrivateRoute />}>
          <Route path="/client/pomodoro" element={<Pomodoro />} />
          <Route path="/client/workspace" element={<Workspace />} />
          <Route path="/client/tasks-list" element={<TasksList />}>
            <Route path=":taskGroupId" element={<TasksList />} />
          </Route>
          <Route path="/client/notes" element={<Noteslist />}>
            <Route path=":noteListId" element={<Noteslist />} />
          </Route>
          <Route path="/client/trash" element={<Trashlist />}>
            <Route path=":trashListId" element={<Trashlist />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      theme="light"
      transition:Bounce
    />
  </React.StrictMode>
);
