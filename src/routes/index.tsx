import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useAuth } from "../hooks/auth";
import AuthRoutes from "./app.routes";
import { SignIn } from "../screens";

const Routes = () => {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user.id ? <AuthRoutes /> : <SignIn />}
    </NavigationContainer>
  );
};

export default Routes;
