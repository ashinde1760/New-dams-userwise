import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

import { CustomerService } from "../service/CustomerService";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Product = () => {
  
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState([]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    sectionName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    description: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    reviewer: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
    balance: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },

    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [loading, setLoading] = useState(true);

  const statuses = [
    "Updated",
    "Review Pending",
    "Issue Marked",
    "Saved as Draft",
  ];

  const customerService = new CustomerService();

  // useEffect(() => {
  //   customerService.getAllDocument().then((data2) => {
  //     setCustomers(getCustomers(data2));
  //     setLoading(false);
  //     console.log(data2,"shivani")
  //   });
  // }, []);

  // useEffect(() => {
  //   console.log("jkhkjhjhjhkhkh..........");
  //   axios
  //     .get(`http://192.168.1.61:8082/document/list `)
  //     .then((res) => {
  //       console.log(res, "./././././.aaaaaaajkkj");

  //       setBookmark(res.data);
  //     });
  // });
  
  useEffect(() => {
    const fetchData = async () =>{
     
      try {
        const {data: response} = await axios.get(`${process.env.REACT_APP_API_KEY}/document/SectionBookmarksList`);
        setBookmark(response);
      } catch (error) {
        console.error(error.message);
      }
      
     }

    fetchData();
  }, []);





  //   axios
  //   .get(`http://192.168.1.59:8080/sample/getDocById/${id}`)
  //   .then((res) => {
  //     console.log(res.data[0].bookmarked[0], "document data1234");
  //     setChangeText(res.data[0].bookmarked[0]);

  //     console.log(changeText, "bookmarked....!!!!");
  //   });

  //   const getCustomers = (data) => {
  //     console.log(data,"/././././");
  //     return [...(data || [])].map((d) => {
  //       d.date = new Date(d.date);
  //       return d;
  //     });
  //   };

  //   const formatDate = (value) => {
  //     return value.toLocaleDateString("en-US", {
  //       day: "2-digit",
  //       month: "2-digit",
  //       year: "numeric",
  //     });
  //   };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
            className="p-inputtext-sm"
          />
        </span>
        {/* <NavLink to="/UploadDocument" className="link1">
          <Button className="nextBtn p-button-sm">Upload Document</Button>
        </NavLink> */}
      </div>
    );
  };

  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.description}</span>
      </React.Fragment>
    );
  };

  const countryTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.reviewer}</span>
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.status}`}>
        {rowData.status}
      </span>
    );
  };

  const statusFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={statuses}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        itemTemplate={statusItemTemplate}
        placeholder="Select a Status"
        className="p-column-filter"
        showClear
      />
    );
  };

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const header = renderHeader();

  //   const actionBodyTemplate = (rowData) => {
  //     return (
  //       <React.Fragment>
  //         <Button
  //           icon="pi pi-file"
  //           className="p-button-rounded p-button-sm mr-2"
  //           onClick={() => editProduct(rowData)}
  //         />
  //         {/* <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} /> */}
  //       </React.Fragment>
  //     );
  //   };


  
  const dateBodyTemplate = (rowData) => {
    let currentTimestamp = Date.now();
    // console.log(currentTimestamp); // get current timestamp
    let date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      // hour: "2-digit",
      // minute: "2-digit",
      // second: "2-digit",
    }).format(currentTimestamp);
    // console.log(date, "'dsjcfsdjkshivani");
    return date;
  };


  const dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat="mm/dd/yy"
        placeholder="mm/dd/yyyy"
        mask="99/99/9999"
      />
    );
  };






  const editProduct = (product) => {
    customerService.docDataById = product;
    console.log(customerService.docDataById, "./././././././");
    navigate("/Version/" + product.id);
    console.log(product, " document data by id.....");
  };

  return (
    <div className="datatable-doc-demo">
      <div className="card">
        <DataTable
          value={bookmark}
          paginator
          className="p-datatable-customers"
          header={header}
          rows={11}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
          dataKey="id"
          rowHover
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          filters={filters}
          filterDisplay="menu"
          responsiveLayout="scroll"
          globalFilterFields={[
            "sectionName",
            "description",
            "reviewer",
            // "representative.name",
            "balance",
            "status",
          ]}
          emptyMessage="No documents found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          {/* paginator
          className="p-datatable-customers"
          header={header}
          rows={3}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
          dataKey="id"
          rowHover
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          filters={filters}
          filterDisplay="menu"
          responsiveLayout="scroll"
          globalFilterFields={[
            "name",
            "description",
            "reviewer",
            // "representative.name",
            "balance",
            "status",
          ]}
          emptyMessage="No documents found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries" */}

          {/* <Column
            field="name"
            header="DocumentName"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ minWidth: "10rem" }}
          /> */}
          {/* <Column
            field="description"
            header="Description"
            sortable
            filterField="description"
            style={{ minWidth: "10rem" }}
            body={countryBodyTemplate}
            filter
            filterPlaceholder="Search by country"
          /> */}

            {/* <Column
            field="reviewer"
             field="clientname"
            header="Reviewer"
            sortable
            filterField="reviewer"
            style={{ minWidth: "10rem" }}
            body={countryTemplate}
            filter
            filterPlaceholder="Search by country"
          /> */}


         
{/*         
          <Column
            field="status"
            header="Status"
            sortable
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "10rem" }}
            body={statusBodyTemplate}
            filter
            filterElement={statusFilterTemplate}
          />
           */}




          {/* <Column
          header="View Document"
            body={actionBodyTemplate}
            exportable={false}
            // style={{ minWidth: "rem" }}
          ></Column> */}
          {/* 
          <Column field="id" sortable header="userId"></Column> */}
          <Column
            field="sectionName"
            header="Section Name"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ minWidth: "20rem" }}
            
          />

          {/* <Column
            field="Reviewer"
            header="Reviewer"
            sortable
            filterField="reviewer"
            style={{ minWidth: "20rem" }}
            body={countryTemplate}
            filter
            filterPlaceholder="Search by reviewer"
          /> */}

          <Column
            field="status"
            header="Status"
            sortable
            filterMenuStyle={{ width: "14rem" }}
            style={{ minWidth: "20rem" }}
            body={statusBodyTemplate}
            filter
            filterElement={statusFilterTemplate}
          />




          

<Column
            field="timestamp"
            header="Sent On"
            sortable
            currentTimestamp
            filterField="date"
            dataType="date"
            body={dateBodyTemplate}
            style={{ minWidth: "14rem"}}
            filter
            filterElement={dateFilterTemplate}
          />

        </DataTable>
      </div>
    </div>
  );
};

export default Product;
