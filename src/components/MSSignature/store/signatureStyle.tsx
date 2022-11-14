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

  const updateStyle = (
    field: "employeeName" | "title" | "additionalFields" | "socials",
    key: "size" | "weight" | "color",
    value: any
  ) => {
    setStyle((draft) => {
      const updatedStyle = { ...signatureStyle[field], [key]: value };
      const updatedSignatureStyle = {
        ...signatureStyle,
        [field]: updatedStyle,
      };
      return updatedSignatureStyle;
    });
  };

  const getConvertedStyleValue = (
    field: "size" | "weight",
    rawSize: number
  ) => {
    return (
      _l.SIZE_RANGE[field].min +
      Math.floor(
        ((_l.SIZE_RANGE[field].max - _l.SIZE_RANGE[field].min) / 100) * rawSize
      )
    );
  };

  return {
    signatureStyle,
    updateStyle,
    getConvertedStyleValue,
  };
}
