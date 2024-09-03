import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
function IssueInventoryIssue({navigation,route}) {
  const{data}=route.params;
  console.log("received dsrId-----------------------------------",data.distributorName)

  console.log("received dsrId",data.data[0].userId)

  console.log("received dsrId", data.data[0].dsrId)

  const [selectedValue, setSelectedValue] = useState('');
  const[date,setDate]=useState('')
  const[status,setStatus]=useState('')

  const handleback=async()=>{
    navigation.navigate('IssueInventory',{data})
  }

  const handleHome=async()=>{
    navigation.navigate('Home',{data})
  }

  const gotoNext=async()=>{
    console.log("selected dsr",selectedValue)
    console.log("dsr",dsrDetails)


// Find the user details based on the selected user
const userDetails = dsrDetails.find(dsr => dsr.bisName === selectedValue);

// Check if the user is found and log the details
if (userDetails) {
    console.log('User Details:', userDetails);
} else {
    console.log('User not found in dsrDetails.');
}
    navigation.navigate('IssueInventoryIssueNext',{data:data,userDetails:userDetails})
  }

  const[options,setOptions]=useState([])
  const [dsrDetails,setDsrDetails]=useState([])
  const handleGetDsrSub = async () => {
    try {
      console.log("--------------",data.data[0].userId)
      const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/UserTypeLists/getUserTypeListLowUpper?userId=${data.data[0].userId}&distributorName=${data.distributorName}`;
      // const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/UserTypeLists/getUserTypeListLowUpper?userId=mtec`;
  
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {},
      });
  
      if (response.ok) {
        const responseData = await response.json();
  
        console.log("Data received:", responseData);
  
        // Extract bisName values from the array
        // const users = responseData.data.map(item => item.userId);
        // console.log("users",users)
        // setOptions(users);
        // Add a default prompt to the beginning of the options array
        setDsrDetails(responseData.data)
        const users = ['Select DSR/SubDealer', ...responseData.data.map(item => item.userId)];
        console.log("users",users)
        setOptions(users);
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("Error during request:", error);
    }
  };
  
    useEffect(() => {
      handleGetDsrSub();
    }, []);

    useEffect(() => {
      // Set the current date when the component mounts
      const currentDate = new Date().toISOString().split('T')[0];
      setDate(currentDate);
    }, []);
  return (
    <View style={styles.container}>
        <View style={styles.nav}>
        <   TouchableOpacity style={styles.button} onPress={handleback}>
                <Image source={require('./img/back.png')} style={styles.buttonImage} />
            </TouchableOpacity>
            <Text style={styles.navtext}>Issue Inventory</Text>
            <TouchableOpacity style={styles.button} onPress={handleHome}>
                <Image source={require('./img/list.png')} style={styles.buttonImage} />
            </TouchableOpacity>
        </View>

        <View style={styles.details}>
            <View style={styles.formFiled}>
              <Text style={styles.optionbtnText}>To</Text>

              
              <Picker
            style={styles.input1}
            selectedValue={selectedValue}
            onValueChange={(itemValue) => {
              setSelectedValue(itemValue);
              // Set the status to "Complete" when any option is selected
              // setStatus('Complete');
              // Check if the selected value is not the default prompt before setting the status
              if (itemValue !== 'Select DSR/SubDealer') {
                setStatus('Complete');

              } else {
              // Handle the case where the default prompt is selected
              setStatus('');
              }
            }}
          >
              {options.map((option, index) => (
            <Picker.Item key={index} label={option} value={option} style={styles.pickerItem} />
            ))}
            </Picker>

            </View>
            
            <View style={styles.formFiled}>
                <Text style={styles.optionbtnText}>Date</Text>
                <TextInput
            style={styles.input}
            placeholder="Date"
            placeholderTextColor={'#696969'}
            value={date}
            editable={false}
            onChangeText={(text) => setDate(text)}
          />
            </View>
            
            <View style={styles.formFiled}>
                <Text style={styles.optionbtnText}>Status </Text>
                <TextInput
            style={styles.input}
            placeholder="Not Complete"
            placeholderTextColor={'#696969'}
            value={status}
            editable={false}
            onChangeText={(text) => setStatus(text)}
          />
            </View>
            <View style={styles.next}>
            <TouchableOpacity
                style={[styles.nextButton]}
                onPress={gotoNext}
                disabled={status !== 'Complete'}
            >
                <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>                
            
        </View>
            
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
    // backgroundColor:'#6D0E10',
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
  details:{
    width:'100%',
    paddingLeft:10,
    paddingRight:10,
    // backgroundColor:'#961316',
    height:'90%'
  },
 formFiled:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:'25%'
  },
  input:{
    // backgroundColor:'#000',
    width:'80%',
    borderBottomWidth: 1,  
    borderBottomColor: '#696969',  
    paddingBottom: 10,  
    // marginBottom: 20, 
    color:'#000'
  },
  input1: {
    height: 40,
    width:'80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    paddingHorizontal: 10,
    backgroundColor: '#696969', // Background color of the picker
    borderRadius: 5,
  },
  
  
  pickerItem: {
    color: 'black', // Text color of the picker item
    fontSize: 16, // Font size of the picker item
    // Add other styles as needed
  },
  button: {
    padding: 10,
    borderRadius: 5,
   
  },
  buttonImage:{
    height:30,
    width:30
  },
  
  
  optionbtn:{
    // backgroundColor:'#CD0405',
    // padding:10,
    // margin:10,
    width:'35%',
    // borderRadius:50,
    height: 40,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: 'transparent',
    elevation: 5, // For Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    marginVertical: 10,
   
  },
  optionbtnText:{
    color:'#000',
    textAlign:'center',
    fontWeight:'800',

  },
  formFiled1:{
    flexDirection:'row',
    justifyContent:'space-between',
    // alignItems:'center',
    height:'20%'
    
   
  },
  next:{
    alignItems:'center',
  },
  nextButton:{
    backgroundColor:'#2C5E1A',
    // padding:10,
    // margin:10,
    width:'40%',
    // borderRadius:50,
    height: 40,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    // backgroundColor: 'transparent',
    elevation: 5, // For Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    marginVertical: 10,
   
  },
  nextButtonText:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'800',
  },
  
  
});

export default IssueInventoryIssue;
