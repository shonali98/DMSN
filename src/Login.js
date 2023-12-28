import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ImageBackground } from 'react-native';

function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const url = 'http://dmsn.lk:8282/SingerPortalWebService-4.0/Services/Login/UserValidationAndroidP3';
      const imei = '867353023952463';
      const system = 'SingerAndroid';
  
      const headers = new Headers();
      headers.append('imei', imei);
      headers.append('system', system);
      headers.append('Content-Type', 'application/json'); 
  
      const userData = {
        userId: username,
        password: password, 
      };
  
      const response = await fetch(url, {
        method: 'POST', 
        headers: headers,
        body: JSON.stringify(userData), 
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);

        if (data && data.data === null){
          Alert.alert('Login Failed', 'Invalid username or password. Please try again.');

        }else{
          const extraParams = data.data[0].extraParams;

          console.log('Extra Params:', extraParams);
        }
       
        
        if (data && data.data && data.data.length > 0 ) {
    console.log('Login successful');

    navigation.navigate('Home', { data });
  } else {
    Alert.alert('Login Failed', 'Invalid username or password. Please try again.');
  }
      } else {
        console.error('Request failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during login request:', error);
    }
  };
  
  
  const[serverResult,setServerResult]=useState('successfull')
  const handleCheckServer = async () => {
    try {
      const response = await fetch('http://203.189.68.156:8181/');
  
  
      const responseText = await response.text();
  
      if (response.status==200){
        console.log("successfull")
      setServerResult('Successfull')

      }else{
      setServerResult('Unsuccessfull')
      }
      handleCheckApp()
    } catch (error) {
      console.error('Error during server request:', error);
    }
  };
    const [appResult,setAppResult]=useState('successfull')
    const handleCheckApp = async () => {
    try {
      const response = await fetch('http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/Login/jbossCheck');
  
      console.log('App Response Status:', response.status);
  
      const responseText = await response.text();
  
      console.log('App Response:', responseText);
      if (responseText==1){
        console.log("successfull")
        setAppResult('Successfull')
      }else{
        setAppResult('Unsuccessfull')
      }
      handleCheckdb()
    } catch (error) {
      console.error('Error during server request:', error);
    }
  };
  
  const [dbResult,setdbResult]=useState('successfull')
  const handleCheckdb = async () => {
  try {
    const response = await fetch('http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/Login/dbCheck');

    console.log('db Response Status:', response.status);

    const responseText = await response.text();

    console.log('db Response:', responseText);
    if (responseText==1){
      console.log("successfull")
      setdbResult('Successfull')
    }else{
      setdbResult('Unsuccessfull')
    }
    displayAlert();
  } catch (error) {
    console.error('Error during server request:', error);
  }
};

const [isLogDisable,setIsLogDissable]=useState(false)
const displayAlert = async () => {
  try {
      
    Alert.alert(
      'Response',
      `Server: ${serverResult ? 'Successfull' : 'Unsuccessfull'}\nApp: ${appResult ? 'Successfull' : 'Unsuccessfull'}\nDatabase: ${dbResult ? 'Successfull' : 'Unsuccessfull'}`
    );
     if(serverResult  && appResult  && dbResult  ){
      setIsLogDissable(false)
     } 
  
  } catch (error) {
    console.error('Error during server request:', error);
    setIsLogDissable(true)

  }
};
  return (
    <>
      <ImageBackground source={require('./img/bg.jpg')} style={styles.container1}>
        <View style={styles.container}>
          <Text style={styles.topic}>Welcome</Text>
          <Text style={styles.text}>Login </Text>
          <Text style={styles.text1}>Username </Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          <Text style={styles.text1}>Password </Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          <Button color="#CD0405" title="Login" 
          onPress={() => {
            handleCheckServer();
            handleLogin();
          }}
          disabled={isLogDisable}/>
        </View>
        <View style={styles.otherButtons}>
          <Button color="#CD0405" title="Check Connection " onPress={handleCheckServer} />

        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container1: {
    resizeMode: 'cover',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '40%',
  },

  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  text1: {
    fontSize: 15,
    textAlign: 'left',
    marginRight: '40%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 8,
    width: 200,
  },
  topic: {
    fontSize: 30,
    textAlign: 'center',
  },

  otherButtons: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '60%',
    marginLeft: '20%',
    height: '20%',
    marginBottom: 40,
  },
});

export default Login;
