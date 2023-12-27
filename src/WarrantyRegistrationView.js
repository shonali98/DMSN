import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,Button ,TextInput} from 'react-native';

function WarrantyRegistrationView({navigation,route}) {
  const { data } = route.params;

  // const dsrId=extraParams;
  console.log('Received dsrId:', data.data[0].extraParams); 
  const [exchangeRefNo,setExchangeRefNo]=useState('');
  const [imeiNo,setImeiNo]=useState('');
  const [customerName,setCustomerName]=useState('');
  const [product,setProduct]=useState('');
  const [fromDate,setFromDate]=useState('');
  const [toDate,setToDate]=useState('');
  const [model,setModel]=useState('');
  const handleback=()=>{
    navigation.navigate('WarrantyRegistration',{data})
  }
  const handleHome=()=>{
    navigation.navigate('Home',{data})
  }
  const handleWarrantyRegSearch =async  () => {
    console.log("exchange ref no",exchangeRefNo);
    console.log("IMEI no",imeiNo);
    console.log("model no",model);
    console.log("product no",product);
    console.log("customer name",customerName);



    try {

        const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/WarrentyRegistrations/getWarrentyRegistration?bisId=2523&imeiNo=${imeiNo}&customerName=${customerName}&product=${product}&modleDescription=${model}&warrntyRegRefNo=${exchangeRefNo}`;
        
        
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {

          },
        });

        if (response.ok) {

          const data = await response.json();
          console.log("data",data)

          
        } else {

          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error during request:", error);
      }

    };
  return (
    <View style={styles.container}>
        <View style={styles.nav}>
            <TouchableOpacity style={styles.button} onPress={handleback}>
                <Image source={require('./img/back.png')} style={styles.buttonImage} />
            </TouchableOpacity>
            <Text style={styles.navtext}>Warranty Registration</Text>
            <TouchableOpacity style={styles.button} onPress={handleHome}>
                {/* <Text style={styles.buttonText}>Change password</Text> */}
                <Image source={require('./img/list.png')} style={styles.buttonImage} />
            </TouchableOpacity>
        </View>

        <View style={styles.options}>
        <View style={styles.formFiled}>
          <TextInput
            style={styles.input}
            placeholder="Exchange REf No "
            placeholderTextColor={'#696969'}
            value={exchangeRefNo}
            onChangeText={(text) => setExchangeRefNo(text)}
          />

        </View>    
        <View style={styles.formFiled}>
          <TextInput
            style={styles.input}
            placeholder="IMEI No "
            placeholderTextColor={'#696969'}
            value={imeiNo}
            onChangeText={(text) => setImeiNo(text)}
          />

        </View>
        <View style={styles.formFiled}>
          <TextInput
            style={styles.input}
            placeholder="Customer Name  "
            placeholderTextColor={'#696969'}
            value={customerName}
            onChangeText={(text) => setCustomerName(text)}
          />

        </View>
        <View style={styles.formFiled}>
          <TextInput
            style={styles.input}
            placeholder="Product "
            placeholderTextColor={'#696969'}
            value={product}
            onChangeText={(text) => setProduct(text)}
          />

        </View>    
        <View style={styles.formFiled}>
          <TextInput
            style={styles.input}
            placeholder="Model "
            placeholderTextColor={'#696969'}
            value={model}
            onChangeText={(text) => setModel(text)}
          />

        </View>
        <View style={styles.formFiled}>
          <TextInput
            style={styles.input}
            placeholder="From Date "
            placeholderTextColor={'#696969'}
            value={fromDate}
            onChangeText={(text) => setFromDate(text)}
          />

        </View>
        <View style={styles.formFiled}>
          <TextInput
            style={styles.input}
            placeholder="To Date "
            placeholderTextColor={'#696969'}
            value={toDate}
            onChangeText={(text) => setToDate(text)}
          />

        </View> 
        <View style={styles.Search}>
            <TouchableOpacity style={styles.Searchbtn}  onPress={handleWarrantyRegSearch}>
                    <Image source={require('./img/search.png')} style={styles.SearchbuttonImage} />
                    <Text style={styles.SearchbtnText}>Search</Text>
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
  button: {
    padding: 10,
    borderRadius: 5,
   
  },
  // buttonImage:{
  //   height:30,
  //   width:30
  // },
  
  // options:{
  //   height:'90%',
  //   // backgroundColor:'#961316',
  //   width:'100%',
  //   alignItems:'center',
  //   justifyContent:'center',
    
  // },
  // optionbtn:{
  //   // backgroundColor:'#fff',
  //   backgroundColor:'#961316',

  //   padding:10,
  //   margin:10,
  //   width:'60%',
  //   borderRadius:10,
  //   borderRadius: 5,
  //   paddingVertical: 10,
  //   paddingHorizontal: 25,
  //   elevation: 15, 
  //   shadowColor: '#000',
  //   shadowOffset: { width: 17, height: 17 },
  //   shadowOpacity: 0.2,
  //   shadowRadius: 50,
  //   marginVertical: 25,
    
  // },
  // optionbtnText:{
  //   color:'#fff',
  //   textAlign:'center',
  //   fontWeight:'800'
  // }
  buttonImage:{
    height:20,
    width:20
  },
  
  options:{
    height:'90%',
    // backgroundColor:'#961316',
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    padding:20
    
  },
  optionbtn:{
    // backgroundColor:'#fff',
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
    // alignItems:'center',
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
  Search:{
    // flexDirection:'row',
    alignItems:'center',
    marginLeft:20,
    marginRight:20
   
  },
  Searchbtn:{
    backgroundColor:'#2C5E1A',
    // padding:10,
    // margin:10,
    width:'50%',
    // borderRadius:50,
    height: 40,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 35,
    // backgroundColor: 'transparent',
    elevation: 5, // For Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    marginVertical: 10,
    flexDirection:'row',
    justifyContent:'space-between'
   
  },
  SearchbuttonImage:{
    height:20,
    width:20
  },
  SearchbtnText:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'800',
  },
});

export default WarrantyRegistrationView;
