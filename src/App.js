import "./App.css";
import Repository from "./Repos/Repository";
import Documents from "./Repos/Documents";
import Versions from "./Repos/Versions";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// styles
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import "primeflex/primeflex.css";
import Sidebar from "./Layouts/Sidebar";
import Navbar from "./Layouts/Navbar";
import DashboardMain from "./Admin/dashboard";
import DocumentSearch from "./Admin/DocumentSearch";
import ConfigMain from "./Configuration/ConfigMain";
import AuditHistory from "./Admin/History";
import Role from "./Admin/Role";
import UserDetails from "./Admin/UserDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/" element={<Repository />}></Route>
        </Route>
      </Routes>
      <Navbar />

      <Sidebar></Sidebar>
      <div className="allRoutes">
        <Routes>
{/* Admin Routes */}
          <Route path="dashboardMain" element={<DashboardMain />}></Route>
          <Route path="Versions" element={<Versions />}></Route>
          <Route path="documentsearch" element={<DocumentSearch />} />
          <Route path="configMain" element={<ConfigMain />} />
          <Route path="history" element={<AuditHistory />} />
          <Route path="role" element={<Role />} />
          <Route path="UserDetails" element={<UserDetails />} />     
{/* Reviewer routes */}

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
