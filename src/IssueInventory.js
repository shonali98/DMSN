import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';

function IssueInventory({navigation,route}) {
  const { data } = route.params;

  // const dsrId=extraParams;
  console.log('Received dsrId:', data.data[0].dsrId); 
  const handleHome = () => {
    navigation.navigate('Home',{data})
    
  };
  const [dsrList,setDsrList]=useState([])
  const handleGotoIssue =async()=>{
    navigation.navigate('IssueInventoryIssue',{data})
    
  }
  const handleback=()=>{
    navigation.navigate('Home',{data})
  }
  const handleGotoView =()=>{
    navigation.navigate('IssueInventoryView',{data})
  }
  return (
    <View style={styles.container}>
        <View style={styles.nav}>
            <TouchableOpacity style={styles.button} onPress={handleback}>
                <Image source={require('./img/back.png')} style={styles.buttonImage} />
            </TouchableOpacity>
            <Text style={styles.navtext}>Issue Inventory</Text>
            <TouchableOpacity style={styles.button} onPress={handleHome}>
                {/* <Text style={styles.buttonText}>Change password</Text> */}
                <Image source={require('./img/list.png')} style={styles.buttonImage} />
            </TouchableOpacity>
        </View>

        <View style={styles.options}>
            <TouchableOpacity style={styles.optionbtn} onPress={handleGotoIssue}>
              <Image source={require('./img/issueInventory1.png')} style={styles.buttonImage} />
                <Text style={styles.optionbtnText}>Issue</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionbtn} onPress={handleGotoView}>
              <Image source={require('./img/acceptInView.png')} style={styles.buttonImage} />
                <Text style={styles.optionbtnText}>View</Text>
            </TouchableOpacity>
            
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
    height:30,
    width:30
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
    width:'60%',
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
  }

});

export default IssueInventory;
