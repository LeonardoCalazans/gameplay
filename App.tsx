import React, { useState, useCallback, useEffect } from "react";
import { StatusBar } from "react-native";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Rajdhani_500Medium,
  Rajdhani_700Bold,
} from "@expo-google-fonts/rajdhani";

import { AuthProvider } from "./src/hooks/auth";
import Routes from "./src/routes";
import { Background } from "./src/components";
import { ThemeProvider } from "styled-components/native";
import { theme } from "./src/global/styles/theme";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Inter_400Regular,
          Inter_500Medium,
          Rajdhani_500Medium,
          Rajdhani_700Bold,
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Background onLayout={onLayoutRootView}>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </Background>
  );
};

export default App;
