import { ActivityIndicator, FlatList, Text, View } from "react-native";
import React from "react";
import useFetch from "../../hook/useFetch";
import { COLORS, SIZES } from "../../constants";
import styles from "./productsList.style";
import ProductCard from "./ProductCard";

const ProductList = ({favourites = false}) => {
  const { data, isLoading, error, refetch } = useFetch();
  
  const renderFavoruiteItems = ()=>{
    const filteredData = data.filter((eachItem) => eachItem.like === true);

  return filteredData;
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={SIZES.xxLarge} color={COLORS.primary} />
      </View>
    );
  } else if (error) {
    return <View>
    <Text
      style={{
        color: COLORS.primary,
        fontFamily: "bold",
        fontSize: SIZES.small,
      }}
      numberOfLines={1}
    >{error}</Text>
    <Image
      source={{ uri: "https://i.ibb.co/g751J7m/404-Error-HD.png" }}
      style={{
        width: SIZES.width,
        height: SIZES.height / 2,
        marginVertical: 30,
      }}
    />
  </View>
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={favourites ? renderFavoruiteItems() :data}
          numColumns={2}
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={styles.container}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    );
  }
};

export default ProductList;
