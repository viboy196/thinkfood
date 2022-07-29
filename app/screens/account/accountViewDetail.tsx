import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {tintColorLight} from '../../constants/Colors';
import {RootStackScreenProps} from '../../navigation/types';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import ApiRequest from '../../utils/api/Main/ApiRequest';
import {logOut} from '../../redux/features/auth/authSlices';
import {Menu, Divider, Provider} from 'react-native-paper';
import Layout from '../../constants/Layout';
export default function AccountViewDetail({
  navigation,
  route,
}: RootStackScreenProps<'AccountViewDetail'>) {
  const tag = 'AccountViewDetail';
  const {token} = useAppSelector(state => state.auth);

  const [detailUser, setDetailUser] = useState<Array<any>>([]);
  console.log(detailUser.length);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      ApiRequest.WaterIndexAllByWateruser(token, route.params.waterUserId)
        .then(data => {
          setDetailUser(data.result.data);
          console.log(`${tag} get detail success`);
        })
        .catch(() => {
          dispatch(logOut());
        });
    }
  }, [dispatch, route.params.waterUserId, token]);
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);
  return (
    <View style={styles.container}>
      <Provider>
        <View style={styles.header}>
          <View style={styles.avatarView}>
            <Image
              source={require('../../assets/images/default-avatar.png')}
              resizeMode="cover"
              style={styles.avatarImage}
            />
          </View>
          <View style={{paddingLeft: 10, flex: 1}}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
                color: '#fff',
              }}>
              {route.params.name}
            </Text>

            <Text
              style={{
                fontSize: 14,
                fontWeight: '700',
                color: '#fff',
              }}>
              Địa chỉ : {route.params.address}
            </Text>
          </View>

          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
              <TouchableOpacity onPress={openMenu}>
                <View
                  style={{
                    width: 60,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../assets/images/search/menu.png')}
                    resizeMode="cover"
                    style={{width: 30, height: 30, tintColor: '#fff'}}
                  />
                </View>
              </TouchableOpacity>
            }>
            <Menu.Item
              onPress={() => {
                navigation.navigate('Account');
                closeMenu();
              }}
              title="Thông tin cá nhân"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                closeMenu();
                navigation.navigate('WaterBill', {
                  waterUserId: route.params.waterUserId,
                  name: route.params.name,
                });
              }}
              title="Lịch sử hóa đơn"
            />
            <Menu.Item
              onPress={() => {
                closeMenu();
                navigation.navigate('SendRequire');
              }}
              title="Yêu cầu"
            />
            <Menu.Item
              onPress={() => {
                navigation.goBack();
              }}
              title="Quay lại"
            />
          </Menu>
        </View>
        <View />

        <ScrollView style={{width: '100%', flex: 1}}>
          <FlatList
            data={detailUser}
            renderItem={({item}) => (
              <View
                style={{
                  width: Layout.window.width - 10,
                  margin: 5,
                  borderColor: '#e3e3e3',
                  borderWidth: 2,
                  padding: 20,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: tintColorLight,
                    marginHorizontal: 5,
                  }}>
                  Chỉ số đo nước tháng {item.month}/{item.year}{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '700',
                    color: 'red',
                  }}>
                  {' '}
                  Chưa thanh toán{' '}
                </Text>
                <View
                  style={{width: '100%', height: 2, backgroundColor: '#e3e3e3'}}
                />
                <Text style={{marginVertical: 5}}>
                  {' '}
                  Số đo đồng hồ : {item.waterMeterNumber}
                </Text>
                <Text style={{marginVertical: 5}}>
                  {' '}
                  Ngày đo : {formatTime(item.createdAt)}{' '}
                </Text>
                <View
                  style={{width: '100%', height: 2, backgroundColor: '#e3e3e3'}}
                />

                <TouchableOpacity
                  onPress={() => {
                    if (
                      route.params.waterUserId &&
                      route.params.name &&
                      item.waterMeterNumber > 0
                    ) {
                      navigation.navigate('WaterInvoice', {
                        waterUserId: route.params.waterUserId,
                        name: route.params.name,
                        month: item.month,
                        year: item.year,
                      });
                    }
                  }}>
                  <Text
                    style={{
                      marginVertical: 5,
                      fontWeight: 'bold',
                      color: tintColorLight,
                      fontSize: 16,
                    }}>
                    {' '}
                    Xem hóa đơn{' >>'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </ScrollView>

        {/* <View style={styles.viewButtonInfo}>
        <View style={styles.viewButtonItem}>
          <Button
            iconName="assignment"
            BackgroundColor={tintColorLight}
            onPress={() => {
              navigation.navigate('WaterBill', {
                waterUserId: route.params.waterUserId,
                name: route.params.name,
              });
            }}
          />
          <View style={styles.viewButtonItemText}>
            <Text>Lịch sử</Text>
            <Text>tiền nước</Text>
          </View>
        </View>
        <View style={styles.viewButtonItem}>
          <Button
            iconName="message"
            BackgroundColor={tintColorLight}
            onPress={() => {
              navigation.navigate('SendRequire');
            }}
          />
          <View style={styles.viewButtonItemText}>
            <Text>Tiếp nhận</Text>
            <Text>yêu cầu</Text>
          </View>
        </View>
      </View> */}
      </Provider>
    </View>
  );
}
const formatTime = (createdAt: string) => {
  const _date = new Date(createdAt);
  console.log(_date);
  const txtDate = `${`0${_date.getUTCHours()}`.slice(
    -2,
  )}:${`0${_date.getMinutes()}`.slice(-2)} `;

  return `${_date.getDate()}/${
    _date.getMonth() + 1
  }/${_date.getFullYear()} ${txtDate} `;
};
const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center'},
  header: {
    backgroundColor: tintColorLight,
    width: '100%',
    height: 90,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarView: {
    margin: 5,
    width: 75,
    height: 75,
    borderRadius: 75,
    borderWidth: 1,
    borderColor: '#fff',
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: 'orange',
    position: 'relative',
  },

  avatarImage: {
    width: 75,
    height: 75,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 3,
  },
  viewButtonInfo: {
    backgroundColor: tintColorLight,
    width: '100%',
    height: 90,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
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
