import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,TextInput,FlatList } from 'react-native';

function MyStoreDetails({navigation,route}) {
  const { data,item } = route.params;
  
  console.log('Received dsrId:', data.data[0].extraParams); 
  console.log('Received item:', item.modelNo); 

  const [myStoredata,setMyStoreData]=useState([]);
  
 
  const handleback=()=>{
    navigation.navigate('MyStore',{data})
  }

  const handleHome=()=>{
    navigation.navigate('Home',{data})
  }
  const handleMyStore =async  () => {

    try {

        const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/IssueInventories/inqUserModelImei?dSRId=${data.data[0].extraParams}&modelNo=${item.modelNo}`;
        
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {

          },
        });

        if (response.ok) {

          const data = await response.json();

          console.log("Data received:", data);
          setMyStoreData(data)

        } else {

          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error during request:", error);
      }
    };
    useEffect(() => {
        handleMyStore();
      }, []);


      
  return (
    <View style={styles.container}>
        <View style={styles.nav}>
            <TouchableOpacity style={styles.button} onPress={handleback}>
                <Image source={require('./img/back.png')} style={styles.buttonImage} />
            </TouchableOpacity>
            <Text style={styles.navtext}>My Store</Text>
            <TouchableOpacity style={styles.button} onPress={handleHome} >
                {/* <Text style={styles.buttonText}>Change password</Text> */}
                <Image source={require('./img/list.png')} style={styles.buttonImage} />
            </TouchableOpacity>
        </View>

        <View style={styles.options}>
        <View style={styles.formFiled}>
            <View style={styles.formFiled1}>
                <Text style={styles.input1}>Items : </Text>
                <Text style={styles.input1}>{myStoredata.totalRecords} </Text>

            </View>
            <View style={styles.formFiled1}>
                <Text style={styles.input1}>Total Cost : </Text>
                {/* <Text style={styles.input1}> </Text> */}
                
            </View>
          

        </View>
        <View style={styles.items}>
        <FlatList
          style={styles.items}
          data={myStoredata.data}
          keyExtractor={(item) => item.erpNo}
          renderItem={({ item }) => (

      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>IMEI No.:- {item.imeiNo}</Text>
      </View>
          )}
        />
        </View>
        
        </View>
       
        

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height:30,
    width:30
  },
  
  input: {
    width:'80%',
     
  },
  input1:{
    fontWeight:'600',
    fontSize:15,
    color:'white'

  },
  formFiled2:{
    backgroundColor:'#000'
  },


options: {
    flex: 1, 
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    alignItems: 'stretch', 
  },

  formFiled: {
    flex: 0.1, 
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#44444C',
  },

  items: {
    flex: 0.85, 
    width: '100%',
  },

  formFiled1: {
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    flexDirection:'column'
  },

  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  touchableOpacity: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
  },
  
});

export default MyStoreDetails;
