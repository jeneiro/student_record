// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/students/studentsActions";
import * as uiHelpers from "../StudentsUIHelpers";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useStudentsUIContext } from "../StudentsUIContext";

export function StudentsTable() {
  // Students UI Context
  const studentsUIContext = useStudentsUIContext();
  const studentsUIProps = useMemo(() => {
    return {
      ids: studentsUIContext.ids,
      setIds: studentsUIContext.setIds,
      queryParams: studentsUIContext.queryParams,
      setQueryParams: studentsUIContext.setQueryParams,
      openEditStudentPage: studentsUIContext.openEditStudentPage,
      openDeleteStudentDialog: studentsUIContext.openDeleteStudentDialog,
    };
  }, [studentsUIContext]);

  // Getting curret state of students list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.students }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  // Students Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    studentsUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchStudents(studentsUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentsUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "firstname",
      text: "First Name",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "lastname",
      text: "Last Name",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "regNo",
      text: "Reg Number",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "course",
      text: "Course",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "department",
      text: "Department",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "school",
      text: "School",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "status",
      text: "Reg Status",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
    },
    {
      dataField: "level",
      text: "Level",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "state",
      text: "State",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "lga",
      text: "LGA",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditStudentPage: studentsUIProps.openEditStudentPage,
        openDeleteStudentDialog: studentsUIProps.openDeleteStudentDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: studentsUIProps.queryParams.pageSize,
    page: studentsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  studentsUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: studentsUIProps.ids,
                  setIds: studentsUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>
    </>
  );
}
