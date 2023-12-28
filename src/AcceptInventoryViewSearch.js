// import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,TextInput,Alert,FlatList,Modal ,Button} from 'react-native';
import React , {useState}from 'react';


function AcceptInventoryViewSearch({navigation,route}) {
  const { data,displayData ,selectedOption} = route.params;

  console.log('Received dsrid:', data.data[0].extraParams);
  console.log('data:', displayData);
  const [loadingIssueNo, setLoadingIssueNo] = useState(false);

  

  const handleback=()=>{
    navigation.navigate('AcceptInventoryView',{data})
  }

  const handleHome=()=>{
    navigation.navigate('Home',{data})
  }
  const handleIssueNo = (issueNo) => {
    navigation.navigate('AcceptInventoryViewSearchView', { data:data, issueNo:issueNo,displayData:displayData,selectedOption:selectedOption });
    setLoadingIssueNo(false)
  };

       
        const [showFlatList, setShowFlatList] = useState(true);      
        const renderItem = ({ item }) => (
            
            // <TouchableOpacity onPress={() => handleIssueNo(item.issueNo) } >
            <TouchableOpacity onPress={() => {
                handleIssueNo(item.issueNo);
                setLoadingIssueNo(true)
            }}>
            <View style={styles.itemContainer} >
                <Text  style={styles.itemContainerText}>{`Issue Note No: ${item.issueNo}`}</Text>
                <Text style={{ color: selectedOption === 'Pending' ? 'orange' : 'black' }}>
                    {`Status: ${selectedOption}`}
                </Text>
                <Text style={styles.itemContainerText}>{`Date: ${item.issueDate}`}</Text>
                <Text style={styles.itemContainerText}>{`Manual Rec.  No: ${item.manualReceiptNo}`}</Text>
            </View>
            </TouchableOpacity>
          );
  return (
    <View style={styles.container}>
        <View style={styles.nav}>
        <   TouchableOpacity style={styles.button} onPress={handleback}>
                <Image source={require('./img/back.png')} style={styles.buttonImage} />
            </TouchableOpacity>
            <Text style={styles.navtext}>Accept Inventory</Text>
            <TouchableOpacity style={styles.button} onPress={handleHome}>
                <Image source={require('./img/list.png')} style={styles.buttonImage} />
            </TouchableOpacity>
        </View>
        <View style={styles.details}>
        {showFlatList && (
        <FlatList
          data={displayData}
          renderItem={renderItem}
          keyExtractor={(item) => item.issueNo.toString()}
        />
      )}
        
        </View>
        {loadingIssueNo && (
          <Modal visible={loadingIssueNo} transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent1}>
              <Image
                source={require('./img/loading2.gif')}
                style={styles.LoadingbuttonImage}
              />
              </View>
            </View>
          </Modal>
        )}
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
    // paddingLeft:10,
    // paddingRight:10,
    // backgroundColor:'#961316',
    // height:'20%',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    // marginTop:'5%'
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor:'#fff',
    
  },
  itemContainerText:{
    color:'#000',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  LoadingbuttonImage:{
    height:100,
    width:100,
  },
  modalContent1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
    padding:'20%'  
  },
});

export default AcceptInventoryViewSearch;
