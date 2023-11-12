import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type StackParamList = {
  Landing: undefined;
  SignIn: undefined;
  SignUp: undefined;
  MainScreensContainer: undefined;
  OnboardingScreensContainer: undefined;
};

export const Stack = createNativeStackNavigator<StackParamList>();