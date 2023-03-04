import React, { useState, useEffect } from "react";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { CustomerService } from "../service/CustomerService";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";


const Product = () => {
 
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    filename: {
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


  const statuses = [
    "Updated",
    "Review Pending",
    "Issue Marked",
    "Saved as Draft",
  ];

  const customerService = new CustomerService();


  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/sample/getAllDoc`)
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      });
    console.log(posts, "./././././.aaaaaaaaa");
  }, []);

  const getCustomers = (data) => {
    console.log(data, "/././././");
    return [...(data || [])].map((d) => {
      d.date = new Date(d.date);
      return d;
    });
  };

  
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
            placeholder="Search"
            className="p-inputtext-sm"
          />
        </span>
        <NavLink to="/UploadDocument" className="link1">
          <Button
            style={{ backgroundColor: "#203570" }}
            className="nextBtn p-button-sm"
          >
            Upload Document
          </Button>
        </NavLink>
      </div>
    );
  };

  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
      <div style={{ overflow: "hidden",textOverflow:"ellipsis"}}>{rowData.description}</div>
   
        
          
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



  const dateBodyTemplate = (rowData) => {
    let currentTimestamp = Date.now();
  
    let date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
     
    }).format(currentTimestamp);
    
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

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          style={{ backgroundColor: "#203570", height: 30, width: 30 }}
          icon="pi pi-file"
          className="p-button-rounded p-button-sm mr-2"
          onClick={() => editProduct(rowData)}
        />
   
      </React.Fragment>
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
          value={posts}
          paginator
          className="p-datatable-customers"
          header={header}
          rows={8}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
          dataKey="id"
          rowHover
          size="small"
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          filters={filters}
          filterDisplay="menu"
          responsiveLayout="scroll"
          globalFilterFields={[
            "filename",
            "description",
            "reviewer",
            "balance",
            "status",
          ]}
          emptyMessage="No documents found."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column
            field="filename"
            header="Document"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ minWidth: "10rem" }}
          />

          <Column
            field="description"
            header="Description"
            sortable
            filterField="description"
            style={{ minWidth: "10rem" ,textOverflow:"hidden"}}
            body={countryBodyTemplate}
            filter
           
            filterPlaceholder="Search by description"
          />
       
          <Column
            field="reviewer"
            header="Reviewer"
            sortable
            filterField="reviewer"
            style={{ minWidth: "10rem" }}
            body={countryTemplate}
            filter
            filterPlaceholder="Search by Reviewer"
          />

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

          <Column
            field="timestamp"
            header="Sent On"
            sortable
            currentTimestamp
            filterField="date"
            dataType="date"
            body={dateBodyTemplate}
            style={{ minWidth: "8rem" }}
            filter
            filterElement={dateFilterTemplate}
          />

          <Column
            header="View Document"
            body={(e) => actionBodyTemplate(e)}
            exportable={false}
           
          ></Column>
        </DataTable>
        

      </div>
    </div>
   
  );
};

export default Product;
