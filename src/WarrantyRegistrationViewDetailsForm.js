
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image ,ScrollView} from 'react-native';

const WarrantyRegistrationViewDetailsForm = ({ navigation, route }) => {
  const { item ,data,dsrId} = route.params;
  console.log('Received dsrId:', data); 

  const handleBack = () => {
    navigation.navigate('WarrantyRegistrationView',{data:dsrId});
  };

  const handleHome = () => {
    navigation.navigate('Home', { data:dsrId });
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Image source={require('./img/back.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        <Text style={styles.navtext}>Warranty Registration</Text>
        <TouchableOpacity style={styles.button} onPress={handleHome}>
          <Image source={require('./img/list.png')} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.formContainer}>
        <View style={styles.formField}>
          <Text style={styles.label}>IMEI:</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.value}>{item.imeiNo}</Text>
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>NIC:</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.value}>{item.customerNIC}</Text>
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Customer Name:</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.value}>{item.customerName}</Text>
        </View>
        

        <View style={styles.formField}>
          <Text style={styles.label}>Contact Number</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.value}>{item.contactNo}</Text>
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>date Of Birth:</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.value}>{item.dateOfBirth}</Text>
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Customer Selling Price(Rs.):</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.value}>{item.sellingPrice}</Text>
        </View>

        <View style={styles.formField}>
          <Text style={styles.label}>Remaining Days :</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.value}>{item.remainsDays}</Text>
        </View>

        <View style={styles.submit}>
          <TouchableOpacity style={styles.submitbtn} >
            <Image source={require('./img/submit.png')} style={styles.submitbuttonImage} />
            <Text style={styles.submitbtnText}>Done</Text>
          </TouchableOpacity>
          
        </View>
        {/* Add other fields you want to display */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  nav: {
    backgroundColor: '#B10104',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '10%',
    flexDirection: 'row',
    paddingLeft: '5%',
  },
  navtext: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonImage: {
    height: 20,
    width: 20,
  },
  formContainer: {
    marginTop: 20,
    width: '80%',
  },
  formField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  label: {
    color: '#3B3B3B',
    fontWeight: 'bold',
    fontSize: 16,

  },
  value: {
    color: '#3B3B3B',
    fontSize: 16,
  },
  submit:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',

  },
  submitbtn:{
    backgroundColor:'#ba181b',
    width:'40%',
    height: 40,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 35,
    elevation: 5, // For Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    marginVertical: 10,
    alignItems:'center',
    flexDirection:'row',
   justifyContent:'space-between' ,
   marginHorizontal: 10,

   
  },
  submitbuttonImage: {
    height: 20,
    width: 20,
  },
  submitbtnText:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'800',
  },
});

export default WarrantyRegistrationViewDetailsForm;
