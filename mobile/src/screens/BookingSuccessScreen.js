import React, { useEffect } from 'react';
import { View, Text, StyleSheet, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import { COLORS } from '../utils/constants';

const BookingSuccessScreen = ({ route, navigation }) => {
  const { bookingDetails } = route.params;

  useEffect(() => {
    // Disable hardware back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={100} color={COLORS.success} />
        </View>
        
        <Text style={styles.title}>Booking Successful!</Text>
        <Text style={styles.subtitle}>Your ticket has been booked successfully.</Text>
        
        <View style={styles.ticketCard}>
          <Text style={styles.label}>Booking ID</Text>
          <Text style={styles.value}>{bookingDetails?._id || 'BK123456789'}</Text>
          
          <Text style={styles.label}>Status</Text>
          <Text style={[styles.value, { color: COLORS.success }]}>Confirmed</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <CustomButton
          title="View Ticket"
          onPress={() => {
            navigation.navigate('MainTabs');
            navigation.navigate('TicketDetails', { booking: bookingDetails });
          }}
          style={styles.primaryBtn}
        />
        <CustomButton
          title="Go to Home"
          type="secondary"
          onPress={() => navigation.navigate('MainTabs')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 32,
  },
  ticketCard: {
    backgroundColor: COLORS.background,
    padding: 24,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  label: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 16,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 4,
  },
  footer: {
    padding: 24,
  },
  primaryBtn: {
    marginBottom: 12,
  },
});

export default BookingSuccessScreen;
