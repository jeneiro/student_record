/* eslint-disable no-unused-vars */
import React, {
  useEffect,
  useContext,
  createContext,
  useState,
  useCallback,
} from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./SpecificationsUIHelper";

const SpecificationsUIContext = createContext();

export function useSpecificationsUIContext() {
  return useContext(SpecificationsUIContext);
}

export const SpecificationsUIConsumer = SpecificationsUIContext.Consumer;

export function SpecificationsUIProvider({ currentStudentId, children }) {
  const [studentId, setStudentId] = useState(currentStudentId);
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
  const [selectedId, setSelectedId] = useState(null);
  const initSpecification = {
    id: undefined,
    value: "",
    specId: 0,
    carId: studentId,
  };
  useEffect(() => {
    initSpecification.carId = currentStudentId;
    initSpecification.studentId = currentStudentId;
    setStudentId(currentStudentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStudentId]);
  const [
    showEditSpecificationDialog,
    setShowEditSpecificationDialog,
  ] = useState(false);
  const openNewSpecificationDialog = () => {
    setSelectedId(undefined);
    setShowEditSpecificationDialog(true);
  };
  const openEditSpecificationDialog = (id) => {
    setSelectedId(id);
    setShowEditSpecificationDialog(true);
  };
  const closeEditSpecificationDialog = () => {
    setSelectedId(undefined);
    setShowEditSpecificationDialog(false);
  };
  const [
    showDeleteSpecificationDialog,
    setShowDeleteSpecificationDialog,
  ] = useState(false);
  const openDeleteSpecificationDialog = (id) => {
    setSelectedId(id);
    setShowDeleteSpecificationDialog(true);
  };
  const closeDeleteSpecificationDialog = () => {
    setSelectedId(undefined);
    setShowDeleteSpecificationDialog(false);
  };
  const [
    showDeleteSpecificationsDialog,
    setShowDeleteSpecificationsDialog,
  ] = useState(false);
  const openDeleteSpecificationsDialog = () => {
    setShowDeleteSpecificationsDialog(true);
  };
  const closeDeleteSpecificationsDialog = () => {
    setShowDeleteSpecificationsDialog(false);
  };
  const [
    showFetchSpecificationsDialog,
    setShowFetchSpecificationsDialog,
  ] = useState(false);
  const openFetchSpecificationsDialog = () => {
    setShowFetchSpecificationsDialog(true);
  };
  const closeFetchSpecificationsDialog = () => {
    setShowFetchSpecificationsDialog(false);
  };
  const value = {
    ids,
    setIds,
    studentId,
    setStudentId,
    queryParams,
    setQueryParams,
    initSpecification,
    selectedId,
    showEditSpecificationDialog,
    openEditSpecificationDialog,
    openNewSpecificationDialog,
    closeEditSpecificationDialog,
    showDeleteSpecificationDialog,
    openDeleteSpecificationDialog,
    closeDeleteSpecificationDialog,
    showDeleteSpecificationsDialog,
    openDeleteSpecificationsDialog,
    closeDeleteSpecificationsDialog,
    showFetchSpecificationsDialog,
    openFetchSpecificationsDialog,
    closeFetchSpecificationsDialog,
  };

  return (
    <SpecificationsUIContext.Provider value={value}>
      {children}
    </SpecificationsUIContext.Provider>
  );
}
