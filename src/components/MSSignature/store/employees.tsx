import { atom, useRecoilState } from "recoil";
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

  return {
    employees,
    setEmployees,
  };
}
