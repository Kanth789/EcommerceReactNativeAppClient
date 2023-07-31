import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import styles from "./welcome.style";
import { COLORS, SIZES } from "../../constants";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export const Welcome = () => {
  const navigation = useNavigation();

  const navigationToSearch = () => {
    console.log("called");
    navigation.navigate("Search");
  };
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.welcomeText(COLORS.black, SIZES.xSmall)}>
          {" "}
          Find the Most
        </Text>
        <Text style={styles.welcomeText(COLORS.primary, 0)}>
          {" "}
          Luxurious Fashion
        </Text>
      </View>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Feather name="search" size={24} style={styles.searchItem} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TouchableOpacity onPress={navigationToSearch}>
            <TextInput
              placeholder="What are you looking for..."
              value=""
              style={styles.searchInput}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons
              name="camera-outline"
              size={SIZES.xLarge}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
