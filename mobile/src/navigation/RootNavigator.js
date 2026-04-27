import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';

// Screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SearchBusScreen from '../screens/SearchBusScreen';
import BusListScreen from '../screens/BusListScreen';
import BusDetailsScreen from '../screens/BusDetailsScreen';
import SeatSelectionScreen from '../screens/SeatSelectionScreen';
import PassengerDetailsScreen from '../screens/PassengerDetailsScreen';
import PaymentScreen from '../screens/PaymentScreen';
import BookingSuccessScreen from '../screens/BookingSuccessScreen';
import TicketDetailsScreen from '../screens/TicketDetailsScreen';
import SupportScreen from '../screens/SupportScreen';

// Tab Navigator
import BottomTabNavigator from './BottomTabNavigator';
import { COLORS } from '../utils/constants';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user, loading } = useContext(AuthContext);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Show splash for 2 seconds then check auth state
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading || showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: COLORS.white,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {!user ? (
          // Auth Stack
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // Main App Stack
          <>
            <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
            <Stack.Screen 
              name="SearchBus" 
              component={SearchBusScreen} 
              options={{ headerShown: true, title: 'Search Buses' }} 
            />
            <Stack.Screen 
              name="BusList" 
              component={BusListScreen} 
              options={{ headerShown: true, title: 'Available Buses' }} 
            />
            <Stack.Screen 
              name="BusDetails" 
              component={BusDetailsScreen} 
              options={{ headerShown: true, title: 'Bus Details' }} 
            />
            <Stack.Screen 
              name="SeatSelection" 
              component={SeatSelectionScreen} 
              options={{ headerShown: true, title: 'Select Seats' }} 
            />
            <Stack.Screen 
              name="PassengerDetails" 
              component={PassengerDetailsScreen} 
              options={{ headerShown: true, title: 'Passenger Details' }} 
            />
            <Stack.Screen 
              name="Payment" 
              component={PaymentScreen} 
              options={{ headerShown: true, title: 'Payment' }} 
            />
            <Stack.Screen 
              name="BookingSuccess" 
              component={BookingSuccessScreen} 
            />
            <Stack.Screen 
              name="TicketDetails" 
              component={TicketDetailsScreen} 
              options={{ headerShown: true, title: 'Ticket Details' }} 
            />
            <Stack.Screen 
              name="Support" 
              component={SupportScreen} 
              options={{ headerShown: true, title: 'Support / FAQ' }} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
