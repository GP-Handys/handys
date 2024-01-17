import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "../../screens/mainscreens/home";
import Search from "../../screens/mainscreens/search";
import Community from "../../screens/mainscreens/community";
import Cart from "../../screens/mainscreens/cart";
import Profile from "../../screens/mainscreens/profile";
import COLORS from "../../common/colors";

const Tab = createBottomTabNavigator();

export default function TabBarNavigationContainer() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#7C7459",
          borderTopWidth: 0,
        },
        headerStyle: {
          backgroundColor: COLORS.CTAButtonBackground,
        },
        tabBarShowLabel: false,
        headerShadowVisible: false,
        headerTintColor: "white",
        headerTitleAlign: "center",
        tabBarIcon: ({ focused }) => {
          let iconName:
            | keyof typeof MaterialCommunityIcons.glyphMap
            | undefined;
          let color = focused ? COLORS.tabNavIconFocused : "white";
          let rn = route.name;

          if (rn === "Home") {
            iconName = "home-outline";
          } else if (rn === "Search") {
            iconName = "magnify";
          } else if (rn === "Community") {
            iconName = "account-group-outline";
          } else if (rn === "Cart") {
            iconName = "cart-outline";
          } else if (rn === "Profile") {
            iconName = "account-outline";
          }
          return (
            <MaterialCommunityIcons name={iconName} color={color} size={23} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Community" component={Community} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
