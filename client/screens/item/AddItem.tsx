import { Feather } from "@expo/vector-icons";

import {
  View,
  Text,
  Pressable,
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
import { addItemForShopId } from "../../api/ItemApi";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";
import { MaterialIcons } from "@expo/vector-icons";
import AddCategoriesModal from "./AddCategoriesModal";

export default function AddItemScreen({ route }: any) {
  const shopId = route.params.shopId;
  const navigation = useNavigation<StackProps["navigation"]>();
  const [itemImageUrl, setItemImageUrl] = useState();
  const [itemImagePicked, setItemImagePicked] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDiscount, setItemDiscount] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [customization, setCustomization] = useState("");
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
    const itemId = await pickImageAndStore("items", setItemImageUrl);
    if (itemId) {
      setItemImagePicked(true);
    }
  };

  const addItem = async () => {
    navigation.pop();
    await addItemForShopId(shopId, {
      name: itemName,
      base_price: itemPrice,
      discount: itemDiscount,
      quantity: itemQuantity,
      description: itemDescription,
      img_url: itemImageUrl,
      customization: customization,
      categories:selectedCategories
    }).then((res) => {
      Alert.alert(res.data)
    });
  };

  const handleAddItem = () => {
    addItem();
  };

  return (
    <CommonScrollableBackground>
      {itemImagePicked ? (
        <>
          <TouchableOpacity onPress={handleUploadPressed}>
            <Image
              style={styles.uploadPressable}
              source={{ uri: itemImageUrl }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.changeIMG}
            onPress={handleUploadPressed}
          >
            <Text style={styles.whiteFont}>Change image</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity
            onPress={handleUploadPressed}
            style={[styles.uploadPressable, { marginBottom: 30 }]}
          >
            <Feather name="upload" size={52} color="white" />
          </TouchableOpacity>
        </>
      )}
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Name</Text>
        <CustomTextInput
          placeholder="Enter item name here"
          onChangeText={(text) => {
            setItemName(text);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Price</Text>
        <CustomTextInput
          placeholder="Enter base price here"
          onChangeText={(text) => {
            setItemPrice(text);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Discount %</Text>
        <CustomTextInput
          placeholder="Enter percentage discount here"
          onChangeText={(text) => {
            setItemDiscount(text);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Quantity</Text>
        <CustomTextInput
          placeholder="Enter quantity here"
          onChangeText={(text) => {
            setItemQuantity(text);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Description</Text>
        <CustomTextInput
          placeholder="Enter item description here"
          multiline={true}
          minHeight={100}
          onChangeText={(text) => {
            setItemDescription(text);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.textLabel}>Customization</Text>
        <CustomTextInput
          placeholder="What can the customer customize with your creation?"
          multiline={true}
          minHeight={100}
          onChangeText={(text) => {
            setCustomization(text);
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
          <MaterialIcons name="keyboard-arrow-right" size={28} color="#522C19" />
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
          onPress={handleAddItem}
          style={styles.confirmPressable}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Add
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
    color: COLORS.darkBrown,
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
    marginHorizontal: 33,
  },
  confirmPressableContainer: {
    marginTop: 40,
    paddingBottom: 50,
  },
  whiteFont: { color: "white", fontWeight: "bold", fontSize: 18.44 },

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
    color: COLORS.darkBrown,
    fontWeight: "500",
  },
});
