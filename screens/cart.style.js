import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.small,
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.small,
    backgroundColor: "#fff",
    ...SHADOWS.medium,
    shadowColor: COLORS.lightWhite,
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    paddingVertical:7
  },
  chervonWrapper:{
    marginRight:8
  },
  image: {
    width: 70,
    backgroundColor: COLORS.secondary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignContent: "center",
    height: 60,
  },
  productImage: {
    width: "100%",
    height: 65,
    borderRadius: SIZES.small,
    resizeMode: "cover",
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  productTitle: {
    fontSize: SIZES.medium,
    fontFamily: "bold",
    color: COLORS.primary,
  },
  supplier: {
    fontSize: SIZES.small + 2,
    fontFamily: "semiBold",
    color: COLORS.gray,
    marginTop: 3,
  },
  subTotal:{
    flexDirection:"row",
    justifyContent:'space-between',
    alignItems:'center'
  },
  subTotalTextBold:{
    fontFamily:'regular',
    fontSize:SIZES.large,
  },
  subTotalText:{
    fontFamily:'regular',
    fontSize:SIZES.small,
    color:COLORS.gray
  },
  checkOutButton:{
    borderRadius:9,
    backgroundColor:COLORS.primary,
    padding:10,
    marginHorizontal:10
  },
  checkoutBtn:{
    color:COLORS.white,
    fontFamily:'semiBold',
    fontSize:SIZES.small +2,
    padding:4,
    textAlign: "center"

  },
  prodcutsWrapper:{
    paddingHorizontal:10
  },
  cartText:{
    fontFamily:'regular',
    fontSize:SIZES.large,
    fontWeight:600,
    color:COLORS.primary,
  },
  deleteIcon:{
    zIndex:9999
  }
});

export default styles;
