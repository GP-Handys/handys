import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";
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
  );
}
const styles = StyleSheet.create({
  categoryName: {
    color: COLORS.textInputPlaceholder,
    fontSize: 15,
    textAlign: "center",
    marginTop:5,
    fontWeight:'500'
  },
  categoryImg: {
    borderRadius: 8,
    height: 70,
    width: 70,
  },
});