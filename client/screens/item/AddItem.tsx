import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { CommonScrollableBackground } from "../../common/background";
import CustomTextInput from "../../components/CustomTextInput";
import COLORS from "../../common/colors";
import pickImageAndStore from "../../storage/store";
import { useState } from "react";
import React from "react";

export default function AddItemScreen() {
  const [itemImageUrl, setItemImageUrl] = useState();
  const [itemImagePicked, setItemImagePicked] = useState(false);

  return (
    <CommonScrollableBackground>
      <Pressable
        onPress={async () => {
          const itemId = await pickImageAndStore("items", setItemImageUrl);
          if (itemId) {
            setItemImagePicked(true);
          }
        }}
        style={({ pressed }) => {
          return [
            styles.uploadPressable,
            {
              opacity: pressed ? 0.6 : 1,
            },
          ];
        }}
      >
        {itemImagePicked ? (
          <View style={{ width: "100%", height: "100%" }}>
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 9}}
              source={{ uri: itemImageUrl }}
            />
            <Feather
              name="upload"
              size={20}
              color="white"
              backgroundColor={COLORS.commonBackground}
              style={{
                position: "absolute",
                bottom: 5,
                right: 10,
              }}
            />
          </View>
        ) : (
          <View>
            <Feather name="upload" size={52} color="white" />
          </View>
        )}
      </Pressable>
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Item name</Text>
        <CustomTextInput placeholder="Enter item name here" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Item name</Text>
        <CustomTextInput placeholder="Enter percentage discount here" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Item name</Text>
        <CustomTextInput placeholder="Enter quantity here" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Item name</Text>
        <CustomTextInput placeholder="Enter base price here" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Item description</Text>
        <CustomTextInput
          placeholder="Enter item description here"
          multiline={true}
          minHeight={100}
        />
      </View>
      <View style={styles.confirmPressableContainer}>
        <Pressable
          // onPress={handleLogin}
          style={({ pressed }) => [
            styles.confirmPressable,
            {
              opacity: pressed ? 0.6 : 1,
            },
          ]}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 17 }}>
            Confirm
          </Text>
        </Pressable>
      </View>
    </CommonScrollableBackground>
  );
}

const styles = StyleSheet.create({
  uploadPressable: {
    marginHorizontal: 33,
    marginTop: 33,
    marginBottom: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#585858",
    height: 200,
    borderRadius: 9,
  },
  inputContainer: {
    marginHorizontal: 33,
    marginBottom: 10,
  },
  textLabel: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 11,
  },
  confirmPressable: {
    backgroundColor: COLORS.CTAButtonBackground,
    alignItems: "center",
    justifyContent: "center",
    height: 41,
    borderRadius: 8,
    marginHorizontal: 23,
  },
  confirmPressableContainer: {
    marginTop: 40,
    paddingBottom: 50,
  },
});
