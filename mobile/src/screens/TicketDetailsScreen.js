import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import api from '../api/api';
import { COLORS } from '../utils/constants';

const TicketDetailsScreen = ({ route, navigation }) => {
  const { booking } = route.params;

  const handleCancelTicket = () => {
    Alert.alert(
      'Cancel Ticket',
      'Are you sure you want to cancel this ticket? Cancellation charges may apply.',
      [
        { text: 'No', style: 'cancel' },
        { 
          text: 'Yes, Cancel', 
          style: 'destructive',
          onPress: async () => {
            try {
              // Replace with actual cancel API if available
              // await api.put(`/api/bookings/${booking._id}/cancel`);
              Alert.alert('Ticket Cancelled', 'Your ticket has been cancelled successfully. Refund will be processed in 3-5 working days.', [
                { text: 'OK', onPress: () => navigation.goBack() }
              ]);
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel ticket');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.ticketCard}>
          <View style={styles.header}>
            <Text style={styles.operatorName}>{booking.bus?.operatorName || 'Kishuka Travels'}</Text>
            <View style={[
              styles.statusBadge, 
              booking.status === 'Cancelled' ? styles.cancelledBadge : styles.confirmedBadge
            ]}>
              <Text style={[
                styles.statusText,
                booking.status === 'Cancelled' ? styles.cancelledText : styles.confirmedText
              ]}>
                {booking.status || 'Confirmed'}
              </Text>
            </View>
          </View>

          <View style={styles.routeContainer}>
            <View style={styles.timeLocation}>
              <Text style={styles.time}>{booking.bus?.departureTime || '10:00 AM'}</Text>
              <Text style={styles.location}>{booking.bus?.source || 'Source'}</Text>
            </View>
            <View style={styles.durationLine}>
              <Ionicons name="bus" size={20} color={COLORS.primary} />
              <View style={styles.line} />
            </View>
            <View style={styles.timeLocation}>
              <Text style={styles.time}>{booking.bus?.arrivalTime || '04:00 PM'}</Text>
              <Text style={styles.location}>{booking.bus?.destination || 'Destination'}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>PNR No</Text>
              <Text style={styles.detailValue}>{booking.pnr || 'KISH' + Math.floor(Math.random()*10000)}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{new Date(booking.journeyDate || booking.createdAt).toDateString()}</Text>
            </View>
          </View>

          <View style={styles.detailsRow}>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Total Seats</Text>
              <Text style={styles.detailValue}>{booking.seats?.length || 1}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Seat Nos</Text>
              <Text style={styles.detailValue}>{booking.seats?.join(', ') || 'A1'}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Passenger Details</Text>
          <View style={styles.passengerList}>
            {booking.passengers?.map((p, index) => (
              <View key={index} style={styles.passengerItem}>
                <Text style={styles.passengerName}>{p.name}</Text>
                <Text style={styles.passengerInfo}>{p.age} Yrs • Seat {p.seat}</Text>
              </View>
            )) || (
              <View style={styles.passengerItem}>
                <Text style={styles.passengerName}>Primary Passenger</Text>
                <Text style={styles.passengerInfo}>Adult</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fare Details</Text>
          <View style={styles.fareRow}>
            <Text style={styles.fareLabel}>Total Amount Paid</Text>
            <Text style={styles.fareValue}>₹ {booking.totalAmount}</Text>
          </View>
        </View>

        {booking.status !== 'Cancelled' && (
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancelTicket}>
            <Ionicons name="close-circle-outline" size={20} color={COLORS.error} />
            <Text style={styles.cancelText}>Cancel Ticket</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 16,
  },
  ticketCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  operatorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  confirmedBadge: {
    backgroundColor: COLORS.success + '20',
  },
  cancelledBadge: {
    backgroundColor: COLORS.error + '20',
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  confirmedText: {
    color: COLORS.success,
  },
  cancelledText: {
    color: COLORS.error,
  },
  routeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  timeLocation: {
    alignItems: 'center',
    width: '35%',
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  location: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  durationLine: {
    flex: 1,
    alignItems: 'center',
  },
  line: {
    height: 1,
    backgroundColor: COLORS.primary,
    width: '100%',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 15,
    borderStyle: 'dashed',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  detailItem: {
    width: '45%',
  },
  detailLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  section: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  passengerList: {},
  passengerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  passengerName: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '500',
  },
  passengerInfo: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  fareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  fareLabel: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  fareValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  cancelText: {
    color: COLORS.error,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default TicketDetailsScreen;
