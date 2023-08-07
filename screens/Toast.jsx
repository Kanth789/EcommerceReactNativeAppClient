import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants";

const Toast = ({ statusCode, messsage }) => {
  const renderSuccessMessage = (message) => {
    return (
      <View>
        <FontAwesome
          name="check-square-o"
          size={24}
          color={COLORS.green}
          style={{ marginRight: 10 }}
        />
        <Text>{message}</Text>
      </View>
    );
  };
  const renderInfoMessage = (message) => {
    return (
      <View>
        <FontAwesome
          name="info-circle"
          size={24}
          color={COLORS.black}
          style={{ marginRight: 10 }}
        />
        <Text>{message}</Text>
      </View>
    );
  };
  const renderWarningMessage = (message) => {
    return (
      <View>
        <MaterialIcons
          name="error"
          size={24}
          color={COLORS.red}
          style={{ marginRight: 10 }}
        />

        <Text>{message}</Text>
      </View>
    );
  };

  const renderMessage = (status, message) => {
    switch (status) {
      case 200:
        renderSuccessMessage(message);
      case 400:
        renderWarningMessage(message);
      case 300:
        renderInfoMessage(message);
      default:
        renderInfoMessage(message);
    }
  };

  return (
    <Animated.View
      style={styles.animated(
        statusCode === 200
          ? COLORS.green
          : statusCode === 400
          ? COLORS.red
          : COLORS.black
      )}
      entering={FadeInUp}
      exiting={FadeOutUp}
    >
      {renderMessage(statusCode, messsage)}
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  animated: (color) => ({
    top: 70,
    backgroundColor: color,
    width: "90%",
    borderRadius: 5,
    padding: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    shadowColor:COLORS.gray,
    shadowOpacity:0.4,
    shadowRadius:2,
    shadowOffset:{width:0,height:1},
    elevation:2
  })
});
