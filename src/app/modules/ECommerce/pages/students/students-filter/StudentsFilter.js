import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useStudentsUIContext } from "../StudentsUIContext";

const prepareFilter = (queryParams, values) => {
  const { status, school, searchText } = values;
  const newQueryParams = { ...queryParams };
  const filter = {};
  // Filter by status
  filter.status = status !== "" ? +status : undefined;
  // Filter by school
  filter.school = school !== "" ? +school : undefined;
  // Filter by all fields
  filter.model = searchText;
  if (searchText) {
    filter.manufacture = searchText;
    filter.VINCode = searchText;
  }
  newQueryParams.filter = filter;
  return newQueryParams;
};

export function StudentsFilter({ listLoading }) {
  // Students UI Context
  const studentsUIContext = useStudentsUIContext();
  const studentsUIProps = useMemo(() => {
    return {
      setQueryParams: studentsUIContext.setQueryParams,
      queryParams: studentsUIContext.queryParams,
    };
  }, [studentsUIContext]);

  const applyFilter = (values) => {
    const newQueryParams = prepareFilter(studentsUIProps.queryParams, values);
    if (!isEqual(newQueryParams, studentsUIProps.queryParams)) {
      newQueryParams.pageNumber = 1;
      studentsUIProps.setQueryParams(newQueryParams);
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          status: "", // values => All=""/Selling=0/Sold=1
          school: "", // values => All=""/New=0/Used=1
          searchText: "",
        }}
        onSubmit={(values) => {
          applyFilter(values);
        }}
      >
        {({
          values,
          handleSubmit,
          handleBlur,
          handleChange,
          setFieldValue,
        }) => (
          <form onSubmit={handleSubmit} className="form form-label-right">
            <div className="form-group row">
              <div className="col-lg-2">
                <select
                  className="form-control"
                  name="status"
                  placeholder="Filter by Status"
                  onChange={(e) => {
                    setFieldValue("status", e.target.value);
                    handleSubmit();
                  }}
                  onBlur={handleBlur}
                  value={values.status}
                >
                  <option value="">All</option>
                  <option value="0">Registered</option>
                  <option value="1">Unregistered</option>
                </select>
                <small className="form-text text-muted">
                  <b>Filter</b> by Status
                </small>
              </div>

              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  name="searchText"
                  placeholder="Search"
                  onBlur={handleBlur}
                  value={values.searchText}
                  onChange={(e) => {
                    setFieldValue("searchText", e.target.value);
                    handleSubmit();
                  }}
                />
                <small className="form-text text-muted">
                  <b>Search</b> in all fields
                </small>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
}
