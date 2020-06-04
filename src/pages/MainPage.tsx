import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { observer } from "mobx-react";
import { action } from "mobx";
import {
  ClosingReason,
  DialogWithButtons,
} from "../components/DialogWithButtons";
import { Employee} from "../models/Employee"
import { Column } from "react-data-grid";
import { InteractiveTable } from "../components/InteractiveTable";
import { MainPageStore} from "../stores/MainPageStore"
import * as api from "../api/api";

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  content: {
    margin: "25px",
  },
  field: {
    margin: "5px",
    width: "100%",
  },
  flexContain: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginBottom: "10px",
  },
})
);

export const DefaultEmployeeTableHeaders: ReadonlyArray<Column<Employee>> = [
  { key: "name", name: "Name" },
  { key: "address", name: "Address" },
  { key: "emailAddress", name: "Email Address" },
  { key: "phoneNumber", name: "Phone Number" },
  { key: "position", name: "Position" },
  { key: "department", name: "Department" },
  { key: "startDate", name: "Start Date" },
  { key: "endDate", name: "End Date" },
  { key: "status", name: "Employment Status" },
  { key: "shift", name: "Shift" },
  { key: "manager", name: "Manager" },
  { key: "photo", name: "Photo" },
  { key: 'favoriteColor', name: "Favorite Color" },
];

export interface MainPageProps {
  store: MainPageStore;
}

export const MainPage = observer((props: MainPageProps) => {
  const classes = useStyles();
  const [save, setSave] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>(
    new Employee()
  );

  const saveEmployee = action(async () => {
    if (save === "Add") {
      if (selectedEmployee.name === "") {
        props.store.snackbarStore.open("Unable to add JobLabel. Please make sure all fields are filled", "error");
      } 
      else {

        api.postEmployee(selectedEmployee).then(
          action((responseOK) => {
            if (responseOK) {
              props.store.snackbarStore.open("Employee added successfully!", "success");
              props.store.employeeTableStore.refresh();
            } else {
              props.store.snackbarStore.open(
                "There was an error saving Employee. Please try again later", "error"
              );
            }
          })
        );
      }
    } else {
      if (selectedEmployee.name === "") {
        props.store.snackbarStore.open("Unable to save changes. Please make sure all fields are filled", "error");
      } else {

        return api.putEmployee(selectedEmployee.id, selectedEmployee).then(
          action((responseOK) => {
            if (responseOK) {
              props.store.snackbarStore.open("Employee updated successfully!", "success");

              props.store.employeeTableStore.refresh();
            } else {
              props.store.snackbarStore.open(
                "There was an error saving changes. Please try again later", "error"
              );
            }
          })
        );
      }
    }
  });


  const handleOpen = () => {
    const clickedEmployee = new Employee();
    setSelectedEmployee(clickedEmployee);
    setSave("Add");
    setOpen(true);
  };

  const handleClose = (event?: ClosingReason) => {
    if (event === "submitButtonClicked") {
      saveEmployee();
    }
    setOpen(false);
  };

  const selectEmployee = (clickedEmployee: Employee) => {
    setSelectedEmployee(clickedEmployee);
    setSave("Edit");
    setOpen(true);
  };

  const copyEmployee = (employee: Employee): Employee => ({ ...employee });

  const handleNameChange = action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const employee = copyEmployee(selectedEmployee);
      employee.name = event.target.value;
      setSelectedEmployee(employee);
    }
  );
  const handleAddressChange = action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const employee = copyEmployee(selectedEmployee);
      employee.address = event.target.value;
      setSelectedEmployee(employee);
    }
  );
  const handleEmailChange = action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const employee = copyEmployee(selectedEmployee);
      employee.emailAddress = event.target.value;
      setSelectedEmployee(employee);
    }
  );
  const handlePhoneChange = action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const employee = copyEmployee(selectedEmployee);
      employee.phoneNumber = event.target.value;
      setSelectedEmployee(employee);
    }
  );
  const handlePositionChange = action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const employee = copyEmployee(selectedEmployee);
      employee.position = event.target.value;
      setSelectedEmployee(employee);
    }
  );
  const handleDepartmentChange = action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const employee = copyEmployee(selectedEmployee);
      employee.department = event.target.value;
      setSelectedEmployee(employee);
    }
  );
  const handleStatusChange = action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const employee = copyEmployee(selectedEmployee);
      employee.status = event.target.value;
      setSelectedEmployee(employee);
    }
  );
  const handleShiftChange = action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const employee = copyEmployee(selectedEmployee);
      employee.shift = event.target.value;
      setSelectedEmployee(employee);
    }
  );
  const handleManagerChange = action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const employee = copyEmployee(selectedEmployee);
      employee.manager = event.target.value;
      setSelectedEmployee(employee);
    }
  );
  const handlePhotoChange = action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const employee = copyEmployee(selectedEmployee);
      employee.photo = event.target.value;
      setSelectedEmployee(employee);
    }
  );
  const handleColorChange = action(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const employee = copyEmployee(selectedEmployee);
      employee.favoriteColor = event.target.value;
      setSelectedEmployee(employee);
    }
  );

  const handleEmployeeDelete = () => {
    console.log("handling delete");
    props.store.snackbarStore.open("Deletion to be implemented later", "error")};

  return (
      <div className={classes.content} id="main">
        <h1> CONSERVICE </h1> 
        <h2> EMPLOYEES </h2>
        <div className={classes.flexContain}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          size="medium"
          onClick={handleOpen}
        >
          Add new Employee
        </Button>
      </div>
      <div>
          <InteractiveTable
            store={props.store.employeeTableStore}
            headers={[...DefaultEmployeeTableHeaders]}
            rowsPerPage={props.store.employeeTableStore.dataCount.get()}
            removeOptions={{
            onColumnCellClick: handleEmployeeDelete,
          }}
          editOptions={{ onColumnCellClick: selectEmployee }}
          />
          </div>
          <DialogWithButtons
        open={open}
        onClose={handleClose}
        title={save + " Employee"}
        submitButtonText="Save"
      >
        <TextField
          label="Name"
          className={classes.field}
          value={selectedEmployee.name}
          onChange={handleNameChange}
        />
        <TextField
          label="Address"
          className={classes.field}
          value={selectedEmployee.address}
          onChange={handleAddressChange}
        />
        <TextField
          label="Email Address"
          className={classes.field}
          value={selectedEmployee.emailAddress}
          onChange={handleEmailChange}
        />
        <TextField
          label="Phone Number"
          className={classes.field}
          value={selectedEmployee.phoneNumber}
          onChange={handlePhoneChange}
        />
        <TextField
          label="Position"
          className={classes.field}
          value={selectedEmployee.position}
          onChange={handlePositionChange}
        />
        <TextField
          label="Department"
          className={classes.field}
          value={selectedEmployee.department}
          onChange={handleDepartmentChange}
        />
        <TextField
          label="Employment Status"
          className={classes.field}
          value={selectedEmployee.status}
          onChange={handleStatusChange}
        />
        <TextField
          label="Shift"
          className={classes.field}
          value={selectedEmployee.shift}
          onChange={handleShiftChange}
        />
        <TextField
          label="Manager"
          className={classes.field}
          value={selectedEmployee.manager}
          onChange={handleManagerChange}
        />
        <TextField
          label="Team Member Photo"
          className={classes.field}
          value={selectedEmployee.photo}
          onChange={handlePhotoChange}
        />
        <TextField
          label="Favorite Color"
          className={classes.field}
          value={selectedEmployee.favoriteColor}
          onChange={handleColorChange}
        />
      </DialogWithButtons>
        </div>
   
  );
});
