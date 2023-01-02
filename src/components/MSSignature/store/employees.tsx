import { useState } from "react";
import { atom, useRecoilState } from "recoil";
import { getEmployeeList } from "../../../helpers/api";
import { useWithImmer } from "../../../helpers/use-with-immer";
import * as _t from "./types";

export const employeesStore = atom<_t.EmployeeData[]>({
  key: "employees",
  default: [],
});

export default function useEmployees() {
  const [employees, setEmployees] = useWithImmer(
    useRecoilState(employeesStore)
  );
  const [isLoadingEmployeeList, setIsLoadingEmployeeList] =
    useState<boolean>(false);

  const loadEmployeeList = async () => {
    setIsLoadingEmployeeList(true);
    const data = await getEmployeeList();
    const constructedData: _t.EmployeeData[] = data
      .filter((d: any) => d.mail)
      .map((d: any) => {
        return {
          mail: (d.mail ?? "").toLowerCase(),
          givenName: d.givenName ?? "",
          surname: d.surname ?? "",
          jobTitle: d.jobTitle ?? "",
          mobilePhone: d.mobilePhone ?? "",
        } as _t.EmployeeData;
      });
    setEmployees(() => {
      return constructedData;
    });
    setIsLoadingEmployeeList(false);
  };

  return {
    employees,
    setEmployees,
    isLoadingEmployeeList,
    setIsLoadingEmployeeList,
    loadEmployeeList,
  };
}
