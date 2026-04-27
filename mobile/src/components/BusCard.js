import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/constants';

const BusCard = ({ bus, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.operatorName}>{bus.operatorName}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color={COLORS.white} />
          <Text style={styles.ratingText}>{bus.rating || '4.5'}</Text>
        </View>
      </View>

      <Text style={styles.busType}>{bus.busType}</Text>

      <View style={styles.journeyInfo}>
        <View style={styles.timeLocation}>
          <Text style={styles.time}>{bus.departureTime}</Text>
          <Text style={styles.location}>{bus.source}</Text>
        </View>
        
        <View style={styles.durationContainer}>
          <Text style={styles.duration}>{bus.duration || '6h 30m'}</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.timeLocation}>
          <Text style={styles.time}>{bus.arrivalTime}</Text>
          <Text style={styles.location}>{bus.destination}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>₹ {bus.price}</Text>
        <Text style={styles.seats}>{bus.availableSeats || 20} Seats left</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  operatorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.success,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ratingText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 2,
  },
  busType: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 16,
  },
  journeyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeLocation: {
    alignItems: 'center',
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  location: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  durationContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  duration: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 4,
  },
  line: {
    height: 1,
    backgroundColor: COLORS.border,
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  seats: {
    fontSize: 14,
    color: COLORS.textLight,
  },
});

export default BusCard;
