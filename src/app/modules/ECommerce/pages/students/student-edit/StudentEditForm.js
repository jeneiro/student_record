// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";
import {
  AVAILABLE_LEVELS,
  StudentStatusTitles,
  StudentState,
} from "../StudentsUIHelpers";

// Validation schema
const StudentEditSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("First Name is required"),
  lastname: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Last Name is required"),
  course: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Course is required"),
  department: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Department is required"),
  school: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("School is required"),
  status: Yup.string().required("Status is required"),
  state: Yup.string(),
  lga: Yup.string(),

  regNo: Yup.string().required("Registration No is required"),
});

export function StudentEditForm({ student, btnRef, saveStudent }) {
  const [state, setState] = useState({
    states: [],
    lga: [],
    selectedState: "--Choose State--",
    selectedLga: "--Choose Lga--",
  });
  const states = StudentState.map((object) => object.state);
  console.log(states);
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      StudentState,
    }));
  }, []);
  function changeState(event) {
    event.persist();
    setState((prevState) => ({
      ...prevState,
      selectedState: event.target.value,
      lga: prevState.StudentState.find(
        (sts) => sts.state === event.target.value
      ).lga,
    }));
  }
  function changeLga(event) {
    setState((prevState) => ({
      ...prevState,
      selectedLga: event.target.value,
    }));
  }
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={student}
        validationSchema={StudentEditSchema}
        onSubmit={(values) => {
          values.state = state.selectedState;
          values.lga = state.selectedLga;
          saveStudent(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="firstname"
                    component={Input}
                    placeholder="firstname"
                    label="firstname"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="lastname"
                    component={Input}
                    placeholder="lastname"
                    label="lastname"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="regNo"
                    component={Input}
                    placeholder="Registration Number"
                    label="regNo"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="course"
                    component={Input}
                    placeholder="Course"
                    label="course"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="department"
                    component={Input}
                    placeholder="Department"
                    label="department"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="school"
                    component={Input}
                    placeholder="School"
                    label="school"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Select name="level" label="Level">
                    {AVAILABLE_LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-4">
                  <Select name="status" label="Registration Status">
                    {StudentStatusTitles.map((status, index) => (
                      <option key={status} value={index}>
                        {status}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="col-lg-4">
                  <Select
                    name="state"
                    label="State"
                    value={state.selectedState}
                    onChange={changeState}
                  >
                    <option>--Choose State--</option>
                    {states.map((state, index) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-4">
                  <Select
                    name="lga"
                    label="lga"
                    value={state.selectedLga}
                    onChange={changeLga}
                  >
                    <option>--Choose Lga--</option>
                    {state.lga.map((lga, index) => (
                      <option key={index} value={lga}>
                        {lga}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
