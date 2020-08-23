import React, { useMemo } from "react";
import { useStudentsUIContext } from "../StudentsUIContext";

export function StudentsGrouping() {
  // Students UI Context
  const studentsUIContext = useStudentsUIContext();
  const studentsUIProps = useMemo(() => {
    return {
      ids: studentsUIContext.ids,
      setIds: studentsUIContext.setIds,
      openDeleteStudentsDialog: studentsUIContext.openDeleteStudentsDialog,
      openFetchStudentsDialog: studentsUIContext.openFetchStudentsDialog,
      openUpdateStudentsStatusDialog:
        studentsUIContext.openUpdateStudentsStatusDialog,
    };
  }, [studentsUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="-font-bold font-danger-">
                <span>
                  Selected records count: <b>{studentsUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={studentsUIProps.openDeleteStudentsDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={studentsUIProps.openFetchStudentsDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={studentsUIProps.openUpdateStudentsStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
