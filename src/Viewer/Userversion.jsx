// import React, { useState, useEffect, useRef } from "react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { Button } from "primereact/button";
// import { Toast } from "primereact/toast";
// import { Card } from "primereact/card";
// import { NavLink, useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Dialog } from "primereact/dialog";
// import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Dropdown } from "primereact/dropdown";
// import { ScrollPanel } from "primereact/scrollpanel";

// import { TabView, TabPanel } from "primereact/tabview";

// const Product = () => {
//   const [notes, setNotes] = useState("");
//   // const toast = useRef(null);
//   const [selectedCustomers, setSelectedCustomers] = useState(null);
//   const [section, setSection] = useState([]);
//   const [sectionData, setSectionData] = useState([]);
//   let [changeText, setChangeText] = useState(Boolean);
//   let [secBookmark, setSecBookmark] = useState(Boolean);
//   let [sectionId, setsectionId] = useState("");
//   let [secId, setsecId] = useState("");
//   const [keyword, setKeyword] = useState("");
//   const [upload, setUpload] = useState("");

//   const [displayBasic5, setDisplayBasic5] = useState(false);

//   const [displayBasic6, setDisplayBasic6] = useState(false);

//   const [displayBasic4, setDisplayBasic4] = useState(false);
//   const [displayBasic3, setDisplayBasic3] = useState(false);

//   const [displayBasic, setDisplayBasic] = useState(false);
//   const [displayBasic2, setDisplayBasic2] = useState(false);
//   const [displayModal, setDisplayModal] = useState(false);
//   const [displayMaximizable, setDisplayMaximizable] = useState(false);

//   const [displayResponsive, setDisplayResponsive] = useState(false);
//   const [position, setPosition] = useState("center");

//   const [displayPosition, setDisplayPosition] = useState(false);
//   const [displayPosition1, setDisplayPosition1] = useState(false);

//   const [comment, setComment] = useState("");
//   const { id } = useParams();
//   const [loading] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [values, setValues] = useState([]);
//   const [allnotes, setAllNotes] = useState(null);
//   const [file, setFile] = useState();
//   const toast = useRef(null);
//   const navigate = useNavigate();

//   //Notes

//   const onCityChange = (e) => {
//     console.log(e.target.value.name);
//     setNotes(e.target.value.name);
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     console.log("refresh prevented");
//   };
//   //notes
//   function saveUser() {
//     console.warn({ notes });
//     let data = { secId: sectionId, notes };

//     console.log(data, "all data");

//     fetch(`${process.env.REACT_APP_API_KEY}/dam/notes/`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },

//       body: JSON.stringify(data),
//     });
//     // .then((result) => {
//     //   if (result.status === 200) {
//     //     console.warn("result...!!!", result);
//     //     result.json().then((resp) => {
//     //       console.warn("resp", resp);
//     //     });
//     //     toast.current.show({
//     //       severity: "success",
//     //       summary: "User Added",
//     //       detail: "User Added Successfully",
//     //       life: 3000,
//     //     });

//     //   } else {
//     //     toast.current.show({
//     //       severity: "warn",
//     //       summary: "User Not Added",
//     //       detail: "Error while Adding User",
//     //       life: 3000,
//     //     });
//     //     // navigate("/UserDetails")

//     //   }
//     // },
//     //   (error) => {
//     //     toast.current.show({
//     //       severity: "error",
//     //       summary: "User Not Added",
//     //       detail: "Error while Adding User",
//     //       life: 3000,
//     //     });
//     //     // navigate("/UserDetails")
//     //   }
//     // );
//     // // navigate("/Document");
//   }

//   function saveComment() {
//     console.warn({ comment, createdBy: "Shivani" });

//     let data = { secId: sectionId, comment, createdBy: "shivani" };
//     console.log(data, "all data,,,,,,");

//     fetch(`${process.env.REACT_APP_API_KEY}/comment/addcomment`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     }).then(
//       (result) => {
//         if (result.status === 200) {
//           console.warn("result...!!!", result);
//           result.json().then((resp) => {
//             console.warn("resp", resp);
//           });

//           toast.current.show({
//             severity: "success",
//             summary: "Comment Added",
//             detail: "Comment Added Successfully",
//             life: 3000,
//           });
//           // navigate("/UserDetails")
//         } else {
//           toast.current.show({
//             severity: "warn",
//             summary: "Comment Not Added",
//             detail: "Error while Adding Comment",
//             life: 3000,
//           });
//           // navigate("/UserDetails")
//         }
//       },
//       (error) => {
//         toast.current.show({
//           severity: "error",
//           summary: "Comment Not Added",
//           detail: "Error while Adding Comment",
//           life: 3000,
//         });
//         // navigate("/UserDetails")
//       }
//     );
//   }
//   //download

//   const DOC_FILE_URL = `${process.env.REACT_APP_API_KEY}/document/downloadFile/${id}`;

//   const SEC_FILE_URL = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${sectionId}`;

//   const handleChange = () => {
//     return setChangeText(!changeText);
//   };
//   const sectionbookmark = () => {
//     return setSecBookmark(!secBookmark);
//   };

//   useEffect(() => {
//     getData(id);
//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/document/getDocById/${id}`)
//       .then((res) => {
//         console.log(res, "document data1234");
//         setChangeText(res.data[0].bookmarks);
//         //setSecBookmark(res.data[0].bookmarks);

//         console.log(changeText, "bookmarked....!!!!");
//       });

//     axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/getAllDocVersionsByDocId/${id}`
//       )
//       .then((res) => {
//         console.log(res.data, "version data");
//         setValues(res.data);
//         console.log(values, "all document version data");
//       });
//   }, []);

//   function getDocDataByDocId(docId) {
//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/document/sectionsbyid/${docId}`)

//       .then((res) => {
//         console.log(res, "data of sections");
//         setSection(res.data);
//         // setChangeText(res.data.bookmarked[0]);
//       });
//     navigate("/Bookmark/");
//     // console.log(!changeText," bookmarked");
//   }

//   function AllNotes() {
//     fetch(`${process.env.REACT_APP_API_KEY}/dam/notes/list`)
//       .then((res) => {
//         return res.json();
//       })
//       .then((resp) => {
//         setAllNotes(resp);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }

//   //EDIT NOTES

//   const EditAllNotes = (e) => {
//     e.preventDefault();
//     const data = { secId, notes };
//     fetch(`${process.env.REACT_APP_API_KEY}/dam/notes/${secId}`, {
//       method: "PUT",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify(data),
//     })
//       .then((res) => {
//         alert("Saved successfully.");
//         // navigate("/Version");
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   };

//   function deleteNotes(rowData) {
//     console.log(rowData, "dete////");
//     fetch(
//       `${process.env.REACT_APP_API_KEY}/dam/notes/deleteById/${rowData.id}`,
//       {
//         method: "DELETE",
//       }
//     ).then((result) => {
//       result.json().then((resp) => {
//         console.warn(resp);
//       });
//     });
//   }

//   const Removefunction = (secId) => {
//     console.log(secId, ".//////.....section data..... ");
//     fetch(`${process.env.REACT_APP_API_KEY}/dam/notes/delete/${sectionId}`, {
//       method: "DELETE",
//     })
//       .then((res) => {
//         alert("Removed successfully.");
//         // window.location.reload();
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   };

//   const bookmark = async () => {
//     console.log("Bookmarked...!!", id);
//     axios
//       .put(`${process.env.REACT_APP_API_KEY}/document/setBookmark/${id}`)
//       .then((res) => {
//         window.location.reload();

//         console.log(res, "bookmarked applied///////////////,///");
//       });

//     // window.location.reload(false)
//   };

//   const BookmarkSection = async () => {
//     console.log("Bookmarked...!!", id);
//     axios
//       .put(
//         `${process.env.REACT_APP_API_KEY}/document/setSectionBookmark/${sectionId}`
//       )
//       .then((res) => {
//         window.location.reload();

//         console.log(res, "bookmarked applied///////////////,///");
//         // setUser(res.data);
//       });
//     // window.location.reload(false)
//   };

//   const fetchData = (rowData) => {
//     console.log(rowData, " single row data...@@");
//     setsectionId(rowData.secId);
//     // setsecId(rowData.secId);
//     setSectionData(rowData);

//     //BYTE TO STRING CONVERSION

//     const decoder = new TextDecoder("UTF-8");

//     const toString = (bytes) => {
//       const rowData = new Uint8Array(bytes);
//       return decoder.decode(rowData);
//     };
//     console.log(
//       toString,
//       "./////////////////////....shivani.................,,,////"
//     );

//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/dam/notes/${rowData.secId}`)

//       .then((res) => {
//         console.log(res, "notes of sections");
//         setAllNotes(res.data);
//       });
//   };

//   const getData = async (id) => {
//     console.log(id, "inside");

//     axios
//       .get(`${process.env.REACT_APP_API_KEY}/document/sectionsbyid/${id}`)

//       .then((res) => {
//         console.log(res, "data of sections");
//         setSection(res.data);
//         // setChangeText(res.data.bookmarked[0]);
//         // console.log(!changeText," bookmarked");
//       });
//     // console.log(posts, "./././././.aaaaaaaaa");
//   };

//   // function Download(){
//   const downloadFileAtURL = (url) => {
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };

//   const downloadSectionURL = (url) => {
//     const fileName = url.split("/").pop();
//     const aTag = document.createElement("a");
//     aTag.href = url;
//     aTag.setAttribute("download", fileName);
//     document.body.appendChild(aTag);
//     aTag.click();
//     aTag.remove();
//   };

//   // };
//   const actionBodyTemplate = (rowData) => {
//     return (
//       <Button
//         style={{ height: "20px", width: "20px", color: "#203570" }}
//         onClick={() => fetchData(rowData)}
//         icon="pi pi-chevron-circle-right"
//         className="p-button-rounded p-button-text"
//       />
//     );
//   };

//   function Version() {
//     // VERSION API
//     axios
//       .get(
//         `${process.env.REACT_APP_API_KEY}/document/getAllDocVersionsByDocId/${id}`
//       )
//       .then((res) => setValues(res.data));
//     console.log(values, "////////////////////////////get all version");
//   }

//   const getComment = async (rowData) => {
//     console.log(rowData, "akshay.........222222");
//     const res = await fetch(
//       `${process.env.REACT_APP_API_KEY}/comment/${sectionId}`
//     );
//     const data = await res.json();
//     setUsers(data);

//     console.log(users, "sds./////////./////////////");
//   };

//   function saveComment() {
//     console.warn({ comment, createdBy: "Shivani" });

//     let data = { secId: sectionId, comment, createdBy: "shivani" };
//     console.log(data, "all data");

//     fetch(`${process.env.REACT_APP_API_KEY}/comment/addcomment`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     }).then((result) => {
//       result.json().then((resp) => {
//         console.warn("resp", resp);
//       });
//     });
//   }

//   const dialogFuncMap = {
//     displayBasic: setDisplayBasic,
//     displayBasic2: setDisplayBasic2,
//     displayBasic3: setDisplayBasic3,
//     displayModal: setDisplayModal,
//     displayBasic5: setDisplayBasic5,
//     displayBasic6: setDisplayBasic6,
//     displayMaximizable: setDisplayMaximizable,
//     displayPosition: setDisplayPosition,
//     displayPosition1: setDisplayPosition1,
//     displayResponsive: setDisplayResponsive,
//   };

//   const onClick = (name, position) => {
//     dialogFuncMap[`${name}`](true);

//     if (position) {
//       setPosition(position);
//     }
//   };

//   const onHide = (name) => {
//     dialogFuncMap[`${name}`](false);
//   };
//   //DOCUMENT UPLOAD

//   const documentUpload = (name) => {
//     return (
//       <div>
//         <Button
//           label="No"
//           onClick={() => onHide(name)}
//           className="p-button-text p-button-sm"
//         />
//         <Button
//           label="Yes"
//           className="p-button-sm"
//           onClick={() => onHide(name)}
//           onKeyDown={submit}
//           //onMouseEnter
//           autoFocus
//         />
//       </div>
//     );
//   };

//   //SECTION UPLOAD

//   const sectionupload = (name) => {
//     return (
//       <div>
//         <Button
//           label="No"
//           onClick={() => onHide(name)}
//           className="p-button-text p-button-sm"
//         />
//         <Button
//           label="Yes"
//           className="p-button-sm"
//           onClick={() => onHide(name)}
//           onMouseDown={handleSubmit}
//           autoFocus
//         />
//       </div>
//     );
//   };

//   //COMMENT
//   const AddComment = (name) => {
//     return (
//       <div>
//         <Button
//           label="Cancel"
//           icon="pi pi-times"
//           onClick={() => onHide(name)}
//           className="p-button-sm p-button-text"
//         />
//         <Button
//           label="Submit"
//           onClick={() => onHide(name)}
//           onMouseDown={saveComment}
//           icon="pi pi-check"
//           className="p-button-sm"
//           autoFocus
//         />
//       </div>
//     );
//   };

//   //ADD NOTES

//   const AddNotes = (name) => {
//     return (
//       <div>
//         <Button
//           label="Cancel"
//           icon="pi pi-times"
//           onClick={() => onHide(name)}
//           className="p-button-sm p-button-text"
//         />

//         <Button
//           style={{ backgroundColor: "#203570" }}
//           label="Yes"
//           className="p-button-sm"
//           onMouseEnter={saveUser}
//           icon="pi pi-check"
//           onClick={() => onHide(name)}
//           autoFocus
//         />
//       </div>
//     );
//   };

//   // function saveUser() {
//   //   console.warn({ upload });
//   //   let data = { upload };
//   //   fetch(
//   //     `http://192.168.1.59:8080/sample/addTerm/` + upload,

//   //     {
//   //       method: "POST",
//   //       headers: {
//   //         Accept: "application/json",
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify(data),
//   //     }
//   //   ).then((result) => {
//   //     result.json().then((resp) => {
//   //       console.warn("resp", resp);
//   //     });
//   //   });
//   // }

//   //keyword

//   const renderFooter = (name) => {
//     return (
//       <div>
//         <Button
//           label="No"
//           onClick={() => onHide(name)}
//           className="p-button-sm p-button-text"
//         />
//         <Button
//           label="Yes"
//           onMouseEnter={saveUser}
//           onClick={() => onHide(name)}
//           style={{ backgroundColor: "#203570" }}
//           className="p-button-sm"
//           autoFocus
//         />

//         {/* // onClick={() => onHide(name)} */}
//       </div>
//     );
//   };

//   //DELETE ALL NOTES

//   const DeleteAll = (name) => {
//     return (
//       <div>
//         <Button
//           label="No"
//           icon="pi pi-times"
//           onClick={() => onHide(name)}
//           className="p-button-sm p-button-text"
//         />
//         <Button
//           label="Yes"
//           onMouseEnter={() => {
//             Removefunction(secId);
//           }}
//           onClick={() => onHide(name)}
//           icon="pi pi-check"
//           className="p-button-sm"
//           autoFocus
//         />
//       </div>
//     );
//   };

//   //DELETE PARTICULAR NOTES
//   const Delete = (name) => {
//     return (
//       <div>
//         <Button
//           label="No"
//           icon="pi pi-times"
//           onClick={() => onHide(name)}
//           className="p-button-sm p-button-text"
//         />
//         <Button
//           label="Yes"
//           // onMouseEnter={() => deleteNotes(item.id)}
//           onClick={() => onHide(name)}
//           icon="pi pi-check"
//           className="p-button-sm"
//           autoFocus
//         />
//       </div>
//     );
//   };

//   //EDIT NOTES

//   // const EditNotes = (name) => {
//   //   return (
//   //     <div>
//   //       <Button
//   //         label="No"
//   //         icon="pi pi-times"
//   //         onClick={() => onHide(name)}
//   //         className="p-button-sm p-button-text"
//   //       />
//   //       <Button
//   //         label="Yes"
//   //         // onMouseEnter={() => deleteNotes(item.id)}
//   //         onClick={() => onHide(name)}
//   //         icon="pi pi-check"
//   //         className="p-button-sm"
//   //         autoFocus
//   //       />
//   //     </div>
//   //   );
//   // };

//   const CommentTemplate = (rowData) => {
//     console.log(rowData, "action body.....");
//     return (
//       <Button
//         style={{ height: "20px", width: "20px", color: "#203570" }}
//         tooltip="Comment"
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         onClick={() => onClick("displayPosition1", "right")}
//         icon="pi pi-comment"
//         className="p-button-rounded p-button-text"
//       />
//     );
//   };

//   const NotesTemplate = (rowData) => {
//     console.log(rowData, "action body.....");
//     return (
//       <Button
//         style={{ height: "20px", width: "20px", color: "#203570" }}
//         onClick={() => onClick("displayPosition", "right")}
//         icon="pi pi-file-edit"
//         tooltip="Notes"
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         className="p-button-rounded p-button-text"
//       />
//     );
//   };

//   const AllNotesTemplate = (rowData) => {
//     console.log(rowData, "action body.....");
//     return (
//       <div>
//         <Button
//           style={{
//             // marginLeft: "300px",
//             height: "20px",
//             width: "20px",
//             color: "#203570",
//           }}
//           icon="pi pi-file-edit"
//           className="p-button-rounded p-button-text"
//         />
//       </div>
//     );
//   };

//   // const AllCommentTemplate = (rowData) => {
//   //   console.log(rowData, "action body.....");
//   //       return (
//   //         <div>
//   //   <Button

//   //      icon="pi pi-file-edit"
//   //      onClick={() => getComment()}
//   //      className="p-button-rounded p-button-text"
//   //       />

//   //   </div>

//   //       );
//   //     };

//   const DeleteNotesTemplate = (rowData) => {
//     console.log(rowData, "action body.....");
//     return (
//       <div>
//         <Button
//           style={{ height: "20px", width: "20px", color: "#203570" }}
//           icon="pi pi-trash"
//           onClick={() => deleteNotes(rowData)}
//           className="p-button-rounded p-button-text"
//         />
//         {/* <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => deleteNotes(rowData)} /> */}
//       </div>
//     );
//   };

//   function onSelectVersion(rowData) {
//     console.log(rowData, "selected value...!!!");
//     getDocDataByDocId(rowData.value.docId);
//   }

//   // //Section Upload

//   function Documentupload(event) {
//     setFile(event.target.files[0]);
//   }

//   function handleSubmit(event) {
//     event.preventDefault();

//     const url = `${process.env.REACT_APP_API_KEY}/document/uploadSec`;

//     //http://192.168.1.59:8080/sample/document
//     const formData = new FormData();

//     formData.append("file", file);
//     formData.append("id", id);
//     console.log(
//       formData,
//       "////////////////////Section Data................//////////"
//     );
//     axios.post(url, formData).then((res) => {});
//   }

//   ///upload updated document

//   function UpdatedDocument(event) {
//     setFile(event.target.files[0]);
//   }

//   function submit(event) {
//     event.preventDefault();
//     window.location.reload(false);

//     const url = `${process.env.REACT_APP_API_KEY}/document/uploadNewVersions`;

//     //http://192.168.1.59:8080/sample/document
//     const formData = new FormData();

//     formData.append("file", file);
//     formData.append("docId", id);
//     console.log(formData, "//////////////////////////////");
//     axios.post(url, formData).then((res) => {});
//   }

//   //DISABLED DOCUMENT
//   function DisableDocument() {
//     let data;

//     fetch(` ${process.env.REACT_APP_API_KEY}/sample/updateEnable/${id} `, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     }).then((result) => {
//       // console.warn("result",result);
//       result.json().then((resp) => {
//         console.warn("resp", resp);
//       });
//     });
//   }

//   //ENABLE DOCUMENT

//   function EnableDocument() {
//     let data;

//     fetch(` ${process.env.REACT_APP_API_KEY}/sample/updateEnable/${id} `, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     }).then((result) => {
//       // console.warn("result",result);
//       result.json().then((resp) => {
//         console.warn("resp", resp);
//       });
//     });
//   }

//   const [products2, setProducts2] = useState(null);

//   //EDIT NOTES

//   function updateUser(e) {
//     if (e.which === 13) {
//       console.log(e, " enter event");
//     }
//   }

//   const onRowEditComplete = (e) => {
//     console.log(e);

//     const notes = {
//       notes: e.newData.notes,
//       // notesName:"test",
//       // secId: e.newData.secId,
//       // id:"",
//       // createdOn:123434
//     };

//     fetch(`${process.env.REACT_APP_API_KEY}/dam/notes/${e.newData.secId}`, {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(notes),
//     }).then((result) => {
//       setProducts2(result);

//       console.log("rsult", result);

//       result.json().then((resp) => {
//         console.warn(resp);
//       });
//     });
//   };

//   const textEditor = (options) => {
//     return (
//       <InputText
//         type="text"
//         value={options.value}
//         onChange={(e) => options.editorCallback(e.target.value)}
//       />
//     );
//   };

//   // const header = renderHeader();
//   return (
//     <div>
//       <Toast ref={toast} />
//       <NavLink to="/DashboardMain" className="link1">
//         <Button
//           style={{ backgroundColor: "white", height: "30px", color: "#203570" }}
//           icon="pi pi-chevron-circle-left"
//           label="Document Name"
//           className="p-button-raised p-button-secondary p-button-text"
//         />{" "}
//         &nbsp;
//       </NavLink>
//       <Button
//         visible={!changeText}
//         style={{
//           backgroundColor: "white",
//           height: "30px",
//           width: "30px",
//           color: "#203570",
//         }}
//         icon="pi pi-bookmark"
//         className=" p-button-raised p-button-text"
//         onClick={bookmark}
//         tooltip="Bookmark"
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         name="bookmark Document"
//       />
//       <Button
//         visible={changeText}
//         style={{
//           backgroundColor: "white",
//           height: "30px",
//           width: "30px",
//           color: "#203570",
//         }}
//         icon="pi pi-bookmark-fill"
//         className=" p-button-raised p-button-text"
//         onClick={bookmark}
//         tooltip=" Bookmark"
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         name="bookmark Document"
//       />{" "}
//       &nbsp;
//       <Button
//         style={{
//           backgroundColor: "white",
//           height: "30px",
//           width: "30px",
//           color: "#203570",
//         }}
//         icon="pi pi-download"
//         onClick={() => {
//           downloadFileAtURL(DOC_FILE_URL);
//         }}
//         tooltip="Download "
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         className="p-button-raised  p-button-text"
//       />{" "}
//       &nbsp;
//       <Button
//         style={{
//           backgroundColor: "white",
//           height: "30px",
//           width: "30px",
//           color: "#203570",
//         }}
//         tooltip="Share "
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         icon="pi pi-external-link"
//         className="p-button-raised p-button-text"
//       />
//       &nbsp;
//       <Button
//         style={{
//           backgroundColor: "white",
//           height: "30px",
//           width: "30px",
//           color: "#203570",
//         }}
//         tooltip="Upload "
//         className=" p-button-raised p-button-text"
//         tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
//         icon="pi pi-upload"
//         onClick={() => onClick("displayBasic6")}
//       />
//       <Dialog
//         header="Upload particular version"
//         visible={displayBasic6}
//         style={{ width: "35vw" }}
//         footer={documentUpload("displayBasic6")}
//         onHide={() => onHide("displayBasic6")}
//       >
//         <form>
//           <input
//             style={{ marginTop: "15px", marginLeft: "15px" }}
//             type="file"
//             onChange={UpdatedDocument}
//           />
//         </form>
//       </Dialog>
//       <Dropdown
//         style={{
//           // height:"40px",
//           backgroundColor: "white",
//           float: "right",
//           color: "#203570",
//         }}
//         options={values}
//         //  onChange={onCityChange}
//         onChange={(e) => onSelectVersion(e)}
//         // onChange={onSelectVersion}

//         optionLabel="version"
//         optionValue="version"
//         placeholder="Select Version"
//       />
//       <br />
//       <br />
//       <Card>
//         <div class="grid">
//           <div class="col-4">
//             <div className="datatable-scroll-demo">
//               <Card
//                 style={{
//                   borderLeft: "8px solid #49ABA0",
//                   backgroundColor: "#F3F3F3",
//                   // width: "400px",
//                 }}
//               >
//                 <ScrollPanel style={{ width: "100%", height: "350px" }}>
//                   <DataTable
//                     value={section}
//                     rowHover
//                     header={"Identified Sections"}
//                     selection={selectedCustomers}
//                     onSelectionChange={(e) => setSelectedCustomers(e.value)}
//                     loading={loading}
//                     size="small"
//                   >
//                     <Column field="sectionName"></Column>
//                     <Column
//                       field="comment"
//                       body={CommentTemplate}
//                       bodyStyle={{ height: "2rem" }}
//                       headerStyle={{ width: "2rem" }}
//                     ></Column>

//                     <Column
//                       field="Notes"
//                       body={NotesTemplate}
//                       bodyStyle={{ height: "2rem" }}
//                       headerStyle={{ width: "2rem" }}
//                     ></Column>

//                     <Column
//                       bodyStyle={{ height: "1rem" }}
//                       body={actionBodyTemplate}
//                     />
//                   </DataTable>
//                 </ScrollPanel>
//               </Card>
//             </div>
//           </div>

//           <div class="col-8">
//             <Card
//               style={{
//                 borderLeft: "8px solid #49ABA0",
//                 backgroundColor: "#F3F3F3",
//               }}
//             >
//               <div className="tabview-demo">
//                 <div className="card">
//                   <TabView className="tabview-header-icon">
//                     <TabPanel className="tabview-header" header="Section">
//                       {/* leftIcon="pi pi-calendar" */}
//                       <ScrollPanel style={{ width: "100%", height: "315px" }}>
//                         <br />

//                         <div style={{ display: "flex", float: "right" }}>
//                           &nbsp;
//                           <Button
//                             style={{
//                               backgroundColor: "white",
//                               height: "30px",
//                               width: "30px",
//                               color: "#203570",
//                             }}
//                             icon="pi pi-upload"
//                             tooltip="Upload "
//                             className=" p-button-raised p-button-text"
//                             tooltipOptions={{
//                               className: "teal-tooltip",
//                               position: "bottom",
//                             }}
//                             onClick={() => onClick("displayBasic5")}
//                           />
//                           <Dialog
//                             header="Upload particular section"
//                             visible={displayBasic5}
//                             style={{ width: "35vw" }}
//                             footer={sectionupload("displayBasic5")}
//                             onHide={() => onHide("displayBasic5")}
//                           >
//                             <form onSubmit={handleSubmit}>
//                               <input
//                                 style={{
//                                   marginTop: "15px",
//                                   marginLeft: "15px",
//                                 }}
//                                 type="file"
//                                 onChange={Documentupload}
//                               />
//                             </form>
//                           </Dialog>
//                           &nbsp;
//                           <Button
//                             visible={!sectionData.bookmarks}
//                             style={{
//                               backgroundColor: "white",
//                               height: "30px",
//                               width: "30px",
//                               color: "#203570",
//                             }}
//                             icon="pi pi-bookmark"
//                             tooltip="Bookmark "
//                             tooltipOptions={{
//                               className: "teal-tooltip",
//                               position: "bottom",
//                             }}
//                             className=" p-button-raised p-button-text"
//                             onClick={BookmarkSection}
//                           />
//                           <Button
//                             visible={sectionData.bookmarks}
//                             style={{
//                               backgroundColor: "white",
//                               height: "30px",
//                               width: "30px",
//                               color: "#203570",
//                             }}
//                             tooltip="Bookmark "
//                             tooltipOptions={{
//                               className: "teal-tooltip",
//                               position: "bottom",
//                             }}
//                             icon="pi pi-bookmark-fill"
//                             className=" p-button-raised p-button-text"
//                             onClick={BookmarkSection}
//                           />{" "}
//                           &nbsp;
//                           <Button
//                             style={{
//                               backgroundColor: "white",
//                               height: "30px",
//                               width: "30px",
//                               color: "#203570",
//                             }}
//                             icon="pi pi-download"
//                             onClick={() => {
//                               downloadSectionURL(SEC_FILE_URL);
//                             }}
//                             tooltip="Download "
//                             tooltipOptions={{
//                               className: "teal-tooltip",
//                               position: "bottom",
//                             }}
//                             className="p-button-raised p-button-text"
//                           />{" "}
//                           &nbsp;
//                         </div>
//                         <br />

//                         {/* SECTION DATA */}
//                         <div>
//                           <b>{sectionData.sectionName}</b>
//                           <br />
//                           <br />
//                           {sectionData.sectionContaion}
//                         </div>
//                         <hr />

//                         <br />

//                         <DataTable
//                           value={users}
//                           rowHover
//                           selection={selectedCustomers}
//                           onSelectionChange={(e) =>
//                             setSelectedCustomers(e.value)
//                           }
//                           loading={loading}
//                         >
//                           <Column field="comment" header="Comments" rowHover />
//                         </DataTable>

//                         <Button
//                           style={{
//                             float: "right",

//                             backgroundColor: "#203570",
//                           }}
//                           label="View"
//                           className="p-button-sm"
//                           onClick={() => getComment()}
//                         />
// {/*                         
//                         <div value={users}>
//                           {users.map((data) => (
//                             <div key={data.id}>
//                               <br />
//                               <Card>
//                                 <h4>{data.comment}</h4>
//                               </Card>
                           
//                             </div>
//                           ))}
//                         </div> */}
//                       </ScrollPanel>
//                     </TabPanel>
//                     <TabPanel header=" Keyword">
//                       <ScrollPanel style={{ width: "100%", height: "305px" }}>
//                         <Button
//                           style={{ float: "right", color: "#203570" }}
//                           label="Add Keywords"
//                           className="p-button-text p-button-sm"
//                           icon="pi pi-plus-circle"
//                           onClick={() => onClick("displayBasic")}
//                         />
//                         <Dialog
//                           header="Add Keywords"
//                           visible={displayBasic}
//                           style={{ width: "25vw" }}
//                           footer={renderFooter("displayBasic")}
//                           onHide={() => onHide("displayBasic")}
//                         >
//                           <InputText
//                             type="text "
//                             placeholder="Enter Keyword"
//                             onChange={(e) => {
//                               setUpload(e.target.value);
//                             }}
//                           />
//                         </Dialog>
//                       </ScrollPanel>
//                     </TabPanel>

//                     <TabPanel header="Notes">
//                       <ScrollPanel style={{ width: "100%", height: "305px" }}>
//                         <DataTable
//                           value={allnotes}
//                           rowHover
//                           editMode="row"
//                           dataKey="id"
//                           onRowEditComplete={onRowEditComplete}
//                           responsiveLayout="scroll"
//                           selection={selectedCustomers}
//                           onSelectionChange={(e) =>
//                             setSelectedCustomers(e.value)
//                           }
//                           loading={loading}
//                         >
//                           <Column
//                             field="notes"
//                             header="Notes"
//                             editor={(options) => textEditor(options)}
//                           />

//                           <Column header="Edit" rowEditor></Column>

//                           <Column
//                             header="Delete"
//                             headerStyle={{ width: "2rem" }}
//                             body={DeleteNotesTemplate}
//                           />
//                         </DataTable>

//                         <Dialog
//                           header="Delete All Notes"
//                           visible={displayBasic3}
//                           style={{ width: "27vw" }}
//                           footer={DeleteAll("displayBasic3")}
//                           onHide={() => onHide("displayBasic3")}
//                         >
//                           <p>Are You Sure You Want to Delete All Notes ?</p>
//                         </Dialog>

//                         {/* </ScrollPanel> */}

//                         <Button
//                           style={{ color: "#203570", float: "right" }}
//                           label="Delete All"
//                           onClick={() => {
//                             Removefunction(secId);
//                           }}
//                           // footer={DeleteAll("displayBasic3")}
//                           className="p-button-outlined p-button-sm"
//                         />
//                       </ScrollPanel>
//                     </TabPanel>
//                   </TabView>
//                 </div>
//               </div>

//               {/* 


//         <b>Comment</b>
//                 <div>
//                   {users.map((user) => (
//                     <div key={user.comment}>{user.comment}</div>
//                   ))}
//                   <div> 
                  
                  
//                     <Button
//                       style={{
//                         float: "right",
//                         marginLeft: "10px",
//                         backgroundColor: "#203570",
//                       }}
                     
//                       label="View"
//                       className="p-button-sm"
//                       onClick={() => getComment()}
//                     /> 
//               </div> 
//                  </div> 
               

//                      */}
//             </Card>
//           </div>
//           {/* </div> */}

//           <div class="col-4">
//             {/* ADD NOTES */}

//             <Dialog
//               header="Add Notes"
//               visible={displayPosition}
//               position={position}
//               modal
//               style={{ width: "35vw" }}
//               footer={AddNotes("displayPosition")}
//               onHide={() => onHide("displayPosition")}
//               draggable={false}
//               resizable={false}
//             >
//               <InputTextarea
//                 type="text "
//                 placeholder="Enter Notes here..."
//                 onChange={(e) => {
//                   setNotes(e.target.value);
//                 }}
//                 rows={4}
//                 cols={46}
//               />
//             </Dialog>

//             {/* ADD COMMENT */}

//             <Dialog
//               header="Add Comment"
//               visible={displayPosition1}
//               position={position}
//               modal
//               style={{ width: "35vw" }}
//               footer={AddComment("displayPosition1")}
//               onHide={() => onHide("displayPosition1")}
//               draggable={false}
//               resizable={false}
//             >
//               <InputTextarea
//                 type="text "
//                 placeholder="Enter Comment here..."
//                 onChange={(e) => {
//                   setComment(e.target.value);
//                 }}
//                 rows={4}
//                 cols={46}
//               />
//             </Dialog>

//             {/* DELETE PARTICULAR NOTES */}
//             <Dialog
//               header="Delete Particular Notes"
//               visible={displayBasic4}
//               style={{ width: "27vw" }}
//               footer={Delete("displayBasic4")}
//               onHide={() => onHide("displayBasic4")}
//             >
//               <p>Are You Sure You Want to Delete Particular Notes ?</p>
//             </Dialog>
//           </div>
//         </div>

//         <div style={{ float: "right", marginTop: "-5px" }}>
//           <Button
//             style={{ color: "#203570" }}
//             label="Enable Document"
//             onClick={EnableDocument}
//             className="p-button-outlined p-button-sm"
//           />
//           &nbsp; &nbsp;
//           <Button
//             style={{ color: "#203570" }}
//             label="Disable Document"
//             onClick={DisableDocument}
//             className="p-button-outlined p-button-sm"
//           />
//         </div>
//       </Card>
//     </div>
//   );
// };
// export default Product;





import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Card } from "primereact/card";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { ScrollPanel } from "primereact/scrollpanel";
import { TabView, TabPanel } from "primereact/tabview";

const Product = () => {
  const [notes, setNotes] = useState("");

  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [section, setSection] = useState([]);
  const [sectionData, setSectionData] = useState([]);
  let [changeText, setChangeText] = useState(Boolean);
  let [secBookmark, setSecBookmark] = useState(Boolean);
  let [sectionId, setsectionId] = useState("");
  let [secId, setsecId] = useState("");
  const [keyword, setKeyword] = useState("");
  const [upload, setUpload] = useState("");
  const navigate = useNavigate();
  const [displayBasic5, setDisplayBasic5] = useState(false);
  const [displayBasic6, setDisplayBasic6] = useState(false);

  const [displayBasic4, setDisplayBasic4] = useState(false);
  const [displayBasic3, setDisplayBasic3] = useState(false);
  const [changeColor, setChangeColor] = useState(false);
  const [changeColor2, setChangeColor2] = useState(false);
  const [changeColor3, setChangeColor3] = useState(false);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayBasic2, setDisplayBasic2] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayMaximizable, setDisplayMaximizable] = useState(false);

  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [position, setPosition] = useState("center");

  const [displayPosition, setDisplayPosition] = useState(false);
  const [displayPosition1, setDisplayPosition1] = useState(false);

  const [comment, setComment] = useState("");
  const { id } = useParams();
  const [loading] = useState(false);
  const [users, setUsers] = useState([]);
  const [values, setValues] = useState([]);
  const [allnotes, setAllNotes] = useState(null);
  const [file, setFile] = useState();
  const toast = useRef(null);

  let [actionButtons, setActionButtons] = useState(false);

  const handleClick = () => {
    setChangeColor(!changeColor);
  };
  
  const handleClick2 = () => {
    setChangeColor2(!changeColor2);
  };
  const handleClick3 = () => {
    setChangeColor3(!changeColor2);
  };

  const onCityChange = (e) => {
    console.log(e.target.value.name);
    setNotes(e.target.value.name);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("refresh prevented");
  };

  //notes
  function saveUser() {
    console.warn({ notes });
    let data = { secId: sectionId, notes };

    console.log(data, "all data");

    fetch(`${process.env.REACT_APP_API_KEY}/dam/notes/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }).then((result) => {
      if (result.status === 200) {
        console.warn("result...!!!", result);
        result.json().then((resp) => {
          console.warn("resp", resp);
         
        });
        toast.current.show({
          severity: "success",
          summary: "Notes Added",
          detail: "Notes Added Successfully",
          life: 6000,
          
        });
        //  navigate("/role")
      } else {
        toast.current.show({
          severity: "warn",
          summary: "Notes Not Added",
          detail: "Error while Adding Notes",
          life: 6000,
        });
        

      }


    },
    (error)=>{
      toast.current.show({
        severity: "error",
        summary: "Notes Not Added",
        detail: "Error while Adding Notes",
        life: 6000,
      });
   
    });
    
  }

  //     body: JSON.stringify(data),
  //   });
   
  // }

  // function saveComment() {
  //   console.warn({ comment, createdBy: "Shivani" });

  //   let data = { secId: sectionId, comment, createdBy: "shivani" };
  //   console.log(data, "all data,,,,,,");

  //   fetch(`${process.env.REACT_APP_API_KEY}/comment/addcomment`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   }).then((result) => {
  //     if (result.status === 200) {
  //       console.warn("result...!!!", result);
  //       result.json().then((resp) => {
  //         console.warn("resp", resp);
         
  //       });
  //       toast.current.show({
  //         severity: "success",
  //         summary: "User Added",
  //         detail: "User Added Successfully",
  //         life: 6000,
          
  //       });
  //       //  navigate("/role")
  //     } else {
  //       toast.current.show({
  //         severity: "warn",
  //         summary: "User Not Added",
  //         detail: "Error while Adding User",
  //         life: 6000,
  //       });
        

  //     }


  //   },
  //   (error)=>{
  //     toast.current.show({
  //       severity: "error",
  //       summary: "User Not Added",
  //       detail: "Error while Adding User",
  //       life: 6000,
  //     });
   
  //   });
    
  // }
  //download

  const DOC_FILE_URL = `${process.env.REACT_APP_API_KEY}/document/downloadFile/${id}`;

  const SEC_FILE_URL = `${process.env.REACT_APP_API_KEY}/document/downloadSec/${sectionId}`;

  const handleChange = () => {
    setChangeText(!changeText);
  };

  const sectionbookmark = () => {
    setSecBookmark(!secBookmark);
  };

  useEffect(() => {

    setActionButtons(false);
    
    getData(id);
    axios
      .get(`${process.env.REACT_APP_API_KEY}/document/getDocById/${id}`)
      .then((res) => {
        console.log(res, "document data1234");
        setChangeText(res.data.bookmarks);
        console.log(changeText, "bookmarked....!!!!");
        

      });




    axios
      .get(
        `${process.env.REACT_APP_API_KEY}/document/getAllDocVersionsByDocId/${id}`
      )
      .then((res) => {
        console.log(res.data, "version data");
        setValues(res.data);
        console.log(values, "all document version data");
      });
  }, []);

  function getDocDataByDocId(docId) {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/document/sectionsbyid/${docId}`)

      .then((res) => {
        console.log(res, "data of sections");
        setSection(res.data);
        // setSecBookmark(res.data[0].bookmarks);

        // setChangeText(res.data.bookmarked[0])
      });
  }

  function AllNotes() {
    fetch(`${process.env.REACT_APP_API_KEY}/dam/notes/list`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setAllNotes(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  //EDIT NOTES

  const EditAllNotes = (e) => {
    e.preventDefault();
    const data = { secId, notes };
    fetch(`${process.env.REACT_APP_API_KEY}/dam/notes/${secId}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        alert("Saved successfully.");
        // navigate("/Version");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  function deleteNotes(rowData) {
    console.log(rowData, "dete////");
    fetch(
      `${process.env.REACT_APP_API_KEY}/dam/notes/deleteById/${rowData.id}`,
      {
        method: "DELETE",
      } ).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
      });
      
     
    });
    window.location.reload(false);
  }

  const Removefunction = (secId) => {
    console.log(secId, ".//////.....section data..... ");
    fetch(`${process.env.REACT_APP_API_KEY}/dam/notes/delete/${sectionId}`, {
      method: "DELETE",
    }).then((res) => {
        alert("Removed successfully.");
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
      window.location.reload(false);
  };

  //DOCUMENT BOOKMARK

  const bookmark = async () => {
    console.log("Bookmarked...!!", id);
    axios
      .put(`${process.env.REACT_APP_API_KEY}/document/setBookmark/${id}`)
      .then((res) => {
        console.log(res, "bookmarked applied///////////////,///");
      });

    window.location.reload(false);
  };

  //SECTION BOOKMARK

  const BookmarkSection = async () => {
    console.log("Bookmarked...!!", id);
    axios
      .put(
        `${process.env.REACT_APP_API_KEY}/document/setSectionBookmark/${sectionId}`
      )
      .then((res) => {
        console.log(res, "bookmarked applied///////////////,///");
        // setUser(res.data);
      });

    window.location.reload(false);
  };

  const fetchData = (rowData) => {
    setActionButtons(true);
    console.log(rowData, " single row data...@@");
    setsectionId(rowData.secId);

    setSectionData(rowData);

    //BYTE TO STRING CONVERSION

    const decoder = new TextDecoder("UTF-8");

    const toString = (bytes) => {
      const rowData = new Uint8Array(bytes);
      return decoder.decode(rowData);
    };
    console.log(
      toString,
      "./////////////////////....shivani.................,,,////"
    );

    axios
      .get(`${process.env.REACT_APP_API_KEY}/dam/notes/${rowData.secId}`)

      .then((res) => {
        console.log(res, "notes of sections");
        setAllNotes(res.data);
      });
  };

  const getData = async (id) => {
    console.log(id, "inside");

    axios
      .get(`${process.env.REACT_APP_API_KEY}/document/sectionsbyid/${id}`)

      .then((res) => {
        console.log(res, "data of allsections");
        setSection(res.data);
        setSecBookmark(res.data[0].bookmarks);
      });
  };

  // function Download(){
  const downloadFileAtURL = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();


    
  };

  const downloadSectionURL = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };

  // };
  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        style={{ height: "20px", width: "20px", color: "#203570" }}
        onClick={() => fetchData(rowData)}
        icon="pi pi-chevron-circle-right"
        className="p-button-rounded p-button-text"
      />
    );
  };

  const getComment = async (rowData) => {
    console.log(rowData, "akshay.........222222");
    const res = await fetch(
      `${process.env.REACT_APP_API_KEY}/comment/${sectionId}`
    );
    const data = await res.json();
    setUsers(data);

    console.log(users, "sds./////////./////////////");
  };

  function saveComment() {
    console.warn({ comment, createdBy: "Shivani" });

    let data = { secId: sectionId, comment, createdBy: "shivani" };
    console.log(data, "all data");

    fetch(`${process.env.REACT_APP_API_KEY}/comment/addcomment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      if (result.status === 200) {
        console.warn("result...!!!", result);
        result.json().then((resp) => {
          console.warn("resp", resp);
         
        });
        toast.current.show({
          severity: "success",
          summary: "Comment Added",
          detail: "Comment Added Successfully",
          life: 6000,
          
        });
        //  navigate("/role")
      } else {
        toast.current.show({
          severity: "warn",
          summary: "Comment Not Added",
          detail: "Error while Adding Comment",
          life: 6000,
        });
        

      }


    },
    (error)=>{
      toast.current.show({
        severity: "error",
        summary: "Comment Not Added",
        detail: "Error while Adding Comment",
        life: 6000,
      });
   
    });
    
  }
  

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
    displayBasic2: setDisplayBasic2,
    displayBasic3: setDisplayBasic3,
    displayModal: setDisplayModal,
    displayBasic5: setDisplayBasic5,
    displayBasic6: setDisplayBasic6,
    displayMaximizable: setDisplayMaximizable,
    displayPosition: setDisplayPosition,
    displayPosition1: setDisplayPosition1,
    displayResponsive: setDisplayResponsive,
  };

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  };

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  };
  //DOCUMENT UPLOAD

  const documentUpload = (name) => {
    return (
      <div>
        <Button
          label="No"
          onClick={() => onHide(name)}
          className="p-button-text p-button-sm"
        />
        <Button
          label="Yes"
          className="p-button-sm"
          onMouseDown={() => onHide(name)}
          onClick={submit}
          //onMouseEnter
          autoFocus
        />
      </div>
    );
  };

  //SECTION UPLOAD

  const sectionupload = (name) => {
    return (
      <div>
        <Button
          label="No"
          onClick={() => onHide(name)}
          className="p-button-text p-button-sm"
        />
        <Button
          label="Yes"
          className="p-button-sm"
          onClick={() => onHide(name)}
          onMouseEnter={handleSubmit}
          autoFocus
        />
      </div>
    );
  };

  //COMMENT
  const AddComment = (name) => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-sm p-button-text"
        />
        <Button
          label="Submit"
          onClick={() => onHide(name)}
          onMouseDown={saveComment}
          icon="pi pi-check"
          className="p-button-sm"
          autoFocus
        />
      </div>
    );
  };

  //ADD NOTES

  const AddNotes = (name) => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-sm p-button-text"
        />

        <Button
          style={{ backgroundColor: "#203570" }}
          label="Yes"
          className="p-button-sm"
          onMouseDown={saveUser}
          icon="pi pi-check"
          onClick={() => onHide(name)}
          autoFocus
        />
      </div>
    );
  };

  // function saveUser() {
  //   console.warn({ upload });
  //   let data = { upload };
  //   fetch(
  //     `http://192.168.1.59:8080/sample/addTerm/` + upload,

  //     {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   ).then((result) => {
  //     result.json().then((resp) => {
  //       console.warn("resp", resp);
  //     });
  //   });
  // }

  //keyword

  const renderFooter = (name) => {
    return (
      <div>
        <Button
          label="No"
          onClick={() => onHide(name)}
          className="p-button-sm p-button-text"
        />
        <Button
          label="Yes"
          onMouseEnter={saveUser}
          onClick={() => onHide(name)}
          style={{ backgroundColor: "#203570" }}
          className="p-button-sm"
          autoFocus
        />

        {/* // onClick={() => onHide(name)} */}
      </div>
    );
  };

  //DELETE ALL NOTES

  const DeleteAll = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-sm p-button-text"
        />
        <Button
          label="Yes"
          onMouseEnter={() => {
            Removefunction(secId);
          }}
          onClick={() => onHide(name)}
          icon="pi pi-check"
          className="p-button-sm"
          autoFocus
        />
      </div>
    );
  };

  //DELETE PARTICULAR NOTES
  const Delete = (name) => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => onHide(name)}
          className="p-button-sm p-button-text"
        />
        <Button
          label="Yes"
          // onMouseEnter={() => deleteNotes(item.id)}
          onClick={() => onHide(name)}
          icon="pi pi-check"
          className="p-button-sm"
          autoFocus
        />
      </div>
    );
  };

  //EDIT NOTES

  const CommentTemplate = (rowData) => {
    console.log(rowData, "action body.....");
    return (
      <Button
        style={{ height: "20px", width: "20px", color: "#203570" }}
        tooltip="Comment"
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        onClick={() => onClick("displayPosition1", "right")}
        icon="pi pi-comment"
        className="p-button-rounded p-button-text"
      />
    );
  };

  const NotesTemplate = (rowData) => {
    console.log(rowData, "action body.....");
    return (
      <Button
        style={{ height: "20px", width: "20px", color: "#203570" }}
        onClick={() => onClick("displayPosition", "right")}
        icon="pi pi-file-edit"
        tooltip="Notes"
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        className="p-button-rounded p-button-text"
      />
    );
  };

  const AllNotesTemplate = (rowData) => {
    console.log(rowData, "action body.....");
    return (
      <div>
        <Button
          style={{
            // marginLeft: "300px",
            height: "20px",
            width: "20px",
            color: "#203570",
          }}
          icon="pi pi-file-edit"
          className="p-button-rounded p-button-text"
        />
      </div>
    );
  };

  const DeleteNotesTemplate = (rowData) => {
    console.log(rowData, "action body.....");
    return (
      <div>
        <Button
          style={{ height: "20px", width: "20px", color: "#203570" }}
          icon="pi pi-trash"
          onClick={() => deleteNotes(rowData)}
          className="p-button-rounded p-button-text"
        />
      </div>
    );
  };

  function onSelectVersion(rowData) {
    console.log(rowData, "selected value...!!!");
    getDocDataByDocId(rowData.value.docId);

    // setId(rowData.value.docId);
  }

  // //Section Upload

  function Documentupload(event) {
    setFile(event.target.files[0]);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const url = `${process.env.REACT_APP_API_KEY}/document/uploadSec`;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("id", id);
    console.log(
      formData,
      "////////////////////Section Data................//////////"
    );
    axios.post(url, formData).then((res) => {});
    window.location.reload(false);
  }

  ///upload updated document

  function UpdatedDocument(event) {
    setFile(event.target.files[0]);
  }

  function submit(event) {
    event.preventDefault();
    window.location.reload(false);

    const url = `${process.env.REACT_APP_API_KEY}/document/uploadNewVersions`;

    //http://192.168.1.59:8080/sample/document
    const formData = new FormData();

    formData.append("file", file);
    formData.append("docId", id);
    console.log(formData, "//////////////////////////////");
    axios.post(url, formData).then((res) => {});
    window.location.reload(false);
  }

  //DISABLED DOCUMENT
  // function DisableDocument() {
  //   let data;

  //   fetch(` ${process.env.REACT_APP_API_KEY}/sample/updateEnable/${id} `, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   }).then((result) => {
  //     // console.warn("result",result);
  //     result.json().then((resp) => {
  //       console.warn("resp", resp);
  //     });
  //   });
  // }

  //ENABLE DOCUMENT

  function EnableDocument() {
    let data;

    fetch(` ${process.env.REACT_APP_API_KEY}/sample/updateEnable/${id} `, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((result) => {
      // console.warn("result",result);
      result.json().then((resp) => {
        console.warn("resp", resp);
        // setEnabled(resp)
        if (resp.statusCode === true) {
          return (
            <div>
              <Button
                style={{ color: "#203570" }}
                label="EnableDocument"
                onClick={EnableDocument}
                onMouseDown={handleClick2}
                className={`text-black p-button-sm  ${
                  changeColor2 === true ? "bg-blue-800 text-white" : "bg-white"
                }`}
              />
            </div>
          );
        } else if (resp.statusCode === false) {
          return (
            <Button
              style={{ color: "#203570" }}
              label="Disable Document"
              onClick={EnableDocument}
              onMouseDown={handleClick2}
              className={`text-black p-button-sm  ${
                changeColor2 === true ? "bg-blue-800 text-white" : "bg-white"
              }`}
            />
          );
        }
      });
    });
  }

  const [products2, setProducts2] = useState(null);

  //EDIT NOTES

  function updateUser(e) {
    if (e.which === 13) {
      console.log(e, " enter event");
    }
  }

  const onRowEditComplete = (e) => {
    console.log(e);

    const notes = {
      notes: e.newData.notes,
      // notesName:"test",
      // secId: e.newData.secId,
      // id:"",
      // createdOn:123434
    };

    fetch(`${process.env.REACT_APP_API_KEY}/dam/notes/${e.newData.secId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notes),
    }).then((result) => {
      setProducts2(result);

      console.log("rsult", result);

      result.json().then((resp) => {
        console.warn(resp);
      });
    });
  };

  const textEditor = (options) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => options.editorCallback(e.target.value)}
      />
    );
  };

  // const header = renderHeader();
  return (
    <div>
      <Toast ref={toast} />
      <NavLink to="/DashboardMain" className="link1">
        <Button
          style={{ backgroundColor: "white", height: "30px", color: "#203570" }}
          icon="pi pi-chevron-circle-left"
          label="Document Name"
          className="p-button-raised p-button-secondary p-button-text"
        />
        &nbsp;
      </NavLink>
      <Button
        visible={!changeText}
        style={{
          backgroundColor: "white",
          height: "30px",
          width: "30px",
          color: "#203570",
        }}
        icon="pi pi-bookmark"
        className=" p-button-raised p-button-text"
        onClick={bookmark}
        tooltip="Bookmark"
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        name="bookmark Document"
      />
      <Button
        visible={changeText}
        style={{
          backgroundColor: "white",
          height: "30px",
          width: "30px",
          color: "#203570",
        }}
        icon="pi pi-bookmark-fill"
        className=" p-button-raised p-button-text"
        onClick={bookmark}
        tooltip=" Bookmark"
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        name="bookmark Document"
      />
      &nbsp;
      <Button
        style={{
          backgroundColor: "white",
          height: "30px",
          width: "30px",
          color: "#203570",
        }}
        icon="pi pi-download"
        onClick={() => {
          downloadFileAtURL(DOC_FILE_URL);
        }}
        tooltip="Download "
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        className="p-button-raised  p-button-text"
        onMouseDown={handleClick3}
        // className={`text-black  p-button-sm  ${(changeColor3 === true)? 'bg-blue-800 text-white' : 'bg-white'}`}
      />{" "}
      &nbsp;
      <Button
        style={{
          backgroundColor: "white",
          height: "30px",
          width: "30px",
          color: "#203570",
        }}
        tooltip="Share "
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        icon="pi pi-external-link"
        className="p-button-raised p-button-text"
      />
      &nbsp;
      <Button
        style={{
          backgroundColor: "white",
          height: "30px",
          width: "30px",
          color: "#203570",
        }}
        tooltip="Upload "
        className=" p-button-raised p-button-text"
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        icon="pi pi-upload"
        onClick={() => onClick("displayBasic6")}
      />
      <Dialog
        header="Upload particular version"
        visible={displayBasic6}
        style={{ width: "35vw" }}
        footer={documentUpload("displayBasic6")}
        onHide={() => onHide("displayBasic6")}
      >
        <form>
          <input
            style={{ marginTop: "15px", marginLeft: "15px" }}
            type="file"
            onChange={UpdatedDocument}
          />
        </form>
      </Dialog>
      <Dropdown
        style={{
          // height:"40px",
          backgroundColor: "white",
          float: "right",
          color: "#203570",
        }}
        value={values}
        options={values}
        onChange={(e) => onSelectVersion(e)}
        optionLabel="version"
        placeholder="Select Version"
      />
      <br />
      <br />
      <Card>
        <div class="grid">
          <div class="col-4">
            <div className="datatable-scroll-demo">
              <Card
                style={{
                  borderLeft: "8px solid #49ABA0",
                  backgroundColor: "#F3F3F3",
                  // width: "400px",
                }}
              >
                <ScrollPanel style={{ width: "100%", height: "350px" }}>
                  <DataTable
                    value={section}
                    rowHover
                    header={"Identified Sections"}
                    selection={selectedCustomers}
                    onSelectionChange={(e) => setSelectedCustomers(e.value)}
                    loading={loading}
                    size="small"
                  >
                    <Column field="sectionName"></Column>
                    <Column
                      field="comment"
                      body={CommentTemplate}
                      bodyStyle={{ height: "2rem" }}
                      headerStyle={{ width: "2rem" }}
                    ></Column>

                    <Column
                      field="Notes"
                      body={NotesTemplate}
                      bodyStyle={{ height: "2rem" }}
                      headerStyle={{ width: "2rem" }}
                    ></Column>

                    <Column
                      bodyStyle={{ height: "1rem" }}
                      body={actionBodyTemplate}
                    />
                  </DataTable>
                </ScrollPanel>
              </Card>
            </div>
          </div>

          <div class="col-8">
            <Card
              style={{
                borderLeft: "8px solid #49ABA0",
                backgroundColor: "#F3F3F3",
              }}
            >
              <div className="tabview-demo">
                <div className="card">
                  <TabView className="tabview-header-icon">
                    <TabPanel className="tabview-header" header="Section">
                      {/* leftIcon="pi pi-calendar" */}
                      <ScrollPanel style={{ width: "100%", height: "315px" }}>
                        <br />

                        <div style={{ display: "flex", float: "right" }}>
                          &nbsp;
                          <Button
                            visible={actionButtons}
                            style={{
                              backgroundColor: "white",
                              height: "30px",
                              width: "30px",
                              color: "#203570",
                            }}
                            icon="pi pi-upload"
                            tooltip="Upload "
                            className=" p-button-raised p-button-text"
                            tooltipOptions={{
                              className: "teal-tooltip",
                              position: "bottom",
                            }}
                            onClick={() => onClick("displayBasic5")}
                          />
                          <Dialog
                            header="Upload particular section"
                            visible={displayBasic5}
                            style={{ width: "35vw" }}
                            footer={sectionupload("displayBasic5")}
                            onHide={() => onHide("displayBasic5")}
                          >
                            <form onSubmit={handleSubmit}>
                              <input
                                style={{
                                  marginTop: "15px",
                                  marginLeft: "15px",
                                }}
                                type="file"
                                onChange={Documentupload}
                              />
                            </form>
                          </Dialog>
                          &nbsp;
                          <Button
                            visible={!sectionData.bookmarks && actionButtons}
                            style={{
                              backgroundColor: "white",
                              height: "30px",
                              width: "30px",
                              color: "#203570",
                            }}
                            icon="pi pi-bookmark"
                            tooltip="Bookmark "
                            tooltipOptions={{
                              className: "teal-tooltip",
                              position: "bottom",
                            }}
                            className=" p-button-raised p-button-text"
                            onClick={BookmarkSection}
                          />
                          <Button
                            visible={sectionData.bookmarks && actionButtons}
                            style={{
                              backgroundColor: "white",
                              height: "30px",
                              width: "30px",
                              color: "#203570",
                            }}
                            tooltip="Bookmark "
                            tooltipOptions={{
                              className: "teal-tooltip",
                              position: "bottom",
                            }}
                            icon="pi pi-bookmark-fill"
                            className=" p-button-raised p-button-text"
                            onClick={BookmarkSection}
                          />{" "}
                          &nbsp;
                          <Button
                            visible={actionButtons}
                            style={{
                              backgroundColor: "white",
                              height: "30px",
                              width: "30px",
                              color: "#203570",
                            }}
                            icon="pi pi-download"
                            onClick={() => {
                              downloadSectionURL(SEC_FILE_URL);
                            }}
                            tooltip="Download "
                            tooltipOptions={{
                              className: "teal-tooltip",
                              position: "bottom",
                            }}
                            className="p-button-raised p-button-text"
                          />{" "}
                          &nbsp;
                        </div>
                        <br />

                        {/* SECTION DATA */}
                        <div>
                          <b>{sectionData.sectionName}</b>
                          <br />
                          <br />
                          {sectionData.sectionContaion}
                        </div>
                        <hr />

                        <br />

                        <DataTable
                          value={users}
                          rowHover
                          selection={selectedCustomers}
                          onSelectionChange={(e) =>
                            setSelectedCustomers(e.value)
                          }
                          loading={loading}
                        >
                          <Column field="comment" header="Comments" />
                        </DataTable>

                        <Button
                          style={{
                            float: "right",

                            backgroundColor: "#203570",
                          }}
                          label="View"
                          className="p-button-sm"
                          onClick={() => getComment()}
                        />
                      </ScrollPanel>
                    </TabPanel>
                    <TabPanel header=" Keyword">
                      <ScrollPanel style={{ width: "100%", height: "305px" }}>
                        <Button
                          style={{ float: "right", color: "#203570" }}
                          label="Add Keywords"
                          className="p-button-text p-button-sm"
                          icon="pi pi-plus-circle"
                          onClick={() => onClick("displayBasic")}
                        />
                        <Dialog
                          header="Add Keywords"
                          visible={displayBasic}
                          style={{ width: "25vw" }}
                          footer={renderFooter("displayBasic")}
                          onHide={() => onHide("displayBasic")}
                        >
                          <InputText
                            type="text "
                            placeholder="Enter Keyword"
                            onChange={(e) => {
                              setUpload(e.target.value);
                            }}
                          />
                        </Dialog>
                      </ScrollPanel>
                    </TabPanel>

                     <TabPanel header="Notes">
                      <ScrollPanel style={{ width: "100%", height: "305px" }}>
                        <DataTable
                          value={allnotes}
                          rowHover
                          editMode="row"
                          dataKey="id"
                          onRowEditComplete={onRowEditComplete}
                          responsiveLayout="scroll"
                          selection={selectedCustomers}
                          onSelectionChange={(e) =>
                            setSelectedCustomers(e.value)
                          }
                          loading={loading}
                        >
                          <Column
                            field="notes"
                            header="Notes"
                            editor={(options) => textEditor(options)}
                          />

                          <Column header="Edit" rowEditor></Column>

                          <Column
                            header="Delete"
                            headerStyle={{ width: "2rem" }}
                            body={DeleteNotesTemplate}
                          />
                        </DataTable>

                        <Dialog
                          header="Delete All Notes"
                          visible={displayBasic3}
                          style={{ width: "27vw" }}
                          footer={DeleteAll("displayBasic3")}
                          onHide={() => onHide("displayBasic3")}
                        >
                          <p>Are You Sure You Want to Delete All Notes ?</p>
                        </Dialog> 

                    </ScrollPanel>

                  <Button
                          style={{ color: "#203570", float: "right" }}
                          label="Delete All"
                          onClick={() => {
                            Removefunction(secId);
                          }}
                         
                          className="p-button-outlined p-button-sm"
                        /> 
                    {/* </ScrollPanel> */}
                    </TabPanel>
                  </TabView>
                </div>
              </div>


{/* <b>Comment</b> */}
                {/* <div>
                  {users.map((user) => (
                    <div key={user.comment}>{user.comment}</div>
                  ))}
                  <div> 
                  
                  
                    <Button
                      style={{
                        float: "right",
                        marginLeft: "10px",
                        backgroundColor: "#203570",
                      }}
                     
                      label="View"
                      className="p-button-sm"
                      onClick={() => getComment()}
                    /> 
              </div> 
                 </div> 
                */}

                   
            </Card>
          </div>
          {/* </div> */}

          <div class="col-4">
            {/* ADD NOTES */}

            <Dialog
              header="Add Notes"
              visible={displayPosition}
              position={position}
              modal
              style={{ width: "35vw" }}
              footer={AddNotes("displayPosition")}
              onHide={() => onHide("displayPosition")}
              draggable={false}
              resizable={false}
            >
              <InputTextarea
                type="text "
                placeholder="Enter Notes here..."
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
                rows={4}
                cols={46}
              />
            </Dialog>

            {/* ADD COMMENT */}

            <Dialog
              header="Add Comment"
              visible={displayPosition1}
              position={position}
              modal
              style={{ width: "35vw" }}
              footer={AddComment("displayPosition1")}
              onHide={() => onHide("displayPosition1")}
              draggable={false}
              resizable={false}
            >
              <InputTextarea
                type="text "
                placeholder="Enter Comment here..."
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                rows={4}
                cols={46}
              />
            </Dialog>

            {/* DELETE PARTICULAR NOTES */}
            <Dialog
              header="Delete Particular Notes"
              visible={displayBasic4}
              style={{ width: "27vw" }}
              footer={Delete("displayBasic4")}
              onHide={() => onHide("displayBasic4")}
            >
              <p>Are You Sure You Want to Delete Particular Notes ?</p>
            </Dialog>
          </div>
        </div>

        <div style={{ float: "right", marginTop: "-5px" }}>
          <Button
            style={{ color: "#203570" }}
            label=" Approve Document "
            onClick={EnableDocument}
            onMouseDown={handleClick}
            className={`text-black p-button-sm  ${
              changeColor === true ? "bg-blue-800 text-white" : "bg-white"
            }`}
          />
          &nbsp; &nbsp;
          {/* 
{/*      
          <Button
            style={{ color: "#203570" }}
            label="Enable Document"
            onClick={EnableDocument}
            // className="p-button-outlined p-button-sm"
            onMouseDown={handleClick1}
            className={`text-black p-button-sm  ${(changeColor1 === true)? 'bg-blue-800 text-white' : 'bg-white'}`} 

          /> */}
          {/* <ToggleButton
            checked={checked2}
            onChange={(e) => setChecked2(e.value)}
            onLabel="EnableDocument"
            offLabel="DisableDocument"
            onClick={EnableDocument}
            className="p-button-sm"
            style={{ width: "10em" }}
            aria-label="Confirmation"
          />
          &nbsp; &nbsp; */}
          <Button
            style={{ color: "#203570" }}
            label="EnableDocument"
            onClick={EnableDocument}
            onMouseDown={handleClick2}
            className={`text-black p-button-sm  ${
              changeColor2 === true ? "bg-blue-800 text-white" : "bg-white"
            }`}
          />
        </div>
      </Card>
    </div>
  );
};
export default Product;
