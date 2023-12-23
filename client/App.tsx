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
import ShopScreen from "./screens/shop/ShopScreen";
import Comments from "./screens/community/Comments";
import AddItem from "./screens/item/AddItem";
import EditProfile from "./screens/profile/EditProfile";
import CategoryItemsScreen from "./screens/category/CategoryItemsScreen";

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
          }}/>
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: "Edit profile",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: COLORS.commonBackground },
            headerTintColor: "white",
            headerTitleAlign: "center",
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
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
