import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { PostModel } from "../../models/Post";

export type StackParamList = {
  Landing: undefined;
  SignIn: undefined;
  SignUp: undefined;
  MainScreensContainer: undefined;
  OnboardingScreensContainer: undefined;
  SendTicketScreen:undefined;
  DoneScreen: undefined;
  Profile: undefined;
  CreateShopScreen: undefined;
  ShopScreen: {shopId: number, shopName: string};
  Comments: {post: PostModel}
};

export const Stack = createNativeStackNavigator<StackParamList>();

export type StackProps = NativeStackScreenProps<StackParamList>;
