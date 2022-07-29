import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from '../../components/Themed';
import {tintColorLight} from '../../constants/Colors';
import {RootTabScreenProps} from '../../navigation/types';
export default function SearchScreen({
  navigation,
}: RootTabScreenProps<'TabThree'>) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyWebView', {
            title: 'Lắp đặt đồng hồ ',
            url: 'http://dichvunuoc.vn/show/dvn_mobile_dichvu_lapdatdongho',
          });
        }}>
        <View style={styles.items}>
          <View style={styles.viewItemImage}>
            <Image
              source={require('../../assets/images/search/tools.png')}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.viewItemText}>
            <Text style={styles.itemText}> Lắp đặt đồng hồ </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyWebView', {
            title: 'Thay đổi đường ống cụm đồng hồ nước',
            url: 'http://dichvunuoc.vn/show/dvn_mobile_dichvu_didoidongho',
          });
        }}>
        <View style={styles.items}>
          <View style={styles.viewItemImage}>
            <Image
              source={require('../../assets/images/search/pipeline.png')}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.viewItemText}>
            <Text style={styles.itemText}>
              {' '}
              Di dời thay đổi đường ống cụm đồng hồ nước{' '}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyWebView', {
            title: ' Kiểm tra kiểm định đồng hồ ',
            url: 'http://dichvunuoc.vn/show/dvn_mobile_dichvu_kiemtrakiemdinhdongho',
          });
        }}>
        <View style={styles.items}>
          <View style={styles.viewItemImage}>
            <Image
              source={require('../../assets/images/search/compliant.png')}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.viewItemText}>
            <Text style={styles.itemText}> Kiểm tra kiểm định đồng hồ </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyWebView', {
            title: 'Đề nghị tạm ngừng , mở nguồn , cấp nước',
            url: 'http://dichvunuoc.vn/show/dvn_mobile_dichvu_denghidongmo',
          });
        }}>
        <View style={styles.items}>
          <View style={styles.viewItemImage}>
            <Image
              source={require('../../assets/images/search/pipeline_1.png')}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.viewItemText}>
            <Text style={styles.itemText}>
              {' '}
              Đề nghị tạm ngừng , mở nguồn , cấp nước{' '}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MyWebView', {
            title: 'Thay đổi thông tin , ký lại hợp đồng',
            url: 'http://dichvunuoc.vn/show/dvn_mobile_dichvu_thaydoithongtin',
          });
        }}>
        <View style={styles.items}>
          <View style={styles.viewItemImage}>
            <Image
              source={require('../../assets/images/search/info.png')}
              resizeMode="cover"
              style={styles.itemImage}
            />
          </View>
          <View style={styles.viewItemText}>
            <Text style={styles.itemText}>
              {' '}
              Thay đổi thông tin , ký lại hợp đồng{' '}
            </Text>
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
