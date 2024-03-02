import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

interface PlusButtonProps {
  onAddPress: () => void;
}

const PlusButton: React.FC<PlusButtonProps> = ({onAddPress}) => {
  return (
    <TouchableOpacity style={styles.cont} onPress={onAddPress}>
      <Image
        source={require('../assets/images/fi_plus.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default PlusButton;

const styles = StyleSheet.create({
  cont: {
    alignSelf: 'center',
    backgroundColor: '#D23C3C',
    zIndex: 1,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 45,
    width: 45,
  },
});
