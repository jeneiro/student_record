import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { StudentStatusCssClasses } from "../StudentsUIHelpers";
import * as actions from "../../../_redux/students/studentsActions";
import { useStudentsUIContext } from "../StudentsUIContext";

const selectedStudents = (entities, ids) => {
  const _students = [];
  ids.forEach((id) => {
    const student = entities.find((el) => el.id === id);
    if (student) {
      _students.push(student);
    }
  });
  return _students;
};

export function StudentsUpdateStatusDialog({ show, onHide }) {
  // Students UI Context
  const studentsUIContext = useStudentsUIContext();
  const studentsUIProps = useMemo(() => {
    return {
      ids: studentsUIContext.ids,
      setIds: studentsUIContext.setIds,
      queryParams: studentsUIContext.queryParams,
    };
  }, [studentsUIContext]);

  // students Redux state
  const { students, isLoading } = useSelector(
    (state) => ({
      students: selectedStudents(state.students.entities, studentsUIProps.ids),
      isLoading: state.students.actionsLoading,
    }),
    shallowEqual
  );

  // if there weren't selected students we should close modal
  useEffect(() => {
    if (studentsUIProps.ids || studentsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentsUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for updateing Student by ids
    dispatch(actions.updateStudentsStatus(studentsUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchStudents(studentsUIProps.queryParams)).then(
          () => {
            // clear selections list
            studentsUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected students
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {isLoading && (
          <div className="overlay-layer bg-transparent">
            <div className="spinner spinner-lg spinner-warning" />
          </div>
        )}
        <div className="list-timeline list-timeline-skin-light padding-30">
          <div className="list-timeline-items">
            {students.map((student) => (
              <div className="list-timeline-item mb-3" key={student.id}>
                <span className="list-timeline-text">
                  <span
                    className={`label label-lg label-light-${
                      StudentStatusCssClasses[student.status]
                    } label-inline`}
                    style={{ width: "60px" }}
                  >
                    ID: {student.id}
                  </span>{" "}
                  <span className="ml-5">
                    {student.manufacture}, {student.model}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className={`form-control ${StudentStatusCssClasses[status]}`}
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Selling</option>
            <option value="1">Sold</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
