import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Backbtn, Button } from "../components";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import Toast from "react-native-toast-message";

const SignUp = ({ navigation }) => {
  const [loader, setLoader] = useState(false);

  const [obsecure, setObsecure] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    location: Yup.string()
      .min(3, "Provide a valid location name")
      .required("Required"),
    username: Yup.string()
      .min(6, "Provide a valid user name")
      .required("Required"),
  });

  const fillData = () => {
    Alert.alert("Invalid form", "please enter the required fields", [
      {
        text: "Cancel",
        onPress: () => {},
      },
      {
        text: "Continue",
        onPress: () => {},
      },
    ]);
  };

  const registerUser = async (values) => {
    console.log(values);
    setLoader(true);

    try {
      const endPoint =
        "https://ecommercereactnativebackend.onrender.com/api/register";
      const data = values;
      const response = await axios.post(endPoint, data);
      
      if (response.status === 201) {
        Toast.show({
          type: "success",
          text1: "Registration successful!",
          position: "bottom",
          bottomOffset: 1,
          topOffset: 0,
        });
        navigation.replace("LoginPage");
      }
    } catch (error) {
      return Toast.show({
        type: "error",
        text1: error,
        position: "bottom",
        bottomOffset: 1,
        topOffset: 0,
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView>
        <View>
          <Backbtn OnPress={() => navigation.goBack()} />
          <Image
            source={require("../assets/images/login1.jpg")}
            style={styles.cover}
          />
          <View style={{ marginHorizontal: 20 }}>
            <Text style={styles.title}>Fashion</Text>

            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                location: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => registerUser(values)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
                setFieldTouched,
                touched,
              }) => (
                <View>
                  <View style={styles.wrapper}>
                    <Text style={styles.label}>Username</Text>
                    <View
                      style={styles.textInputWrapper(
                        touched.username ? COLORS.secondary : COLORS.offwhite
                      )}
                    >
                      <MaterialCommunityIcons
                        name="face-man-profile"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      />
                      <TextInput
                        placeholder="Enter The username"
                        onFocus={() => {
                          setFieldTouched("username");
                        }}
                        onBlur={() => {
                          setFieldTouched("username", "");
                        }}
                        value={values.username}
                        onChangeText={handleChange("username")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1 }}
                      />
                    </View>
                    <View>
                      {touched.username && errors.username && (
                        <Text style={styles.errorMessage}>
                          {errors.username}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.wrapper}>
                    <View>
                      <Text style={styles.label}>Email</Text>
                    </View>
                    <View
                      style={styles.textInputWrapper(
                        touched.email ? COLORS.secondary : COLORS.offwhite
                      )}
                    >
                      <MaterialCommunityIcons
                        name="email-outline"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      />
                      <View>
                        <TextInput
                          placeholder="Enter The Email"
                          onFocus={() => {
                            setFieldTouched("email");
                          }}
                          onBlur={() => {
                            setFieldTouched("email", "");
                          }}
                          value={values.email}
                          onChangeText={handleChange("email")}
                          autoCapitalize="none"
                          autoCorrect={false}
                          style={{ flex: 1 }}
                        />
                      </View>
                    </View>

                    <View>
                      {touched.email && errors.email && (
                        <Text style={styles.errorMessage}>{errors.email}</Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.wrapper}>
                    <View>
                      <Text style={styles.label}>Password</Text>
                    </View>
                    <View
                      style={styles.textInputWrapper(
                        touched.password ? COLORS.secondary : COLORS.offwhite
                      )}
                    >
                      <MaterialCommunityIcons
                        name="lock-outline"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      />
                      <TextInput
                        placeholder="Enter The password"
                        onFocus={() => {
                          setFieldTouched("password");
                        }}
                        onBlur={() => {
                          setFieldTouched("password", "");
                        }}
                        value={values.password}
                        onChangeText={handleChange("password")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1 }}
                        secureTextEntry={obsecure}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setObsecure(!obsecure);
                        }}
                      >
                        <MaterialCommunityIcons
                          name={obsecure ? "eye-outline" : "eye-off-outline"}
                          size={18}
                        />
                      </TouchableOpacity>
                    </View>
                    <View>
                      {touched.password && errors.password && (
                        <Text style={styles.errorMessage}>
                          {errors.password}
                        </Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.wrapper}>
                    <View>
                      <Text style={styles.label}>Location</Text>
                    </View>
                    <View
                      style={styles.textInputWrapper(
                        touched.location ? COLORS.secondary : COLORS.offwhite
                      )}
                    >
                      <Ionicons
                        name="location-outline"
                        size={20}
                        color={COLORS.gray}
                        style={styles.iconStyle}
                      />
                      <TextInput
                        placeholder="Enter The location"
                        onFocus={() => {
                          setFieldTouched("location");
                        }}
                        onBlur={() => {
                          setFieldTouched("location", "");
                        }}
                        value={values.location}
                        onChangeText={handleChange("location")}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={{ flex: 1 }}
                      />
                    </View>

                    <View>
                      {touched.location && errors.location && (
                        <Text style={styles.errorMessage}>
                          {errors.location}
                        </Text>
                      )}
                    </View>
                  </View>

                  <Button
                    title={"S I G N U P"}
                    onPress={() => {
                      isValid ? handleSubmit() : fillData();
                    }}
                    isValid={isValid}
                    loader={loader}
                  />
                  <View>
                    <Text
                      style={styles.registartion}
                      onPress={() => navigation.navigate("LoginPage")}
                    >
                      Login
                    </Text>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
        <Toast />
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  cover: {
    height: SIZES.height / 2.5,
    width: SIZES.width,
    resizeMode: "cover",
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
