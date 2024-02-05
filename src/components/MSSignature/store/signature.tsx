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

  const updateSignature = (
    updates: { key: keyof _t.Signature; value: any }[]
  ) => {
    setSignature((draft) => {
      let updatedSignature = { ...signature } as _t.Signature;

      updates.forEach(({ key, value }) => {
        // Update the specified key with the provided value
        updatedSignature = { ...updatedSignature, [key]: value };

        // If the key is "profileUrl" and the value is empty, remove the "profileUrl" property
        if (key === "profileUrl" && (!value || value === ""))
          delete updatedSignature.profileUrl;
      });

      // Update the state with the modified signature
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
