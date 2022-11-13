import { cloneDeep } from "lodash";
import { atom, useRecoilState } from "recoil";
import { useWithImmer } from "../../../helpers/use-with-immer";
import * as _l from "./literal";
import * as _t from "./types";

export const signatureStore = atom<_t.Signature>({
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

  const updateAdditionalField = (key: string, value: any) => {
    setSignature((draft) => {
      const updatedField = signature.additionalFields.map((af) => {
        if (af.id === key) return { ...af, fieldValue: value };
        else return af;
      });
      const updatedSignature = { ...signature, additionalFields: updatedField };
      return updatedSignature;
    });
  };

  const updateSocial = (key: string, value: any) => {
    setSignature((draft) => {
      const updatedSocial = signature.socials.map((social) => {
        if (social.id === key) return { ...social, socialLink: value };
        else return social;
      });
      const updatedSignature = { ...signature, socials: updatedSocial };
      return updatedSignature;
    });
  };

  return {
    signature,
    updateSignature,
    updateAdditionalField,
    updateSocial,
  };
}
