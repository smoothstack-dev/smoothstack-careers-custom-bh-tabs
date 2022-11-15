import React from "react";
import * as FaIcon from "react-icons/fa";
import * as AiIcon from "react-icons/ai";
import * as HiIcon from "react-icons/hi";
import * as TfiIcon from "react-icons/tfi";
import * as _t from "./store/types";

export const Icons: React.FC<{ icon: _t.Icons }> = ({ icon }) => {
  // TODO: color and size
  switch (icon) {
    case "linkedin":
      return <FaIcon.FaLinkedin />;
    case "youtube":
      return <FaIcon.FaYoutube />;
    case "instagram":
      return <FaIcon.FaInstagram />;
    case "twitter":
      return <FaIcon.FaTwitter />;
    case "facebook":
      return <FaIcon.FaFacebook />;
    case "website":
      return <AiIcon.AiOutlineGlobal />;
    case "phone":
      return <TfiIcon.TfiMobile />;
    case "address":
      return <HiIcon.HiOutlineOfficeBuilding />;
    case "mobile":
      return <TfiIcon.TfiMobile />;
  }
};
