import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./adminProducts.style";
import { ScrollView } from "react-native";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, SIZES } from "../constants";
import { Image } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import axios from "axios";
import Toast from "react-native-toast-message";
import { ActivityIndicator } from "react-native";

const AdminProducts = ({ navigation }) => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const endPoint =
      "https://ecommercereactnativebackend.onrender.com/api/products/product/all";
    const response = await axios.get(endPoint);
    if (response.status === 200) {
      setProduct(response.data);
      setLoading(false);
      Toast.show({
        type: "success",
        text1: route?.params?.id
          ? "Product Updated Successfully"
          : "Product Added Successfully",
        position: "bottom",
        bottomOffset: 1,
        topOffset: 0,
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
        position: "bottom",
        bottomOffset: 1,
        topOffset: 0,
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = async (id) => {
    setLoading(true);
    try {
      const endPoint = `https://ecommercereactnativebackend.onrender.com/api/products/product/${id}`;
      const response = await axios.delete(endPoint);
      if (response.status === 200) {
        fetchData();
        Toast.show({
          type: "success",
          text1: "Product Deleted Successfully",
          position: "bottom",
          bottomOffset: 1,
          topOffset: 0,
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          position: "bottom",
          bottomOffset: 1,
          topOffset: 0,
        });
      }
    } catch (err) {
      Toast.show({
        type: "error",
        text1: err,
        position: "bottom",
        bottomOffset: 1,
        topOffset: 0,
      });
    }
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
        <Text style={styles.cartText}>Manage Products</Text>
      </View>
    );
  };
  return (
    <>
      <SafeAreaView>
        <View style={{ marginTop: 10 }}>
          <View>{renderHeader()}</View>
        </View>

        {loading ? (
          <ActivityIndicator />
        ) : (
          <View style={styles.prodcutsWrapper}>
            <ScrollView>
              {product?.map((eachItem) => (
                <View key={eachItem._id}>
                  <TouchableOpacity
                    style={styles.container}
                    onPress={() =>
                      navigation.navigate("DeliverdProducts", {
                        product: eachItem,
                      })
                    }
                  >
                    <View style={styles.image}>
                      <Image
                        source={{ uri: eachItem.imageUrl?.url }}
                        style={styles.productImage}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.productTitle}>{eachItem.title}</Text>
                      <Text style={styles.supplier}>{eachItem.supplier}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("AddProducts", { id: eachItem._id })
                      }
                      style={styles.editIcon}
                    >
                      <Feather name="edit" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => deleteProduct(eachItem?._id)}
                      style={styles.deleteIcon}
                    >
                      <AntDesign name="delete" size={24} color={COLORS.red} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              ))}
              {product?.length === 0 && (
                <View
                  style={{
                    margin: 20,
                    padding: 40,
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={{ uri: "https://i.ibb.co/HgF6yCd/Trolley-HD.png" }}
                    style={{
                      width: SIZES.width,
                      height: SIZES.height / 2,
                      resizeMode: "contain",
                    }}
                  />
                </View>
              )}
            </ScrollView>
          </View>
        )}
      </SafeAreaView>
      <Toast />
    </>
  );
};

export default AdminProducts;
