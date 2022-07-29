import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Image,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import {View} from '../Themed';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  onPress: () => void;
  iconName: string;
  image?: ImageSourcePropType;
  BackgroundColor: string;
  style?: StyleProp<ViewStyle>;
};
export default function Button(props: Props) {
  return (
    <View>
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          {backgroundColor: props.BackgroundColor},
          props.style,
          styles.button,
        ]}>
        {props.image ? (
          <Image
            source={props.image}
            resizeMode="cover"
            style={styles.itemImage}
          />
        ) : (
          <Icon name={props.iconName} color="white" size={20} />
        )}
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    padding: 10,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },

  itemImage: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
});
