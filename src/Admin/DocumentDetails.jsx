import React, {  useState, useRef } from "react";
import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import { CustomerService } from "../service/CustomerService";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function DocumentDetails() {
  const [file, setFile] = useState();
  const [documentName, setDocumentName] = useState();
  const [description, setDescription] = useState();
  const [clientName, setClientName] = useState();
  const navigate = useNavigate();
  const toast = useRef(null);
  const { docId } = useParams();
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!documentName) {
      errors.documentName = 'Please enter your DocumentName';
      isValid = false;
    }

    if (!description) {
      errors.description = 'Please enter your description';
      isValid = false;
    }

    if (!clientName) {
      errors.clientName = 'Please enter your clientname';
      isValid = false;
    }
    if (!file) {
      errors.file = 'Please select your file';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  

  const customerService = new CustomerService();
  function handleChange(event) {
    setFile(event.target.files[0]);
  }

 function document(event) {
    console.log(event.target.value);
    setDocumentName(event.target.value);
  }
  function Description(event) {
    console.log(event.target.value);

    setDescription(event.target.value);
  }

  function client(event) {
    console.log(event.target.value);

    setClientName(event.target.value);
  }

  function handleSubmit(event) {
    console.log(documentName, " ", description, " ", clientName);
    event.preventDefault();

    // e.preventDefault();
    if (validateForm()) {
      console.log('Valid form submitted:', {documentName,  description,clientName });
    }
    const url = `${process.env.REACT_APP_API_KEY}/document/upload`;

    //http://192.168.1.59:8080/sample/document
    const formData = new FormData();
    formData.append("file", file);

    formData.append("documentName", documentName);
    formData.append("description", description);
    formData.append("clientName", clientName);

    console.log(formData, "//////////////////////////////");

    axios.post(url, formData).then((res) => {
     console.log(res, ",/////////doc id//////");
      customerService.docId = res.data;
      console.log(customerService.docId, "   .////customerService.docId");
      navigate("/documentReview/" + res.data.docId);
 });

  }

  function DocumentSubmit(event) {
    console.log(documentName, " ", description, " ", clientName);

    event.preventDefault();
    const url = `${process.env.REACT_APP_API_KEY}/document/uploadSaveAsDraft`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentName", documentName);
    formData.append("description", description);
    formData.append("clientName", clientName);
   console.log(formData, "//////////////////////////////");
    axios.post(url, formData).then((res) => {
     console.log(res, ",/////////doc id//////");
      customerService.docId = res.data;
      console.log(customerService.docId, "   .////customerService.docId");
      navigate("/documentReview/" + res.data.docId);

});

}

  return (
    <div>
      <Card>
      <Card
        style={{
          borderLeft: "8px solid #49ABA0 ",
          backgroundColor: "#F3F3F3",
          width: "80%",
          height:"40%"

        }}
      >
        {/* <div className="App"> */}
          <form onSubmit={handleSubmit}>
            <div class="formgrid grid">
              <div class="field col-6">
              <label for="lastname2">Document Name</label>
               <InputText
                  style={{ width: "70%",height:"50%" }}
                  type="text"
                  className="p-inputtext-sm block mb-2"
                  value={documentName}
                  onChange={document}
                   name="documentname"

                />
                {errors.documentName && <div style={{color:"red"}}>{errors.documentName}</div>}
              </div>
              <div class="field col-6">
                <label for="lastname2">Client Name</label>
                <InputText
                  style={{ width: "70%",height:"50%" }}
                  type="text"

                  className="p-inputtext-sm block mb-2"
                  value={clientName}
                  onChange={client}
                  name="clientname"
                />
                  {errors.clientName && <div style={{color:"red"}}>{errors.clientName}</div>}
              </div>
            </div>

            <div class="formgrid grid">
              <div class="field col-6">
                <label for="lastname2">Description</label>
                <br />
                <InputTextarea
                  value={description}
                  onChange={Description}
                  rows={3}
                  cols={40}
                />
                  {errors.description && <div style={{color:"red"}}>{errors.description}</div>}
              </div>
              <div class="field col-6">
                <label>Upload Document</label>
                <Card
                  style={{
                    backgroundColor: "#D4EBE9 ",
                    width: "380px",
                    height: "22vh",
                  }}
                >
                  <div
                    style={{
                      border: "1.5px dotted  ",
                      backgroundColor: "#D4EBE9 ",

                      height: "70px",
                      width: "95%",
                      borderRadius:"5px",
                      marginBottom: "100%",
                    }}

                  >
                    <input
                      style={{padding:"1rem" ,marginLeft: "20px" }}
                      type="file"
                      onChange={handleChange}
                    />
                       {errors.file && <div style={{color:"red"}}>{errors.file}</div>}

                    {/* <br />
                    <br />
                    <br/> */}

                    <h6>Eligible Formats:DOCX,DOC and PDF</h6>
                  </div>
                </Card>
              </div>
            </div>
          </form>
        {/* </div> */}
      </Card>

      <br />
<div style={{ float: "right",display:"flex" }}>
      <Button
        style={{ backgroundColor: "#203570", color: "white" }}
        type="button"

        label="Next"
        className="p-button-outlined p-button-sm"
        onClick={handleSubmit}
      >

      </Button>&nbsp;

      <Button
        style={{ backgroundColor: "#203570", color: "white" }}
        type="button"
        label="Save as Draft"
        className="p-button-outlined p-button-sm"
        onClick={ DocumentSubmit}
      >

      </Button>&nbsp;

      <Button
        style={{marginleft:"80px",marginBottom:"30px" }}
        label="Cancel"
        className="p-button-outlined p-button-sm"
      />&nbsp;

    </div>
    </Card>
    </div>

  );
}

export default DocumentDetails;

// import React, { useState } from 'react';

// const FormValidationExample = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({});

//   const validateForm = () => {
//     let errors = {};
//     let isValid = true;

//     if (!name) {
//       errors.name = 'Please enter your name';
//       isValid = false;
//     }

//     if (!email) {
//       errors.email = 'Please enter your email';
//       isValid = false;
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       errors.email = 'Please enter a valid email';
//       isValid = false;
//     }

//     if (!password) {
//       errors.password = 'Please enter your password';
//       isValid = false;
//     } else if (password.length < 6) {
//       errors.password = 'Password must be at least 6 characters';
//       isValid = false;
//     }

//     setErrors(errors);
//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       console.log('Valid form submitted:', { name, email, password });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>Name:</label>
//         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         {errors.name && <div>{errors.name}</div>}
//       </div>
//       <div>
//         <label>Email:</label>
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         {errors.email && <div>{errors.email}</div>}
//       </div>
//       <div>
//         <label>Password:</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         {errors.password && <div>{errors.password}</div>}
//       </div>
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default FormValidationExample;

// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
// import { Card } from "primereact/card";
// import { InputTextarea } from "primereact/inputtextarea";
// import { CustomerService } from "../service/CustomerService";
// import { Toast } from "primereact/toast";
// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { Form, Field } from "react-final-form";
// import { classNames } from "primereact/utils";

// function DocumentDetails() {
//   const [file, setFile] = useState();
//   const [documentName, setDocumentName] = useState();
//   const [description, setDescription] = useState();
//   const [clientName, setClientName] = useState();
//   const navigate = useNavigate();
//   const toast = useRef(null);
//   const { docId } = useParams();

//   const [showMessage, setShowMessage] = useState(false);
//   const [formData, setFormData] = useState({});

//   const customerService = new CustomerService();
//   function handleChange(event) {
//     setFile(event.target.files[0]);
//   }

//   function document(event) {
//     console.log(event.target.value);
//     setDocumentName(event.target.value);
//   }
//   function Description(event) {
//     console.log(event.target.value);

//     setDescription(event.target.value);
//   }

//   function client(event) {
//     console.log(event.target.value);

//     setClientName(event.target.value);
//   }

//   function handleSubmit(event) {
//     console.log(documentName, " ", description, " ", clientName);

//     event.preventDefault();
//     const url = `${process.env.REACT_APP_API_KEY}/document/upload`;

//     const formData = new FormData();
//     formData.append("file", file);

//     formData.append("documentName", documentName);
//     formData.append("description", description);
//     formData.append("clientName", clientName);

//     console.log(formData, "//////////////////////////////");

//     axios.post(url, formData).then((res) => {
//       console.log(res, ",/////////doc id//////");
//       customerService.docId = res.data;
//       console.log(customerService.docId, "   .////customerService.docId");
//       navigate("/documentReview/" + res.data.docId);
//     });
//   }

//   function DocumentSubmit(event) {
//     console.log(documentName, " ", description, " ", clientName);

//     event.preventDefault();
//     const url = `${process.env.REACT_APP_API_KEY}/document/uploadSaveAsDraft`;

//     const formData = new FormData();
//     formData.append("file", file);

//     formData.append("documentName", documentName);
//     formData.append("description", description);
//     formData.append("clientName", clientName);

//     console.log(formData, "//////////////////////////////");

//     axios.post(url, formData).then((res) => {
//       console.log(res, ",/////////doc id//////");
//       customerService.docId = res.data;
//       console.log(customerService.docId, "   .////customerService.docId");
//       navigate("/documentReview/" + res.data.docId);
//     });
//   }

//   const validate = (data) => {
//     let errors = {};

//     if (!data.documentName) {
//       errors.documentName = "documentName is required.";
//     }

//     if (!data.clientName) {
//       errors.clientName = "ClientName is required.";
//     }

//     if (!data.description) {
//       errors.description = "Description is required.";
//     }

//     if (!data.file) {
//       errors.file = "File is required.";
//     }

//     return errors;
//   };

//   const onSubmit = (data, form) => {
//     setFormData(data);
//     console.log(data,"./././././././........///....///../");
//     setShowMessage(true);

//     form.restart();
//   };

//   const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
//   const getFormErrorMessage = (meta) => {
//     return (
//       isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
//     );
//   };

//   const save = async () => {
//     navigate("/documentReview/" + docId);
//     console.log(docId, "shivani.//.///.///.//.//");
//   };

//   return (
//     <div>
//       <Card>
//         <Card
//           style={{
//             borderLeft: "8px solid #49ABA0 ",
//             backgroundColor: "#F3F3F3",
//             width: "80%",
//             height: "40%",
//           }}
//         >
//           <Form
//             onSubmit={onSubmit}
//             initialValues={{
//               documentName: "",
//               clientName: "",
//               description: "",
//             }}
//             validate={validate}
//             render={({ handleSubmit }) => (
//               <form onSubmit={handleSubmit} className="p-fluid">
//                 <div class="formgrid grid">
//                   <div class="field col-6">
//                     <label for="lastname2">Document Name</label>

//                     <Field
//                       name="documentName"
//                       render={({ formData, meta }) => (
//                         <div className="field">
//                           <span className="p-float-label">
//                             <InputText
//                               style={{ width: "70%", height: "50%" }}
//                               type="text"
//                               value={documentName}
//                               onChange={document}
//                               // name="documentname"
//                               id="name"
//                               {...formData}
//                               autoFocus
//                               className={classNames({
//                                 "p-invalid": isFormFieldValid(meta),
//                               })}
//                             />
//                           </span>
//                           {getFormErrorMessage(meta)}
//                         </div>
//                       )}
//                     />
//                   </div>
//                   <div class="field col-6">
//                     <label for="lastname2">Client Name</label>

//                     <Field
//                       name="clientName"
//                       render={({ input, meta }) => (
//                         <div className="field">
//                           <span className="p-float-label">
//                             <InputText
//                               style={{ width: "70%", height: "50%" }}
//                               type="text"
//                               value={clientName}
//                               onChange={client}
//                               id="clientName"
//                               autoFocus
//                               className={classNames({
//                                 "p-invalid": isFormFieldValid(meta),
//                               })}
//                             />
//                           </span>
//                           {getFormErrorMessage(meta)}
//                         </div>
//                       )}
//                     />
//                   </div>
//                 </div>

//                 <div class="formgrid grid">
//                   <div class="field col-6">
//                     <label for="lastname2">Description</label>
//                     <br />

//                     <Field
//                       name="description"
//                       render={({ input, meta }) => (
//                         <div className="field">
//                           <InputTextarea
//                             rows={3}
//                             cols={20}
//                             type="text"
//                             value={description}
//                             onChange={Description}
//                             id="description"
//                             autoFocus
//                             className={classNames({
//                               "p-invalid": isFormFieldValid(meta),
//                             })}
//                           />

//                           {getFormErrorMessage(meta)}
//                         </div>
//                       )}
//                     />
//                   </div>
//                   <div class="field col-6">
//                     <label>Upload Document</label>
//                     <Card
//                       style={{
//                         backgroundColor: "#D4EBE9 ",
//                         width: "380px",
//                         height: "20vh",
//                       }}
//                     >
//                       <div
//                         style={{
//                           border: "1.5px dotted  ",
//                           backgroundColor: "#D4EBE9 ",

//                           height: "70px",
//                           width: "95%",
//                           borderRadius: "5px",
//                           marginBottom: "100%",
//                         }}
//                       >
//                         <div class="field col-6">
//                           <Field
//                             name="file"
//                             render={({ input, meta }) => (
//                               <div className="field">
//                                 <span className="p-float-label">
//                                   <input
//                                     style={{
//                                       // marginTop: "20px",
//                                       padding: "1rem",
//                                       marginLeft: "20px",
//                                     }}
//                                     type="file"
//                                     onChange={handleChange}
//                                     id="file"
//                                     autoFocus
//                                     className={classNames({
//                                       "p-invalid": isFormFieldValid(meta),
//                                     })}
//                                   />
//                                 </span>
//                                 {getFormErrorMessage(meta)}
//                               </div>
//                             )}
//                           />
//                         </div>

//                         <h6>Eligible Formats:DOCX,DOC and PDF</h6>
//                       </div>
//                     </Card>
//                   </div>
//                 </div>
//               </form>
//             )}
//           />
//         </Card>

//         <br />
//         <div style={{ float: "right", display: "flex" }}>
//           <Button
//             style={{ backgroundColor: "#203570", color: "white" }}
//             type="button"
//             label="Next"
//             className="p-button-outlined p-button-sm"
//             onClick={handleSubmit}
//           ></Button>
//           &nbsp;
//           <Button
//             style={{ backgroundColor: "#203570", color: "white" }}
//             type="button"
//             label="Save as Draft"
//             className="p-button-outlined p-button-sm"
//             onClick={DocumentSubmit}
//           ></Button>
//           &nbsp;
//           <Button
//             style={{ marginleft: "80px", marginBottom: "30px" }}
//             label="Cancel"
//             className="p-button-outlined p-button-sm"
//           />
//           &nbsp;
//         </div>
//       </Card>
//     </div>
//   );
// }

// export default DocumentDetails;

// import React, { useEffect, useState } from 'react';
// import { Form, Field } from 'react-final-form';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';

// import { classNames } from 'primereact/utils';

// function DocumentDetails(){
//     const [countries, setCountries] = useState([]);
//     const [showMessage, setShowMessage] = useState(false);
//     const [formData, setFormData] = useState({});

//     const validate = (data) => {
//         let errors = {};

//         if (!data.name) {
//             errors.name = 'Name is required.';
//         }

//         if (!data.email) {
//             errors.email = 'Email is required.';
//         }

//         if (!data.accept) {
//             errors.accept = 'You need to agree to the terms and conditions.';
//         }

//         return errors;
//     };

//     const onSubmit = (data, form) => {
//         setFormData(data);
//         setShowMessage(true);

//         form.restart();
//     };

//     const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
//     const getFormErrorMessage = (meta) => {
//         return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
//     };

//     return (
//         <div className="form-demo">

//             <div className="flex justify-content-center">
//                 <div className="card">
//                     <h5 className="text-center">Register</h5>
//                     <Form onSubmit={onSubmit} initialValues={{ name: '', email: '', password: '', date: null, country: null, accept: false }} validate={validate} render={({ handleSubmit }) => (
//                         <form onSubmit={handleSubmit} className="p-fluid">
//                             <Field name="name" render={({ input, meta }) => (
//                                 <div className="field">
//                                     <span className="p-float-label">
//                                         <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
//                                         <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Name*</label>
//                                     </span>
//                                     {getFormErrorMessage(meta)}
//                                 </div>
//                             )} />
//                             <Field name="email" render={({ input, meta }) => (
//                                 <div className="field">
//                                     <span className="p-float-label p-input-icon-right">
//                                         <i className="pi pi-envelope" />
//                                         <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
//                                         <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
//                                     </span>
//                                     {getFormErrorMessage(meta)}
//                                 </div>
//                             )} />

//                             <Button type="submit" label="Submit" className="mt-2" />
//                         </form>
//                     )} />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default DocumentDetails

// import React, { useEffect, useState } from "react";
// import { Form, Field } from "react-final-form";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";

// import { classNames } from "primereact/utils";

// import axios from "axios";

// import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { CustomerService } from "../service/CustomerService";

// function DocumentDetails() {
//   const [countries, setCountries] = useState([]);
//   const [showMessage, setShowMessage] = useState(false);
//   const [formData, setFormData] = useState({});
//   // const countryservice = new CountryService();
//   const [file, setFile] = useState();
//   const [documentName, setDocumentName] = useState();
//   const [description, setDescription] = useState();
//   const [clientName, setClientName] = useState();
//   const navigate = useNavigate();
//   // const toast = useRef(null);
//   const { docId } = useParams();
//   const [errors, setErrors] = useState({});
//   const customerService = new CustomerService();

//   function handleSubmit(event) {
//     console.log(documentName, " ", description, " ", clientName);

//     event.preventDefault();
//     const url = `${process.env.REACT_APP_API_KEY}/document/upload`;

//     const formData = new FormData();
//     formData.append("file", file);

//     formData.append("documentName", documentName);
//     formData.append("description", description);
//     formData.append("clientName", clientName);

//     console.log(formData, "//////////////////////////////");

//     axios.post(url, formData).then((res) => {
//       console.log(res, ",/////////doc id//////");
//       customerService.docId = res.data;
//       console.log(customerService.docId, "   .////customerService.docId");
//       navigate("/documentReview/" + res.data.docId);
//     });
//   }

//   const validate = (data) => {
//     let errors = {};

//     if (!data.name) {
//       errors.name = "Name is required.";
//     }

//     if (!data.email) {
//       errors.email = "Email is required.";
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
//       errors.email = "Invalid email address. E.g. example@email.com";
//     }

//     if (!data.password) {
//       errors.password = "Password is required.";
//     }

//     if (!data.accept) {
//       errors.accept = "You need to agree to the terms and conditions.";
//     }

//     return errors;
//   };

//   const onSubmit = (data, form) => {
//     alert("hihihi");
//     setFormData(data);
//     setShowMessage(true);

//     form.restart();
//   };

//   const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
//   const getFormErrorMessage = (meta) => {
//     return (
//       isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
//     );
//   };

//   return (
//     <div className="form-demo">
//       <div className="flex justify-content-center">
//         <div className="card">
//           <h5 className="text-center">Register</h5>
//           <Form
//             onSubmit={onSubmit}
//             initialValues={{ name: "" }}
//             validate={validate}
//             render={({ handleSubmit }) => (
//               <form onSubmit={handleSubmit} className="p-fluid">
//                 <Field
//                   name="name"
//                   render={({ input, meta }) => (
//                     <div className="field">
//                       <span className="p-float-label">
//                         <InputText
//                           id="name"
//                           {...input}
//                           autoFocus
//                           className={classNames({
//                             "p-invalid": isFormFieldValid(meta),
//                           })}
//                         />
//                         <label
//                           htmlFor="name"
//                           className={classNames({
//                             "p-error": isFormFieldValid(meta),
//                           })}
//                         >
//                           Name*
//                         </label>
//                       </span>
//                       {getFormErrorMessage(meta)}
//                     </div>
//                   )}
//                 />

//                 <Button type="submit" label="Submit" className="mt-2" />
//               </form>
//             )}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DocumentDetails;
