import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from '../../components/Themed';
import {tintColorLight} from '../../constants/Colors';
import {RootTabScreenProps} from '../../navigation/types';
export default function SearchScreen({
  navigation,
}: RootTabScreenProps<'TabTwo'>) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyWebView', {
            title: 'Giá nước',
            url: 'http://dichvunuoc.vn/show/dvn_mobile_timkiem_gianuoc',
          });
        }}>
        <View style={styles.items}>
          <View style={styles.viewItemImage}>
            <Image
              source={require('../../assets/images/search/maintenance.png')}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.viewItemText}>
            <Text style={styles.itemText}> giá nước </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyWebView', {
            title: 'Chất lượng nước',
            url: 'http://dichvunuoc.vn/show/dvn_mobile_timkiem_chatluongnuoc',
          });
        }}>
        <View style={styles.items}>
          <View style={styles.viewItemImage}>
            <Image
              source={require('../../assets/images/search/water-drop.png')}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.viewItemText}>
            <Text style={styles.itemText}> Chất lượng nước </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyWebView', {
            title: 'Danh sách điểm thu',
            url: 'http://dichvunuoc.vn/show/dvn_mobile_timkiem_diemthu',
          });
        }}>
        <View style={styles.items}>
          <View style={styles.viewItemImage}>
            <Image
              source={require('../../assets/images/search/contact-book.png')}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.viewItemText}>
            <Text style={styles.itemText}> Danh sách điểm thu </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyWebView', {
            title: 'Lịch tạm ngưng cấp nước',
            url: 'http://dichvunuoc.vn/show/dvn_mobile_timkiem_lich',
          });
        }}>
        <View style={styles.items}>
          <View style={styles.viewItemImage}>
            <Image
              source={require('../../assets/images/search/save-water.png')}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.viewItemText}>
            <Text style={styles.itemText}> Lịch tạm ngưng cấp nước </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyWebView', {
            title: 'tiến độ hồ sơ',
            url: 'http://dichvunuoc.vn/show/dvn_mobile_timkiem_tiendohoso',
          });
        }}>
        <View style={styles.items}>
          <View style={styles.viewItemImage}>
            <Image
              source={require('../../assets/images/installWater/file.png')}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.viewItemText}>
            <Text style={styles.itemText}> tiến độ hồ sơ </Text>
          </View>
        </View>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewItemImage: {
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    backgroundColor: tintColorLight,
    borderRadius: 75,
    marginRight: 10,
    marginLeft: 10,
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
    borderRadius: 10,
  },
  itemText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d86ff',
  },
});
