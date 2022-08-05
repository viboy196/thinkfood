import {
  TouchableOpacity,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
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
    <TouchableOpacity
      onPress={props.onPress}
      style={[props.style, styles.button]}>
      <Icon name={props.iconName} color="white" size={60} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },

  itemImage: {
    width: 40,
    height: 40,
    tintColor: '#fff',
  },
});
