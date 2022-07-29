import React from 'react';
import {Alert, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from '../../components/Themed';
export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('thông báo', 'tính năng đang phát triển');
        }}>
        <View style={styles.items}>
          <View style={styles.viewItemImage}>
            <Image
              source={require('../../assets/images/installWater/deal.png')}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.viewItemText}>
            <Text style={styles.itemText}> Lịch sử tiếp nhận yêu cầu </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('thông báo', 'tính năng đang phát triển');
        }}>
        <View style={styles.items}>
          <View style={styles.viewItemImage}>
            <Image
              source={require('../../assets/images/installWater/deal.png')}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.viewItemText}>
            <Text style={styles.itemText}> Thêm mới yêu cầu </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('thông báo', 'tính năng đang phát triển');
        }}>
        <View style={styles.items}>
          <View style={styles.viewItemImage}>
            <Image
              source={require('../../assets/images/installWater/deal.png')}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.viewItemText}>
            <Text style={styles.itemText}> Đánh giá chất lượng dịch vụ </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('thông báo', 'tính năng đang phát triển');
        }}>
        <View style={styles.items}>
          <View style={styles.viewItemImage}>
            <Image
              source={require('../../assets/images/installWater/deal.png')}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.viewItemText}>
            <Text style={styles.itemText}> Lịch tạm ngưng cấp nước </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('thông báo', 'tính năng đang phát triển');
        }}>
        <View style={styles.items}>
          <View style={styles.viewItemImage}>
            <Image
              source={require('../../assets/images/installWater/deal.png')}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.viewItemText}>
            <Text style={styles.itemText}> tiến độ hồ sơ </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewItemImage: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#3e3e3e',
    borderRadius: 35,
    marginRight: 10,
  },
  itemImage: {
    width: 35,
    height: 35,
    tintColor: '#fff',
  },
  items: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  viewItemText: {
    flex: 6,
    justifyContent: 'center',
    height: 40,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d86ff',
  },
});
