import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text,
  Platform,
  FlatList,
} from "react-native";
import { CommonBackgroundWithSafeArea } from "../../common/background";
import { MaterialIcons } from "@expo/vector-icons";
import ThematicBreak from "../../components/ThematicBreak";
import SelectableCategory from "./SelectableCategory";
import { Category } from "../../models/Category";
import { getCategories } from "../../api/CategoryApi";
import { localeData } from "moment";
import { ActivityIndicator } from "react-native-paper";
import COLORS from "../../common/colors";

interface CategoriesModalProps {
  addCategory:(id: number) => void
  removeCategory:(id: number) => void
  isVisible: boolean;
  onDismiss: () => void;
  selectedCategories:Number[];
}

export default function PostModal({
  isVisible,
  onDismiss,
  addCategory,
  removeCategory,
  selectedCategories

}: CategoriesModalProps) {

  const handleAdCategories = async () => {
    onDismiss();
  };
  const [loading , setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(()=>{
    const fetchCategory = async ()=>{
      let data = await getCategories();
      setCategories(data);
      setLoading(false)
    }
    fetchCategory()
  },[])

  
  if (loading) {
    return (
      <View style={styles.loadingPage}>
        <ActivityIndicator size={"large"} color="white" />
      </View>
    );
  } else
  return (
    <View>
      <Modal animationType="slide" transparent={false} visible={isVisible}>
        <CommonBackgroundWithSafeArea>
          <View style={styles.ModalHeader}>
            <TouchableOpacity onPress={onDismiss} style={styles.CloseButton}>
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.HeaderText}> Select Categories</Text>
            <TouchableOpacity
              onPress={handleAdCategories}
              style={[
                styles.Button,
                {
                  //   opacity: postText ? 1 : 0.5,
                },
              ]}
              //  disabled={}
            >
              <Text style={styles.InnerButton}>Done</Text>
            </TouchableOpacity>
          </View>
          <ThematicBreak />
          <FlatList
            data={categories}
            renderItem={({ item }) => <SelectableCategory category={item} isChecked={selectedCategories.includes(item.id)} addCategory={addCategory} removeCategory={removeCategory}/>}
            ItemSeparatorComponent={() => <ThematicBreak />}
          />
        </CommonBackgroundWithSafeArea>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  ModalHeader: {
    paddingTop: Platform.OS === "android" ? 15 : 0,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 10,
  },
  CloseButton: {
    width: 30,
    position: "absolute",
    left: 15,
  },
  HeaderText: {
    fontSize: 20,
    color: "white",
    marginEnd: 50,
    fontWeight: "600",
  },
  Button: {
    borderWidth: 1,
    borderRadius: 20,
    width: 75,
    alignItems: "center",
    height: 35,
    backgroundColor: "#F6977F",
    justifyContent: "center",
    marginEnd: 10,
    position: "absolute",
    right: 10,
  },
  InnerButton: {
    color: "black",
    alignItems: "center",
    fontWeight: "700",
    fontSize: 14,
  },
  loadingPage: {
    backgroundColor: COLORS.commonBackground,
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
});
