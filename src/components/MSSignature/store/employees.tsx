import { atom, useRecoilState } from "recoil";
import { useWithImmer } from "../../../helpers/use-with-immer";
import * as _l from "./literal";
import * as _t from "./types";

export const employeesStore = atom<_t.Employee[]>({
  key: "employees",
  default: _l.INITIAL_EMPLOYEES,
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
