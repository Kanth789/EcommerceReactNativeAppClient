import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./search.style";
import { Feather, Ionicons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants";
import axios from "axios";
import { ProductCard } from "../components";
import SearchCard from "../components/products/SearchCard";
import { Searchbar } from "react-native-paper";

const Search = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const onChangeSearch = (query) => setSearchQuery(query);
  const [error, setError] = useState("");
  const handleSearch = async () => {
    try {
      const result = await axios.get(
        `https://ecommercereactnativebackend.onrender.com/api/products/search/${searchText}`
      );
      setSearchResults(result.data);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-circle" size={30} />
      </TouchableOpacity>
      <View style={styles.searchContainer}>
        <TouchableOpacity>
          <Ionicons
            name="camera-outline"
            size={SIZES.xLarge}
            color={COLORS.white}
            style={styles.searchItem}
          />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="What are you looking for..."
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.searchBtn}
            onPress={() => handleSearch()}
          >
            <Feather name="search" size={24} color={COLORS.offwhite} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.search}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={COLORS.secondary}
        />
      </View>
      {searchResult.length === 0 || searchText.length === 0 ? (
        <View style={{ flex: 1 }}>
          <Image
            source={require("../assets/images/Pose23.png")}
            style={styles.searchImage}
          />
        </View>
      ) : (
        <FlatList
          data={searchResult}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 20, width: SIZES.width - 100 }}>
              <SearchCard product={item} />
            </View>
          )}
          style={{ marginHorizontal: 12 }}
        />
      )}
    </SafeAreaView>
  );
};

export default Search;
