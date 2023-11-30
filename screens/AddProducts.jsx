import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Button,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFormik } from "formik";
import * as Yup from "yup";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { setTheImageDetails } from "../redux/reducers/productSlice";
import styles from "./addProducts.style";
import { useRoute } from "@react-navigation/native";
import { COLORS } from "../constants";

const AddProducts = ({ navigation }) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const imageUrl = useSelector((state) => state.product.imageUrl);
  const [obsecure, setObsecure] = useState(false);
  const [loader, setLoader] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [image, setimage] = useState(null);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string()
      .min(1, "Have to give description about the product")
      .max(1024, "Max characters reached")
      .required("Required"),
    price: Yup.number().required(),
    supplier: Yup.string().required("Required"),
    supplierLocation: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: 0,
      supplier: "",
      supplierLocation: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => createOrUpdateProduct(values),
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isValid,
    setFieldTouched,
    touched,
    setValues,
  } = formik;

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endPoint = `https://ecommercereactnativebackend.onrender.com/api/products/product/${route?.params?.id}`;
        const response = await axios.get(endPoint);
        if (response.status === 200) {
          setValues({
            ...values,
            title: response.data.title,
            description: response.data.description,
            price: response.data.price,
            supplier: response.data.supplier,
            supplierLocation: response.data.supplierLocation,
          });
          setimage(response?.data.imageUrl?.url);
        }
      } catch (err) {
        Toast.show({
          type: "error",
          text1: err,
          position: "bottom",
          bottomOffset: 1,
          topOffset: 0,
        });
      }
    };
    if (route?.params?.id) {
      fetchData();
    }
  }, [route?.params?.id]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      title: "Select Image",
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let newFile = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split(".")[1]}`,
        name: `test.${result.assets[0].uri.split(".")[1]}`,
      };
      handleUpload(newFile);
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "fvphonxn");
    data.append("cloud_name", "dwndips4k");
    fetch("https://api.cloudinary.com/v1_1/dwndips4k/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        const imageData = {
          public_id: data?.public_id,
          url: data?.url,
        };
        dispatch(setTheImageDetails(imageData));
        Toast.show({
          type: "success",
          text1: "Image Added Successfully",
          position: "bottom",
          bottomOffset: 1,
          topOffset: 0,
        });
        setimage(data?.url);
      })
      .catch((err) => {
        Toast.show({
          type: "error",
          text1: err,
          position: "bottom",
          bottomOffset: 1,
          topOffset: 0,
        });
      });
  };

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

  const createOrUpdateProduct = async (values) => {
    setLoader(true);

    try {
      const endPoint =
        route?.params?.id !== undefined || null
          ? `https://ecommercereactnativebackend.onrender.com/api/products/product/${route?.params?.id}`
          : "https://ecommercereactnativebackend.onrender.com/api/products/product";
      const data = { imageUrl, ...values };
      const response = route?.params?.id
        ? await axios.put(endPoint, data)
        : await axios.post(endPoint, data);
      if (response.status === 200) {
        {console.log(response.data,data)}
        Toast.show({
          type: "success",
          text1: route?.params?.id
            ? "Product Updated Successfully"
            : "Product Added Successfully",
          position: "bottom",
          bottomOffset: 1,
          topOffset: 0,
        });
        navigation.navigate("AdminProducts");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error?.message,
      });
    } finally {
      setLoader(false);
    }
  };

  if (hasGalleryPermission === false) {
    return <Text>No Access to Internal Storage</Text>;
  }

  const renderHeader = () => {
    return (
      <View style={styles.header}>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.chervonWrapper}
          >
            <Ionicons
              name="chevron-back-circle"
              size={30}
              color={COLORS.primary}
            />
          </TouchableOpacity>
          <Text style={styles.cartText}>Admin Dashboard</Text>
        </View>
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/images/profile.jpeg")}
            style={styles.profile}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>{renderHeader()}</View>
        <View style={styles.productFieldWrapper}>
          <View style={styles.wrapper}>
            <Text style={styles.label}>Name of the Product</Text>
            <View style={styles.textInputWrapper(COLORS.offwhite)}>
              <TextInput
                mode="outlined"
                label="Name of the Product"
                placeholder="Name of the Product"
                value={values.title}
                onChangeText={handleChange("title")}
                autoCapitalize="none"
                autoCorrect={false}
                style={{ flex: 1 }}
              />
            </View>
            {touched.title && errors.title && (
              <Text style={styles.errorMessage}>{errors.title}</Text>
            )}
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.label}>Description</Text>
            <View style={styles.textInputWrapper(COLORS.offwhite)}>
              <TextInput
                mode="outlined"
                label="Enter The Description of Products"
                placeholder="Enter The Description of Products"
                value={values.description}
                onChangeText={handleChange("description")}
                autoCapitalize="none"
                autoCorrect={false}
                style={{ flex: 1 }}
                multiline={true}
                numberOfLines={10}
                secureTextEntry={obsecure}
              />
            </View>
            <View>
              {touched.description && errors.description && (
                <Text style={styles.errorMessage}>{errors.description}</Text>
              )}
            </View>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.label}>Price</Text>
            <View style={styles.textInputWrapper(COLORS.offwhite)}>
              <TextInput
                mode="outlined"
                label="Price"
                placeholder="Price"
                value={values.price.toString()}
                onChangeText={handleChange("price")}
                autoCapitalize="none"
                autoCorrect={false}
                style={{ flex: 1 }}
                secureTextEntry={obsecure}
                keyboardType="numeric"
              />
            </View>
            <View>
              {touched.price && errors.price && (
                <Text style={styles.errorMessage}>{errors.price}</Text>
              )}
            </View>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.label}>Supplier Name</Text>
            <View style={styles.textInputWrapper(COLORS.offwhite)}>
              <TextInput
                mode="outlined"
                label="Supplier Name"
                placeholder="Supplier Name"
                value={values.supplier}
                onChangeText={handleChange("supplier")}
                autoCapitalize="none"
                autoCorrect={false}
                style={{ flex: 1 }}
                multiline={true}
                numberOfLines={10}
                secureTextEntry={obsecure}
              />
            </View>
            <View>
              {touched.supplier && errors.supplier && (
                <Text style={styles.errorMessage}>{errors.supplier}</Text>
              )}
            </View>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.label}>Supplier Location</Text>
            <View style={styles.textInputWrapper(COLORS.offwhite)}>
              <TextInput
                mode="outlined"
                label="Supplier Location"
                placeholder="Supplier Location"
                value={values.supplierLocation}
                onChangeText={handleChange("supplierLocation")}
                autoCapitalize="none"
                autoCorrect={false}
                style={{ flex: 1 }}
                multiline={true}
                numberOfLines={10}
                secureTextEntry={obsecure}
              />
            </View>
            <View>
              {touched.supplierLocation && errors.supplierLocation && (
                <Text style={styles.errorMessage}>
                  {errors.supplierLocation}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.label}>Product Image</Text>
            <View style={styles.textInputWrapper(COLORS.offwhite, image)}>
              <View style={{ display: "flex", flexDirection: "column" }}>
                <Button
                  title={image ? "Uploaded" : "Press me"}
                  onPress={pickImage}
                  
                />
                {image && (
                  <View style={{ width: 200, height: 200 }}>
                    <Image source={{ uri: image }} style={{ flex: 1 / 2 }} />
                  </View>
                )}
              </View>
            </View>
            <View>
              {touched.imageUrl && errors.imageUrl && (
                <Text style={styles.errorMessage}>{errors.imageUrl}</Text>
              )}
            </View>
          </View>
          <Button
            title={"Add"}
            onPress={() => {
              isValid ? handleSubmit() : fillData();
            }}
            disabled={!isValid}
            loader={loader}
          />
        </View>
      </ScrollView>
      <Toast />
    </SafeAreaView>
  );
};

export default AddProducts;
