import React, {RefCallback} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

interface LoginButtonProps {
  onPress?: () => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({onPress}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        styles.loginButton,
        {opacity: pressed ? 0.5 : 1},
      ]}
      onPress={onPress}
      android_ripple={{color: 'rgba(210, 60, 60, 0.5)'}}>
      <Text style={styles.logButtonText}>Log in</Text>
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
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  loginButton: {
    backgroundColor: '#D23C3C',
  },
  logButtonText: {
    color: 'white',
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  },
});

export default LoginButton;
