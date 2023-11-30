import React, { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./adminDashboard.style";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../constants";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";



const AdminPanel = ({ navigation }) => {
  
 
  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.chervonWrapper}
        >
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.cartText}>Admin Panel</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <View style={{ marginTop: 10 }}>
        <View>{renderHeader()}</View>
      </View>
      <View style={styles.menuWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate("AdminProducts")}>
          <View style={styles.menuItem(0.2)}>
            <Ionicons
              name="settings-outline"
              size={24}
              color={COLORS.primary}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.menuText}>Manage Products</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddProducts")}
        >
          <View style={styles.menuItem(0.2)}>
            <Ionicons
              name="add-circle-sharp"
              size={24}
              color={COLORS.primary}
              style={{ marginRight: 10 }}
            />

            <Text style={styles.menuText}>Add Products</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate("AdminDeliverdProducts")}
        >
          <View style={styles.menuItem(0.2)}>
            <Feather
              name="shopping-bag"
              size={24}
              color={COLORS.primary}
              style={{ marginRight: 10 }}
            />
            <Text style={styles.menuText}>Products Staticts</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default AdminPanel;
