import React, { useMemo, useState } from "react";
import { FloatingLabel, Form, ListGroup, Spinner } from "react-bootstrap";
import useEmployees from "./store/employees";
import { EmployeeData } from "./store/types";
import { EmployeeDataForm } from "./EmployeeDataForm";

export const EmployeeSettings = () => {
  const { employees, isLoadingEmployeeList } = useEmployees();
  const [search, setSearch] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<
    EmployeeData | undefined
  >();
  const [showSearchList, setShowSearchList] = useState<boolean>(false);

  const employeeName = (e: EmployeeData) => `${e.givenName} ${e.surname}`;

  const displayList = useMemo(() => {
    return employees.filter((e) => {
      if (search) {
        const name = employeeName(e);
        return (
          name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
          e.mail.includes(search.toLocaleLowerCase())
        );
      }
      return true;
    });
  }, [employees, search]);

  return (
    <div>
      <FloatingLabel
        label="Search Employee by Name or Email"
        className="fieldLabel"
      >
        <Form.Control
          value={search}
          onChange={(e) => {
            setShowSearchList(true);
            setSearch(e.target.value);
          }}
        />
      </FloatingLabel>
      {showSearchList && (
        <div>
          {isLoadingEmployeeList ? (
            <Spinner animation={"border"} />
          ) : displayList.length > 0 ? (
            <ListGroup>
              {displayList.map((emp, index) => {
                const isSelected = selectedEmployee?.mail === emp.mail;
                return (
                  <ListGroup.Item
                    id={`list-${index}`}
                    key={index}
                    active={isSelected}
                    onClick={(e) => {
                      setShowSearchList(false);
                      setSelectedEmployee(emp);
                    }}
                  >
                    <strong>{employeeName(emp)}</strong>
                    <br />
                    {emp.mail}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          ) : (
            <p>No Employee Found</p>
          )}
        </div>
      )}
      <EmployeeDataForm selectedEmployee={selectedEmployee} />
    </div>
  );
};
