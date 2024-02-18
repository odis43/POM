import React, {RefCallback} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

interface LoginButtonProps {
  onPress?: () => void;
  Title: string;
}

const GenButton: React.FC<LoginButtonProps> = ({onPress, Title}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        styles.loginButton,
        {opacity: pressed ? 0.5 : 1},
      ]}
      onPress={onPress}
      android_ripple={{color: 'rgba(210, 60, 60, 0.5)'}}>
      <Text style={styles.logButtonText}>{Title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 4,
    elevation: 3,
    alignSelf: 'center',
    marginBottom: 25,
  },
  loginButton: {
    backgroundColor: '#D23C3C',
  },
  logButtonText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '500',
    letterSpacing: 0.25,
  },
});

export default GenButton;
