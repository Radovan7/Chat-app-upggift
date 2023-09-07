import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AuthNavigation from "./AuthNavigation";
import ContentNavigation from "./ContentNavigation";

const RootNavigation = props => {
    const {accessToken} = useContext(AuthContext);
  return accessToken == null ? <AuthNavigation /> : <ContentNavigation />
}

export default RootNavigation;