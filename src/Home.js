import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';

function Home({navigation,route}) {

  const { data } = route.params;

  // const dsrId=extraParams;
  console.log('Received dsrId:', data.data[0].extraParams); 

  const handleLogin = () => {
    navigation.navigate('Login');

  };

  const handleAcceptInventory =()=>{
    navigation.navigate('AcceptInventory', {data });
  }

  const handleIssueInventory=()=>{
    navigation.navigate('IssueInventory', { data })
  }

  const handleWarrantyRegistration=()=>{
    navigation.navigate('WarrantyRegistration', { data })
  }

  const handleMyStore =()=>{
    navigation.navigate('MyStore',{data})
  }
  return (
    <View style={styles.container}>
        <View style={styles.nav}>
        
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Image source={require('./img/changepassword.png')} style={styles.buttonImage} />

            </TouchableOpacity>
        </View>

        <View style={styles.options}>
            <TouchableOpacity style={styles.optionbtn} onPress={handleAcceptInventory}>
                <View  style={styles.opImage}>
                    <Image source={require('./img/acceptInventory.png')} style={styles.optionbuttonImage} />
                </View>
                <View  style={styles.opText}>
                    <Text style={styles.optionbtnText}>Accept Inventory</Text>
                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.optionbtn} onPress={handleChangePassword}>
                <View  style={styles.opImage}>
                    <Image source={require('./img/chequeReturn.png')} style={styles.optionbuttonImage} />
                </View>
                <View  style={styles.opText}>
                    <Text style={styles.optionbtnText}>Cheque Return Settlement</Text>
                </View>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.optionbtn} onPress={handleIssueInventory}>
                <View  style={styles.opImage}>
                    <Image source={require('./img/issueInventory.png')} style={styles.optionbuttonImage} />
                </View>
                <View  style={styles.opText}>
                    <Text style={styles.optionbtnText}>Issue Inventory</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionbtn} onPress={handleMyStore}>
                <View  style={styles.opImage}>
                    <Image source={require('./img/store.png')} style={styles.optionbuttonImage} />
                </View>
                <View  style={styles.opText}>
                    <Text style={styles.optionbtnText}>My store</Text>
                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.optionbtn} onPress={handleChangePassword}>
                <View  style={styles.opImage}>
                    <Image source={require('./img/promotion.png')} style={styles.optionbuttonImage} />
                </View>
                <View  style={styles.opText}>
                    <Text style={styles.optionbtnText}>Promotion</Text>
                </View>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.optionbtn} onPress={handleChangePassword}>
            <View  style={styles.opImage}>
                    <Image source={require('./img/shopVisit.png')} style={styles.optionbuttonImage} />
                </View>
                <View  style={styles.opText}>
                    <Text style={styles.optionbtnText}>Shop visits Check</Text>
                </View>
            </TouchableOpacity> */}
            <TouchableOpacity style={styles.optionbtn} onPress={handleWarrantyRegistration}>
            <View  style={styles.opImage}>
                    <Image source={require('./img/warrantyReg.png')} style={styles.optionbuttonImage} />
                </View>
                <View  style={styles.opText}>
                    <Text style={styles.optionbtnText}>Warranty Registration</Text>
                </View>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.optionbtn} onPress={handleChangePassword}>
            <View  style={styles.opImage}>
                    <Image source={require('./img/completeTransaction.png')} style={styles.optionbuttonImage} />
                </View>
                <View  style={styles.opText}>
                    <Text style={styles.optionbtnText}>Complete Day Transaction</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionbtn} onPress={handleChangePassword}>
            <View  style={styles.opImage}>
                    <Image source={require('./img/invoiceSettlement.png')} style={styles.optionbuttonImage} />
                </View>
                <View  style={styles.opText}>
                    <Text style={styles.optionbtnText}>Invoice Settlements</Text>
                </View>
            </TouchableOpacity> */}
        </View>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'#F29C9E'

  },
  nav:{
    backgroundColor:'#B10104',
    // backgroundColor:'#a4161a',

    width:'100%',
    alignItems:'center',
    height:'10%'
  },
  button: {
    // backgroundColor: '#fff',
    // padding: 10,
    borderRadius: 5,
    marginLeft:'90%',
    margin:10
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color:'#000'
  },
  buttonImage:{
    height:30,
    width:30
  },
  options:{
    height:'90%',
    backgroundColor:'#fff',
    width:'100%',
    alignItems:'center',
    justifyContent:'center'
    // marginTop:10
  },
  optionbtn:{
    backgroundColor:'#ba181b',
    padding:10,
    margin:8,
    borderRadius:20,
    flexDirection:'row',
    justifyContent:'space-evenly',
    paddingRight:'10%',
    width:'80%'
    
  },
  
  optionbtnText:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'800',
  },
  
  optionbuttonImage:{
    height:20,
    width:20,
  },
  opImage:{
    width:'20%'
  },
  opText:{
    width:'80%'
  }
});

export default Home;


