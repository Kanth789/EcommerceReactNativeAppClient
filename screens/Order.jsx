import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SHADOWS, SIZES } from "../constants";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

const Order = ({ navigation }) => {
  const route = useRoute();
  const { cartProducts } = route.params;

  
  const renderProduct = () => {
    if (!cartProducts || cartProducts.length === 0) {
      return renderEmptyOrders();
    }
    return cartProducts?.map((values, index) => (
      <View style={styles.prodcutsWrapper} key={index}>
        <ScrollView>
          <View key={values._id}>
            <TouchableOpacity
              style={styles.container}
              onPress={() =>
                navigation.navigate("ProductDetails", {
                  product: values,
                })
              }
            >
              <View style={styles.image}>
                <Image
                  source={{ uri: values.cartItem.imageUrl }}
                  style={styles.productImage}
                />
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.productTitle}>{values.cartItem.title}</Text>
                <Text style={styles.supplier}>{values.cartItem.supplier}</Text>
              </View>
              <View>
                <View>
                  <Text
                    style={{
                      fontFamily: "bold",
                      fontSize: SIZES.small,
                      fontWeight: 600,
                    }}
                  >
                    Payment
                  </Text>
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: SIZES.xSmall,
                    }}
                  >
                    {values.cartItem.paymentStatus === "pending"
                      ? "Pending"
                      : "Success"}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontFamily: "bold",
                      fontSize: SIZES.small,
                      fontWeight: 600,
                    }}
                  >
                    Delivery
                  </Text>
                  <Text
                    style={{
                      fontFamily: "regular",
                      fontSize: SIZES.xSmall,
                    }}
                  >
                    {values.cartItem.deliveryStatus ? "Delived" : "ontheway"}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {renderFooterText()}
      </View>
    ));
  };
  const userLogOut = async () => {
    const id = await AsyncStorage.getItem("id");
    const userId = `user${JSON.parse(id)}`;
    try {
      await AsyncStorage.multiRemove([userId, "id"]);
      navigation.replace("BottomNavigation");
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    Alert.alert("Logout", "Are You sure you want to logout", [
      {
        text: "Cancel",
        onPress: () => console.log("cancel pressed"),
      },
      {
        text: "Continue",
        onPress: () => userLogOut(),
      },
    ]);
  };

  const renderFooterText = () => {
    return (
      <View style={{marginTop:SIZES.height/2}}>
        <View>
          <Text
            style={{
              fontFamily: "bold",
              fontSize: SIZES.xxLarge,
              fontWeight: 600,
              color: COLORS.primary,
              opacity:0.6
            }}
          >
            Thank You, Visit Again
          </Text>
          <AntDesign name="heart" size={40} color={COLORS.red} style={{marginVertical:10}}/>
        </View>
        
      </View>
    );
  };

  const renderEmptyOrders = () => {
    return (
      <View style={styles.view}>
        <Text style={styles.willUpdateText}>
          To Order have placed until now
        </Text>
        <View style={{ margin: 20 }}>
          <Image
            source={{ uri: "https://i.ibb.co/WysWmvQ/Delivery-Truck-HD.png" }}
            style={{
              width: SIZES.width - 10,
              height: SIZES.height / 2.5,
              margin: 10,
            }}
          />
        </View>
      </View>
    );
  };
  
  return (
    <SafeAreaView>
      <View style={{ flexDirection: "row", alignItems: "center", margin: 10 ,justifyContent:"space-between"}}>
        <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Order</Text>
        </View>
        <TouchableOpacity onPress={() => logOut()}>
          <AntDesign name="logout" size={24} color={COLORS.red}/>
        </TouchableOpacity>
      </View>

      {renderProduct()}
    </SafeAreaView>
  );
};

export default Order;

const styles = StyleSheet.create({
  text: {
    color: COLORS.primary,
    fontSize: SIZES.large,
    fontFamily: "regular",
    marginTop: 1,
    marginLeft: 8,
  },
  view: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  willUpdateText: {
    fontFamily: "regular",
    fontSize: SIZES.large,
    color: COLORS.black,
    marginTop: SIZES.xxLarge + 40,
  },
  prodcutsWrapper: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.small,
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#fff",
    ...SHADOWS.medium,
    shadowColor: COLORS.lightWhite,
  },
  image: {
    width: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignContent: "center",
    height: 60,
  },
  productImage: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTitle: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.primary,
  },
  supplier: {
    fontSize: SIZES.small + 2,
    fontFamily: "bold",
    color: COLORS.gray,
    marginTop: 3,
  },
});
