import { atom, useRecoilState } from "recoil";
import { useWithImmer } from "../../../helpers/use-with-immer";
import * as _l from "./literal";
import * as _t from "./types";

export const signatureStore = atom<_t.Employee>({
  key: "signature",
  default: _l.INITIAL_SIGNATURE,
});

export default function useSignature() {
  const [signature, setSignature] = useWithImmer(
    useRecoilState(signatureStore)
  );

  const updateSignature = (key: string, value: any) => {
    setSignature((draft) => {
      const updatedSignature = { ...signature, [key]: value };
      return updatedSignature;
    });
  };

  const setSelectedSignature = (employee: _t.Employee) => {
    setSignature(() => {
      return employee;
    });
  };

  return {
    signature,
    updateSignature,
    setSelectedSignature,
  };
}
