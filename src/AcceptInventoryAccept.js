import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput,Alert ,FlatList,ScrollView,Modal,Button} from 'react-native';
import {
  useCameraPermission,
  useCameraDevice,
  Camera,
  useCodeScanner,
} from 'react-native-vision-camera';
function AcceptInventoryAccept({ navigation,route }) {

  const { data } = route.params;

  console.log('Received dsrid:', data.data[0].extraParams);

  const [issueNoteNo, setIssueNoteNo] = useState('');
  const [issueNoteNo1, setIssueNoteNo1] = useState('');
  const [imeiNo, setImeiNo] = useState('');
  const [showFlatList, setShowFlatList] = useState(false);
  const [selectAllImage, setSelectAllImage] = useState(require('./img/blacktick.png'));
  const [displayTick,setDisplayTick]=useState([])


  

  const handleBack = () => {
    navigation.navigate('AcceptInventory',{data});

  };
  const handleHome = () => {
    navigation.navigate('Home',{data});

  };
  const handleGet = () => {
    setIssueNoteNo(issueNoteNo1);
    if(issueNoteNo1!=''){
      if(issueNoteNo!=''){
        handleGetItems()

      }
    }

  };
const [issueNoteNoArray,setIssueNoteNoArray]=useState([])
const [isIssueNodissable,setisIssueNodissable]=useState(true)
  const handleGetItems =async  () => {
    try {
      setLoadingIssueNo(true);
      setIssueNoteNoArray([]);
        // const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/AcceptInventories/getAcceptInventoryImei?issueNo=${issueNoteNo}&status=2&dsrId=${data.data[0].extraParams}`;
        const apiUrl = `http://203.189.68.156:8181/SingerPortalWebService-4.2/Services/AcceptInventories/getAcceptInventoryImei?issueNo=${issueNoteNo}&status=2&dsrId=${data.data[0].extraParams}`;
        
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {

          },
        });

        if (response.ok) {

          const data = await response.json();

          console.log("Data received:", data);
          setIssueNoteNoArray(data)
          setisIssueNodissable(false)
          setIssueNoteNo('')

          if (data && data.data && data.data.length > 0) {
            Alert.alert("Data Received", "Data has been successfully received.");
            setShowFlatList(true);

          }
          setLoadingIssueNo(false);

        } else {

          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error during request:", error);
      }
    };

    const TableHeader = () => (
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Selected</Text>
          <Text style={styles.tableHeader}>IMEI No</Text>
          <Text style={styles.tableHeader}>Model Des</Text>
        </View>
      );
    
 
      const TableRow = ({ item }) => (
        <View style={styles.tableRow}>
          <TouchableOpacity
            onPress={() => {
              setDisplayTick((prevDisplayTick) => {
                if (prevDisplayTick.includes(item.imeiNo)) {
                  // Remove the item from displayTick
                  return prevDisplayTick.filter((imei) => imei !== item.imeiNo);
                } else {
                  // Add the item to displayTick
                  return [...prevDisplayTick, item.imeiNo];
                }
              });
            }}
            disabled={displayTick.includes(item.imeiNo)} 
            style={displayTick.includes(item.imeiNo) ? { opacity: 0.5 } : {}} 
          
          >
            <Image
              source={
                displayTick.includes(item.imeiNo)
                  ? require('./img/greentick.png')
                  : require('./img/blacktick.png')
              }
              style={styles.selectedbuttonImage}
            />
          </TouchableOpacity>
          <Text style={styles.tableCell}>{item.imeiNo}</Text>
          <Text style={styles.tableCell}>{item.erpModel}</Text>
        </View>
      );
      
      const [issueNoList,setIssueNoList]=useState([]);
      const [showIssueList,setShowIssueList]=useState(false)
      const [showIssueListModal, setShowIssueListModal] = useState(false);
      const [selectedIssueNo,setSelectedIssueNo]=useState('')
      const [loadingIssueNo, setLoadingIssueNo] = useState(false);
      const [changeText,setChangeText]=useState(false)

      const handleSearchIssueNo = async () => {
        try {
          setLoadingIssueNo(true);
    
          // const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/AcceptInventories/getAcceptInventory?status=2&dsrId=${data.data[0].extraParams}`;
          const apiUrl = `http://203.189.68.156:8181/SingerPortalWebService-4.2/Services/AcceptInventories/getAcceptInventory?status=2&dsrId=${data.data[0].extraParams}`;
    
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {},
          });
    
          // if (response.ok) {
          //   const data = await response.json();
          //   console.log(data)
          //   const issueNoList = data.data.map((item) => item.issueNo);
          //   console.log("IssueNo List:", issueNoList);
          //   setIssueNoList(issueNoList);
          //   setChangeText(true)
          //   setShowIssueList(true);
          //   setShowIssueListModal(true);

          // after sort
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            
            // Map and sort the issue numbers
            const issueNoList = data.data.map((item) => item.issueNo).sort((a, b) => a - b);
            console.log("Sorted IssueNo List:", issueNoList);
            
            setIssueNoList(issueNoList);
            setChangeText(true);
            setShowIssueList(true);
            setShowIssueListModal(true);
        
        
          } else {
            console.error("Request failed with status:", response.status);
          }
        } catch (error) {
          console.error("Error during request:", error);
        } finally {
          setLoadingIssueNo(false);
        }
      };
      const closeModal = async() => {
        setShowIssueListModal(false);
        
       
      };
      
      const IssueNoTableHeader = () => (
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Issue No</Text>
        </View>
      );

      const renderIssueNoItem = ({ item }) => (

        <TouchableOpacity
          style={styles.issueNotableRow}
          onPress={() => {
          setIssueNoteNo(item)
           closeModal(); 
           }
        }
        >
    <Text style={styles.issueNotableCell}>{item}</Text>
  </TouchableOpacity>
      );

      useEffect(() => {
        if (issueNoteNo) {

          console.log('Selected Issue No changed, calling handleGetItems...');
          handleGetItems();
          setSelectedIssueNo(issueNoteNo)
        }
      }, [issueNoteNo]);


  
  const handleOk = () => {
    console.log(`Fetching items for IMEI No: ${imeiNo}`);
    setImeiNo(imeiNo);
    setDisplayTick((prevDisplayTick) => [...prevDisplayTick, imeiNo]);
    setImeiNo('')
  };

  // const handleSubmit = () => {
  //   console.log('Submitting selected items');
  // };
  const handleSubmit = async () => {
    // Prepare the data to be sent in the request
    setLoadingIssueNo(true);
    console.log("selected",displayTick);
    console.log("selected",issueNoteNoArray);

    const subdealerName = issueNoteNoArray.data[0].subdealerCode;
    console.log(subdealerName);

    const currentDate = new Date().toLocaleDateString();
    const requestData = {
      issueNo: selectedIssueNo,
      acceptInvImei:[],
      status: 3,
      dsrId: data.data[0].extraParams,
      issueDate: currentDate,
      statusMsg: issueNoteNoArray.data[0].statusMsg,
      distributerID: 9876,
      price: 60.75,
      distributorMargin: 12.0,
      delerMargin: 9.25,
      discount: 7.5,
      user: 'Jane Smith',
      toName: 'Recipient Name',
      distributorAddress: issueNoteNoArray.data[0].distributorAddress,
      distributorCode: issueNoteNoArray.data[0].distributorCode,
      distributorName: issueNoteNoArray.data[0].distributorName,
      distributorTelephone: issueNoteNoArray.data[0].distributorTelephone,
      subdealerAddress:  issueNoteNoArray.data[0].subdealerAddress,
      subdealerCode: issueNoteNoArray.data[0].subdealerCode,
      subdealerName: issueNoteNoArray.data[0].subdealerName,
      type: 'Type B',
      subdealerTelephone:issueNoteNoArray.data[0].subdealerTelephone,
      manualReceiptNo: 'MAN-004',
    };
  
    try {
      const apiUrl = 'http://203.189.68.156:8181/SingerPortalWebService-4.2/Services/AcceptInventories/addAcceptInventory';
  
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        // Handle the response data as needed
        console.log('Response Data:', responseData);
        console.log('Request Data:', requestData);

        Alert.alert('Success', 'Inventory accepted successfully.');
      } else {
        console.error('Request failed with status:', response.status);
        Alert.alert('Error', 'Failed to submit inventory. Please try again.');
      }
      setLoadingIssueNo(false);

    } catch (error) {
      console.error('Error during request:', error);
      Alert.alert('Error', 'An error occurred while processing your request.');
    }
  };
  

  // ---------------------------------------------------------------------------------------------------
  const handleScan = () => {
    console.log('Scanning...');
    setIsScanning(true);
    setScanned(false);
  };
  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const[scannedImei,setScannedImei]=useState('')
  let device = useCameraDevice('back');
  const [scannedCodes, setScannedCodes] = useState([]);
  const [isScanningAllowed, setScanningAllowed] = useState(true); // State to control scanning
  const { hasPermission, requestPermission } = useCameraPermission();
  const[isgranted, setIsGranted]= useState(false)

 

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }else{
      setIsGranted(true);
    }
  },[hasPermission]);  


  console.log(hasPermission);
 
  const codeScanner = useCodeScanner({
    codeTypes: ['code-128','ean-13'],
    onCodeScanned: (codes) => {
      const data =codes[0].value;
        console.log("imei scaned",data)
      if (isScanningAllowed) {
        

        setIsScanning(false)
        console.log(`Scanned ${codes[0].value} codes!!`);
        Alert.alert('Scanned Code', `Scanned Code: ${codes[0].value}`);
      }
    const scannedIssueNo = issueNoteNoArray.data.find((item) =>
    item.imeiNo === data ? item.issueNo : null
    );
    console.log("details",scannedIssueNo)
    if(scannedIssueNo){
      setDisplayTick((prevDisplayTick) => [...prevDisplayTick, data]);

    }else{
    Alert.alert(`Bar code invalid!`);

    }
    setScannedImei(data)
    setIsScanning(false)
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
        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Image source={require('./img/back.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        <Text style={styles.navtext}>Accept Inventory</Text>
        <TouchableOpacity style={styles.button} onPress={handleHome}>
          <Image source={require('./img/list.png')} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.formFiled}>
          <TextInput
            style={styles.input}
            placeholder="Issue Note No"
            placeholderTextColor={'#696969'}
            value={issueNoteNo1}
            onChangeText={(text) => setIssueNoteNo1(text)}
          />
          <TouchableOpacity style={styles.optionbtn} onPress={handleGet}>
            <Text style={styles.optionbtnText}>Get</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formFiled1}>
          <Text style={styles.selectAll}>Select All</Text>

            <TouchableOpacity
                style={styles.selectAllbtn}
                onPress={() => {
                setSelectAllImage((prevImage) =>
                prevImage === require('./img/blacktick.png')
                ? require('./img/greentick.png') 
                : require('./img/blacktick.png')
                );

                if (selectAllImage === require('./img/blacktick.png')) {
                const allImeis = issueNoteNoArray.data.map((item) => item.imeiNo);
                setDisplayTick(allImeis);
                } else {
                setDisplayTick([]);
                }
                console.log('Selecting all items');
            }}
            >
            <Image source={selectAllImage} style={styles.buttonImage} />
            </TouchableOpacity>

        </View>

        <View style={styles.formFiled}>
          
        {changeText ? (
        <View>
          <Text style={styles.searchinput}>Search Issue Note No: {selectedIssueNo}</Text>
        </View>
        ) : (
        <View>
          <Text style={styles.searchinput}>Search Issue Note No: {selectedIssueNo}</Text>
        </View>   
        )}

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
        
           <TouchableOpacity
            style={styles.optionbtn}
            onPress={handleSearchIssueNo}
            
          >
            <Text style={styles.optionbtnText}>Issue No</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.formFiled}>
          <TextInput
            style={styles.input}
            placeholder="IMEI No"
            placeholderTextColor={'#696969'}
            value={imeiNo}
            onChangeText={(text) => setImeiNo(text)}
          />
            
          <TouchableOpacity style={styles.optionbtn} 
          onPress={handleOk}
          disabled={isIssueNodissable} >
            <Text style={styles.optionbtnText}>Ok</Text>
          </TouchableOpacity>
        </View>
        {showFlatList && (
        <View style={styles.formFiled2}>
            <TableHeader />
            <FlatList
            data={issueNoteNoArray.data}
            renderItem={({ item }) => <TableRow item={item} />}
            keyExtractor={(item) => item.seqNo.toString()}
        />
        </View>
        )} 
    

        <Modal
        visible={showIssueListModal}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeModalButton} onPress={closeModal}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
            <IssueNoTableHeader />
            <FlatList
              data={issueNoList}
              renderItem={renderIssueNoItem}
              keyExtractor={(item) => item.toString()}
            />
          </View>
          
        </View>
      </Modal>



        
{/* selected items view */}
        {/* {showFlatList && (
  <View style={styles.formFiled2}>
    <TableHeader />
    <FlatList
      
      data={issueNoteNoArray.data.filter(item => displayTick.includes(item.imeiNo))}

      renderItem={({ item }) => <TableRow item={item} />}
      keyExtractor={(item) => item.seqNo.toString()}
    />
  </View>
)} */}


      <View style={styles.submit}>
          <TouchableOpacity style={styles.submitbtn} onPress={handleSubmit}>
            <Image source={require('./img/submit.png')} style={styles.submitbuttonImage} />
            <Text style={styles.submitbtnText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scanbtn} onPress={handleScan}>
            <Image source={require('./img/barcode.png')} style={styles.submitbuttonImage} />
            <Text style={styles.submitbtnText}>Scan</Text>
          </TouchableOpacity>
        </View>
      {isScanning && hasPermission && isgranted && (
        <View style={styles.barcodeContainer}>
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
        </View>
      )}

    </View>
  );
}



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

  details: {
    height: '100%',
    width: '100%',
    padding: 20,

},
  formFiled: {
    width:'98%',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical: 1,
  },
  input: {
    // width:'30%',
    // borderBottomWidth: 1,  
    // borderBottomColor: '#696969',  
    // paddingBottom: 10,  
    // marginBottom: '4%', 
  },
  searchinput: {
    // width:'60%', 
    fontWeight:'600',
    color:'#000',
  },
  selectAll:{
    width:'97%',
    fontWeight:'600',
    color:'#000',
    paddingBottom: 10,  
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

  submit:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'baseline',

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

  formFiled1: {
    flexDirection: 'row',
    justifyContent:'space-between',
    justifyContent:'center',
    padding:15,
    paddingBottom:0,
    paddingTop:0
  },
  formFiled2: {
    padding:5,
    height:'40%'
  },
  formFiled3: {
    padding:5,
    height:'20%',
    width:'100%'
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width:'100%',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width:'95%'


  },
  tableHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    padding:'5%',
    
  },
  tableCell: {
    fontSize: 14,
    // width:'95%',
    margin:'2%',


  },
  selectedbuttonImage:{
    height:20,
    width:20,
    margin:'5%'
  },
  barcodeContainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rescanButton: {
    backgroundColor: '#2C5E1A',
    width: '40%',
    height: 40,
    borderRadius: 20,
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  rescanButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '800',
  },
  scanbtn: {
    backgroundColor: '#3B3B3B',
    width: '40%',
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
    alignItems:'center',
    flexDirection:'row',
   justifyContent:'space-between' ,
  },
  scanbtnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '800',
  },
issueNotableRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems:'center',
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
  width:'90%',

},
issueNotableCell: {
  fontSize: 14,
  marginVertical: 10,
  width:'50%',


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
  padding: 20,
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
LoadingbuttonImage:{
  height:100,
  width:100,
},
modalContent1: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  // backgroundColor: 'white',
  margin:'50%',
  height:50
},


});

export default AcceptInventoryAccept;
