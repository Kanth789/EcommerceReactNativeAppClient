import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../../constants";
import { SliderBox } from "react-native-image-slider-box";
import { ActivityIndicator } from "react-native";

const Carousel = () => {
  const slides = [
    "https://i.ibb.co/kqwmrnd/fn5.jpg",
    "https://i.ibb.co/NpSt3zD/3.png",
    "https://i.ibb.co/ByQBLF8/2.png",
    "https://i.ibb.co/ZLSgzh5/1.png",
  ];

  const loadingSlide =[
    'https://i.ibb.co/n7s98vj/Brown-Minimalist-Fashion-Sale-Banner.png',
    'https://i.ibb.co/n7s98vj/Brown-Minimalist-Fashion-Sale-Banner.png',
    'https://i.ibb.co/n7s98vj/Brown-Minimalist-Fashion-Sale-Banner.png'

  ]

  const [isImagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const promises = slides.map((slide) => {
        return Image.prefetch(slide);
      });

      try {
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.log("Error preloading images:", error);
        setImagesLoaded(true);
      }
    };

    preloadImages();
  }, []);

  return (
    <View style={styles.carouselContainer}>
      {isImagesLoaded ? (
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
      ) : (
        <SliderBox
        images={loadingSlide}
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
      )}
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
