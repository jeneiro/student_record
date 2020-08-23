import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./StudentsUIHelpers";

const StudentsUIContext = createContext();

export function useStudentsUIContext() {
  return useContext(StudentsUIContext);
}

export const StudentsUIConsumer = StudentsUIContext.Consumer;

export function StudentsUIProvider({ studentsUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    newStudentButtonClick: studentsUIEvents.newStudentButtonClick,
    openEditStudentPage: studentsUIEvents.openEditStudentPage,
    openDeleteStudentDialog: studentsUIEvents.openDeleteStudentDialog,
    openDeleteStudentsDialog: studentsUIEvents.openDeleteStudentsDialog,
    openFetchStudentsDialog: studentsUIEvents.openFetchStudentsDialog,
    openUpdateStudentsStatusDialog:
      studentsUIEvents.openUpdateStudentsStatusDialog,
  };

  return (
    <StudentsUIContext.Provider value={value}>
      {children}
    </StudentsUIContext.Provider>
  );
}
