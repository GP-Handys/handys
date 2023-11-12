import Landing from "../../screens/onboarding/landing";
import SignIn from "../../screens/onboarding/signin";
import SignUp from "../../screens/onboarding/signup";
import COLORS from "../../common/colors";
import { Stack } from "./NavigationStack";

export default function OnboardingNavigationContainer() {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          headerTintColor: "white",
          title: "",
          headerStyle: {
            backgroundColor: COLORS.commonBackground,
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerTintColor: "white",
          title: "",
          headerStyle: {
            backgroundColor: COLORS.commonBackground,
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  );
}
