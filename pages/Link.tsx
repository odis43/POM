import React from 'react';
import PlaidLink, {
  LinkSuccess,
  LinkExit,
  usePlaidEmitter,
} from 'react-native-plaid-link-sdk';

import {Text, View, StyleSheet} from 'react-native';
import {auth} from '../config/firebase';

interface LinkProps {
  onPress?: () => void;
  linkToken: string | null;
  navigation: any;
}
const Link: React.FC<LinkProps> = ({linkToken, onPress, navigation}) => {
  console.log('link has token: ', linkToken);
  // usePlaidEmitter(event => {
  //   console.log(event);
  // });
  return (
    <PlaidLink
      onPress={onPress}
      tokenConfig={{
        token: linkToken!,
        noLoadingState: false,
      }}
      onSuccess={async (success: LinkSuccess) => {
        await fetch(`http://localhost:3000/api/exchange_public_token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            uid: auth.currentUser?.uid!,
          },
          body: JSON.stringify({public_token: success.publicToken}),
        }).catch(err => {
          console.log(err);
        });
        navigation.navigate('Budgeting', success);
      }}
      onExit={(response: LinkExit) => {
        console.log(response);
      }}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Connect your bank</Text>
      </View>
    </PlaidLink>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    elevation: 4,
    backgroundColor: '#D23C3C',
    width: '50%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 15,
    color: '#FFF',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default Link;
