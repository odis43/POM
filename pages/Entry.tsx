import * as React from 'react';
import {StyleSheet, Pressable, View, Text, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import pomLogo from '../assets/images/POMlogo.png';
import LoginButton from '../components/LoginButton.tsx';
import SignUpButton from '../components/SignUpButton.tsx';

const Entry = ({navigation}) => {
  return (
    <View style={stylesLogin.container}>
      <SafeAreaView>
        <Text style={stylesLogin.title}>POM</Text>
        <Image source={pomLogo} style={stylesLogin.logo} />
        <View style={stylesLogin.buttonContainer}>
          <LoginButton onPress={() => navigation.navigate('Login')} />
          <SignUpButton onPress={() => navigation.navigate('Signup')} />
        </View>
      </SafeAreaView>
    </View>
  );
};

const stylesLogin = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6DF',
  },
  title: {
    fontFamily: 'LexendDeca',
    fontWeight: '800',
    fontSize: 128,
    textAlign: 'center',
    marginTop: 120,
  },
  logo: {
    marginTop: 10,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
});

export default Entry;
