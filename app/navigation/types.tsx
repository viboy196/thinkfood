/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
// import {NotificationsType} from './redux/features/notification/NotificationSlice';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  WelCome: undefined;
  Login: undefined;
  Register: undefined;
  Main: NavigatorScreenParams<RootTabParamList> | undefined;
  Account: undefined;
  changePassword: undefined;
  AccountViewDetail: {waterUserId: string; name: string; address: string};
  supportRegister: undefined;
  forgotpassword: undefined;
  InstallWaterScreen: undefined;

  InstallWaterFamilyScreen: undefined;

  InstallWaterCompanyScreen: undefined;

  report: undefined;
  WaterBill: {waterUserId: string; name: string};
  SendRequire: undefined;
  WaterInvoice: {
    waterUserId: string;
    name: string;
    year: string;
    month: string;
  };
  MyWebView: {title: string; url: string};
  ViewProcessScreen: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
  TabFour: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
