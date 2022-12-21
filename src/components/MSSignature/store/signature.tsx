import { atom, useRecoilState } from "recoil";
import { useWithImmer } from "../../../helpers/use-with-immer";
import * as _t from "./types";

export const signatureStore = atom<_t.Signature | undefined>({
  key: "signature",
  default: undefined,
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

  const setSelectedSignature = (signature: _t.Signature) => {
    setSignature(() => {
      return signature;
    });
  };

  return {
    signature,
    updateSignature,
    setSelectedSignature,
  };
}
