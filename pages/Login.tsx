import React, {useState} from 'react';
import {StyleSheet, View, Image, SafeAreaView} from 'react-native';
import pomLogo from '../assets/images/POMlogo.png';
import {Card, Text, TextInput, IconButton} from 'react-native-paper';
import LoginButton from '../components/LoginButton.tsx';
import SignUpButton from '../components/SignUpButton.tsx';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase.js';

const Login = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (email && pass) {
      try {
        await signInWithEmailAndPassword(auth, email, pass);
      } catch (error: any) {
        if (error.code === 'auth/invalid-credential') {
          setErrorMessage('Incorrect password.');
        } else if (error.code === 'auth/too-many-requests') {
          console.log(error);
          setErrorMessage('Too many failed attempts.  Please try again later.');
        } else if (error.code === 'auth/invalid-email') {
          console.log(error);
          setErrorMessage('User not found.');
        } else {
          console.log(error);
          setErrorMessage(
            'Something went wrong on our end.  Please try again later.',
          );
        }
      }
    }
  };

  return (
    <View style={loginStyles.container}>
      <SafeAreaView>
        <Image source={pomLogo} style={loginStyles.logo} />
        <View style={{padding: 20}}>
          <Card style={loginStyles.card}>
            <Card.Content>
              <View style={{marginTop: 40}}>
                <TextInput
                  autoCapitalize="none"
                  label="Email"
                  value={email}
                  onChangeText={email => setEmail(email)}
                  style={{
                    marginBottom: 30,
                    overflow: 'hidden',
                  }}
                />
                <View style={loginStyles.inputContainer}>
                  <TextInput
                    label="Password"
                    value={pass}
                    onChangeText={pass => setPass(pass)}
                    style={loginStyles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={!isPasswordVisible}
                  />
                  <IconButton
                    icon={isPasswordVisible ? 'account' : 'eye'}
                    size={20}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={loginStyles.eyeIcon}
                  />
                </View>
              </View>
              {errorMessage ? (
                <Text style={loginStyles.errorText}>{errorMessage}</Text>
              ) : null}
              <View style={{marginTop: 50}}>
                <LoginButton onPress={handleSubmit} />
                <View style={loginStyles.line}></View>
                <SignUpButton onPress={() => navigation.navigate('Signup')} />
              </View>
            </Card.Content>
          </Card>
        </View>
      </SafeAreaView>
    </View>
  );
};

const loginStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF6DF',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textInput: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
  },
  card: {
    marginTop: 20,
    backgroundColor: '#B32F2F',
    height: 500,
  },
  line: {
    height: 1,
    backgroundColor: '#000000',
    marginHorizontal: 30,
    marginBottom: 20,
    opacity: 0.24,
  },
  logo: {
    marginTop: 50,
    alignSelf: 'center',
  },
  errorText: {
    color: 'white',
    marginTop: 10,
  },
});

export default Login;
