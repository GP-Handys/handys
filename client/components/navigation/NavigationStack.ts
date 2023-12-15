import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";

export type StackParamList = {
  Landing: undefined;
  SignIn: undefined;
  SignUp: undefined;
  MainScreensContainer: undefined;
  OnboardingScreensContainer: undefined;
  SendTicket:undefined;
  DoneScreen: undefined;
};

export const Stack = createNativeStackNavigator<StackParamList>();

export type StackProps = NativeStackScreenProps<StackParamList>;