import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./profile.style";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../constants";
import { Image } from "react-native";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Feather,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  useEffect(() => {
    checkExisitingUser();
  }, []);
  const checkExisitingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;
    try {
      const currentUser = await AsyncStorage.getItem(userId);
      if (currentUser !== null) {
        const parseData = JSON.parse(currentUser);
        setUserData(parseData);
        setUserLogin(true);
      } else {
        navigation.navigate("LoginPage");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const userLogOut = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;
    try {
      await AsyncStorage.multiRemove([userId, "id"]);
      navigation.replace("BottomNavigation");
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    Alert.alert("Logout", "Are You sure you want to logout", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel pressed"),
      },
      {
        text: "Continue",
        onPress: () => userLogOut(),
      },
    ]);
  };

  const clearCache = () => {
    Alert.alert(
      "Clear Cache",
      "Are You sure you want to clear all the saved data in your account",
      [
        {
          text: "Cancel",
          onPress: () => console.log("cancel Clear Cache"),
        },
        {
          text: "Continue",
          onPress: () => navigation.navigate("LoginPage"),
        },
      ]
    );
  };

  const deletAccount = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = JSON.parse(id);
    try {
      const endPoint = `https://ecommercereactnativebackend.onrender.com/api/delete/${userId}`;
      const response = await axios.delete(endPoint);
      if (response.status === 200) {
        navigation.navigate("LoginPage");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAlert = () => {
    return Alert.alert("Logout", "Are You sure you want to delete Account", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel pressed"),
      },
      {
        text: "Continue",
        onPress: () => deletAccount(),
      },
    ]);
  };
  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.gray} />
        <View style={{ width: "100%" }}>
          <Image
            source={require("../assets/images/login1.jpg")}
            style={styles.cover}
          />
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/images/profile.jpeg")}
            style={styles.profile}
          />
          <Text style={styles.name}>
            {userLogin === true
              ? userData.name
              : "Please login into your account"}
          </Text>
          {userLogin === false ? (
            <TouchableOpacity onPress={() => navigation.navigate("LoginPage")}>
              <View style={styles.loginBtn}>
                <Text style={styles.menuText}>Login</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.loginBtn}>
              <Text style={styles.menuText}>{userData.email}</Text>
            </View>
          )}

          {userLogin === false ? (
            <View></View>
          ) : (
            <View style={styles.menuWrapper}>
              <TouchableOpacity
                onPress={() => navigation.navigate("Favourites")}
              >
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={24}
                    color={COLORS.primary}
                    style={{marginRight:10}}
                  />
                  <Text style={styles.menuText}>Favorites</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Orders",[])}>
                <View style={styles.menuItem(0.2)}>
                 
                  <MaterialCommunityIcons name="truck-delivery-outline" size={24}  color={COLORS.primary} style={{marginRight:10}}/>
                  <Text style={styles.menuText}>Orders</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <View style={styles.menuItem(0.2)}>
                  <Feather name="shopping-bag" size={24} color={COLORS.primary} style={{marginRight:10}}/>
                  <Text style={styles.menuText}>Cart</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => clearCache()}>
                <View style={styles.menuItem(0.2)}>
                  <MaterialCommunityIcons
                    name="cached"
                    size={24}
                    style={{marginRight:10}}
                    color={COLORS.primary}
                  />
                  <Text style={styles.menuText}>Clear Cache</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteAlert()}>
                <View style={styles.menuItem(0.2)}>
                  <AntDesign name="deleteuser" size={24} color={COLORS.primary} style={{marginRight:10}}/>
                  <Text style={styles.menuText}>Delete Account</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => logOut()}>
                <View style={styles.menuItem(0.2)}>
                <AntDesign name="logout" size={24} color={COLORS.primary} style={{marginRight:10}}/>
                  <Text style={styles.menuText}>LogOut</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
    </ScrollView>
  );
};

export default Profile;
