import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const slides = [
    "https://i.ibb.co/kqwmrnd/fn5.jpg",
    "https://i.ibb.co/g7qTCnM/fn4.jpg",
    "https://i.ibb.co/1Ztb72V/fn1.jpg",
    "https://i.ibb.co/mqr4vk8/fn3.jpg",
  ];

  return (
    <View style={styles.carouselContainer}>
      <SliderBox
        images={slides}
        dotColor={COLORS.primary}
        inactiveDotColor={COLORS.secondary}
        ImageComponentStyle={{
          borderRadius: 15,
          width: "95%",
          marginTop: 15,
        }}
        autoplay
        circleLoop
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: "center",
  },
});
