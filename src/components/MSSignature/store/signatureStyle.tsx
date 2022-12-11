import { atom, useRecoilState } from "recoil";
import { useWithImmer } from "../../../helpers/use-with-immer";
import * as _l from "./literal";
import * as _t from "./types";

export const signatureStyleStore = atom<_t.SignatureStyles>({
  key: "signatureStyle",
  default: _l.INITIAL_SIGNATURE_STYLE,
});

export default function useSignatureStyle() {
  const [signatureStyle, setStyle] = useWithImmer(
    useRecoilState(signatureStyleStore)
  );

  const updateStyle = (key: string, value: any) => {
    setStyle((draft) => {
      const updatedSignature = { ...signatureStyle, [key]: value };
      return updatedSignature;
    });
  };

  const updateSubStyle = (
    field: _t.SignatureStyleFields,
    key: "font" | "size" | "weight" | "color",
    value: any
  ) => {
    setStyle((draft) => {
      let convertedValue = value;
      const updatedStyle = { ...signatureStyle[field], [key]: value };
      const updatedSignatureStyle = {
        ...signatureStyle,
        [field]: updatedStyle,
      };
      return updatedSignatureStyle;
    });
  };

  return {
    signatureStyle,
    updateStyle,
    updateSubStyle,
  };
}
