import React, { useEffect, useState, useRef } from "react";
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

  const customerService = new CustomerService();
  function handleChange(event) {
    setFile(event.target.files[0]);
  }
  useEffect(() => {
    // console.log("customerService.docId:.//////////////////////.///////////////////");
    //     docId =customerService.docId;
    //   alert(docId);
    // getData(docId);
  }, []);

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
    // toast.current.show({severity:'info', summary: 'Info Message', detail:'Message Content', life: 3000});

    event.preventDefault();
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
    // toast.current.show({severity:'info', summary: 'Info Message', detail:'Message Content', life: 3000});

    event.preventDefault();
    const url = `${process.env.REACT_APP_API_KEY}/document/uploadSaveAsDraft`;
   
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



 const save = async () => {
    navigate("/documentReview/" + docId);
    console.log(docId,"shivani.//.///.///.//.//")
  };


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
              </div>
              <div class="field col-6">
                <label for="lastname2">Client Name</label>
                <InputText
                  style={{ width: "70%",height:"50%" }}
                  type="text"
                  // className="block mb-2"
                  className="p-inputtext-sm block mb-2"
                  value={clientName}
                  onChange={client}
                  name="clientname"
                />
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
                      style={{ marginTop: "20px", marginLeft: "20px" }}
                      type="file"
                      onChange={handleChange}
                    />

                    <br />
                    <br />
                    <br/>
                   
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

    {/* <Button
       onClick={save}
        label="Next"
        className="p-button-outlined p-button-sm"
      /> */}
    </div>
    </Card>
    </div>
    
  );
}

export default DocumentDetails;
