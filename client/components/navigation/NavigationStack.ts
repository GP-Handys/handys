import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Category } from "../../models/Category";
import { PostModel } from "../../models/Post";
import { Item } from "../../models/Item";

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
  ShopScreen: { shopId: number | undefined; shopName: string | undefined };
  Comments: {post: PostModel}
  AddItemScreen: { shopId: number };
  EditProfile: undefined
  ItemScreen: {item: Item, favorite: boolean};
  AddCustomization: undefined;
  CategoryItemsScreen:{category:Category}
  WishlistScreen:undefined
};

export const Stack = createNativeStackNavigator<StackParamList>();

export type StackProps = NativeStackScreenProps<StackParamList>;
