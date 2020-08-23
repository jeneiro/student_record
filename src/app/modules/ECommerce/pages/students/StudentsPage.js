import React from "react";
import { Route } from "react-router-dom";
import { StudentsLoadingDialog } from "./students-loading-dialog/StudentsLoadingDialog";
import { StudentDeleteDialog } from "./student-delete-dialog/StudentDeleteDialog";
import { StudentsDeleteDialog } from "./students-delete-dialog/StudentsDeleteDialog";
import { StudentsFetchDialog } from "./students-fetch-dialog/StudentsFetchDialog";
import { StudentsUpdateStatusDialog } from "./students-update-status-dialog/StudentsUpdateStatusDialog";
import { StudentsCard } from "./StudentsCard";
import { StudentsUIProvider } from "./StudentsUIContext";

export function StudentsPage({ history }) {
  const studentsUIEvents = {
    newStudentButtonClick: () => {
      history.push("/e-commerce/students/new");
    },
    openEditStudentPage: (id) => {
      history.push(`/e-commerce/students/${id}/edit`);
    },
    openDeleteStudentDialog: (id) => {
      history.push(`/e-commerce/students/${id}/delete`);
    },
    openDeleteStudentsDialog: () => {
      history.push(`/e-commerce/students/deleteStudents`);
    },
    openFetchStudentsDialog: () => {
      history.push(`/e-commerce/students/fetch`);
    },
    openUpdateStudentsStatusDialog: () => {
      history.push("/e-commerce/students/updateStatus");
    },
  };

  return (
    <StudentsUIProvider studentsUIEvents={studentsUIEvents}>
      <StudentsLoadingDialog />
      <Route path="/e-commerce/students/deleteStudents">
        {({ history, match }) => (
          <StudentsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/students");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/students/:id/delete">
        {({ history, match }) => (
          <StudentDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/e-commerce/students");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/students/fetch">
        {({ history, match }) => (
          <StudentsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/students");
            }}
          />
        )}
      </Route>
      <Route path="/e-commerce/students/updateStatus">
        {({ history, match }) => (
          <StudentsUpdateStatusDialog
            show={match != null}
            onHide={() => {
              history.push("/e-commerce/students");
            }}
          />
        )}
      </Route>
      <StudentsCard />
    </StudentsUIProvider>
  );
}
