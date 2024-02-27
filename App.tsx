import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PaperProvider} from 'react-native-paper';
import Entry from './pages/Entry';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Budgeting from './pages/Budgeting';
import Options from './pages/Options';
import Stats from './pages/Stats';
import useAuth from './hooks/useAuth';
import {useEffect} from 'react';
import {db_pom, auth} from './config/firebase';
import {doc, getDoc} from 'firebase/firestore';
import {onAuthStateChanged} from 'firebase/auth';
import SplashScreen from 'react-native-splash-screen';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Foundation from 'react-native-vector-icons/Foundation';
function App() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  const {user} = useAuth();
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log('user is signed in');
      } else {
        console.log('user is not signed in yet');
      }
    });
  }, []);

  useEffect(() => {
    const ac = new AbortController();

    setTimeout(() => {
      SplashScreen.hide();
    }, 500);

    return function cleanup() {
      ac.abort();
    };
  }, []);
  return (
    <PaperProvider>
      <NavigationContainer>
        {user ? (
          <Tab.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Budgeting">
            <Tab.Screen
              name="Budgeting"
              component={Budgeting}
              options={{
                tabBarInactiveTintColor: '#000000',
                tabBarActiveTintColor: '#B32F2F',
                headerPressColor: '#B32F2F',
                tabBarLabel: 'Budgeting',
                tabBarIcon: () => <FontAwesome6 name={'dollar'} />,
              }}
            />
            <Tab.Screen
              name="Statistics"
              component={Stats}
              options={{
                tabBarInactiveTintColor: '#000000',
                tabBarActiveTintColor: '#B32F2F',
                headerPressColor: '#B32F2F',
                tabBarLabel: 'Statistics',
                tabBarIcon: () => <Foundation name={'graph-bar'} />,
              }}
            />
            <Tab.Screen
              name="Options"
              component={Options}
              options={{
                tabBarInactiveTintColor: '#000000',
                tabBarActiveTintColor: '#B32F2F',
                headerPressColor: '#B32F2F',
                tabBarLabel: 'Options',
                tabBarIcon: () => <FontAwesome6 name={'gear'} />,
              }}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName="Entry"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Entry" component={Entry} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
