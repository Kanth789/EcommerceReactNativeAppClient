import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    marginHorizontal: 10,
  },
  chervonWrapper: {
    marginRight: 8,
  },
  cartText: {
    fontFamily: "regular",
    fontSize: SIZES.large,
    fontWeight: 600,
    color: COLORS.primary,
  },
  menuWrapper: {
    marginTop: SIZES.xLarge,
    width: SIZES.width - SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
    margin:8
  },

  menuItem: (borderBottomWidth) => ({
    borderBottomWidth: borderBottomWidth,
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderColor: COLORS.gray,
  }),
});

export default styles;
