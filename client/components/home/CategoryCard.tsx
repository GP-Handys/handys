import { Text, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../navigation/NavigationStack";
import { Category } from "../../models/Category";
import COLORS from "../../common/colors";

interface Props {
  category: Category;
}

export default function CategoryCard({category}:Props) {
  const navigation = useNavigation<StackProps["navigation"]>();

  return (
    <View style={styles.containor}>
    <TouchableOpacity onPress={()=>navigation.navigate("CategoryItemsScreen",{
      category:category
    })}>

      {category.category_pfp === null ? (
          <Image
            source={require("../../assets/default_shop_img.png")}
            style={styles.categoryImg}
          />
        ) : (
          <Image source={{ uri: category.category_pfp }} style={styles.categoryImg} />
        )}

      <Text style={styles.categoryName}>{category.category_name}</Text>
    </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  categoryName: {
    color: COLORS.textInputPlaceholder,
    fontSize: 12,
    textAlign: "center",
    marginTop:5,
    fontWeight:'500'
  },
  categoryImg: {
    borderRadius: 8,
    height: 70,
    width: 70,
  },
  containor:{
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});