import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,Button ,TextInput} from 'react-native';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
  useCodeScanner,
} from 'react-native-vision-camera';


function WarrantyRegistrationScan({navigation,route}) {
  
  const { data } = route.params;

  console.log('Received dsrId:', data.data[0].extraParams); 
  const handleback=()=>{
    navigation.navigate('WarrantyRegistration',{data})
  }

  const handleHome=()=>{
    navigation.navigate('Home',{data})
  }

  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const[nic,setnic]=useState('')
  const[customerName,setCustomerName]=useState('');
  const[contactNumber,setContactNumber]=useState('');
  const[dob,setDob]=useState('')
  const[sellingPrice,setSellingPrice]=useState('')
  const [isScanning, setIsScanning] = useState(false);
  const [isScanningAllowed, setScanningAllowed] = useState(true); 
  const { hasPermission, requestPermission } = useCameraPermission();
  const[isgranted, setIsGranted]= useState(false)

let device = useCameraDevice('back');

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }else{
      setIsGranted(true);
    }
  },[hasPermission]);  


  console.log(hasPermission);
 
  const codeScanner = useCodeScanner({
    codeTypes: ['code-128'],
    onCodeScanned: (codes) => {

      const data =codes[0].value;
        console.log("imei scaned",data)
      if (isScanningAllowed) {
        setScanned(true)
        setScannedData(codes[0].value)
        setIsScanning(false)
        console.log(`Scanned ${codes[0].value} codes!!`);
      }
    
    },
    
  });


  if (!device) {
    return <Text>Camera is not found!</Text>;
  }

  const stopScanning = () => {
    console.log('Stopping scanning...');
    setIsScanning(false);
  };
  
  return (
    <View style={styles.container}>
        <View style={styles.nav}>
            <TouchableOpacity style={styles.button} onPress={handleback}>
                <Image source={require('./img/back.png')} style={styles.buttonImage} />
            </TouchableOpacity>
            <Text style={styles.navtext}>Warranty Registration</Text>
            <TouchableOpacity style={styles.button} onPress={handleHome}>
                <Image source={require('./img/list.png')} style={styles.buttonImage} />
            </TouchableOpacity>
        </View>

        <View style={styles.options}>
            
        {!scanned && (
        <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        codeScanner={codeScanner}
        isActive={true}
        onCodeScanned={(codes) => {
          console.log('Scanned Codes:', codes);
          stopScanning(); 
        }}
      />
      )}

      {scanned && (
        <View style={styles.scanResultContainer}>

        <View style={styles.formFiled}>
          <TextInput
            style={styles.input}
            placeholder="IMEI "
            placeholderTextColor={'#696969'}
            value={scannedData}
            onChangeText={(text) => setIssueNoteNo(text)}
          />

        </View>
        <View style={styles.formFiled}>
          <TextInput
            style={styles.input}
            placeholder="NIC "
            placeholderTextColor={'#696969'}
            value={nic}
            onChangeText={(text) => setnic(text)}
          />

        </View>
        <View style={styles.formFiled}>
          <TextInput
            style={styles.input}
            placeholder="Customer Name "
            placeholderTextColor={'#696969'}
            value={customerName}
            onChangeText={(text) => setCustomerName(text)}
          />

        </View>
        <View style={styles.formFiled}>
          <TextInput
            style={styles.input}
            placeholder="Contact Number "
            placeholderTextColor={'#696969'}
            value={contactNumber}
            onChangeText={(text) => setContactNumber(text)}
          />

        </View>
        <View style={styles.formFiled}>
          <TextInput
            style={styles.input}
            placeholder="Date Of Birth "
            placeholderTextColor={'#696969'}
            value={dob}
            onChangeText={(text) => setDob(text)}
          />
            <TouchableOpacity style={styles.optionbtn} >
              
                <Image source={require('./img/calender.png')} style={styles.buttonImage} />
            </TouchableOpacity>
        </View>
        <View style={styles.formFiled}>
          <TextInput
            style={styles.input}
            placeholder="Customer Selling Price(Rs) "
            placeholderTextColor={'#696969'}
            value={sellingPrice}
            onChangeText={(text) => setSellingPrice(text)}
          />

        </View>
        <View style={styles.Submit}>
            <TouchableOpacity style={styles.Submitbtn} >
                    <Image source={require('./img/submit.png')} style={styles.SubmitbuttonImage} />
                    <Text style={styles.SubmitbtnText}>Submit</Text>
                </TouchableOpacity>
              
            </View>
        </View>
      )}
    </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  nav:{
    backgroundColor:'#B10104',
    width:'100%',
    alignItems:'center',
    justifyContent:'space-between',
    height:'10%',
    flexDirection:'row',
    paddingLeft:'5%',
  },
  navtext:{
    color:'#fff',
    fontSize:15,
    fontWeight:'600'
  },
  button: {
    padding: 10,
    borderRadius: 5,
   
  },
 
  buttonImage:{
    height:20,
    width:20
  },
  
  options:{
    height:'90%',
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    padding:20
    
  },
  optionbtn:{
    backgroundColor:'#ba181b',
    padding:10,
    margin:10,
    width:'20%',
    alignItems:'center',
    borderRadius:10,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
    elevation: 15, 
    shadowColor: '#000',
    shadowOffset: { width: 17, height: 17 },
    shadowOpacity: 0.2,
    shadowRadius: 50,
    marginVertical: 25,
    
  },
  optionbtnText:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'800',
    padding:20
  },
  formFiled: {
    flexDirection: 'row',
    justifyContent:'flex-start',
    marginVertical: 1,
  },
  input: {
    width:'80%',
    borderBottomWidth: 1,  
    borderBottomColor: '#696969',  
    paddingBottom: 10,  
    marginBottom: '4%', 
  },
  Submit:{
    alignItems:'center',
    marginLeft:20,
    marginRight:20
   
  },
  Submitbtn:{
    backgroundColor:'#2C5E1A',
    width:'50%',
    height: 40,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 35,
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    marginVertical: 10,
    flexDirection:'row',
    justifyContent:'space-between'
   
  },
  SubmitbuttonImage:{
    height:20,
    width:20
  },
  SubmitbtnText:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'800',
  },
});

export default WarrantyRegistrationScan;
