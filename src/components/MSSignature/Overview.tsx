import React, { useEffect, useMemo, useState } from "react";
import useEmployees from "./store/employees";
import * as API from "./../../helpers/api";
import { Table } from "react-bootstrap";

export const DataOverview = () => {
  // Need to map with DDB data
  const { employees, setEmployees } = useEmployees();

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Title</th>
            <th>Phone Number</th>
            <th>Profile Image</th>
            <th>Mailing Address</th>
            <th>Calendar Url</th>
            <th>Badge Counts</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{emp.givenName}</td>
                <td>{emp.surname}</td>
                <td>{emp.jobTitle}</td>
                <td>{emp.mobilePhone}</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
