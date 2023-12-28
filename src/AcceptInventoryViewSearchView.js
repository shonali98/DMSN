// import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,TextInput,Alert,FlatList,Modal ,Button} from 'react-native';
import React , {useState,useEffect}from 'react';


function AcceptInventoryViewSearchView({navigation,route}) {
  const { data,issueNo,displayData,selectedOption} = route.params;
 const[selectedIssueNo,setSelectedIssueNo]=useState(issueNo)
  console.log('Received dsrid:', data.data[0].extraParams);
  console.log('issue no',issueNo);
  console.log('display data',displayData);



  

  const handleback=()=>{
    navigation.navigate('AcceptInventory',{data})
  }

  const handleHome=()=>{
    navigation.navigate('Home',{data})
  }
  
  const [details,setdetails]=useState([])
      const handleGetItems =async  (issueNo) => {
        try {
    
            const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/AcceptInventories/getAcceptInventoryImei?issueNo=${issueNo}`;
            
            const response = await fetch(apiUrl, {
              method: "GET",
              headers: {
    
              },
            });
    
            if (response.ok) {
    
              const data = await response.json();
              console.log("data",data.data)
             setdetails(data.data)
              
            } else {
    
              console.error("Request failed with status:", response.status);
            }
          } catch (error) {
            console.error("Error during request:", error);
          }

        };
        useEffect(() => {
            // Call handleGetItems when the component mounts
            handleGetItems(selectedIssueNo);
          }, [selectedIssueNo]);
       
          const[isDisplayIssue,setIsDisplayIsuue]=useState(false);
          const handleIssueNo=()=>{
            setIsDisplayIsuue(true)
          }
          const closeModal = () => {
            setIsDisplayIsuue(false)
          };
        
          const handleItemPress = (item) => {
            setSelectedIssueNo(item.issueNo);
            closeModal();
            handleGetItems(item.issueNo)
          };
          
          const renderModalItem = ({ item }) => (
            <TouchableOpacity onPress={() => {
              handleItemPress(item);
            }}>
              <View style={styles.modalItemContainer}>
                <Text style={styles.modalItemText}>{` ${item.issueNo}`}</Text>
              </View>
            </TouchableOpacity>
          );
          const TableHeader = () => (
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>IMEI</Text>
              <Text style={styles.tableHeader}>MODEL</Text>
            </View>
          );
        
          const TableRow = ({ item }) => (
            <View style={styles.tableRow}>
              
              <Text style={styles.tableCell}>{item.imeiNo}</Text>
              <Text style={styles.tableCell}>{item.erpModel}</Text>
            </View>
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
            <Text >{selectedIssueNo} </Text>
        </View>
        <View style={styles.details}>
            <Text style={styles.optionbtnText}>Search Issue Note No </Text>
            <TouchableOpacity
            style={styles.optionbtn}
            onPress={handleIssueNo}
          >
            <Text style={styles.optionbtnText}>Issue No</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.details}>
        {isDisplayIssue && (
          <Modal
            visible={isDisplayIssue}
            animationType="slide"
            transparent={true}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.closeModalButton}
                  onPress={closeModal}
                >
                  <Text style={styles.closeModalButtonText}>Close</Text>
                </TouchableOpacity>
                <FlatList
                  data={displayData}
                  renderItem={renderModalItem}
                  keyExtractor={(item) => item.issueNo.toString()}
                />
              </View>
            </View>
          </Modal>
        )}
        </View>
        <View style={styles.details}>
            <Text style={styles.optionbtnText}>Status </Text>
            <Text >{selectedOption}</Text>
            
        </View>
        <View style={styles.formFiled2}>
        <TableHeader />
            <FlatList
            data={details}
            renderItem={({ item }) => <TableRow item={item} />}
            keyExtractor={(item) => item.seqNo.toString()}
        />
        </View>
        <View style={styles.done}>
          
          <TouchableOpacity style={styles.donebtn} >
            <Image source={require('./img/submit.png')} style={styles.donebuttonImage} />
            <Text style={styles.donebtnText}>Done</Text>
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
  details:{
    width:'100%',
    paddingLeft:10,
    paddingRight:10,
    // backgroundColor:'#961316',
    // height:'20%',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    marginTop:'5%'
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor:'#fff',
    
  },
  itemContainerText:{
    color:'#000',
    fontWeight:'300'
  },
  button: {
    padding: 10,
    borderRadius: 5,
   
  },
  buttonImage:{
    height:30,
    width:30
  },
  optionbtn: {
    width:'35%',
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

  optionbtnText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '800',

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    // padding: 20,
    margin:'10%',
  
  
  },
  closeModalButton: {
    alignSelf: 'flex-end',
    padding: '10%',
  },
  closeModalText: {
    color: '#000',
    fontWeight: 'bold',
  },
  modalItemContainer: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  modalItemText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',



  },
  tableHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    padding:'5%',
    color:'#000'
    
  },
  tableCell: {
    fontSize: 14,
    padding:'5%'

  },
  formFiled2: {
    padding:5,
    height:'20%',
    width:'100%',
    padding:'2%'
  },
  done:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'baseline',

  },
  donebtn:{
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
  donebuttonImage: {
    height: 20,
    width: 20,
  },
  donebtnText:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'800',
  },

});

export default AcceptInventoryViewSearchView;
