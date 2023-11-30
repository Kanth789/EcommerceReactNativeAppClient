import {
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./deliverdProducts.style";
import { useRoute } from "@react-navigation/native";
import { SIZES } from "../constants";

const DeliverdProducts = ({ navigation }) => {
  const route = useRoute();
  const { product } = route?.params;
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-circle" size={30} />
          </TouchableOpacity>
        </View>
        <Image source={{ uri: product.imageUrl.url }} style={styles.image} />
        <View style={styles.details}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{product.title}</Text>
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>${product.price}</Text>
            </View>
          </View>
          <View style={styles.ratingRow}>
            <View style={styles.rating}>
              {[1, 2, 3, 4, 5].map((index) => {
                return (
                  <Ionicons key={index} name="star" size={24} color="gold" />
                );
              })}
              <Text style={styles.ratingText}>(4.9)</Text>
            </View>
          </View>
          <View style={styles.descriptionWrapper}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.descText}>{product.description}</Text>
          </View>
          <View style={{ marginBottom: SIZES.small }}>
            <View style={styles.location}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons name="location-outline" size={20} />
                <Text> {product.supplierLocation}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeliverdProducts;
