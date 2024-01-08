import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Category } from "../../models/Category";
import { PostModel } from "../../models/Post";
import { Item } from "../../models/Item";
import { User } from "../../models/User";
import { Shop } from "../../models/Shop";

export type StackParamList = {
  home:undefined;
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
  Comments: { post: PostModel; isLiked: boolean };
  AddItemScreen: { shopId: number };
  EditProfile: {user:User}
  ItemScreen: {item: Item, favorite: boolean};
  AddCustomization: undefined;
  CategoryItemsScreen: { category: Category };
  WishlistScreen: undefined;
  MyPostsScreen: undefined;

  Cart:undefined;
  Map: undefined;
  AddressScreen:{governorate: any , street: any};
  CardDetails:undefined;
  PlaceOrder:undefined;
  DonePlaceOrder:undefined;

  EditItemScreen: { item: Item, shopId: number };
  ShopSettingsScreen: {shop: Shop}
  Cart:undefined;
  Map: { totalAmount: number};
  AddressScreen:{governorate: any , street: any, totalAmount: number};
  DonePlaceOrder:undefined;
  AiPromptScreen: undefined;
  GeneratedImageScreen: {prompt: string}
};

export const Stack = createNativeStackNavigator<StackParamList>();

export type StackProps = NativeStackScreenProps<StackParamList>;
