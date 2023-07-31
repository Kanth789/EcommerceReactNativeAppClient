import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import styles from "./searchCard.style";
import { useNavigation } from "@react-navigation/native";

const SearchCard = ({ product }) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate("ProductDetails", { product })}
      >
        <View style={styles.image}>
          <Image source={product.imageUrl} style={styles.productImage} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.supplier}>{product.supplier}</Text>
          <Text style={styles.supplier}>${product.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchCard;
