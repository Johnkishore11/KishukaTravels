import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import api from '../api/api';
import LoadingScreen from '../components/LoadingScreen';
import { COLORS } from '../utils/constants';

const MyBookingsScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get('/api/bookings/my-bookings');
      setBookings(response.data.data || response.data);
    } catch (error) {
      console.log('Fetch bookings error:', error);
      Alert.alert('Error', 'Failed to fetch your bookings');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  const renderBookingCard = ({ item }) => {
    const isCancelled = item.status === 'Cancelled';

    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('TicketDetails', { booking: item })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.date}>{new Date(item.journeyDate || item.createdAt).toDateString()}</Text>
          <View style={[
            styles.statusBadge, 
            isCancelled ? styles.cancelledBadge : styles.confirmedBadge
          ]}>
            <Text style={[
              styles.statusText,
              isCancelled ? styles.cancelledText : styles.confirmedText
            ]}>
              {item.status || 'Confirmed'}
            </Text>
          </View>
        </View>

        <View style={styles.routeContainer}>
          <Text style={styles.cityText}>{item.bus?.source || 'Source'}</Text>
          <Ionicons name="arrow-forward" size={16} color={COLORS.textLight} style={{ marginHorizontal: 10 }} />
          <Text style={styles.cityText}>{item.bus?.destination || 'Destination'}</Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.bookingId}>ID: {item._id?.substring(0, 8)}</Text>
          <View style={styles.viewDetailsBtn}>
            <Text style={styles.viewDetailsText}>View Ticket</Text>
            <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <LoadingScreen message="Loading your bookings..." />;
  }

  return (
    <View style={styles.container}>
      {bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="ticket-outline" size={64} color={COLORS.border} />
          <Text style={styles.emptyTitle}>No Bookings Found</Text>
          <Text style={styles.emptySub}>You haven't booked any tickets yet.</Text>
          <TouchableOpacity 
            style={styles.bookNowBtn}
            onPress={() => navigation.navigate('SearchBus')}
          >
            <Text style={styles.bookNowText}>Book a Ticket</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item._id}
          renderItem={renderBookingCard}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  date: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 8,
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
    alignItems: 'center',
    marginBottom: 16,
  },
  cityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 16,
  },
  bookingId: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: 'bold',
    marginRight: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: COLORS.textLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  bookNowBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookNowText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MyBookingsScreen;
