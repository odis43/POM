import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import {CALLBACK_TYPE} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture';

interface SignUpProps {
  onPress?: () => void;
}

const SignUpButton: React.FC<SignUpProps> = ({onPress}) => {
  return (
    <Pressable
      style={({pressed}) => [
        styles.button,
        styles.signupButton,
        {opacity: pressed ? 0.5 : 1},
      ]}
      onPress={onPress}
      android_ripple={{color: 'rgba(210, 60, 60, 0.5)'}}>
      <Text style={styles.signButtonText}>Sign Up</Text>
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
  signupButton: {
    backgroundColor: 'white',
  },
  signButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#D23C3C',
  },
});

export default SignUpButton;
