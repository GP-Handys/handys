import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { User } from "../../models/User";
import { Category } from "../../models/Category";

export type StackParamList = {
  Landing: undefined;
  SignIn: undefined;
  SignUp: undefined;
  MainScreensContainer: undefined;
  OnboardingScreensContainer: undefined;
  SendTicketScreen: undefined;
  DoneScreen: undefined;
  Profile: undefined;
  CreateShopScreen: undefined;
  ShopScreen: { shopId: number; shopName: string };
  AddItemScreen: { shopId: number };
  EditProfile: undefined;
  CategoryItemsScreen:{category:Category}

};

export const Stack = createNativeStackNavigator<StackParamList>();

export type StackProps = NativeStackScreenProps<StackParamList>;
