import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { CommonScrollableBackground } from "../../common/background";
import CustomTextInput from "../../components/CustomTextInput";
import COLORS from "../../common/colors";
import pickImageAndStore from "../../storage/store";
import { useState } from "react";
import React from "react";
import { deleteItem, updateItemById } from "../../api/ItemApi";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";
import { Item } from "../../models/Item";
import AddCategoriesModal from "./AddCategoriesModal";

export default function EditItemScreen({ route }: any) {
  const item: Item = route.params.item;
  const navigation = useNavigation<StackProps["navigation"]>();
  const [itemImageUrl, setItemImageUrl] = useState(item.img_url);
  const [itemImagePicked, setItemImagePicked] = useState(true);
  const [itemName, setItemName] = useState(item.name);
  const [itemPrice, setItemPrice] = useState(item.base_price);
  const [itemDiscount, setItemDiscount] = useState(item.discount);
  const [itemQuantity, setItemQuantity] = useState(item.quantity);
  const [itemDescription, setItemDescription] = useState(item.description);
  const [disableClick , setDisableClick] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const addCategory = (id: number)=> {
    if (!selectedCategories.includes(id)) {
      setSelectedCategories(prevCategories => [...prevCategories, id]);
    }
  }

  const removeCategory=(id: number) =>{
    setSelectedCategories(prevCategories =>
      prevCategories.filter(categoryId => categoryId !== id)
    );
  }


  const handleUploadPressed = async () => {
    await pickImageAndStore("items", setItemImageUrl);
  };

  const editItem = async () => {
    setDisableClick(true)
    await updateItemById(item.id, {
      name: itemName,
      base_price: itemPrice,
      discount: itemDiscount,
      quantity: itemQuantity,
      description: itemDescription,
      img_url: itemImageUrl,
      selectedCategories:selectedCategories
    }).then((res) => {
        if (res.status === 200) {
          alert("Item edited successfully");
        }
        navigation.pop();
    });
  };

  const handleEditItem = () => {
    editItem();
  };

  const handleDeleteItem = () => {
    Alert.alert("Delete item", "Are you sure?", [
      {
        text: "Cancel",
      },
      {
        text: "Yes",
        onPress: () =>  excuteDeleteItem()
        ,
      },
    ]);
  }

  const excuteDeleteItem = async ()=>{
    navigation.pop()
    await deleteItem(item.id)
  }

  return (
    <CommonScrollableBackground>
      {itemImagePicked ? (
        <>
          <TouchableOpacity onPress={handleUploadPressed}>
            <Image
              style={styles.uploadPressable}
              source={{ uri: itemImageUrl ?? "" }}
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
          placeholder={"JOD " + item?.base_price.toString()}
          onChangeText={(text) => {
            setItemPrice(Number(text));
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
      <View style={{ paddingTop: 10, paddingHorizontal: 33 }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.handysGrey,
            borderRadius: 10,
            flexDirection: "row",
            height: 50,
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.categoryName}>Categories</Text>
          <MaterialIcons name="keyboard-arrow-right" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <AddCategoriesModal
      selectedCategories={selectedCategories}
      addCategory={addCategory}
      removeCategory={removeCategory}
        isVisible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      />
      <View style={styles.confirmPressableContainer}>
        <TouchableOpacity
          onPress={handleEditItem}
          style={[styles.confirmPressable,{backgroundColor:disableClick?COLORS.disabledButtom:COLORS.CTAButtonBackground}]}
          disabled={disableClick}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 17 }}>
            Confirm Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleDeleteItem}
          style={styles.deletePressable}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 17 }}>
            Delete item
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
  deletePressable: {
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    height: 41,
    borderRadius: 8,
    marginHorizontal: 23,
  },
  confirmPressable: {
    alignItems: "center",
    justifyContent: "center",
    height: 41,
    borderRadius: 8,
    marginHorizontal: 23,
  },
  confirmPressableContainer: {
    marginTop: 40,
    paddingBottom: 50,
    gap:20
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
  
  categoryName: {
    fontSize:16,
    color: "white",
    fontWeight: "500",
  },
});
