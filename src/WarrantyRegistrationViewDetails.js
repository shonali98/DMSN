import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,FlatList} from 'react-native';
import DatePicker from 'react-native-date-picker';

function WarrantyRegistrationViewDetails({navigation,route}) {
  const { data ,dsrId} = route.params;

  // const dsrId=extraParams;
  console.log('Received dsrId:', dsrId); 
  const handleback=()=>{
    navigation.navigate('WarrantyRegistration',{data:dsrId})
  }
  const handleHome=()=>{
    navigation.navigate('Home',{data:dsrId})
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={styles.item}>
        <Text style={styles.itemText}>{`Ref No: ${item.warrntyRegRefNo}`}</Text>
        <Text style={styles.itemText}>{`IMEI: ${item.imeiNo}`}</Text>
        <Text style={styles.itemText}>{`Customer Name: ${item.customerName}`}</Text>
        <Text style={styles.itemText}>{`Model: ${item.modleDescription}`}</Text>
        <Text style={styles.itemText}>{`Date: ${item.registerDate}`}</Text>
        {/* Add other fields you want to display */}
      </View>
    </TouchableOpacity>
  );
  const handleItemPress = (item) => {
    // Handle the press event for each item
    console.log('Item pressed:', item);
    navigation.navigate('WarrantyRegistrationViewDetailsForm',{item:item,data:data,dsrId:dsrId})
    // Add your logic here
  };
  

  return (
    // <ScrollView>
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
        <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.warrntyRegRefNo.toString()}
      />
        </View>
         
     
    </View>
    // </ScrollView>
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
    // height:'90%',
    // backgroundColor:'#961316',
    width:'100%',
    alignItems:'center',
    justifyContent:'center',
    // padding:20
    
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
  item: {
    backgroundColor: '#3B3B3B',
    padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  itemText:{
    color:'#fff',
    fontWeight:'500'
  }
});

export default WarrantyRegistrationViewDetails;
