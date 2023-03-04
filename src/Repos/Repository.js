import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { useFormik } from "formik";
import { classNames } from "primereact/utils";
import { Navigate, useNavigate } from "react-router";

function Display() {

  const navigate = useNavigate();


  const isFormFieldValid = (username) =>
    !!(formik.touched[username] && formik.errors[username]);

  const getFormErrorMessage = (username) => {
    return (
      isFormFieldValid(username) && (
        <small className="p-error">{formik.errors[username]}</small>
      )
    );
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validate: (data) => {
      let errors = {};

      if (!data.username) {
        errors.username = "Name is required.";
      }

      if (!data.password) {
        errors.password = "Email is required.";
      }
    },

    onSubmit: (data) => {
      
      console.log(data, "user data");
      if(data.username==='Admin'){
        localStorage.setItem('role',"Admin")
        navigate("/dashboardMain");
      }else if(data.username==='Reviewer'){
        localStorage.setItem('role','Reviewer')
        navigate("/dashboardMain");

      }
    },
  });

  return (
    <div>
      <Card className="loginCard">
        <form onSubmit={formik.handleSubmit} className="p-fluid loginForm">
          <div>
            <label htmlFor="name">username</label>

            <InputText
              id="username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              className={classNames({
                "p-invalid": isFormFieldValid("username"),
              })}
              autoFocus
            />

            {getFormErrorMessage("username")}
          </div>

          <div>
            <label htmlFor="name">Password</label>

            <InputText
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              autoFocus
            />
          </div>

          <Button type="submit" label="Submit" className="submitButton" />
        </form>
      </Card>
    </div>
  );
}

export default Display;
