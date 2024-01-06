import { Feather } from "@expo/vector-icons";
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
import { addItemForShopId } from "../../api/ItemApi";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";
import CheckBoxItem from "../../components/CheckBoxItem";
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
  const [isBagChecked, setIsBagChecked] = useState(false);
  const [isBraceletChecked, setIsBraceletChecked] = useState(false);
  const [isEarringChecked, setIsEarringChecked] = useState(false);
  const [isRingsChecked, setIsRingsChecked] = useState(false);
  const [customization, setCustomization] = useState("");

  const [isAddCategoriesModal, setIsAddCategoriesModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


  const handleUploadPressed = async () => {
    const itemId = await pickImageAndStore("items", setItemImageUrl);
    if (itemId) {
      setItemImagePicked(true);
    }
  };

  const addItem = async () => {
    await addItemForShopId(shopId, {
      name: itemName,
      base_price: itemPrice,
      discount: itemDiscount,
      quantity: itemQuantity,
      description: itemDescription,
      img_url: itemImageUrl,
      customization: customization,
    }).then((res) => {
      if (res.status === 200) {
        alert("Item added successfully");
        navigation.pop();
      }
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
            <Text style={styles.blackFont}>Change image</Text>
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

      
      <View style={{paddingTop:10}}>
          <TouchableOpacity style={
            {borderWidth:1,  
              backgroundColor: COLORS.handysGrey, 
              borderRadius: 8,
              flexDirection: "row",
              height: 45,
              marginHorizontal: 33,
              marginBottom: 10,
              display: "flex",
              gap: 150,
          }
          }
          onPress={() => {setModalVisible(true)}}
          >
  <Text style={{color: "white", marginTop:8, fontSize: 15, marginRight:10, paddingLeft:10}}> 
    Category
  </Text>
          <MaterialIcons name="keyboard-arrow-right" size={22} color="white" style={{marginTop:8,paddingLeft:20}} />           
          </TouchableOpacity>
      </View>
      <AddCategoriesModal
        isVisible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        />

      <View style={styles.confirmPressableContainer}>
        <TouchableOpacity
          onPress={handleAddItem}
          style={styles.confirmPressable}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 17 }}>
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
  checkboxRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryName: {
    marginRight: 5,
    color: "white",
    fontWeight: "bold",
  },
});
