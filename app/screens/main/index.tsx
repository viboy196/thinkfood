import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {ImageSourcePropType, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from '../../components/Themed';
import Colors, {tintColorLight} from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import {RootTabParamList /*,RootTabScreenProps*/} from '../../navigation/types';
import TabOneScreen from './TabOneScreen';
import TabThreeScreen from './TabThreeScreen';
import TabTwoScreen from './TabTwoScreen';
import SearchScreen from '../account/search';

import Icon from 'react-native-vector-icons/FontAwesome5';
import {useAppDispatch} from '../../redux/store/hooks';
import {logOut} from '../../redux/features/auth/authSlices';
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function MainScreen() {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,

        tabBarInactiveBackgroundColor: '#fff',
        tabBarActiveBackgroundColor: '#fff',
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={{
          /*({navigation}: RootTabScreenProps<'TabOne'>) => ({*/
          title: 'Trang chủ',
          headerShown: false,
          tabBarIcon: ({color}) => <TabBarIcon name="home" color={color} />,
          // headerRight: () => (
          //   <Pressable
          //     onPress={() => navigation.navigate('Modal')}
          //     style={({pressed}) => ({
          //       opacity: pressed ? 0.5 : 1,
          //     })}>
          //     <Icon
          //       name="info-circle"
          //       size={25}
          //       color={Colors[colorScheme].text}
          //       style={{marginRight: 15}}
          //     />
          //   </Pressable>
          // ),
          /*})*/
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={SearchScreen}
        options={{
          title: 'Tìm kiếm',
          headerShown: true,
          header: () => <HeaderShow name="Tìm kiếm" />,
          tabBarIcon: ({color}) => <TabBarIcon name="search" color={color} />,
        }}
        // listeners={{
        //   tabPress: e => {
        //     dispatch(removeCountNotifi());
        //   },
        // }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabTwoScreen}
        options={{
          title: 'Tiện ích',
          headerShown: true,
          header: () => <HeaderShow name="Tiện ích" />,

          tabBarIcon: ({color}) => (
            <TabBarIcon
              name="elementor"
              image={require('../../assets/images/search/repairing-service.png')}
              color={color}
            />
          ),
        }}
        // listeners={{
        //   tabPress: e => {
        //     dispatch(removeCountNotifi());
        //   },
        // }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={TabThreeScreen}
        options={{
          title: 'Tùy chọn',
          headerShown: true,
          header: () => (
            <HeaderShow
              name="Tùy chọn"
              logout={() => {
                dispatch(logOut());
              }}
            />
          ),

          tabBarIcon: ({color}) => <TabBarIcon name="bars" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
export function TabBarIcon(props: {
  name: string;
  color: string;
  numberCount?: number;
  image?: ImageSourcePropType;
}) {
  return (
    <View style={styles.tabBarIconView}>
      <Icon size={30} style={styles.icon} {...props} />

      {props.numberCount !== undefined && props.numberCount > 0 && (
        <View style={styles.notificationNumView}>
          <Text style={styles.notificationNumText}>{props.numberCount}</Text>
        </View>
      )}
    </View>
  );
}
export function HeaderShow(props: {name: string; logout?: () => void}) {
  return (
    <View style={styles.header}>
      <Text
        style={{
          marginLeft: 30,
          fontSize: 22,
          fontWeight: '700',
          color: '#fff',
        }}>
        {props.name}
      </Text>
      <View style={{flex: 1}} />
      {props.logout && (
        <TouchableOpacity style={{marginRight: 20}} onPress={props.logout}>
          <TabBarIcon color="#fff" name="sign-out-alt" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarIconView: {
    width: 30,
    height: 30,
  },
  itemImage: {
    width: 30,
    height: 30,
  },
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
  icon: {marginBottom: -3},
  notificationNumView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 15,
    height: 15,
    backgroundColor: 'red',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationNumText: {fontSize: 10, fontWeight: 'bold', color: '#fff'},
});
