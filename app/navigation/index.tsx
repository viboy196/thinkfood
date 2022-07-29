import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ColorSchemeName} from 'react-native';

import {RootStackParamList} from './types';
import LinkingConfiguration from './LinkingConfiguration';

import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import AccountScreen from '../screens/account/accountdetail';
import ChangePasswordScreen from '../screens/account/changepassword';
import AccountViewDetailScreen from '../screens/account/accountViewDetail';

import MainScreen from '../screens/main';
import {useAppSelector} from '../redux/store/hooks';
import SupportRegisterScreen from '../screens/register/supportRegister';
import ForgotPasswordScreen from '../screens/forgotpassword';
import InstallWaterScreen from '../screens/installWater';
import InstallWaterFamilyScreen from '../screens/installWater/family';
import InstallWaterCompanyScreen from '../screens/installWater/company';

import ReportScreen from '../screens/report';
import WaterBillScreen from '../screens/account/waterbill';
import SendRequireScreen from '../screens/account/send_require';
import WaterInvoiceScreen from '../screens/account/waterInvoice';
import WebViewScreen from '../screens/WebView';
import ViewProcessScreen from '../screens/ViewProcess';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const auth = useAppSelector(state => state.auth);

  return (
    <Stack.Navigator>
      {auth.token ? (
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      )}

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{title: 'Thông tin khách hàng'}}
      />
      <Stack.Screen
        name="changePassword"
        component={ChangePasswordScreen}
        options={{title: 'Đổi mật khẩu'}}
      />
      <Stack.Screen
        name="forgotpassword"
        component={ForgotPasswordScreen}
        options={{title: 'Quên mật khẩu'}}
      />
      <Stack.Screen
        name="InstallWaterScreen"
        component={InstallWaterScreen}
        options={{title: 'Gửi yêu cầu lắp nước'}}
      />
      <Stack.Screen
        name="report"
        component={ReportScreen}
        options={{title: 'Báo cáo sự cố'}}
      />
      <Stack.Screen
        name="WaterBill"
        component={WaterBillScreen}
        options={{title: 'Hóa đơn tiền nước'}}
      />

      <Stack.Screen
        name="WaterInvoice"
        component={WaterInvoiceScreen}
        options={({route}) => ({
          title: `Hóa đơn tiền nước tháng ${route.params.month}`,
        })}
      />

      <Stack.Screen
        name="SendRequire"
        component={SendRequireScreen}
        options={{title: 'Tiếp nhận yêu cầu'}}
      />
      <Stack.Screen
        name="ViewProcessScreen"
        component={ViewProcessScreen}
        options={{title: 'Thủ tục cấp nước'}}
      />

      <Stack.Screen
        name="MyWebView"
        component={WebViewScreen}
        options={({route}) => ({
          title: `${route.params.title}`,
        })}
      />

      <Stack.Screen
        name="supportRegister"
        component={SupportRegisterScreen}
        options={{title: 'Hướng dẫn đăng nhập'}}
      />

      <Stack.Screen
        name="AccountViewDetail"
        component={AccountViewDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InstallWaterFamilyScreen"
        component={InstallWaterFamilyScreen}
        options={{title: 'Đăng ký lắp nước hộ gia đình'}}
      />
      <Stack.Screen
        name="InstallWaterCompanyScreen"
        component={InstallWaterCompanyScreen}
        options={{title: 'Đăng ký lắp nước cơ quan ,doanh nghiệp'}}
      />
    </Stack.Navigator>
  );
}
