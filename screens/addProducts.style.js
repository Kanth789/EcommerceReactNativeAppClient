import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants";

const styles = StyleSheet.create({

  header:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingVertical:7,
    marginHorizontal:10
  },
  chervonWrapper:{
    marginRight:8
  },
  cartText:{
    fontFamily:'regular',
    fontSize:SIZES.large,
    fontWeight:600,
    color:COLORS.primary,
  },
  wrapper: {
    marginBottom: 20,
  },
  menuWrapper: {
    marginTop: SIZES.xLarge,
    width: SIZES.width - SIZES.large,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
  textInputWrapper: (borderColor,image) => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 2,
    borderRadius: 8,
    height: image ? 100 : 55,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
    marginTop:image ? 70 : 0,
  }),
  productFieldWrapper:{
    paddingTop:10,
    paddingRight:22,
    paddingBottom:10,
    paddingLeft:22
  },
  profile: {
    height: 35,
    width: 35,
    borderRadius: 999,
    borderColor: COLORS.primary,
    resizeMode: "cover",
    borderWidth: 3,
  },
  imagePickerButtom:{
    borderRadius:10,
  }

});

export default styles;
