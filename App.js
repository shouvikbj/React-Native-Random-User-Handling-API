import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Axios from 'axios';
import {Button} from 'native-base';
import User from './components/User';

const App = () => {
  const [details, setDetails] = useState(null);

  const fetchDetails = async () => {
    try {
      const {data} = await Axios.get('https://randomuser.me/api/');
      const details = data.results[0];
      setDetails(details);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (!details) {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#222831" />
        <Text style={{color: 'white'}}>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#222831" />
        <User details={details} />
        <View>
          <Button
            rounded
            style={styles.button}
            onPress={() => {
              setDetails(null);
              fetchDetails();
            }}>
            <Text style={{color: 'white'}}>Get New User</Text>
          </Button>
        </View>
      </View>
    );
  }
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222831',
  },
  button: {
    marginTop: 30,
    paddingHorizontal: 30,
  },
});
