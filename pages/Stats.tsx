import * as React from 'react';
import {View, Text, Button, SafeAreaView, StyleSheet} from 'react-native';
import {auth} from '../config/firebase';
import {signOut} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';

const Stats = () => {
  const navigation = useNavigation();
  const user = auth.currentUser;
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Entry');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <View style={styleHome.container}>
      <SafeAreaView style={styleHome.BankSign}>
        <View>
          <Text>Stats</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};
const styleHome = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(242, 232, 207, 0.5)',

    flex: 1,
  },
  BankSign: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default Stats;
