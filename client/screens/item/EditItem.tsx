import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { CommonScrollableBackground } from "../../common/background";
import CustomTextInput from "../../components/CustomTextInput";
import COLORS from "../../common/colors";
import pickImageAndStore from "../../storage/store";
import { useState } from "react";
import React from "react";
import { updateItemById } from "../../api/ItemApi";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";
import { Item } from "../../models/Item";

export default function EditItemScreen({ route }: any) {
  const item: Item = route.params.item;
  const navigation = useNavigation<StackProps["navigation"]>();
  const [itemImageUrl, setItemImageUrl] = useState();
  const [itemImagePicked, setItemImagePicked] = useState(true);
  const [itemName, setItemName] = useState(item.name);
  const [itemPrice, setItemPrice] = useState(item.base_price);
  const [itemDiscount, setItemDiscount] = useState(item.discount);
  const [itemQuantity, setItemQuantity] = useState(item.quantity);
  const [itemDescription, setItemDescription] = useState(item.description);

  const handleUploadPressed = async () => {
    await pickImageAndStore("items", setItemImageUrl);
  };

  const editItem = async () => {
    await updateItemById(item.id, {
      name: itemName,
      base_price: itemPrice,
      discount: itemDiscount,
      quantity: itemQuantity,
      description: itemDescription,
      img_url: itemImageUrl,
    }).then((res) => {
        if (res.status === 200) {
          alert("Item edited successfully");
          navigation.pop();
        }
    });
  };

  const handleEditItem = () => {
    editItem();
  };

  return (
    <CommonScrollableBackground>
      {itemImagePicked ? (
        <>
          <TouchableOpacity onPress={handleUploadPressed}>
            <Image
              style={styles.uploadPressable}
              source={{ uri: item.img_url ?? "" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.changeIMG}
            onPress={handleUploadPressed}
          >
            <Text style={styles.blackFont}>Change image</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={handleUploadPressed} style={[styles.uploadPressable, {marginBottom: 30}]}>
            <Feather name="upload" size={52} color="white" />
          </TouchableOpacity>
        </>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Name</Text>
        <CustomTextInput
          placeholder={item.name}
          onChangeText={(text) => {
            setItemName(text);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Price</Text>
        <CustomTextInput
          placeholder={"JOD " + item.base_price.toString()}
          onChangeText={(text) => {
            setItemPrice(Number(text));
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Discount %</Text>
        <CustomTextInput
          placeholder={item.discount.toString()}
          onChangeText={(text) => {
            setItemDiscount(Number(text));
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Quantity</Text>
        <CustomTextInput
          placeholder={item.quantity.toString()}
          onChangeText={(text) => {
            setItemQuantity(Number(text));
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Description</Text>
        <CustomTextInput
          placeholder={item.description}
          multiline={true}
          minHeight={100}
          onChangeText={(text) => {
            setItemDescription(text);
          }}
        />
      </View>
      <View style={styles.confirmPressableContainer}>
        <TouchableOpacity
          onPress={handleEditItem}
          style={styles.confirmPressable}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 17 }}>
            Confirm Edit
          </Text>
        </TouchableOpacity>
      </View>
    </CommonScrollableBackground>
  );
}

const styles = StyleSheet.create({
  uploadPressable: {
    width: "90%",
    height: 250,
    borderRadius: 9,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: COLORS.handysGrey,
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
  blackFont: { color: "black", fontWeight: "bold", fontSize: 18.44 },
  changeIMG: {
    height: 40,
    backgroundColor: COLORS.CTAButtonBackground,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 100,
    marginBottom: 20,
  },
});
