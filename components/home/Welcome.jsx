import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import styles from "./welcome.style";
import { COLORS, SIZES } from "../../constants";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Searchbar } from "react-native-paper";

export const Welcome = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);

  const navigationToSearch = () => {
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
      
      <View style={styles.search}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={COLORS.secondary}
        />
      </View>
    </View>
  );
};
