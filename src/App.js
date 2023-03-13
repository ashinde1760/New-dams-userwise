import "./App.css";
import Repository from "./Repos/Repository";
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
import UploadDocument from "./Admin/UploadDocument";
import ConfigMain from "./Configuration/ConfigMain";
import AuditHistory from "./Admin/History";
import Role from "./Admin/Role";
import UserDetails from "./Admin/UserDetails";
import Version from "./Admin/Version";
import DocumentReview from "./Admin/DocumentReview";
import SelectReviewer from "./Admin/SelectReviewer";
import BookmarkDemo from "./Admin/BookmarkDemo";
import DocumentDetails from "./Admin/DocumentDetails";
import BookmarkSection from "./Admin/BookmarkSection";





import ReviewerMain from "./Reviewer/RevieverMain";
import UploadDocuments from "./Reviewer/UploadDocuments";
import Chat from "./Reviewer/Chat";
import History from "./Reviewer/History" ;
import Search from "./Reviewer/Search";
import ReviewerVersion  from "./Reviewer/ReviewerVersion";



import ViewerMain from "./Viewer/ViewerMain";
import Userversion from "./Viewer/Userversion";
import UserSearch from "./Viewer/UserSearch";
import Chatbot from "./Viewer/Chatbot";
import BookmarkDoc from "./Viewer/BookmarkDoc";






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
          <Route path="documentsearch" element={<DocumentSearch />} />
          <Route path="configMain" element={<ConfigMain />} />
          <Route path="history" element={<AuditHistory />} />
          <Route path="role" element={<Role />} />
          <Route path="UserDetails" element={<UserDetails />} /> 
          <Route path="UploadDocument" element={<UploadDocument />} />
          <Route path="/version/:id" element={<Version />} /> 
          <Route path="/documentReview/:docId" element={<DocumentReview/>} /> 
          <Route path="/selectReviewer/:docId" element={<SelectReviewer />} />
          <Route path="bookmarkdemo" element={<BookmarkDemo />} /> 
          <Route path="documentdetails" element={<DocumentDetails/>} />
          <Route path="BookmarkSection" element={<BookmarkSection/>} />
         
         


{/* Reviewer routes */}

         <Route path="reviewermain" element={<ReviewerMain />}></Route>
         <Route path="UploadDocuments" element={<UploadDocuments />} /> 
         <Route path="chat" element={<Chat />} />
         <Route path="history" element={<History />} /> 
         <Route path="search" element={< Search/>} /> 
         <Route path="/reviewerversion/:id" element={<ReviewerVersion />} /> 
       
     {/* viewer routes */}  
     <Route path="viewermain" element={<ViewerMain />}></Route>
     <Route path="/userversion/:id" element={<Userversion />} /> 
     <Route path="usersearch" element={<UserSearch/>} /> 
         <Route path="chatbot" element={<Chatbot />} />
         <Route path="bookmarkdoc" element={<BookmarkDoc />} />
         {/* <Route path="history" element={<History />} />  */}
        
       

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
