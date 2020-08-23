import React from "react";
import {
  StudentConditionCssClasses,
  StudentConditionTitles,
} from "../../StudentsUIHelpers";

export const ConditionColumnFormatter = (cellContent, row) => (
  <>
    <span
      className={`badge badge-${
        StudentConditionCssClasses[row.condition]
      } badge-dot`}
    ></span>
    &nbsp;
    <span
      className={`font-bold font-${StudentConditionCssClasses[row.condition]}`}
    >
      {StudentConditionTitles[row.condition]}
    </span>
  </>
);
