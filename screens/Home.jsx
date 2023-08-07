import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./home.style";
import { Fontisto, Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Welcome } from "../components";
import Carousel from "../components/home/Carousel";
import Heading from "../components/home/Heading";
import ProductRow from "../components/products/ProductRow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from "react-native";

const Home = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [userLogin, setUserLogin] = useState(false);
  const [loader,setLoder] = useState(true)
  useEffect(() => {
    checkExisitingUser();
  }, []);
  const checkExisitingUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;
    try {
      const currentUser = await AsyncStorage.getItem(userId);
      if (currentUser !== null) {
        setLoder(false)
        const parseData = JSON.parse(currentUser);
        setUserData(parseData);
        setUserLogin(true);
      } else {
        setLoder(false)
        navigation.navigate("LoginPage");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView>
      <ScrollView>
     { loader ? <ActivityIndicator/> 
      : <View>
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="location-outline" size={24} />
          <Text style={styles.location}>
            {userData ? userData.location : "Hyderabad, India"}
          </Text>
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>0</Text>
            </View>
            <TouchableOpacity>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
        <Welcome />
        <Carousel />
        <Heading />
        <ProductRow />
      </View> }
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
