import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";
const styles = StyleSheet.create({
  cover: {
    height: SIZES.height / 2.4,
    width: SIZES.width - 60,
    resizeMode: "contain",
    marginBottom: SIZES.xxLarge,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    alignItems: "center",
    marginBottom: SIZES.xxLarge,
  },
  textInput: {},
  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontFamily: "regular",
    fontSize: SIZES.xSmall,
    marginBottom: 5,
    marginEnd: 5,
  },
  textInputWrapper: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 2,
    borderRadius: 8,
    height: 55,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  }),
  iconStyle: {
    marginRight: 10,
  },
  errorMessage: {
    color: COLORS.red,
    fontFamily: "regular",
    marginVertical: 5,
    marginLeft: 5,
    fontSize: SIZES.xSmall,
  },
  registartion: {
    marginTop: 20,
    textAlign: "center",
  },
});

export default styles;
