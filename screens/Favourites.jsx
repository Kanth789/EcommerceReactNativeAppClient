import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "./favourites.style";
import { ProductList } from "../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants";


const Favourites = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.wrapper}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.heading}>Favourites</Text>
      </View>
      <View style={{marginTop:10}}>
      <ProductList favourites={true}/>
      </View>
    </View>
  </SafeAreaView>
  );
};

export default Favourites;


