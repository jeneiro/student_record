/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { shallowEqual, useSelector } from "react-redux";
import * as actions from "../../../_redux/students/studentsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { StudentEditForm } from "./StudentEditForm";
import { Specifications } from "../student-specifications/Specifications";
import { SpecificationsUIProvider } from "../student-specifications/SpecificationsUIContext";
import { useSubheader } from "../../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { RemarksUIProvider } from "../student-remarks/RemarksUIContext";
import { Remarks } from "../student-remarks/Remarks";

const initStudent = {
  id: undefined,
  firstname: "",
  lastname: "",
  state: "",
  lga: "",
  level: 100,
  course: "",
  department: "",
  school: "",
  status: 0,
  regNo: "",
};

export function StudentEdit({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const suhbeader = useSubheader();

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  // const layoutDispatch = useContext(LayoutContext.Dispatch);
  const { actionsLoading, studentForEdit } = useSelector(
    (state) => ({
      actionsLoading: state.students.actionsLoading,
      studentForEdit: state.students.studentForEdit,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(actions.fetchStudent(id));
  }, [id, dispatch]);

  useEffect(() => {
    let _title = id ? "" : "New Student";
    if (studentForEdit && id) {
      _title = `Edit student '${studentForEdit.manufacture} ${studentForEdit.model} - ${studentForEdit.modelYear}'`;
    }

    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentForEdit, id]);

  const saveStudent = (values) => {
    if (!id) {
      dispatch(actions.createStudent(values)).then(() => backToStudentsList());
    } else {
      dispatch(actions.updateStudent(values)).then(() => backToStudentsList());
    }
  };

  const btnRef = useRef();
  const saveStudentClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToStudentsList = () => {
    history.push(`/e-commerce/students`);
  };

  return (
    <Card>
      {actionsLoading && <ModalProgressBar />}
      <CardHeader title={title}>
        <CardHeaderToolbar>
          <button
            type="button"
            onClick={backToStudentsList}
            className="btn btn-light"
          >
            <i className="fa fa-arrow-left"></i>
            Back
          </button>
          {`  `}
          <button className="btn btn-light ml-2">
            <i className="fa fa-redo"></i>
            Reset
          </button>
          {`  `}
          <button
            type="submit"
            className="btn btn-primary ml-2"
            onClick={saveStudentClick}
          >
            Save
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("basic")}>
            <a
              className={`nav-link ${tab === "basic" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "basic").toString()}
            >
              Basic info
            </a>
          </li>
          {id && (
            <>
              {" "}
              <li className="nav-item" onClick={() => setTab("remarks")}>
                <a
                  className={`nav-link ${tab === "remarks" && "active"}`}
                  data-toggle="tab"
                  role="button"
                  aria-selected={(tab === "remarks").toString()}
                >
                  Student remarks
                </a>
              </li>
              <li className="nav-item" onClick={() => setTab("specs")}>
                <a
                  className={`nav-link ${tab === "specs" && "active"}`}
                  data-toggle="tab"
                  role="tab"
                  aria-selected={(tab === "specs").toString()}
                >
                  Student specifications
                </a>
              </li>
            </>
          )}
        </ul>
        <div className="mt-5">
          {tab === "basic" && (
            <StudentEditForm
              actionsLoading={actionsLoading}
              student={studentForEdit || initStudent}
              btnRef={btnRef}
              saveStudent={saveStudent}
            />
          )}
          {tab === "remarks" && id && (
            <RemarksUIProvider currentStudentId={id}>
              <Remarks />
            </RemarksUIProvider>
          )}
          {tab === "specs" && id && (
            <SpecificationsUIProvider currentStudentId={id}>
              <Specifications />
            </SpecificationsUIProvider>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
