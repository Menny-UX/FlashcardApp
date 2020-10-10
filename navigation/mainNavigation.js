import React from 'react';
///Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
///Screens
import AddDeckScreen from '../views/addDeck';
import DecksListScreen from '../views/decksList';
import DeckScreen from '../views/deckScreen';
import AddCardScreen from '../views/addCard';
import QuizScreen from '../views/Quiz';

///icons
import { MaterialIcons } from '@expo/vector-icons'; 

//colors
import { black, turquoise, greenSea } from '../utils/colors';

{/* <MaterialIcons name="menu" size={24} color="black" /> */}
// {/* <MaterialIcons name="playlist-add" size={24} color="black" /> */}


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabsNavigation = () => {
    return ( 
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'Decks') {
                iconName = 'menu';
              } else if (route.name === 'Add Deck') {
                iconName = 'playlist-add';
              }
              // You can return any component that you like here!
              return <MaterialIcons name={iconName} size={24} color={ focused? greenSea: black} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: greenSea,
            inactiveTintColor: black,
          }}
        >
          <Tab.Screen name="Decks" component={DecksListScreen} />
          <Tab.Screen name="Add Deck" component={AddDeckScreen} />
        </Tab.Navigator>
     );
}

const MainNavigation = () => {
    return ( 
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={TabsNavigation} options={{ title: '' ,}}/>
            <Stack.Screen name="Deck" component={DeckScreen} />
            <Stack.Screen name="Add Card" component={AddCardScreen} />
            <Stack.Screen name="Quiz" component={QuizScreen} />
        </Stack.Navigator>
     );
}
 
export default MainNavigation;