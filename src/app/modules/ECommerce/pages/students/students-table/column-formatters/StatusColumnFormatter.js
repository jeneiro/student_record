import React from "react";
import {
  StudentStatusCssClasses,
  StudentStatusTitles,
} from "../../StudentsUIHelpers";

export const StatusColumnFormatter = (cellContent, row) => (
  <span
    className={`label label-lg label-light-${
      StudentStatusCssClasses[row.status]
    } label-inline`}
  >
    {StudentStatusTitles[row.status]}
  </span>
);
