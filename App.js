import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { Expo } from "expo";
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
  OnboardingScreen,
  Order,
  ProductDetails,
  SignUp,
  AdminPanel,
  AddProducts,
  DeliverdProducts,
  AdminProducts,
} from "./screens";
import { Provider } from "react-redux";
import store from "./redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontloadedArray] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    extraBold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    Ionicons: require("./assets/fonts/Ionicons.ttf"),
    AntDesign: require("./assets/fonts/AntDesign.ttf"),
    Ionicons: require("./assets/fonts/Ionicons.ttf"),
    Feather: require("./assets/fonts/Feather.ttf"),
    FontAwesome: require("./assets/fonts/FontAwesome.ttf"),
    MaterialCommunityIcons: require("./assets/fonts/MaterialCommunityIcons.ttf"),
    Fontisto: require("./assets/fonts/Fontisto.ttf"),
    SimpleLineIcons: require("./assets/fonts/SimpleLineIcons.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontloadedArray) {
      await SplashScreen.hideAsync();
    }
  }, [fontloadedArray]);

  if (!fontloadedArray) {
    return null;
  }

  return (
    <Provider store={store}>
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
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="AdminPanel"
          component={AdminPanel}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="AddProducts"
          component={AddProducts}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="DeliverdProducts"
          component={DeliverdProducts}
          options={{ headerShown: false }}
        ></Stack.Screen>
         <Stack.Screen
          name="AdminProducts"
          component={AdminProducts}
          options={{ headerShown: false }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
