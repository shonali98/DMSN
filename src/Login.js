import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, ImageBackground } from 'react-native';

function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


//   ---------------------------------------------------------------------------------------

// const apiUrl = 'http://203.189.68.156:8181/SingerPortalWebService-4.1/Services/Login';

// const handleLogin = async () => {
//   try {
//     const response = await fetch(`${apiUrl}/UserValidationAndroidP3`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ username, password }),
//     });

//     if (!response.ok) {
//       throw new Error('Invalid credentials');
//     }

//     // Successful login
//     navigation.navigate('Home');
//   } catch (error) {
//     console.error('Login failed:', error);
//     Alert.alert('Error', 'Invalid credentials. Please try again.');
//   }
// };


// -----------------------------------------------------------------------------------------
  // const handleLogin = () => {
  //   const correctUsername = 'user';
  //   const correctPassword = '123';

  //   if (username === correctUsername && password === correctPassword) {
  //     // Successful login
  //   //   Alert.alert('Login Successful', 'Welcome!');
  //     navigation.navigate('Home');
  //   } else {
  //     // Failed login
  //     Alert.alert('Login Failed', 'Invalid username or password. Please try again.');
  //   }
  // };

  const handleLogin = async () => {
    try {
      const url = 'http://dmsn.lk:8282/SingerPortalWebService-4.0/Services/Login/UserValidationAndroidP3';
      const imei = '867353023952463';
      const system = 'SingerAndroid';
  
      const headers = new Headers();
      headers.append('imei', imei);
      headers.append('system', system);
      headers.append('Content-Type', 'application/json'); // Specify JSON content type
  
      const userData = {
        userId: username, // Use the entered username
        password: password, // Use the entered password
      };
  
      const response = await fetch(url, {
        method: 'POST', // Switch to POST method
        headers: headers,
        body: JSON.stringify(userData), // Convert the user data to JSON string
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        const extraParams = data.data[0].extraParams;

        // Now you can use extraParams as needed
        console.log('Extra Params:', extraParams);
        // Continue with the rest of your login logic
        // Check for success condition in your data
  if (data && data.data && data.data.length > 0 ) {
    // Continue with the rest of your login logic
    console.log('Login successful');

    // If successful, navigate to the 'Home' screen
    navigation.navigate('Home', { data });
  } else {
    // Handle unsuccessful login here
    console.error('Login unsuccessful');
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
      // Make a GET request to the server
      const response = await fetch('http://203.189.68.156:8181/');
  
      // Log the response status
      // console.log('Server Response Status:', response.status);
  
      // Get the response text
      const responseText = await response.text();
  
      // Log the entire response content
      // console.log('Server Response:', responseText);
      if (response.status==200){
        console.log("successfull")
      // Alert.alert('Server Response', 'Successfully');
      setServerResult('Successfull')

      }else{
      // Alert.alert('Server Response', 'Unsuccessfully');
      setServerResult('Unsuccessfull')
      }
      handleCheckApp()
    } catch (error) {
      // Handle any other errors that might occur during the request
      console.error('Error during server request:', error);
    }
  };
    const [appResult,setAppResult]=useState('successfull')
    const handleCheckApp = async () => {
    try {
      // Make a GET request to the server
      const response = await fetch('http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/Login/jbossCheck');
  
      // Log the response status
      console.log('App Response Status:', response.status);
  
      // Get the response text
      const responseText = await response.text();
  
      // Log the entire response content
      console.log('App Response:', responseText);
      if (responseText==1){
        console.log("successfull")
        setAppResult('Successfull')
      }else{
        setAppResult('Unsuccessfull')
      }
      handleCheckdb()
    } catch (error) {
      // Handle any other errors that might occur during the request
      console.error('Error during server request:', error);
    }
  };
  
  const [dbResult,setdbResult]=useState('successfull')
  const handleCheckdb = async () => {
  try {
    // Make a GET request to the server
    const response = await fetch('http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/Login/dbCheck');

    // Log the response status
    console.log('db Response Status:', response.status);

    // Get the response text
    const responseText = await response.text();

    // Log the entire response content
    console.log('db Response:', responseText);
    if (responseText==1){
      console.log("successfull")
      setdbResult('Successfull')
    }else{
      setdbResult('Unsuccessfull')
    }
    displayAlert();
  } catch (error) {
    // Handle any other errors that might occur during the request
    console.error('Error during server request:', error);
  }
};

const [isLogDisable,setIsLogDissable]=useState(true)
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
    // Handle any other errors that might occur during the request
    console.error('Error during server request:', error);
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

          <Button color="#CD0405" title="Login" onPress={handleLogin} disabled={isLogDisable}/>
        </View>
        <View style={styles.otherButtons}>
          {/* other buttons */}
          {/* <Button color="#CD0405" title="Server" />
          <Button color="#CD0405" title="App" />
          <Button color="#CD0405" title="Database" /> */}
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
