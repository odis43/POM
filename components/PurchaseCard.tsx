import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, Button, Card, Text, Divider} from 'react-native-paper';
import PlusButton from './AddButton';
import {auth, db_pom} from '../config/firebase.js';
import {Transaction} from 'plaid';
import {collection, doc, addDoc} from 'firebase/firestore';

interface purchaseCardProps {
  date: string;
}

interface transactionObj {
  merchant_name: string;
  amount: number;
  datetime: string;
  isoCode: string;
  classification: string;
}

const PurchaseCard: React.FC<purchaseCardProps> = ({date}) => {
  const [showPlus, setShowPlus] = useState<boolean>(true);
  const [purchaseObjs, setPurchaseObj] = useState<transactionObj[]>([]);

  useEffect(() => {
    const addToDb = async () => {
      console.log('adding to db now');
      let today = new Date().toISOString().split('T')[0];
      console.log('length: ', purchaseObjs.length);
      for (let i = 0; i < purchaseObjs.length; i++) {
        const curr = purchaseObjs[i];
        let uid = auth.currentUser?.uid;
        console.log(curr.merchant_name);
        console.log(curr.amount);
        console.log('---------------');
        const transactionRef = collection(
          doc(collection(db_pom, 'users'), uid),
          'TRANSACTIONS',
        );
        try {
          addDoc(transactionRef, {
            merchant: curr.merchant_name,
            amount: curr.amount,
            datetime: curr.datetime,
            isoCode: curr.isoCode,
            classification: curr.classification,
            date: today,
          });
          console.log('transaction aded');
        } catch (error) {
          console.error('Error adding transaction to database:', error);
        }
      }
    };

    const getTransactions = async () => {
      try {
        console.log('getTranscations uid: ', auth.currentUser?.uid);
        // First check if transactions exist in cache or db (for past dates)

        // Fetch new transactions for today
        const response = await fetch('http://localhost:3000/api/transactions', {
          method: 'GET',
          headers: {
            uid: auth.currentUser?.uid!,
          },
        });
        if (!response.ok) {
          throw new Error('Failed');
        }
        const data = await response.json();

        data.latest_transactions.forEach((purchase: Transaction) => {
          let importantInfo: transactionObj = {
            merchant_name: purchase.merchant_name!,
            amount: purchase.amount!,
            datetime:
              purchase.authorized_datetime !== null
                ? purchase.authorized_datetime
                : '00:00',
            isoCode: purchase.iso_currency_code!,
            classification: '',
          };

          importantInfo.merchant_name !== null
            ? setPurchaseObj(prevPurchaseObjs => [
                ...prevPurchaseObjs,
                importantInfo,
              ])
            : null;
        });
        await addToDb();
      } catch (error) {
        console.log(error);
      }
    };

    // //should only get transactions if the date is today.
    const today = new Date().toISOString().split('T')[0];
    let uuid = auth.currentUser?.uid;
    if (today === date) {
      getTransactions();
    } else {
      //go into the database and retrieve information
      setPurchaseObj([
        {
          merchant_name: 'lol',
          amount: 2,
          datetime: '2',
          isoCode: '2',
          classification: '2',
        },
      ]);
    }

    return () => {
      setPurchaseObj([]);
    };
  }, []);

  return (
    <Card
      style={{
        padding: 0,
        height: 440,
        width: 320,
        borderRadius: 30,
        backgroundColor: 'white',
        overflow: 'scroll',
      }}>
      <Card.Title
        title="Your Purchases"
        titleVariant="headlineMedium"
        titleStyle={{fontWeight: '800', marginLeft: 7}}
        style={{
          backgroundColor: '#D23C3C',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 70,
        }}
      />
      <ScrollView>
        <Card.Content style={{marginTop: 30}}>
          {purchaseObjs.map((obj, index) => (
            <React.Fragment key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  columnGap: 20,
                  marginBottom: 20,
                  marginTop: 15,
                }}>
                <Text style={{width: '20%'}}>{obj.datetime}</Text>
                <Text style={{width: '35%'}}>{obj.merchant_name}</Text>
                <Text style={{width: '30%'}}>
                  {obj.amount} {obj.isoCode}
                </Text>
              </View>
              <Divider bold={true} />
            </React.Fragment>
          ))}
        </Card.Content>
      </ScrollView>
    </Card>
  );
};

const cardStyles = StyleSheet.create({
  plusButton: {
    alignItems: 'center',
    marginTop: 130,
  },
  purchaseText: {
    width: '30%',
  },
});

export default PurchaseCard;
