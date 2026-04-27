import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import BusCard from '../components/BusCard';
import LoadingScreen from '../components/LoadingScreen';
import api from '../api/api';
import { COLORS } from '../utils/constants';

const BusListScreen = ({ route, navigation }) => {
  const { source, destination, date } = route.params;
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      setLoading(true);
      // In a real scenario, pass source/dest/date as query params
      const response = await api.get('/api/buses');
      
      // Basic client-side filtering if backend doesn't support it yet
      let filteredBuses = response.data.data || response.data;
      if (Array.isArray(filteredBuses)) {
        filteredBuses = filteredBuses.filter(bus => 
          bus.source.toLowerCase().includes(source.toLowerCase()) && 
          bus.destination.toLowerCase().includes(destination.toLowerCase())
        );
        setBuses(filteredBuses);
      } else {
        setBuses([]);
      }
    } catch (error) {
      console.log('Fetch buses error:', error);
      Alert.alert('Error', 'Failed to fetch buses');
    } finally {
      setLoading(false);
    }
  };

  const handleBusSelect = (bus) => {
    navigation.navigate('BusDetails', { bus });
  };

  if (loading) {
    return <LoadingScreen message="Searching for buses..." />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerInfo}>
        <Text style={styles.routeText}>{source} to {destination}</Text>
        <Text style={styles.dateText}>{date} • {buses.length} Buses Found</Text>
      </View>

      {buses.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No buses found for this route.</Text>
        </View>
      ) : (
        <FlatList
          data={buses}
          keyExtractor={(item) => item._id || item.id?.toString()}
          renderItem={({ item }) => (
            <BusCard bus={item} onPress={() => handleBusSelect(item)} />
          )}
          contentContainerStyle={styles.listContainer}
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
  headerInfo: {
    backgroundColor: COLORS.primary,
    padding: 16,
    paddingBottom: 24,
  },
  routeText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    color: COLORS.peach,
    fontSize: 14,
    marginTop: 4,
  },
  listContainer: {
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.textLight,
  },
});

export default BusListScreen;
