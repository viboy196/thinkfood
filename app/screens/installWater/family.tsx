import React, {useCallback, useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, TextInput} from 'react-native';
import {Text, View} from '../../components/Themed';
import layout from '../../constants/Layout';
import {tintColorLight} from '../../constants/Colors';
import {Button} from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import ApiRequest from '../../utils/api/Main/ApiRequest';
import Spinner from 'react-native-loading-spinner-overlay/lib';

export default function FamilyScreen() {
  const tag = 'FamilyScreen';
  const [textFullName, setTextFullName] = useState<string>();

  const [textIdentification, setTextIdentification] = useState<string>();

  const [textIdentificationDate, setTextIdentificationDate] =
    useState<string>();

  const [textPhoneNumber, setTextPhoneNumber] = useState<string>();

  // const [textPhoneMessage, setTextPhoneMessage] = useState<string>();

  const [textEmail, setTextEmail] = useState<string>();

  const [textAddress, setTextAddress] = useState<string>();

  const [provinceId, setProvinceId] = useState<string>();
  const [listProvince, setListProvince] = useState<Array<any>>();

  const [districtId, setDistrictId] = useState<string>();
  const [listDistrict, setListDistrict] = useState<Array<any>>();

  const [wardId, setWardId] = useState<string>();
  const [listWard, setListWard] = useState<Array<any>>();

  const [waterFactoryId, setWaterFactoryId] = useState<string>();
  const [listWaterFactory, setListWaterFactory] = useState<Array<any>>();

  const [textReson, setTextReson] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const getDistrictByProvinceId = async (_provinceId: string) => {
    ApiRequest.GetDistrictByProvinceId({provinceId: _provinceId})
      .then(data => {
        setListDistrict(data.result.data);
        console.log(`${tag} get detail success`);
        setDistrictId('');
        setLoading(false);
      })
      .catch(() => {
        Alert.alert('Lỗi', 'Tải tỉnh/tp bị lỗi');
      });
  };
  const getWardByDistrictId = async (_districtId: string) => {
    ApiRequest.GetWardByDistrictId({districtId: _districtId})
      .then(data => {
        setListWard(data.result.data);
        console.log(`${tag} get detail success`);
        setWardId('');
        setLoading(false);
      })
      .catch(() => {
        Alert.alert('Lỗi', 'Tải tỉnh/tp bị lỗi');
      });
  };
  useEffect(() => {
    ApiRequest.GetProvinceAll()
      .then(data => {
        setListProvince(data.result.data);
        console.log(`${tag} get detail success`);
        setProvinceId('');
        setLoading(false);
      })
      .catch(() => {
        Alert.alert('Lỗi', 'Tải tỉnh/tp bị lỗi');
      });
    ApiRequest.GetWaterFactoryAll()
      .then(data => {
        setListWaterFactory(data.result.data);
        console.log(`${tag} get detail success`);
        setProvinceId('');
        setLoading(false);
      })
      .catch(() => {
        Alert.alert('Lỗi', 'Tải tỉnh/tp bị lỗi');
      });
  }, []);
  const UseWaterRegister = useCallback(() => {
    if (textFullName === undefined || textFullName === '') {
      Alert.alert('Trường Tên khách hàng ko được để trống');
    }
    if (waterFactoryId === undefined || waterFactoryId === '') {
      Alert.alert('Chọn nhà máy nước sử dụng');
    }
    setLoading(true);
    ApiRequest.PostUseWaterRegisterAdd({
      name: textFullName,
      identification: textIdentification,
      mobilePhone: textPhoneNumber,
      email: textEmail,
      address: textAddress,
      provinceId,
      districtId,
      wardId,
      reson: textReson,
      waterFactoryId,
      unitTypeId: 'Individual',
    })
      .then(data => {
        if (data.code === '00') {
          Alert.alert('Thông báo', 'Gửi Đăng ký thành công');
        } else {
          Alert.alert('Thông báo', data.errorMessage);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        Alert.alert('Lỗi', 'có lỗi sảy ra');
      });
  }, [
    districtId,
    provinceId,
    textAddress,
    textEmail,
    textFullName,
    textIdentification,
    textPhoneNumber,
    textReson,
    wardId,
    waterFactoryId,
  ]);
  return (
    <View style={{flex: 1}}>
      {loading && (
        <Spinner
          visible={true}
          textContent={'Loading ...'}
          textStyle={{color: '#fff', fontSize: 20}}
        />
      )}
      <ScrollView>
        <View style={{margin: 10}}>
          <Text
            style={{color: tintColorLight, fontWeight: 'bold', fontSize: 18}}>
            1. Thông tin đăng ký
          </Text>
          {/* tên khách hàng */}
          <View style={{width: layout.window.width - 20}}>
            <Text style={{marginVertical: 5}}>Tên chủ hộ,chủ sở hữu nhà</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{width: '100%'}}
                placeholder={'TÊN KHÁCH HÀNG'}
                onChangeText={setTextFullName}
                value={textFullName}
              />
            </View>
          </View>
          {/* căn cước công dân */}
          <View style={{width: layout.window.width - 20, flexDirection: 'row'}}>
            <View style={{flex: 3, marginRight: 5}}>
              <Text style={{marginVertical: 5}}>CCCD/CMTND(*)</Text>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: '#e3e3e3',
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                }}>
                <TextInput
                  style={{width: '100%'}}
                  keyboardType={'numeric'}
                  placeholder={'Số CCCD/CMTND'}
                  onChangeText={setTextIdentification}
                  value={textIdentification}
                />
              </View>
            </View>
            <View style={{flex: 2, marginLeft: 5}}>
              <Text style={{marginVertical: 5}}>Ngày cấp</Text>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: '#e3e3e3',
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                }}>
                <TextInput
                  style={{width: '100%'}}
                  keyboardType="default"
                  placeholder={'Ngày Cấp'}
                  onChangeText={setTextIdentificationDate}
                  value={textIdentificationDate}
                />
              </View>
            </View>
          </View>
          {/* điện thoại */}
          <View style={{width: layout.window.width - 20, flexDirection: 'row'}}>
            <View style={{flex: 3, marginRight: 5}}>
              <Text style={{marginVertical: 5}}>Điện thoại(*)</Text>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: '#e3e3e3',
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                }}>
                <TextInput
                  style={{width: '100%'}}
                  placeholder={'ĐT liên hệ'}
                  keyboardType={'numeric'}
                  onChangeText={setTextPhoneNumber}
                  value={textPhoneNumber}
                />
              </View>
            </View>
          </View>
          {/* địa chỉ email  */}
          <View style={{width: layout.window.width - 20}}>
            <Text style={{marginVertical: 5}}>Địa chỉ email</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{width: '100%'}}
                placeholder={'nhập địa chỉ email'}
                keyboardType={'email-address'}
                onChangeText={setTextEmail}
                value={textEmail}
              />
            </View>
          </View>
          {/* địa chir lắp đặt */}
          <View style={{width: layout.window.width - 20}}>
            <Text style={{marginVertical: 5}}>Địa chỉ Lắp đặt</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{width: '100%'}}
                placeholder={'Nhập số nhà , ngõ ngách , tên đường , thôn , phố'}
                onChangeText={setTextAddress}
                value={textAddress}
              />
            </View>
            <Picker
              style={styles.viewInput}
              placeholder="chọn tỉnh/thành phố"
              selectedValue={provinceId}
              onValueChange={(itemValue, itemIndex) => {
                if (provinceId !== itemValue) {
                  setProvinceId(itemValue);
                  console.log(itemIndex);
                  setLoading(true);
                  getDistrictByProvinceId(itemValue);
                }
              }}>
              <Picker.Item label={'chọn tỉnh/thành phố'} value={undefined} />
              {listProvince?.map(item => (
                <Picker.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Picker>
            <Picker
              style={styles.viewInput}
              placeholder="chọn Quận/Huyện"
              selectedValue={districtId}
              onValueChange={(itemValue, itemIndex) => {
                if (districtId !== itemValue) {
                  setDistrictId(itemValue);
                  console.log(itemIndex);
                  setLoading(true);
                  getWardByDistrictId(itemValue);
                }
              }}>
              <Picker.Item label={'Chọn Quận/Huyện'} value={undefined} />
              {listDistrict?.map(item => (
                <Picker.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Picker>
            <Picker
              style={styles.viewInput}
              placeholder="chọn phường/xã"
              selectedValue={wardId}
              onValueChange={(itemValue, itemIndex) => {
                setWardId(itemValue);
                console.log(itemIndex);
              }}>
              <Picker.Item label={'Chọn Phường/xã'} value={undefined} />
              {listWard?.map(item => (
                <Picker.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Picker>
          </View>
          {/* mục đích sử dụng  */}
          <View style={{width: layout.window.width - 20}}>
            <Text style={{marginVertical: 5}}>Mục đích sử dụng</Text>
            <View style={styles.viewInput}>
              <TextInput
                style={{width: '100%'}}
                placeholder={'Nhập mục đích sử dụng'}
                onChangeText={setTextReson}
                value={textReson}
              />
            </View>
          </View>
          {/* nhà máy nước sử dụng */}
          <View style={{width: layout.window.width - 20}}>
            <Text style={{marginVertical: 5}}>Nhà máy nước sử dụng</Text>
            <Picker
              style={styles.viewInput}
              placeholder="chọn nhà máy nước"
              selectedValue={waterFactoryId}
              onValueChange={(itemValue, itemIndex) => {
                if (waterFactoryId !== itemValue) {
                  setWaterFactoryId(itemValue);
                  console.log(itemIndex);
                }
              }}>
              <Picker.Item label={'chọn nhà máy nước'} value={undefined} />
              {listWaterFactory?.map(item => (
                <Picker.Item label={item.name} value={item.id} key={item.id} />
              ))}
            </Picker>
          </View>
          <Button
            style={{
              marginTop: 5,
              borderRadius: 10,
              backgroundColor: tintColorLight,
            }}
            mode="contained"
            onPress={UseWaterRegister}>
            Gửi Đăng ký
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewInput: {
    borderRadius: 10,
    backgroundColor: '#e3e3e3',
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginVertical: 2,
  },
});
