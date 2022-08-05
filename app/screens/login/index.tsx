import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {Checkbox} from 'react-native-paper';
import Button from '../../components/items/Button';
import Input from '../../components/items/InputForm';
import {View, Text} from '../../components/Themed';
import {tintColorLight} from '../../constants/Colors';
import Layout from '../../constants/Layout';
import {RootStackScreenProps} from '../../navigation/types';
import {
  loginAsync,
  logOut,
  setStateAuthRemember,
} from '../../redux/features/auth/authSlices';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {validatePassword, validatePhoneNumber} from '../../utils/validate';

export default function Login({}: RootStackScreenProps<'Login'>) {
  const {loading, errorMessage, checkedAuth, userName, password} =
    useAppSelector(state => state.auth);
  console.log(errorMessage);

  const dispatch = useAppDispatch();
  const [textPhone, setTextPhone] = useState<string>();
  const [textPassword, setTextPassword] = useState<string>();
  const [checked, setChecked] = React.useState(false);
  useEffect(() => {
    if (checkedAuth && userName && password) {
      setTextPhone(userName);
      setTextPassword(password);
      setChecked(checkedAuth);
    }
  }, [checkedAuth, password, userName]);

  if (errorMessage && loading !== 'idle') {
    Alert.alert('lỗi', errorMessage);
    dispatch(logOut());
  }
  // const handlePressOpenUrl = useCallback(async () => {
  //   // Checking if the link is supported for links with custom URL scheme.
  //   const supportedURL = 'http://dichvunuoc.vn/show/dvn_mobile_policy';

  //   navigation.navigate('MyWebView', {
  //     title: 'Chính sách quy định',
  //     url: supportedURL,
  //   });
  // }, [navigation]);
  // const onShare = async () => {
  //   try {
  //     const result = await Share.share({
  //       message: 'dịch vụ nước , chăm sóc khách hàng',
  //     });
  //     if (result.action === Share.sharedAction) {
  //       if (result.activityType) {
  //         // shared with activity type of result.activityType
  //       } else {
  //         // shared
  //       }
  //     } else if (result.action === Share.dismissedAction) {
  //       // dismissed
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <View style={styles.container}>
      {loading === 'pending' && (
        <Spinner
          visible={true}
          textContent={'Đăng Nhập ...'}
          textStyle={styles.spinnerTextStyle}
        />
      )}
      <ScrollView style={styles.container}>
        <ImageBackground
          source={require('../../assets/images/thinkfoodbg.png')}
          resizeMode="cover"
          style={styles.backgroundImage}>
          <View style={styles.header}>
            <View style={{flex: 1}} />
            <Image
              source={require('../../assets/images/thinkfoodlogo.png')}
              resizeMode="cover"
              style={styles.logoImage}
            />
            <Text style={styles.logoText}>
              {' '}
              Gặp lại hương vị cũ - Tìm về kỷ niệm xưa.{' '}
            </Text>
          </View>
          <View style={styles.body}>
            <View style={styles.fromInput}>
              <Input
                title={'Số điện thoại'}
                value={textPhone}
                keyboardType={'numeric'}
                onChangeInput={(text: string) => {
                  console.log(text);
                  setTextPhone(text);
                }}
                icon="phone"
                color={tintColorLight}
                errorMessages={
                  validatePhoneNumber(textPhone)
                    ? undefined
                    : 'Số điện thoại không hợp lệ'
                }
              />
              <Input
                title={'Mật khẩu'}
                value={textPassword}
                keyboardType={'visible-password'}
                onChangeInput={(text: string) => {
                  console.log(text);
                  setTextPassword(text);
                }}
                icon="key"
                color={tintColorLight}
                secureTextEntry={true}
                errorMessages={
                  validatePassword(textPassword)
                    ? undefined
                    : 'mật khẩu phải nhiều hơn 6 kí tự có chữ cái'
                }
              />
            </View>
            <View style={styles.viewInfo}>
              <View style={styles.viewTextInfo}>
                <Checkbox
                  status={checked ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                  color={tintColorLight}
                  uncheckedColor={tintColorLight}
                />
                <Text style={styles.textInfoCheckBox}>Nhớ thông tin</Text>
              </View>
              <View style={styles.empty} />
              {/* <TouchableOpacity
                style={styles.viewTextInfo}
                onPress={handlePressOpenUrl}>
                <Text style={styles.textInfo}>Chính sách và quy định</Text>
              </TouchableOpacity> */}
            </View>
            <View style={styles.btnLoginViewBorder}>
              <TouchableOpacity
                style={styles.btnLoginView}
                onPress={() => {
                  if (
                    textPhone &&
                    textPassword &&
                    validatePhoneNumber(textPhone) &&
                    validatePassword(textPassword)
                  ) {
                    // dispatch(
                    //   setStateAuthRemember({
                    //     input: {
                    //       loading: 'idle',
                    //       checkedAuth: checked,
                    //       userName: textPhone,
                    //       password: textPassword,
                    //     },
                    //   }),
                    // );

                    Alert.alert('thông báo ', 'Đang phát triển');
                    // dispatch(
                    //   loginAsync({phone: textPhone, password: textPassword}),
                    // );
                  }
                }}>
                <Text style={styles.btnLoginText}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1, alignItems: 'center', padding: 15}}>
              <Button
                iconName="facebook"
                BackgroundColor="rgba(0, 132, 255,0.8)"
                onPress={() => {
                  Linking.openURL('https://www.facebook.com/thinkfood.vn');
                }}
              />
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <Text style={{color: tintColorLight}}>© Thinkfood 2022 </Text>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  backgroundImage: {
    width: Layout.window.width,

    height: Layout.window.height,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  empty: {flex: 1},
  header: {
    flex: 3,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  logoImage: {width: 150, height: 150},
  logoText: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    textShadowColor: '#3e3e3e',
  },
  body: {
    flex: 5,
    width: '100%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  fromInput: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  viewInfo: {
    flexDirection: 'row',
    marginLeft: 12,
    marginBottom: 10,
  },
  textInfo: {
    color: tintColorLight,
    fontWeight: '700',
  },
  textInfoCheckBox: {
    color: tintColorLight,
  },
  btnLoginViewBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 5,
  },
  btnLoginView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tintColorLight,
    width: '80%',
    height: 50,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  btnLoginText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  viewTextInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  viewButtonInfo: {
    flexDirection: 'row',
    width: '100%',
    height: 120,
  },
  viewButtonItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewButtonItemText: {
    marginTop: 5,
    height: 30,
    alignItems: 'center',
  },
});
