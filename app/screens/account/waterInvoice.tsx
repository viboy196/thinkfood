import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {DataTable} from 'react-native-paper';
import {View, Text} from '../../components/Themed';
import {tintColorLight} from '../../constants/Colors';
import {RootStackScreenProps} from '../../navigation/types';
import {logOut} from '../../redux/features/auth/authSlices';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import ApiRequest from '../../utils/api/Main/ApiRequest';

export default function WaterInvoice({
  route,
  navigation,
}: RootStackScreenProps<'WaterInvoice'>) {
  const {token} = useAppSelector(state => state.auth);

  const [detailUser, setDetailUser] = useState<any>({});

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      ApiRequest.WaterInvoiceDetailByWaterUserYearMonth(
        token,
        route.params.waterUserId,
        route.params.year,
        route.params.month,
      )
        .then(data => {
          console.log('data', data.result.data);
          if (data.result.data == null) {
            navigation.goBack();
            Alert.alert('thông báo ', 'hóa đơn nước chưa được tạo');
          } else {
            setDetailUser(data.result.data);
          }
        })
        .catch(() => {
          dispatch(logOut());
        });
    }
  }, [
    dispatch,
    navigation,
    route.params.month,
    route.params.waterUserId,
    route.params.year,
    token,
  ]);
  if (detailUser === undefined) {
    return (
      <View>
        <Text>chưa có hóa đơn</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            marginVertical: 10,
            borderBottomColor: '#e3e3e3',
            borderBottomWidth: 3,
          }}>
          <Text>
            Hóa đơn tháng {detailUser.month}/{detailUser.year}
          </Text>
          <Text>số hóa đơn : {detailUser.codeString}</Text>
          <Text>Hộ sử dụng : {route.params.name}</Text>
          <Text>chỉ số đo đồng hồ :{detailUser.waterMeterNumber}</Text>
          <Text>chỉ số trước đó : {detailUser.waterMeterNumberLast}</Text>

          <Text>tiêu thụ : {detailUser.amount} m³</Text>

          <View>
            <Text>thông tin chi tiết</Text>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>{''}</DataTable.Title>
                <DataTable.Title>SL(m³)</DataTable.Title>
                <DataTable.Title>Đơn giá (đ)</DataTable.Title>
                <DataTable.Title numeric>Thành tiền (đ)</DataTable.Title>
              </DataTable.Header>

              <DataTable.Row>
                <DataTable.Cell>{''}</DataTable.Cell>
                <DataTable.Cell>{detailUser.amount}</DataTable.Cell>
                <DataTable.Cell>{''}</DataTable.Cell>
                <DataTable.Cell>{''}</DataTable.Cell>
              </DataTable.Row>
              <FlatList
                data={detailUser.waterInvoiceRows}
                renderItem={({item}) => (
                  <DataTable.Row>
                    <DataTable.Cell>{item.name}</DataTable.Cell>
                    <DataTable.Cell>{item.amount}</DataTable.Cell>
                    <DataTable.Cell>{item.price}</DataTable.Cell>

                    <DataTable.Cell numeric>
                      {item.price * item.amount}
                    </DataTable.Cell>
                  </DataTable.Row>
                )}
              />
              <DataTable.Row>
                <DataTable.Cell>Cộng tiền nước</DataTable.Cell>
                <DataTable.Cell>{''}</DataTable.Cell>

                <DataTable.Cell numeric>{detailUser.useTotal}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Thuế GTGT (5%)</DataTable.Cell>
                <DataTable.Cell>{''}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {(detailUser.useTotal * 0.05).toFixed(0)}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Phí BVMT (10%)</DataTable.Cell>
                <DataTable.Cell>{''}</DataTable.Cell>
                <DataTable.Cell numeric>
                  {(detailUser.useTotal * 0.1).toFixed(0)}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Tổng cộng</DataTable.Cell>
                <DataTable.Cell>{''}</DataTable.Cell>
                <DataTable.Cell numeric>{detailUser.total}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Tiền thanh toán</DataTable.Cell>
                <DataTable.Cell>{''}</DataTable.Cell>
                <DataTable.Cell numeric>{detailUser.total}</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
            <View style={{flexDirection: 'row', margin: 10}}>
              <Text>Trạng thái :</Text>
              <View style={{flex: 1}} />
              {detailUser.status === 'Unpaid' && <Text>Chưa thanh toán</Text>}
            </View>
          </View>
          {detailUser.status === 'Unpaid' && (
            <View style={styles.btnLoginViewBorder}>
              <TouchableOpacity
                style={styles.btnLoginView}
                onPress={() => {
                  Alert.alert(
                    `thông báo thanh toán Hóa đơn ${detailUser.month}/${detailUser.year}`,
                    'tính năng thanh toán đang phát triển',
                  );
                }}>
                <Text style={styles.btnLoginText}>Thanh toán</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
// function numberWithCommas(x: number): string {
//   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// }
// const datetoString = (str: string) => {
//   const arr = str.split('T');
//   const strarr = arr[0].split('-');
//   console.log(strarr);

//   return `${strarr[2]}/${strarr[1]}`;
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  empty: {flex: 1},
  header: {
    flex: 2,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  logoImage: {width: 100, height: 100},
  logoText: {
    marginTop: 5,
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    textShadowColor: '#3e3e3e',
  },
  body: {
    flex: 5,
    backgroundColor: '#fff',
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
  },
  btnLoginText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  viewTextInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  viewButtonInfo: {
    margin: 20,
    flexDirection: 'row',
    width: '100%',
    flex: 1,
  },
  viewButtonItem: {
    flex: 1,
    height: 210,
    justifyContent: 'center',
  },
  viewButtonItemText: {
    marginTop: 5,
    height: 30,
  },
});
