import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useState, useRef } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { useNavigation } from "@react-navigation/native";
import { Video, ResizeMode } from "expo-av";
import { SIZES } from "../constants";
import { useEffect } from "react";

const slides = [
  {
    key: 1,
    image: "https://i.ibb.co/YNRrGfQ/Special-2.png",
    backgroundColor: "#59b2ab",
  },
  {
    key: 2,
    image: "https://i.ibb.co/yRVhtYp/Special.png",
    backgroundColor: "#febe29",
  },
  {
    key: 3,
    image: "https://i.ibb.co/8YhQ6cp/Special-1.png",
    backgroundColor: "#22bcb5",
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [showRealApp, setShowRealApp] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(true); 

  const videoRef = useRef(null);

  const onEnd = () => {
    setIsVideoPlaying(false); 
  };

  useEffect(() => {
    if (isVideoPlaying && isFirstTime && videoRef.current) {
      (async () => {
        await videoRef.current.setStatusAsync({ shouldPlay: true });
        
      })();
      
    }
    
  }, [isVideoPlaying, isFirstTime]);
  

  const onPlaybackStatusUpdate = (status) => {
    if (!status.isLoaded) {
      return;
    }

    if (status.isPlaying) {
      setIsVideoPlaying(true);
    } else if (status.didJustFinish) {
      setIsVideoPlaying(false);
     
    }
  };

  const renderVideo = () => {
    if (isVideoPlaying && isFirstTime) {
      return (
        <View>
          <Video
            ref={videoRef}
            videoStyle={styles.video}
            source={require("../assets/images/Special.mp4")}
            resizeMode={ResizeMode.CONTAIN}
            isLooping={false}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
          />
        </View>
      );
    }
  };

  const onVideoEnded = () => {
    setIsFirstTime(false);
  };
  const renderItem = ({ item }) => {
    return (
      <ImageBackground
        source={{ uri: item.image }}
        style={{ width: SIZES.width, height: SIZES.height }}
      ></ImageBackground>
    );
  };
  const onDone = () => {
    setShowRealApp(true);
  };

  if (showRealApp) {
    return navigation.replace("BottomNavigation");
  } else {
    return (
      <View>
        {renderVideo()}
        {!isVideoPlaying && (
          <AppIntroSlider
            renderItem={renderItem}
            data={slides}
            onDone={onDone}
          />
        )}
      </View>
    );
  }
};


export default OnboardingScreen;



const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  title: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    fontWeight: 600,
  },
  image: {
    width: SIZES.width,
    height: SIZES.height,
  },
  video: {
    width: SIZES.width+20,
    height: SIZES.height,
    position:'relative',
    resizeMode:'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
