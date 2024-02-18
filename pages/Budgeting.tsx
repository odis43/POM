import React, {useEffect, useState} from 'react';
import {View, Button, SafeAreaView, StyleSheet, Text} from 'react-native';
import {User, updateProfile} from 'firebase/auth';
import {auth, db_pom} from '../config/firebase.js';
import {TextInput} from 'react-native-paper';
import Link from './Link.tsx';
import {doc, getDoc} from 'firebase/firestore';
import {ReactNativeAsyncStorage} from 'firebase/auth';

const Budgeting = ({navigation}) => {
  enum timeDay {
    Morning = 'Morning',
    Afternoon = 'Afternoon',
    Evening = 'Evening',
    Night = 'Night',
  }
  const [name, setName] = useState<string>('');
  const [named, setNamed] = useState<boolean>(false);
  const [time, setTime] = useState<string>('');
  const [linkToken, setLinkToken] = useState<string | null>(null);

  const generateToken = async () => {
    try {
      console.log('generating token');
      console.log('the uid: ', auth.currentUser?.uid);
      const response = await fetch(
        'http://localhost:3000/api/create_link_token',
        {
          method: 'POST',
          headers: {
            uid: auth.currentUser?.uid!,
          },
        },
      );
      if (!response.ok) {
        throw new Error('Failed to fetch token');
      }
      const data = await response.json();
      console.log(data.link_token);
      setLinkToken(data.link_token);
    } catch (error) {
      console.error('Error generating token:', error);
    }
  };
  useEffect(() => {
    console.log('i have been mounted');
    auth.currentUser?.reload();
    if (auth.currentUser?.displayName) {
      setNamed(true);
    }
    generateToken();
  }, []);

  useEffect(() => {
    let currentHour = new Date().getHours();
    switch (true) {
      case currentHour >= 0 && currentHour < 12:
        setTime(timeDay.Morning);
        break;
      case currentHour >= 12 && currentHour < 18:
        setTime(timeDay.Afternoon);
        break;
      default:
        setTime(timeDay.Evening);
        break;
    }
  });

  const handleUsernameInput = () => {
    let user: User | null = auth.currentUser;
    if (user) {
      updateProfile(user, {displayName: name})
        .then(() => {
          console.log('username updated with:', user?.displayName);
          console.log('AUTH IS:', auth.currentUser?.displayName);
          user?.reload();
          setNamed(true);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {named ? (
          <View>
            <Text style={styles.headerText}>
              Good {time}, {auth.currentUser?.displayName}
            </Text>
            <View style={styles.currentText}>
              <Text>Current view:</Text>
              <Text>Current view</Text>
            </View>
          </View>
        ) : (
          <SafeAreaView style={styles.usersubmit}>
            <TextInput
              label="Name"
              value={name}
              style={{width: 200}}
              onChangeText={name => setName(name)}
              autoCapitalize="none"
            />
            <Button title="Submit" onPress={handleUsernameInput} />
          </SafeAreaView>
        )}
      </View>
      {named ? (
        <View style={styles.link}>
          <Link navigation={navigation} linkToken={linkToken} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF6DF',
  },
  signInBank: {
    marginTop: 300,
  },
  headerText: {
    marginTop: 70,
    fontSize: 25,
    fontWeight: 'bold',
  },
  currentText: {
    marginTop: 15,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  usersubmit: {
    verticalAlign: 'middle',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#D23C3C',
    height: 180,
  },
  link: {
    paddingTop: 300,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default Budgeting;
