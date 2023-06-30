import React from "react";
import DataTable from "./to-do-list";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoApp from "./to-do-form";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<DataTable />} />
        <Route path="create" element={<TodoApp />} />
        <Route path="table" element={<DataTable />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
