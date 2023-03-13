


import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { ScrollPanel } from 'primereact/scrollpanel';
import { Button } from "primereact/button";


function SearchProduct() {
  const [data, setData] = useState([]);
  const [customer, setCustomers] = useState([]);
  const [first,  setFirst] = useState(0);
  const [rows,   setRows] = useState(0);
  let [id, setdocumentId] = useState("");




  const DOC_FILE_URL = `${process.env.REACT_APP_API_KEY}/document/downloadFile/${id}`;


  //BOOKMARK DOCUMENT SECTION
  

  const downloadFileAtURL = (url) => {
    const fileName = url.split("/").pop();
    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };


  
  const[query ]= useState();
  const onPageChange = (e) => {
    setFirst(e.first);
    setRows(e.rows);
}

  async function search(key) {
    if (key.length > 1) {
   
let text = key;
let encoded = window.btoa(text);
      let result = await fetch(`${process.env.REACT_APP_API_KEY}/sample/getHighlightedValue/` + encoded  );
      result = await result.json();
        console.warn("Tasdiq",result);
        setData(result);
       setCustomers(result);

    }
  }
  
  const main = (rowData) => {
    console.log(rowData, " single row data...@@");
    setdocumentId(rowData.id);


  }


  return (
    <div>
      
      <Card >
     
 
      <span  style={{ marginLeft:"20%" }} className="p-input-icon-left">
      <i className="pi pi-search" />
 
      <InputText
       type="text"
       style={{ width:"300%" }} 
        value={query}
        onKeyDown={(e) => search(e.target.value)}
        //onChange
        className="p-inputtext-sm form-control"
        placeholder="Search"
      />
     </span>
      <br />
      <br />

     <ScrollPanel style={{ width: '100%', height: '350px' }}>

     
          {
        data.length>0?  
        <div value={customer}>
          {customer.map((data) => (
            <div key={data.id}>
              <br />
              <Card >
              <h4>{data.filename}</h4>
              
        <Button
        style={{
          backgroundColor: "white",
          height: "30px",
          width: "30px",
          color: "#203570",
          float:"right"
        }}
        icon="pi pi-download"
        onClick={() => {
          downloadFileAtURL(DOC_FILE_URL);
        }}
        tooltip="Download "
        tooltipOptions={{ className: "teal-tooltip", position: "bottom" }}
        className="p-button-raised  p-button-text"
      />

<br/>
<br/>

           

              <p dangerouslySetInnerHTML={{ __html: data.content }}></p>

             
            <label style={{float:"right"}}><b>Last Edited By:</b>{data.edit} </label>  



            

           
       
              
             
              </Card>
            </div>
          ))}
        </div>
       
     
       :null
       } 
       </ScrollPanel>
  
       </Card>
      </div>
   
  );
    
}
export default SearchProduct;




