import React, {useState, useEffect} from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import dayjs from 'dayjs';

import {config} from '../config';

function useMoods() {
  const [moods, setMoods] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getData = async () => {
    setRefreshing(true);
    const res = await fetch(`${config.apiURL}/mood`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).catch((e) => console.error(e));
    const json = await res.json();
    setRefreshing(false);
    setMoods(json);
  };

  useEffect(() => {
    getData();
  }, []);

  return {moods, refreshing, reload: getData};
}

export default function OverviewPage() {
  const {moods, refreshing, reload} = useMoods();

  const getLevelStyle = (level) => {
    switch (level) {
      case 1:
        return {backgroundColor: 'orangered'};
      case 2:
        return {backgroundColor: 'orange'};
      case 3:
        return {backgroundColor: 'yellow'};
      case 4:
        return {backgroundColor: 'lightgreen'};
      case 5:
        return {backgroundColor: 'green'};
      default:
        return {};
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={reload} />
        }>
        <Text style={styles.heading}>Overview Page</Text>
        {moods.map(({_id, date, level, mood, note}) => (
          <View key={_id} style={styles.moodView}>
            <View style={styles.moodFirstView}>
              <Text style={styles.dateText}>
                {dayjs(date).format('DD/MM/YYYY HH:mm')}
              </Text>
              <View style={[styles.levelView, getLevelStyle(level)]}>
                <Text>{level}</Text>
              </View>
            </View>
            <Text>
              <Text style={styles.label}>Mood: </Text>
              <Text>{mood}</Text>
            </Text>
            <Text>
              <Text style={styles.label}>Note: </Text>
              <Text>{note || '-'}</Text>
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
  },
  heading: {
    marginTop: 32,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
  },
  label: {
    fontWeight: 'bold',
  },
  moodView: {
    marginTop: 8,
    marginBottom: 8,
    padding: 8,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
  },
  moodFirstView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelView: {
    width: 24,
    height: 24,
    borderRadius: 100,
    padding: 8,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontWeight: 'bold',
  },
});
