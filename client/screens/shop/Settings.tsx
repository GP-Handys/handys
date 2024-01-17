import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { CommonBackgroundWithSafeArea } from "../../common/background";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import COLORS from "../../common/colors";
import ThematicBreak from "../../components/ThematicBreak";
import { useNavigation } from "@react-navigation/native";
import { StackProps } from "../../components/navigation/NavigationStack";
import { Shop } from "../../models/Shop";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShopSettingsScreen({ route }: any) {
  const navigation = useNavigation<StackProps["navigation"]>();
  const shop: Shop = route.params.shop;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TouchableOpacity style={styles.touchableStyle}>
        <Feather name="edit" size={32} color={"white"} />
        <Text style={styles.buttonText}>Edit Shop Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.touchableStyle}
        onPress={() =>
          navigation.navigate("AddItemScreen", { shopId: shop.id })
        }
      >
        <MaterialIcons name="add-box" size={32} color={"white"} />
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>

      <View style={{ marginVertical: 15 }}>
        <ThematicBreak marginHorizontal={25} />
      </View>

      <TouchableOpacity
        style={styles.touchableStyle}
        onPress={() => {
          navigation.navigate("ShopOrdersScreen", { shopId: shop.id });
        }}
      >
        <MaterialIcons name="history" size={32} color={"white"} />
        <Text style={styles.buttonText}>Orders</Text>
      </TouchableOpacity>

      <View style={{ marginVertical: 15 }}>
        <ThematicBreak marginHorizontal={25} />
      </View>

      {shop?.is_premium ? (
        <View>
          <TouchableOpacity
            style={[
              styles.touchableStyle,
              { backgroundColor: COLORS.CTAButtonBackground },
            ]}
          >
            <FontAwesome5 name="crown" size={22} color="white" />
            <Text
              style={[
                styles.buttonText,
                { color: "white", fontWeight: "bold" },
              ]}
            >
              Subscribed!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.touchableStyle,
              { backgroundColor: COLORS.CTAButtonBackground },
            ]}
            onPress={() => navigation.navigate("AiPromptScreen")}
          >
            <FontAwesome5 name="lightbulb" size={22} color="white" />
            <Text
              style={[
                styles.buttonText,
                { color: "white", fontWeight: "bold" },
              ]}
            >
              Ideas Generator
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("GenerationHistoryScreen")}
            style={[
              styles.touchableStyle,
              { backgroundColor: COLORS.CTAButtonBackground },
            ]}
          >
            <FontAwesome5 name="images" size={22} color="white" />
            <Text
              style={[
                styles.buttonText,
                { color: "white", fontWeight: "bold" },
              ]}
            >
              Generated Ideas
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[
            styles.touchableStyle,
            { backgroundColor: COLORS.CTAButtonBackground },
          ]}
        >
          <FontAwesome5 name="crown" size={22} color="white" />
          <Text
            style={[styles.buttonText, { color: "white", fontWeight: "bold" }]}
          >
            Subscribe to premium
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.commonBackground,
    flex: 1,
    justifyContent: "center",
  },
  touchableStyle: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: COLORS.handysGrey,
    height: 60,
    width: 300,
    borderRadius: 9,
    gap: 12,
    paddingLeft: 15,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
  },
});
