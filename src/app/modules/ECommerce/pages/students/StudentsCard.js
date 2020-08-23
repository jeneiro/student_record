import React, { useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { StudentsFilter } from "./students-filter/StudentsFilter";
import { StudentsTable } from "./students-table/StudentsTable";
import { StudentsGrouping } from "./students-grouping/StudentsGrouping";
import { useStudentsUIContext } from "./StudentsUIContext";

export function StudentsCard() {
  const studentsUIContext = useStudentsUIContext();
  const studentsUIProps = useMemo(() => {
    return {
      ids: studentsUIContext.ids,
      queryParams: studentsUIContext.queryParams,
      setQueryParams: studentsUIContext.setQueryParams,
      newStudentButtonClick: studentsUIContext.newStudentButtonClick,
      openDeleteStudentsDialog: studentsUIContext.openDeleteStudentsDialog,
      openEditStudentPage: studentsUIContext.openEditStudentPage,
      openUpdateStudentsStatusDialog:
        studentsUIContext.openUpdateStudentsStatusDialog,
      openFetchStudentsDialog: studentsUIContext.openFetchStudentsDialog,
    };
  }, [studentsUIContext]);

  return (
    <Card>
      <CardHeader title="Students list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={studentsUIProps.newStudentButtonClick}
          >
            New Student
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <StudentsFilter />
        {studentsUIProps.ids.length > 0 && (
          <>
            <StudentsGrouping />
          </>
        )}
        <StudentsTable />
      </CardBody>
    </Card>
  );
}
