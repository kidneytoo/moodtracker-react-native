import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {config} from '../config';

export default function MainPage() {
  const [level, setLevel] = useState();
  const [mood, setMood] = useState();
  const [note, setNote] = useState();

  const onSubmit = async () => {
    await fetch(`${config.apiURL}/mood`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        level,
        mood,
        note,
        date: new Date().toISOString(),
      }),
    }).catch((e) => console.error(e));
  };

  const disabled = !level || !mood;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.heading}>Add your Mood</Text>
        <Text style={styles.label}>Choose your mood level</Text>
        <View style={styles.levelContainer}>
          <View>
            <TouchableOpacity
              onPress={() => setLevel(1)}
              style={[
                styles.levelButton,
                {backgroundColor: 'orangered'},
                level === 1 ? {borderWidth: 4, borderColor: 'black'} : {},
              ]}>
              <Text style={styles.levelButtonText}>1</Text>
            </TouchableOpacity>
            <Text style={styles.moodText}>Terrible</Text>
          </View>
          <TouchableOpacity
            onPress={() => setLevel(2)}
            style={[
              styles.levelButton,
              {backgroundColor: 'orange'},
              level === 2 ? {borderWidth: 4, borderColor: 'black'} : {},
            ]}>
            <Text style={styles.levelButtonText}>2</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={() => setLevel(3)}
              style={[
                styles.levelButton,
                {backgroundColor: 'yellow'},
                level === 3 ? {borderWidth: 4, borderColor: 'black'} : {},
              ]}>
              <Text style={styles.levelButtonText}>3</Text>
            </TouchableOpacity>
            <Text style={styles.moodText}>Ok</Text>
          </View>
          <TouchableOpacity
            onPress={() => setLevel(4)}
            style={[
              styles.levelButton,
              {backgroundColor: 'lightgreen'},
              level === 4 ? {borderWidth: 4, borderColor: 'black'} : {},
            ]}>
            <Text style={styles.levelButtonText}>4</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              onPress={() => setLevel(5)}
              style={[
                styles.levelButton,
                {backgroundColor: 'green'},
                level === 5 ? {borderWidth: 4, borderColor: 'black'} : {},
              ]}>
              <Text style={styles.levelButtonText}>5</Text>
            </TouchableOpacity>
            <Text style={styles.moodText}>Great</Text>
          </View>
        </View>
        <Text style={styles.label}>Choose your mood</Text>
        <View style={styles.moodContainer}>
          <View style={styles.moodButtonView}>
            <TouchableOpacity
              onPress={() => setMood('happy')}
              style={[
                styles.moodButton,
                mood === 'happy'
                  ? {borderColor: 'black'}
                  : {borderColor: 'lightgray'},
              ]}>
              <Text style={styles.moodButtonText}>Happy</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.moodButtonView}>
            <TouchableOpacity
              onPress={() => setMood('angry')}
              style={[
                styles.moodButton,
                mood === 'angry'
                  ? {borderColor: 'black'}
                  : {borderColor: 'lightgray'},
              ]}>
              <Text style={styles.moodButtonText}>Angry</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.moodButtonView}>
            <TouchableOpacity
              onPress={() => setMood('stressed')}
              style={[
                styles.moodButton,
                mood === 'stressed'
                  ? {borderColor: 'black'}
                  : {borderColor: 'lightgray'},
              ]}>
              <Text style={styles.moodButtonText}>Stressed</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.moodButtonView}>
            <TouchableOpacity
              onPress={() => setMood('hopeful')}
              style={[
                styles.moodButton,
                mood === 'hopeful'
                  ? {borderColor: 'black'}
                  : {borderColor: 'lightgray'},
              ]}>
              <Text style={styles.moodButtonText}>Hopeful</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.moodButtonView}>
            <TouchableOpacity
              onPress={() => setMood('sad')}
              style={[
                styles.moodButton,
                mood === 'sad'
                  ? {borderColor: 'black'}
                  : {borderColor: 'lightgray'},
              ]}>
              <Text style={styles.moodButtonText}>Sad</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.moodButtonView}>
            <TouchableOpacity
              onPress={() => setMood('normal')}
              style={[
                styles.moodButton,
                mood === 'normal'
                  ? {borderColor: 'black'}
                  : {borderColor: 'lightgray'},
              ]}>
              <Text style={styles.moodButtonText}>Normal</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.label}>Need some Note?</Text>
        <TextInput
          multiline
          style={styles.textInput}
          onChangeText={(text) => setNote(text)}
          value={note}
        />
        <View style={styles.levelContainer}>
          <TouchableOpacity
            onPress={() => onSubmit()}
            disabled={disabled}
            style={[
              styles.submitBtn,
              disabled
                ? {backgroundColor: 'lightblue'}
                : {backgroundColor: '#007aff'},
            ]}>
            <Text style={styles.submitBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  levelContainer: {
    marginTop: 16,
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  levelButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
  },
  levelButtonText: {
    fontSize: 18,
  },
  moodText: {
    marginTop: 8,
    textAlign: 'center',
  },
  moodContainer: {
    marginTop: 8,
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  moodButtonView: {
    padding: 8,
    flexBasis: '50%',
  },
  moodButton: {
    borderRadius: 16,
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 2,
  },
  moodButtonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  textInput: {
    marginTop: 15,
    marginBottom: 24,
    height: 80,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  submitBtn: {
    padding: 8,
    width: 128,
    borderRadius: 8,
  },
  submitBtnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
