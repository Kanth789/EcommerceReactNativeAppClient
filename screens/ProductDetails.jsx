import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import styles from "./productDetails.style";
import {
  Ionicons,
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProductDetails = ({ navigation }) => {
  const route = useRoute();
  const { product } = route.params;
  const [count, setCount] = useState(1);
  const[like,setLike] = useState(false)
  const onClickedIncrement = () => {
    setCount(count + 1);
  };
  const onClickedDecrement = () => {
    if (count != 1) {
      setCount(count - 1);
    } else {
      setCount(1);
    }
  };

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
      `https://ecommercereactnativebackend.onrender.com/api/product/like/${value}`,{
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if(response.status === 200)
    {
      setLike(true)
    }else{
      console.log(err)
    }

  };

  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => likedProduct(product._id)}>
          <Ionicons
            name="heart"
            size={30}
            color={product.like || like ? COLORS.red : COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
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
          <View style={styles.rating}>
            <TouchableOpacity onPress={onClickedIncrement}>
              <SimpleLineIcons name="plus" size={20} />
            </TouchableOpacity>
            <Text style={styles.countText}>{count}</Text>
            <TouchableOpacity onPress={onClickedDecrement}>
              <SimpleLineIcons name="minus" size={20} />
            </TouchableOpacity>
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
              <Text> {product.product_location}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <MaterialCommunityIcons name="truck-delivery-outline" size={20} />
              <Text> Free Delivery</Text>
            </View>
          </View>
        </View>
        <View style={styles.cartRow}>
          <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
            <Text style={styles.cartTitle}>BUY NOW</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => addProductToCart(product._id)}
            style={styles.addCartBtn}
          >
            <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetails;
