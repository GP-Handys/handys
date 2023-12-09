import { NavigationContainer } from "@react-navigation/native";
import TabBarNavigationContainer from "./components/navigation/TabBarNavigationContainer";
import OnboardingNavigationContainer from "./components/navigation/OnboardingNavigationContainer";
import { Stack } from "./components/navigation/NavigationStack";
import { firebaseConfig } from "./storage/firebase";
import { initializeApp } from "firebase/app";
import CreateShop from "./screens/Profile/CreateShop";
import { Title } from "react-native-paper";
import COLORS from "./common/colors";
import AddItem from "./screens/item/AddItem";

export default function App() {
  initializeApp(firebaseConfig);

  return (
    <AddItem/>
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="OnboardingScreensContainer">
    //     <Stack.Screen
    //       name="OnboardingScreensContainer"
    //       component={OnboardingNavigationContainer}
    //       options={{
    //         headerShown: false,
    //       }}
    //     />
    //     <Stack.Screen
    //       name="MainScreensContainer"
    //       component={TabBarNavigationContainer}
    //       options={{
    //         headerShown: false,
    //         gestureEnabled: false,
    //       }}
    //     />
    //     <Stack.Screen
    //       name="CreateShopScreen"
    //       component={CreateShop}
    //       options={{
    //         title:"Create new Shop",
    //         headerTitleStyle:{color:"white"},
    //         headerStyle:{backgroundColor:COLORS.commonBackground},
    //         headerTintColor:"white",
    //         headerTitleAlign:"center"
    //       }}

    //     />
    //   </Stack.Navigator>

      
    // </NavigationContainer>
  );
}
