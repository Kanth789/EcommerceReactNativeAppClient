import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ButtonTabNavigation from "./Navigation/ButtonTabNavigation";
import {
  Cart,
  Favourites,
  LoginPage,
  NewRavils,
  Order,
  ProductDetails,
  SignUp,
} from "./screens";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontloadedArray] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    semiBold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    extraBold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
  });

  // Font.loadAsync({
  //   // This is the font that we're using for our tab bar
  //   ...Icon.MaterialIcons.font,
  //   ...Icon.MaterialCommunityIcons.font,
  //   ...Icon.FontAwesome.font,
  //   ...Icon.Feather.font,
  // })

  const onLayoutRootView = useCallback(async () => {
    if (fontloadedArray) {
      await SplashScreen.hideAsync();
    }
  }, [fontloadedArray]);

  if (!fontloadedArray) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomNavigation"
          component={ButtonTabNavigation}
          options={{ headerShown: false }}
        ></Stack.Screen>
        
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="ProductList"
          component={NewRavils}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Orders"
          component={Order}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="Favourites"
          component={Favourites}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
