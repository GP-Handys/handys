import { NavigationContainer } from "@react-navigation/native";
import TabBarNavigationContainer from "./components/navigation/TabBarNavigationContainer";
import OnboardingNavigationContainer from "./components/navigation/OnboardingNavigationContainer";
import { Stack } from "./components/navigation/NavigationStack";
import { firebaseConfig } from "./storage/firebase";
import { initializeApp } from "firebase/app";
import SendTicketScreen from "./screens/SupportScreens/SendTicketScreen";
import DoneScreen from "./screens/SupportScreens/DoneScreen";
import COLORS from "./common/colors";
export default function App() {
  initializeApp(firebaseConfig);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardingScreensContainer">
        <Stack.Screen
          name="OnboardingScreensContainer"
          component={OnboardingNavigationContainer}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="MainScreensContainer"
          component={TabBarNavigationContainer}
          options={{
            headerShown: false,
            gestureEnabled: false
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
            headerTitleAlign: "center"
          }}
        />
        <Stack.Screen
          name="DoneScreen"
          component={DoneScreen}
          options={{
            title: "Done!",
            headerTitleStyle: { color: "white" },
            headerStyle: { backgroundColor: COLORS.commonBackground },
            headerTintColor: "white",
            headerTitleAlign: "center"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
