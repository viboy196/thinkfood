import {View, Text} from '../../components/Themed';
import React, {useState, useEffect} from 'react';
import {FlatList, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {tintColorLight} from '../../constants/Colors';
import {DataTable} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import ApiRequest from '../../utils/api/Main/ApiRequest';
import {ChangeWaterFactory, logOut} from '../../redux/features/auth/authSlices';
import Layout from '../../constants/Layout';
import {RootTabScreenProps} from '../../navigation/types';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {WaterUserType} from '../../utils/api/apiTypes';

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const tag = 'TabOneScreen';
  const {token, userName} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const [listWaterUser, setlistWaterUser] = useState<Array<WaterUserType>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (token && userName) {
      ApiRequest.DetailWaterUserByUser(token, userName)
        .then(data => {
          setlistWaterUser(data.result.data);
          console.log(`${tag} get detail success`);
          setLoading(false);
        })
        .catch(() => {
          dispatch(logOut());
          setLoading(false);
        });
    }
  }, [dispatch, token, userName]);
  return (
    <View style={styles.container}>
      {loading && (
        <Spinner
          visible={true}
          textContent={'Loading ...'}
          textStyle={{color: '#fff', fontSize: 20}}
        />
      )}
      <View style={styles.header}>
        <View style={styles.avatarView}>
          <Image
            source={require('../../assets/images/default-avatar.png')}
            resizeMode="cover"
            style={styles.avatarImage}
          />
        </View>
        <Text
          style={{
            marginLeft: 10,
            fontSize: 22,
            fontWeight: '700',
            color: '#fff',
          }}>
          {userName}
        </Text>
      </View>
      <View
        style={{
          width: '100%',
        }}>
        <Text
          style={{
            margin: 10,
            fontSize: 16,
            fontWeight: '700',
            color: '#4E4E4E',
          }}>
          Chọn hợp đồng nước
        </Text>
      </View>
      {listWaterUser === undefined ||
        (listWaterUser.length === 0 && <Text>Chưa có hợp đồng nước</Text>)}
      <FlatList
        data={listWaterUser}
        renderItem={({item}) => (
          <ItemHoDungNuoc
            dataItem={item}
            onPress={() => {
              if (
                token &&
                userName &&
                item.waterFactoryId &&
                item.address &&
                item.name
              ) {
                dispatch(
                  ChangeWaterFactory({
                    token: token,
                    userName: userName,
                    waterFactoryId: item.waterFactoryId,
                  }),
                );

                navigation.navigate('AccountViewDetail', {
                  address: item.address,
                  name: item.name,
                  waterUserId: item.id,
                });
              }
            }}
          />
        )}
      />
    </View>
  );
}

type PropsItemHoDungNuoc = {
  dataItem: any;
  onPress: () => void;
};
const ItemHoDungNuoc = ({dataItem, onPress}: PropsItemHoDungNuoc) => {
  const tag = 'ItemHoDungNuoc';
  const [tollArea, setTollArea] = useState<any>();
  const [unitType, setUnitTypeId] = useState<any>();
  const {token} = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      ApiRequest.TollAreaDetail(token, dataItem.tollAreaId)
        .then(data => {
          setTollArea(data.result);
          console.log(`${tag} get detail success`);
        })
        .catch(() => {
          dispatch(logOut());
        });
      ApiRequest.UnitTypeDetail(token, dataItem.unitTypeId)
        .then(data => {
          setUnitTypeId(data.result);
          console.log(`${tag} get detail success`);
        })
        .catch(() => {
          dispatch(logOut());
        });
    }
  }, [dataItem.tollAreaId, dataItem.unitTypeId, dispatch, token]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: Layout.window.width - 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        marginVertical: 5,
      }}>
      <DataTable>
        <DataTable.Row>
          <DataTable.Cell>Mã</DataTable.Cell>
          <DataTable.Cell>{dataItem.code}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>chủ hộ</DataTable.Cell>
          <DataTable.Cell>{dataItem.name}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Địa chỉ</DataTable.Cell>
          <DataTable.Cell>{dataItem.address}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Mã đồng hồ</DataTable.Cell>
          <DataTable.Cell>{dataItem.waterMeterCode}</DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell>Khu vực</DataTable.Cell>

          <DataTable.Cell>{tollArea ? tollArea.name : ''}</DataTable.Cell>
          <DataTable.Cell>Loại</DataTable.Cell>
          <DataTable.Cell style={{flex: 1}}>
            {unitType ? unitType.name : ''}
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </TouchableOpacity>
  );
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
});
