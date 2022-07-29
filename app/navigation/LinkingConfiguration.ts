/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import {LinkingOptions} from '@react-navigation/native';

import {RootStackParamList} from './types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['mychat://'],
  config: {
    screens: {
      WelCome: 'WelCome',
      Login: 'Login',
      Register: 'Register',
      Account: 'Account',
      changePassword: 'ChangePassword',
      AccountViewDetail: 'AccountViewDetail',
      supportRegister: 'supportRegister',
      forgotpassword: 'forgotpassword',
      InstallWaterScreen: 'InstallWaterScreen',
      report: 'report',
      WaterBill: 'WaterBill',
      SendRequire: 'SendRequire',
      WaterInvoice: 'WaterInvoice',
      MyWebView: 'MyWebView',
      ViewProcessScreen: 'ViewProcessScreen',
      InstallWaterFamilyScreen: 'InstallWaterFamilyScreen',
      InstallWaterCompanyScreen: 'InstallWaterCompanyScreen',
      Main: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },

          TabThree: {
            screens: {
              TabTwoScreen: 'three',
            },
          },

          TabFour: {
            screens: {
              TabFour: 'four',
            },
          },
        },
      },
    },
  },
};

export default linking;
