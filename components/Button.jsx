import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

const Button = ({ title, onPress, isValid, loader }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.btnStyle(isValid === false ? COLORS.white : COLORS.primary)}
    >
      <View>
        {loader === false ? (
          <Text
            style={styles.btntext(
              isValid === false ? COLORS.white : COLORS.gray
            )}
          >
            {title}
          </Text>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btntext: (color) => ({
    fontFamily: "bold",
    color: color,
    fontSize: 18,
  }),
  btnStyle: (color) => ({
    height: 50,
    width: "100%",
    marginVertical: 20,
    backgroundColor: color,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 9,
  }),
});
