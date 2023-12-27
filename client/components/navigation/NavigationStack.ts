import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { User } from "../../models/User";
import { Category } from "../../models/Category";
import { PostModel } from "../../models/Post";

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
  Comments: {post: PostModel}
  AddItemScreen: { shopId: number };
  EditProfile: undefined
  ItemScreen: undefined;
  AddCustomization: undefined;
  CategoryItemsScreen:{category:Category}
  WishlistScreen:undefined
};

export const Stack = createNativeStackNavigator<StackParamList>();

export type StackProps = NativeStackScreenProps<StackParamList>;
