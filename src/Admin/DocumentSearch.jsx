


import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { ScrollPanel } from 'primereact/scrollpanel';

import { Paginator } from 'primereact/paginator';

function SearchProduct() {
  const [data, setData] = useState([]);
  const [customer, setCustomers] = useState([]);
  const [first,  setFirst] = useState(0);
  const [rows,   setRows] = useState(0);
  
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



