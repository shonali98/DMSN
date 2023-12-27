import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput,Alert ,FlatList,ScrollView,Modal,Button} from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';
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


  const handleChangePassword = () => {
    console.log('Changing password...');
  };

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

        const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/AcceptInventories/getAcceptInventoryImei?issueNo=${issueNoteNo}&status=2&dsrId=${data.data[0].extraParams}`;
        
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
    
      // const TableRow = ({ item }) => (
      //   <View style={styles.tableRow}>
      //     <Image
      //       source={
      //       displayTick.includes(item.imeiNo)
      //     ? require('./img/greentick.png')
      //     : require('./img/blacktick.png')
      //   }
      //       style={styles.selectedbuttonImage}
      //   />
      //     <Text style={styles.tableCell}>{item.imeiNo}</Text>
      //     <Text style={styles.tableCell}>{item.erpModel}</Text>
      //   </View>
      // );
      const TableRow = ({ item }) => (
        <View style={styles.tableRow}>
          <TouchableOpacity
            onPress={() => {
              // Toggle the item's presence in displayTick
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
    
          const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/AcceptInventories/getAcceptInventoryImei`;
    
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {},
          });
    
          if (response.ok) {
            const data = await response.json();
    
            const issueNoList = data.data.map((item) => item.issueNo);
            console.log("IssueNo List:", issueNoList);
            setIssueNoList(issueNoList);
            setChangeText(true)
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
        // <View style={styles.issueNotableRow}>
        //   <Text style={styles.issueNotableCell}>{item}</Text>

        // </View>
        <TouchableOpacity
          style={styles.issueNotableRow}
          onPress={() => {
          // setSelectedIssueNo(item);
          setIssueNoteNo(item)
           closeModal(); 
           }
        }
        >
    <Text style={styles.issueNotableCell}>{item}</Text>
  </TouchableOpacity>
      );

      useEffect(() => {
        // setIssueNoteNo(selectedIssueNo)
        if (issueNoteNo) {

          console.log('Selected Issue No changed, calling handleGetItems...');
          handleGetItems();
          setSelectedIssueNo(issueNoteNo)
        }
      }, [issueNoteNo]);

      // useEffect(() => {
      //   // setIssueNoteNo(selectedIssueNo)

      //   if (scannedImei) {
      //     console.log('Selected Issue No changed, calling handleGetItems...', scannedImei);
      //   }
      // }, [scannedImei]);
  
  const handleOk = () => {
    console.log(`Fetching items for IMEI No: ${imeiNo}`);
    setImeiNo(imeiNo);
    setDisplayTick((prevDisplayTick) => [...prevDisplayTick, imeiNo]);
    setImeiNo('')
  };

  const handleSubmit = () => {
    console.log('Submitting selected items');
  };

  const handleScan = () => {
    console.log('Scanning...');
    setIsScanning(true);
    setScanned(false);
  };
  // const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  // useEffect(() => {
  //   const getBarCodeScannerPermissions = async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   };

  //   getBarCodeScannerPermissions();
  // }, []);

  const[scannedImei,setScannedImei]=useState('')
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    console.log("imei scaned",data)
    const scannedIssueNo = issueNoteNoArray.data.find((item) =>
    item.imeiNo === data ? item.issueNo : null
    );
    console.log("details",scannedIssueNo)
    if(scannedIssueNo){
      setDisplayTick((prevDisplayTick) => [...prevDisplayTick, data]);

    }else{
    // Alert(`Bar code invalid!`);

    }
    setScannedImei(data)
    setIsScanning(false)
  };
  // ... (previous code)



  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }
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
    codeTypes: ['code-128'],
    onCodeScanned: (codes) => {
      // const data =codes[0].value;
        // console.log("imei scaned",data)
      const data =codes[0].value;
        console.log("imei scaned",data)
      if (isScanningAllowed) {
        

        setIsScanning(false)
        // setScanningAllowed(false); 
        console.log(`Scanned ${codes[0].value} codes!!`);
        Alert.alert('Scanned Code', `Scanned Code: ${codes[0].value}`);
        // setScannedCodes(codes);
      }
    const scannedIssueNo = issueNoteNoArray.data.find((item) =>
    item.imeiNo === data ? item.issueNo : null
    );
    console.log("details",scannedIssueNo)
    if(scannedIssueNo){
      setDisplayTick((prevDisplayTick) => [...prevDisplayTick, data]);

    }else{
    // Alert(`Bar code invalid!`);

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

      {/* <ScrollView style={styles.details}> */}
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
                source={require('./img/loading.gif')}
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
      
      data={issueNoteNoArray.data.filter(item => displayTick.includes(item.imeiNo))}

      renderItem={({ item }) => <TableRow item={item} />}
      keyExtractor={(item) => item.seqNo.toString()}
    />
  </View>
)}

{/* ----------------------------- */}
{/* <TouchableOpacity style={styles.optionbtn} onPress={handleScan}>
        <Text style={styles.optionbtnText}>Scan</Text>
      </TouchableOpacity> */}
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
        // <View style={styles.box}>
        <View style={styles.barcodeContainer}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            codeScanner={codeScanner}
            isActive={true}
            onCodeScanned={(codes) => {
              // Handle scanned codes as needed
              console.log('Scanned Codes:', codes);
              stopScanning(); // Stop scanning after the first scan
            }}
          />
        </View>
      )}
{/* <View style={ styles.box}>
      {hasPermission && isgranted  &&  (<Camera style={StyleSheet.absoluteFill} device={device} codeScanner={codeScanner} isActive={true} />)}     
      {scannedCodes.length > 0 && (
        <View style={styles.overlay}>
          <Text>Scanned Codes:</Text>
          {scannedCodes.map((code, index) => (
            <Text key={index}>{code.value}</Text>
          ))}
        </View>
      )}
    </View> */}
   
         {/* {isScanning && (
        <View style={styles.barcodeContainer}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          {scanned && (
            <TouchableOpacity style={styles.rescanButton} onPress={() => setScanned(false)}>
              <Text style={styles.rescanButtonText}>Tap to Scan Again</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

        {!isScanning && (
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
      )} */}
     
      {/* </ScrollView> */}
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
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginVertical: 1,
  },
  input: {
    width:'60%',
    borderBottomWidth: 1,  
    borderBottomColor: '#696969',  
    paddingBottom: 10,  
    marginBottom: '4%', 
  },
  searchinput: {
    width:'60%', 
    fontWeight:'600',
    color:'#000',
  },
  selectAll:{
    width:'90%',
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
    height:'20%'
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
    width:'100%',
    // paddingLeft:'5%',
    marginLeft:'10%',


  },
  tableHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    padding:'5%',
    // marginVertical: 10,
    
  },
  tableCell: {
    fontSize: 14,
    // marginVertical: 10,
    width:'50%',


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
    elevation: 5, // For Android shadow
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
    elevation: 5, // For Android shadow
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
//   ----------------------------
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
  margin:'10%'

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
  height:50,
  width:50,
},
modalContent1: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
  padding:'20%'  
},
alertMsg: {
  position: 'absolute',
  bottom: 20,
  left: 20,
  right: 20,
  backgroundColor: 'white',
  color: 'black',
  padding: 10,
  borderRadius: 5,
},
box:{
  width: '90%',
  height: '50%',
  alignSelf: 'center',
  borderRadius: 10,
  marginTop: 20,
  marginBottom: 20,
  borderColor: 'black',
  borderWidth: 2,
  justifyContent: 'center',
  alignItems: 'center',
}
});

export default AcceptInventoryAccept;
