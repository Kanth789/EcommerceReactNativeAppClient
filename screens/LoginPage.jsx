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
import styles from "./loginPage.style";
import { Formik } from "formik";
import * as Yup from "yup";
import  MaterialCommunityIcons  from "@expo/vector-icons/MaterialCommunityIcons";
import { COLORS } from "../constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginPage = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const [obsecure, setObsecure] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
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

  const login = async (values) => {
   
    setLoader(true);
    try {
      const endPoint = "https://ecommercereactnativebackend.onrender.com/api/login";
      const data = values;
      const response = await axios.post(endPoint, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === 200) {
        setResponseData(response.data);
        
        await AsyncStorage.setItem(
          `user${responseData._id}`,
          JSON.stringify(responseData)
          );
          
          await AsyncStorage.setItem("id", JSON.stringify(responseData._id));
          setLoader(false);
        navigation.replace("OnboardingScreen"); 
      } else {
        Alert.alert("err", "please enter the required fields", [
          {
            text: "Cancel",
            onPress: () => {},
          },
          {
            text: "Continue",
            onPress: () => {},
          },
        ]);
      }
    }catch (error) {
      const errorMessage =
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "An error occurred. Please try again later.";
      
      Alert.alert("Error", errorMessage, [
        {
          text: "Cancel",
          onPress: () => {},
        },
        {
          text: "Continue",
          onPress: () => {},
        },
      ]);
    }
  };
  
  
  return (
      <SafeAreaView >
    <ScrollView>
        <View>
          {responseData ? <Backbtn OnPress={() => navigation.goBack()} /> : ''}
          <Image
            source={require("../assets/images/login.jpg")}
            style={styles.cover}
          />
          <View style={{marginHorizontal:20}}>
          <Text style={styles.title}>Fashion</Text>
          
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => login(values)}
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
                  <Text style={styles.label}>Email</Text>
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
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>
                <View style={styles.wrapper}>
                  <Text style={styles.label}>Password</Text>
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
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                  </View>
                </View>

                <Button
                  title={"L O G I N"}
                  onPress={() => {
                    isValid ? handleSubmit() : fillData();
                  }}
                  isValid={isValid}
                  loader={loader}
                />
                <Text
                  style={styles.registartion}
                  onPress={() => navigation.navigate("SignUp")}
                >
                  Register
                </Text>
              </View>
            )}
          </Formik>
          </View>
        </View>
    </ScrollView>
      </SafeAreaView>
  );
};

export default LoginPage;
