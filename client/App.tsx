import { NavigationContainer } from "@react-navigation/native";
import TabBarNavigationContainer from "./components/navigation/TabBarNavigationContainer";
import OnboardingNavigationContainer from "./components/navigation/OnboardingNavigationContainer";
import { Stack } from "./components/navigation/NavigationStack";

export default function App() {
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
          gestureEnabled: false
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}