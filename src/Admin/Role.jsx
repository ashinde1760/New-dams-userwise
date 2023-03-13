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

function Product() {
  const [selectedCustomers, setSelectedCustomers] = useState(null);
  const [loading] = useState(false);
  const [users, setUsers] = useState([]);

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    userName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    userRole: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    emailId: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },

    createdBy: {
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
  // const [loading, setLoading] = useState(true);

  const statuses = ["Active", "Deactive"];
  const [products2, setProducts2] = useState(null);

  const customerService = new CustomerService();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_API_KEY}/dam/user/list`
        );
        setUsers(response);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  function deleteUser(rowData) {
    console.log(rowData, "dete////");
    fetch(
      `${process.env.REACT_APP_API_KEY}/dam/user/delete/${rowData.id}`,

      {
        method: "DELETE",
      }
    ).then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        window.location.reload();
      });
    });
  }

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
        <NavLink to="/UserDetails" className="link1">
          <Button
            style={{ backgroundColor: "#203570" }}
            className=" p-button-sm"
          >
            Add New User
          </Button>
        </NavLink>
      </div>
    );
  };

  const countryBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.userName}</span>
      </React.Fragment>
    );
  };

  const countryTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.emailId}</span>
      </React.Fragment>
    );
  };

  const createdByTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span>{rowData.createdBy}</span>
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

  const dateBodyTemplate = (rowData) => {
    let currentTimestamp = Date.now();
    // console.log(currentTimestamp); // get current timestamp
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

  const statusItemTemplate = (option) => {
    return <span className={`customer-badge status-${option}`}>{option}</span>;
  };

  const header = renderHeader();

  const DeleteUserTemplate = (rowData) => {
    console.log(rowData, "action body.....");
    return (
      <div>
        <Button
          style={{ height: "20px", width: "20px", color: "#203570" }}
          icon="pi pi-trash"
          onClick={() => deleteUser(rowData)}
          className="p-button-rounded p-button-text"
        />
      </div>
    );
  };

  //EDIT NOTES

  function updateUser(e) {
    if (e.which === 13) {
      console.log(e, " enter event");
    }
  }

  const onRowEditComplete = (e) => {
    console.log(e, " data to be edited");

    const notes = e.newData;

    fetch(`${process.env.REACT_APP_API_KEY}/dam/user/${e.data.id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notes),
    }).then((result) => {
      setProducts2(result);
      window.location.reload(false);
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

  return (
    <div className="datatable-doc-demo">
      <Button
        icon=" pi pi-user"
        style={{ backgroundColor: "white" }}
        label="User Management"
        className="p-button-raised p-button-secondary p-button-text p-button-sm"
      />
      <br />
      <br />
      <div className="card">
        <DataTable
          value={users}
          paginator
          rowHover
          editMode="row"
          dataKey="id"
          onRowEditComplete={onRowEditComplete}
          responsiveLayout="scroll"
          selection={selectedCustomers}
          onSelectionChange={(e) => setSelectedCustomers(e.value)}
          loading={loading}
          className="p-datatable-customers"
          header={header}
          rows={12}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
          filters={filters}
          filterDisplay="menu"
          globalFilterFields={[
            "userName",
            "userRole",
            "createdBy",
            "emailId",
            "createdBy",

            "balance",
            "status",
          ]}
          emptyMessage="No Users added."
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column
            field="userName"
            header="User Name"
            sortable
            filter
            filterPlaceholder="Search by name"
            style={{ minWidth: "10rem" }}
            filterField="userName"
            body={countryBodyTemplate}
            editor={(options) => textEditor(options)}
          />
          <Column
            field="userRole"
            header="Role"
            sortable
            filter
            filterField="userRole"
            filterPlaceholder="Search by name"
            style={{ minWidth: "10rem" }}
            editor={(options) => textEditor(options)}
          />

          <Column
            field="emailId"
            header="Email Id"
            sortable
            //  filterField="reviewer"
            style={{ minWidth: "10rem" }}
            body={countryTemplate}
            filter
            filterPlaceholder="Search by email"
            editor={(options) => textEditor(options)}
          />

          <Column
            field="createdBy"
            header="Created By"
            sortable
            filter
            body={createdByTemplate}
            filterField="createdBy"
            filterPlaceholder="Search by Creater"
            style={{ minWidth: "10rem" }}
            editor={(options) => textEditor(options)}
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
            editor={(options) => textEditor(options)}
          />

          <Column
            field="createdOn"
            header="Sent On"
            sortable
            currentTimestamp
            filterField="date"
            dataType="date"
            body={dateBodyTemplate}
            style={{ minWidth: "8rem" }}
            filter
            filterElement={dateFilterTemplate}
            editor={(options) => textEditor(options)}
          />
          <Column header="Edit" rowEditor></Column>

          <Column
            header="Delete"
            headerStyle={{ width: "2rem" }}
            body={DeleteUserTemplate}
          />
        </DataTable>
      </div>
    </div>
  );
}

export default Product;
