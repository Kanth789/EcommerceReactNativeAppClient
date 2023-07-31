import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./cart.style";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Cart = ({ navigation }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const[reload,setReload] = useState(false)

  const getCartProducts = async () => {
    try {
      const id = await AsyncStorage.getItem("id");
      const userId = JSON.parse(id);
      const endPoint = `https://ecommercereactnativebackend.onrender.com/api/carts/find/${userId}`;
      const response = await axios.get(endPoint);
      if (response.status === 200) {
        setCartProducts(response.data[0].products);
        setLoader(true);
      } else {
        Alert.alert("Error", "Something went wrong", [
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
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  const deleteProduct = async (value) => {
    try {
      const endPoint = `https://ecommercereactnativebackend.onrender.com/api/carts/${value}`;
      const response = await axios.delete(endPoint);
      if (response.status === 200) {
        // Filter out the deleted product from the cartProducts array
        const updatedCartProducts = cartProducts.filter(
          (item) => item._id !== value
        );
        setCartProducts(updatedCartProducts);
        Alert.alert("Success", "Product deleted from the cart Successfully", [
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
        Alert.alert("Error", "Something went wrong", [
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
    } catch (error) {
      console.error("Error deleting product from cart:", error);
    }
  }

  useEffect(() => {
    getCartProducts();
  }, []);

 

  const renderTheCardItem = (products) => {
    return (
      <View>
        {products.map((eachItem) =>
          renderTheCardData(eachItem.cartItem, eachItem.quantity, eachItem._id)
        )}
      </View>
    );
  };

  const calculateTotalCount = () => {
    let total = 0;
    cartProducts.forEach((eachItem) => {
      total += eachItem.cartItem.price * eachItem.quantity;
    });
    return total;
  };

  const renderTheCardData = (values, quantity, cartId) => {
    return (
      <View style={styles.prodcutsWrapper}>
        <ScrollView>
          <View key={values._id}>
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                navigation.navigate("ProductDetails", { product: values })
              }
            >
              <View style={styles.image}>
                <Image
                  source={{ uri: values.imageUrl }}
                  style={styles.productImage}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.productTitle}>{values.title}</Text>
                <Text style={styles.supplier}>{values.supplier}</Text>
                <Text style={styles.supplier}>
                  ${values.price}*{quantity}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => deleteProduct(cartId)}
                style={styles.deleteIcon}
              >
                <AntDesign name="delete" size={24} color={COLORS.red} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </ScrollView>
        
      </View>
    );
  };

  const renderTheActivityIndicator = () => {
    return <ActivityIndicator />;
  };

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
        <Text style={styles.cartText}>Cart</Text>
      </View>
    );
  };

  const renderHeaderAndCarts = (cartProducts) => {
    const totalAmount = calculateTotalCount();
  
    return (
      <View>
        {renderHeader()}
        {cartProducts && cartProducts.length > 0
          ? (
            <>
              {renderTheCardItem(cartProducts)}
              <View style={styles.checkOutButton}>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={styles.checkoutBtn}>
                    C H E C K O U T ${totalAmount}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )
          : renderEmptyCardView()}
      </View>
    );
  };
  

  const renderEmptyCardView = ()=>{
    return(
      <View>
        <Text>No Items in The Cart</Text>
      </View>
    )
  }

  return loader === true
    ? renderHeaderAndCarts(cartProducts)
    : renderTheActivityIndicator();
};

export default Cart;
