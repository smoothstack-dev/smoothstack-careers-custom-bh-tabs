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

  const updateStyle = (props: _t.Update) => {
    setStyle((draft) => {
      const updatedSignatureStyle = {
        ...signatureStyle,
        [props.key]: props.value,
      };
      return updatedSignatureStyle;
    });
  };

  return {
    signatureStyle,
    updateStyle,
  };
}
