import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../constants";
import ProductCard from "./ProductCard";
import styles from "./product.style";
import useFetch from "../../hook/useFetch";

const ProductRow = () => {
  const { data, isLoading, error, refetch } = useFetch();

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      ) : error ? (
        <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <ProductCard product={item} />}
          horizontal
          contentContainerStyle={{ columnGap: SIZES.medium }}
        />
      )}
    </View>
  );
};

export default ProductRow;
