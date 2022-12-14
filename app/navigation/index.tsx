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
        options={{title: 'Th??ng tin kh??ch h??ng'}}
      />
      <Stack.Screen
        name="changePassword"
        component={ChangePasswordScreen}
        options={{title: '?????i m???t kh???u'}}
      />
      <Stack.Screen
        name="forgotpassword"
        component={ForgotPasswordScreen}
        options={{title: 'Qu??n m???t kh???u'}}
      />
      <Stack.Screen
        name="InstallWaterScreen"
        component={InstallWaterScreen}
        options={{title: 'G???i y??u c???u l???p n?????c'}}
      />
      <Stack.Screen
        name="report"
        component={ReportScreen}
        options={{title: 'B??o c??o s??? c???'}}
      />
      <Stack.Screen
        name="WaterBill"
        component={WaterBillScreen}
        options={{title: 'H??a ????n ti???n n?????c'}}
      />

      <Stack.Screen
        name="WaterInvoice"
        component={WaterInvoiceScreen}
        options={({route}) => ({
          title: `H??a ????n ti???n n?????c th??ng ${route.params.month}`,
        })}
      />

      <Stack.Screen
        name="SendRequire"
        component={SendRequireScreen}
        options={{title: 'Ti???p nh???n y??u c???u'}}
      />
      <Stack.Screen
        name="ViewProcessScreen"
        component={ViewProcessScreen}
        options={{title: 'Th??? t???c c???p n?????c'}}
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
        options={{title: 'H?????ng d???n ????ng nh???p'}}
      />

      <Stack.Screen
        name="AccountViewDetail"
        component={AccountViewDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InstallWaterFamilyScreen"
        component={InstallWaterFamilyScreen}
        options={{title: '????ng k?? l???p n?????c h??? gia ????nh'}}
      />
      <Stack.Screen
        name="InstallWaterCompanyScreen"
        component={InstallWaterCompanyScreen}
        options={{title: '????ng k?? l???p n?????c c?? quan ,doanh nghi???p'}}
      />
    </Stack.Navigator>
  );
}
