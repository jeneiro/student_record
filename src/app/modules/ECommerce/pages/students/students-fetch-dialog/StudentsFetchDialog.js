import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { StudentStatusCssClasses } from "../StudentsUIHelpers";
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

export function StudentsFetchDialog({ show, onHide }) {
  // Students UI Context
  const studentsUIContext = useStudentsUIContext();
  const studentsUIProps = useMemo(() => {
    return {
      ids: studentsUIContext.ids,
      queryParams: studentsUIContext.queryParams,
    };
  }, [studentsUIContext]);

  // students Redux state
  const { students } = useSelector(
    (state) => ({
      students: selectedStudents(state.students.entities, studentsUIProps.ids),
    }),
    shallowEqual
  );

  // if there weren't selected ids we should close modal
  useEffect(() => {
    if (!studentsUIProps.ids || studentsUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentsUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      <Modal.Footer>
        <div>
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
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
