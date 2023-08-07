import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import styles from "./productCard.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProductCard = ({ product }) => {
  const navigation = useNavigation();
  const [like,setLike] = useState(false)
  const addProductToCart = async (value) => {
    const id = await AsyncStorage.getItem("id");
    const userId = JSON.parse(id);
    const addProduct = {
      userId: userId,
      cartItem: value,
      quantity: count,
    };
    const endPoint = "https://ecommercereactnativebackend.onrender.com/api/carts/add";
    const data = addProduct;
    const response = await axios.post(endPoint, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      Alert.alert("Success", "Product added to the cart Successfull", [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Continue",
          onPress: () => {},
        },
      ]);
    } else {
      Alert.alert("err", "Something went wrong", [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Continue",
          onPress: () => {},
        },
      ]);
    }
  };
  const likedProduct = async (value) => {
    const response = await axios.put(
      `https://ecommercereactnativebackend.onrender.com/api/product/like/${value}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setLike(true);
    } else {
      console.log(err);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ProductDetails", { product })}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{uri:product.imageUrl}} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>
            {product.title}
          </Text>
          <Text style={styles.supplier} numberOfLines={1}>
            {product.supplier}
          </Text>
          <Text style={styles.price}>${product.price}</Text>
          <View style={styles.likeandCart}>
            <TouchableOpacity onPress={() => likedProduct(product._id)}>
              <Ionicons
                name="heart"
                size={30}
                color={product.like || like ? COLORS.red : COLORS.primary}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => addProductToCart(product._id)}>
              <Ionicons name="add-circle" size={35} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
