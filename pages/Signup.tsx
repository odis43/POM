import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
} from 'react-native';
import pomLogo from '../assets/images/POMlogo.png';
import {Card, Text, TextInput, IconButton} from 'react-native-paper';
import LoginButton from '../components/LoginButton.tsx';
import SignUpButton from '../components/SignUpButton.tsx';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import {auth, db_pom} from '../config/firebase.js';
const Signup = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async () => {
    if (email && pass) {
      try {
        await createUserWithEmailAndPassword(auth, email, pass);
        try {
          const uuid = auth.currentUser?.uid!;
          console.log('this uuid is: ', uuid);
          await setDoc(doc(db_pom, 'users', uuid), {
            EMAIL: email,
            UUID: auth.currentUser?.uid,
            ACCESS_TOKEN: '',
          });
        } catch (e) {
          console.error('Error adding document: ', e);
        }
        console.log('created user: ', auth.currentUser?.uid);
      } catch (err: any) {
        console.log(err);
        if (err.code === 'auth/email-already-in-use') {
          setErrorMessage('Email already in use');
        } else if (err.code === 'auth/invalid-emai') {
          setErrorMessage('Invalid email');
        } else if (err.code == 'auth/weak-password') {
          setErrorMessage('Password should be at least 6 characters');
        }
      }
    }
  };

  return (
    <View style={stylesSignUp.container}>
      <SafeAreaView>
        <Image source={pomLogo} style={stylesSignUp.logo} />
        <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20}}>
          <Text
            variant="displaySmall"
            style={{fontFamily: 'LexendDeca', fontWeight: '700'}}>
            Create your account
          </Text>
          <Text style={{marginTop: 10}}>
            We'll give you a piece of mind in no time.
          </Text>
        </View>
        <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 10}}>
          <Card style={stylesSignUp.card}>
            <Card.Content>
              <View style={{marginTop: 30}}>
                <View style={stylesSignUp.inputContainer}></View>
                <View style={stylesSignUp.inputContainer}>
                  <TextInput
                    label="Email"
                    value={email}
                    onChangeText={email => setEmail(email)}
                    style={stylesSignUp.textInput}
                    autoCapitalize="none"
                    secureTextEntry={false}
                  />
                </View>
                <View style={stylesSignUp.inputContainer}>
                  <TextInput
                    label="Password"
                    value={pass}
                    onChangeText={pass => setPass(pass)}
                    style={stylesSignUp.textInput}
                    autoCapitalize="none"
                    secureTextEntry={!isPasswordVisible}
                  />
                  <IconButton
                    icon={isPasswordVisible ? 'account' : 'eye'}
                    size={20}
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={stylesSignUp.eyeIcon}
                  />
                </View>
              </View>
              {errorMessage ? (
                <Text style={stylesSignUp.errorText}>{errorMessage}</Text>
              ) : null}
              <View style={{marginTop: 50}}>
                <SignUpButton onPress={handleSubmit} />
                <View style={stylesSignUp.line}></View>
                <LoginButton onPress={() => navigation.navigate('Login')} />
              </View>
            </Card.Content>
          </Card>
        </View>
      </SafeAreaView>
    </View>
  );
};

const stylesSignUp = StyleSheet.create({
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
  title: {
    fontFamily: 'LexendDeca',
    fontWeight: '800',
    fontSize: 128,
    textAlign: 'center',
    marginTop: 120,
  },
  logo: {
    marginTop: 50,
    alignSelf: 'center',
    width: 55,
    height: 55,
  },
  buttonContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  errorText: {
    color: 'white',
    marginTop: 10,
  },
});

export default Signup;
