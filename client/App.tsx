import { NavigationContainer } from "@react-navigation/native";
import TabBarNavigationContainer from "./components/navigation/TabBarNavigationContainer";
import OnboardingNavigationContainer from "./components/navigation/OnboardingNavigationContainer";
import { Stack } from "./components/navigation/NavigationStack";
import { firebaseConfig } from "./storage/firebase";
import { initializeApp } from "firebase/app";
import SendTicketScreen from "./screens/support/SendTicket";
import DoneScreen from "./screens/support/Done";
import COLORS from "./common/colors";
import CreateShop from "./screens/shop/CreateShop";
import ShopScreen from "./screens/shop/Shop";
import Comments from "./screens/community/Comments";
import AddItem from "./screens/item/AddItem";
import EditProfile from "./screens/profile/EditProfile";
import CategoryItemsScreen from "./screens/category/CategoryItemsScreen";
import WishlistScreen from "./screens/profile/Wishlist";
import ItemScreen from "./screens/item/Item";
import MyPostsScreen from "./screens/community/MyPosts";
import EditItemScreen from "./screens/item/EditItem";
import ShopSettingsScreen from "./screens/shop/Settings";

import Map from './screens/checkout/map';
import AddressScreen from './screens/checkout/addressScreen'
export default function App() {
  initializeApp(firebaseConfig);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardingScreensContainer">
        <Stack.Screen
          name="OnboardingScreensContainer"
          component={OnboardingNavigationContainer}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainScreensContainer"
          component={TabBarNavigationContainer}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="SendTicketScreen"
          component={SendTicketScreen}
          options={{
            title: "Send Ticket",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: COLORS.commonBackground },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="DoneScreen"
          component={DoneScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="CreateShopScreen"
          component={CreateShop}
          options={{
            title: "Create Shop",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: COLORS.commonBackground },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="ShopScreen"
          component={ShopScreen}
          options={({ route }) => ({
            title: route.params.shopName,
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: COLORS.commonBackground },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          })}
        />
        <Stack.Screen
          name="Comments"
          component={Comments}
          options={{
            title: "Comments",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: COLORS.commonBackground },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="AddItemScreen"
          component={AddItem}
          options={{
            title: "Add Item",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: COLORS.commonBackground },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: "Edit profile",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: COLORS.commonBackground },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="CategoryItemsScreen"
          component={CategoryItemsScreen}
          options={({ route }) => ({
            title: route.params.category.category_name,
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: COLORS.commonBackground },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          })}
        />
        <Stack.Screen
          name="WishlistScreen"
          component={WishlistScreen}
          options={{
            title: "Wishlist",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: COLORS.commonBackground },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="ItemScreen"
          component={ItemScreen}
          options={({ route }) => ({
            title: route.params.item.name,
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: COLORS.commonBackground },
            headerTintColor: "white",
            headerTitleAlign: "center",
          })}
        />
        <Stack.Screen
          name="MyPostsScreen"
          component={MyPostsScreen}
          options={{
            title: "My Posts",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: COLORS.commonBackground },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="EditItemScreen"
          component={EditItemScreen}
          options={{
            title: "Edit Item",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: COLORS.commonBackground },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="ShopSettingsScreen"
          component={ShopSettingsScreen}
          options={{
            title: "Shop Settings",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: COLORS.commonBackground },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerBackTitleVisible: false,
          }}
        />
        <Stack.Screen
          name="Map"
          component={Map}
          options={{
            title: "Select Location",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: COLORS.commonBackground },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Address"
          component={AddressScreen}
          options={{
            title: "Address",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: COLORS.commonBackground },
            headerTintColor: "white",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
