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
                // tabBarIcon: () => (
                //   <MaterialCommunityIcons
                //     name="account"
                //     size={20}
                //     color="#4F8EF7"
                //   />
                // ),
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
                // tabBarIcon: () => (
                //   <MaterialCommunityIcons
                //     name="graph"
                //     size={20}
                //     color="#4F8EF7"
                //   />
                // ),
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
                // tabBarIcon: () => (
                //   <MaterialCommunityIcons
                //     name="abacus"
                //     size={20}
                //     color="#4F8EF7"
                //   />
                // ),
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
