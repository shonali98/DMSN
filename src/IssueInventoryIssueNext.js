import React, { useState ,useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,TextInput,Alert ,FlatList,Modal} from 'react-native';

function IssueInventoryIssueNext({navigation,route}) {
  const{data,userDetails}=route.params;

  console.log("----------------dsrid",data.data[0].extraParams)
  console.log("----------------dsrid",data.data[0].userId)

  // console.log("user details",userDetails)


  const handleHome=async()=>{
    navigation.navigate('Home',{data})
  }
  const handleback=()=>{
    navigation.navigate('IssueInventoryIssue',{data})
  }
  const handleReset=()=>{
    setShowCartModal(false);
    setDisplayTick([]);
    setSelectAllImage( require('./img/blacktick.png') );
  }
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  console.log("current date",formattedDate);

  const handleSubmit = async () => {
    // Prepare the data to be sent in the request
    // setLoadingIssueNo(true);
    console.log("selected",displayTick);
    // console.log("selected",issueNoteNoArray.data[0].issueNo);
    console.log("display tick",subdealerDetails.salesPrice)


    const requestData = {
      issueNo:issueNoteNoArray.data[0].issueNo,//change
      distributerID: data.distributorCode,
      dSRId: data.data[0].extraParams,
      issueDate: formattedDate,
      price: subdealerDetails.salesPrice,
      distributorMargin: 0,
      delerMargin: 0,
      discount: 0,
      status: 1,
      user:data.data[0].userId,
      deviceImei:  [],
      statusMsg: "Processing",
      toName: "Recipient Name",
      distributorAddress: data.distributorAddress,
      distributorCode: data.distributorCode,
      distributorName: data.distributorName,
      distributorTelephone: data.distributorTelephone,
      subdealerAddress:subdealerDetails.subdealerAddress,
      subdealerCode:subdealerDetails.subdealerCode,
      subdealerName: subdealerDetails.subdealerName,
      type: subdealerDetails.type,
      subdealerTelephone: subdealerDetails.subdealerTelephone,
      dateInserted: "2024-01-02",
      manualReceiptNo: "MAN-011"//change
  
    };

    try {
      const apiUrl = 'http://203.189.68.156:8181/SingerPortalWebService-4.2/Services/IssueInventories/addInventoryIssue';
  
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
        console.log('Response Data:', requestData);

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
  const [issueNoteNoArray,setIssueNoteNoArray]=useState([])
  const [issueNoteNo, setIssueNoteNo] = useState('');
  const [showFlatList, setShowFlatList] = useState(false);
  const [displayTick,setDisplayTick]=useState([])
  const [imeiNo, setImeiNo] = useState('');
  const [isIssueNodissable,setisIssueNodissable]=useState(false)
  const [selectModel,setSelectModel]=useState([])
  const [loadingIssueNo, setLoadingIssueNo] = useState(false);

  const handleGetItems =async  () => {
    try {
        setLoadingIssueNo(true);
        // const apiUrl = `http://203.189.68.156:8181/SingerPortalWebService-4.2/Services/IssueInventories/getInventoryIssueDetail?issueNo=${issueNoteNo}`;
       
        const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/IssueInventories/getInventoryIssueDetail?issueNo=${issueNoteNo}`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {

          },
        });
    
        if (response.ok) {
          const data = await response.json();
    
          console.log("Data received:", data);
          setIssueNoteNoArray(data)
         
          if (data && data.data && data.data.length > 0) {
            Alert.alert("Data Received", "Data has been successfully received.");
          console.log("Data received:", data);

            setShowFlatList(true)
          }
        setLoadingIssueNo(false);

        } else {
          console.error("Request failed with status:", response.status);
          Alert.alert("Request failed with status:", response.status);

        }

      } catch (error) {
        console.error("Error during request:", error);
        Alert.alert("Error during request:", error);

      }
    };

    // ---------------------
    const handleGetItemsMyStock =async  () => {
      try {
          setLoadingIssueNo(true);
          // const apiUrl = `http://203.189.68.156:8181/SingerPortalWebService-4.2/Services/IssueInventories/getInventoryIssueDetail?issueNo=${issueNoteNo}`;
         
          const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/IssueInventories/getDSRInventoryIssueDetailMobileP4?dSRId=${data.data[0].extraParams}`;
          // const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/IssueInventories/getDSRInventoryIssueDetailMobileP4?dSRId=2501`;
  
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
  
            },
          });
      
          if (response.ok) {
            const data = await response.json();
      
            console.log("Data received:", data);
            setIssueNoteNoArray(data)
           
            if (data && data.data && data.data.length > 0) {
              Alert.alert("Data Received", "Data has been successfully received.");
            console.log("Data received:", data);
  
              setShowFlatList(true)



            }
          setLoadingIssueNo(false);
  
          } else {
            console.error("Request failed with status:", response.status);
            Alert.alert("Request failed with status:", response.status);
  
          }
  
        } catch (error) {
          console.error("Error during request:", error);
          Alert.alert("Error during request:", error);
  
        }
      };

    // --------------------

    

    // ------------------------
    const [modelDetails,setModelDetails]=useState([])
 
    const handleGetSelectModel = async () => {
      try {
        setLoadingIssueNo(true);
    
        // const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/AcceptInventories/getAcceptInventoryImei?status=2&dsrId=${data.data[0].extraParams}`;
        // const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/IssueInventories/getDSRInventoryIssueDetailMobileP4?dSRId=${data.data[0].extraParams}`;
        const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/IssueInventories/getDSRInventoryIssueDetailMobileP4?dSRId=${data.data[0].extraParams}`;
    
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {},
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setModelDetails(data);
    
          const uniqueErpModelSet = new Set();
    
          data.data.forEach(item => {
            uniqueErpModelSet.add(item.erpModel); // Changed 'erp_part' to 'erpModel'
          });
    
          const erpModelList = Array.from(uniqueErpModelSet);
    
          console.log("ERP Model List:", erpModelList);
          setSelectModel(erpModelList);
          setShowSelectModel(true);
          setLoadingIssueNo(false);
        } else {
          console.error('Request failed with status:', response.status);
          Alert.alert('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error during request:', error);
        Alert.alert('Error during request:', error);
      }
    };
    
  
    const TableHeader = () => (
      <View style={styles.tableRow}>
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
                  return prevDisplayTick.filter((imei) => imei !== item.imeiNo);
                } else {
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

    const handleOk = () => {
      console.log(`Fetching items for IMEI No: ${imeiNo}`);
      setImeiNo(imeiNo);
      setDisplayTick((prevDisplayTick) => [...prevDisplayTick, imeiNo]);
      setImeiNo('')
    };


    const [showSelectModel, setShowSelectModel] = useState(false);
    const [selectedModel,setSelectedModel]=useState('');
 


    const closeModal = async() => {
      setShowSelectModel(false);
      
     
    };

    const renderSelectModel = ({ item }) => (
      <TouchableOpacity
        style={styles.selectModelrow}
        onPress={() => {
          handledisplayselectedmodel(item);
          setSelectedModel(item);
          console.log("erpModel", item);
          closeModal();

        }}
      >
        <Text style={styles.selectModelcell}>{item}</Text>
      </TouchableOpacity>
    );

    useEffect(() => {
      console.log("useEffect triggered with selectedModel:", selectedModel);
      if (selectedModel !== "") {
        // handledisplayselectedmodel(item);
        console.log("erpModel", selectedModel);
        const filteredData = issueNoteNoArray.data.filter(item => item.erpModel === selectedModel);

        console.log("Filtered items:", filteredData);
        if (filteredData.length > 0) {
          console.log("----------",filteredData[0].salesPrice)
          setSubdealerDetails(filteredData[0])
          console.log(filteredData);
          const imeiNos = filteredData.map(dataItem => dataItem.imeiNo);
      
          setDisplayTick(prevDisplayTick => [...prevDisplayTick, ...imeiNos]);
        
        } else {
          console.log('No matching data found.');
        }
        setSelectedModel("")
        // closeModal();
      }
    }, [selectedModel !== ""]);
    
const [subdealerDetails,setSubdealerDetails]=useState([])
console.log('--------------',subdealerDetails)
const handledisplayselectedmodel =async ({ item }) => {
  console.log("issueNoteArray", issueNoteNoArray);
  console.log("erpmodel", item);
  console.log("erpmodel", selectedModel);

 

//  const filteredData = issueNoteNoArray.data.filter(item => item.erpModel === "HU-Y541");

//   console.log("Filtered items:", filteredData);
//   if (filteredData.length > 0) {
//     console.log("----------",filteredData[0].salesPrice)
//     setSubdealerDetails(filteredData[0])
//     console.log(filteredData);
//     const imeiNos = filteredData.map(dataItem => dataItem.imeiNo);

//     setDisplayTick(prevDisplayTick => [...prevDisplayTick, ...imeiNos]);
  
//   } else {
//     console.log('No matching data found.');
//   }

  // const filterModelData=modelDetails.
};

const [selectAllImage, setSelectAllImage] = useState(require('./img/blacktick.png'));
const[showCartModal,setShowCartModal]=useState(false)
const handlecart =({})=>{
  setShowCartModal(true)
}

const closeModal1 = async() => {
  setShowCartModal(false)
  
 
};
  return (
    <View style={styles.container}>
        <View style={styles.nav}>
          <TouchableOpacity style={styles.button} onPress={handleback}>
            <Image source={require('./img/back.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <Text style={styles.navtext}>Issue Inventory</Text>
          <TouchableOpacity style={styles.button} onPress={handleHome}>
            <Image source={require('./img/list.png')} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>

        <View style={styles.details}>
          <View style={styles.formFiled}>
            <TextInput
              style={styles.input}
              placeholder="Issue Note No"
              placeholderTextColor={'#696969'}
              value={issueNoteNo}
              onChangeText={(text) => setIssueNoteNo(text)}
            />
            <TouchableOpacity style={styles.optionbtn} onPress={handleGetItems}>
              <Text style={styles.optionbtnText}>Get</Text>
            </TouchableOpacity>
        </View>
            
        {/* {showFlatList && (
        <View style={styles.formFiled2}>
          <TableHeader />
          <FlatList
            data={issueNoteNoArray.data}
            renderItem={({ item }) => <TableRow item={item} />}
            keyExtractor={(item) => item.seqNo.toString()}
          />
        </View>
        )} */}
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
            <View style={styles.formFiled1}>
              <Text style={styles.optionbtnText}>IMEI NO </Text>
              <Text style={styles.optionbtnText}>MODEL </Text>
              {/* <Text style={styles.optionbtnText}>My Stock </Text> */}

              <TouchableOpacity style={styles.selectmodelbtn} onPress={handleGetItemsMyStock} >
                <Text style={styles.selectmodelbtnText}>My Stock</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.selectmodelbtn} onPress={handleGetSelectModel}>
                <Text style={styles.selectmodelbtnText}>Select model</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.formFiled1}>
              <Text style={styles.selectAll}>Select All</Text>

              <TouchableOpacity
                style={styles.selectallImg}
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
            {/* {showFlatList && (
            <View style={styles.formFiled4}>
            <FlatList
      
              data={issueNoteNoArray.data.filter(item => displayTick.includes(item.imeiNo))}
              renderItem={({ item }) => <TableRow item={item} />} 
              keyExtractor={(item) => item.seqNo.toString()}
            />
            </View>
            )} */}
           
           <Modal
              visible={showSelectModel}
              transparent={true}
              animationType="slide"
              onRequestClose={closeModal}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <TouchableOpacity style={styles.closeModalButton} onPress={closeModal}>
                    <Text style={styles.closeModalText}>Close</Text>
                  </TouchableOpacity>
            

                  <FlatList
                    data={selectModel}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderSelectModel}
                  />
                </View>
          
              </View>
            </Modal>
            <View style={styles.Cart}>
              <TouchableOpacity style={styles.Cartbtn} onPress={handlecart}>
                <Image source={require('./img/cart.png')} style={styles.cartbuttonImage} />
                <Text style={styles.CartbtnText}>Cart ({displayTick.length})</Text>
              </TouchableOpacity>
              
            </View>
            <Modal
              visible={showCartModal}
              transparent={true}
              animationType="slide"
              onRequestClose={closeModal1}
            >
              <View style={styles.modalContainer2}>
                <View style={styles.modalContent2}>
                  <TouchableOpacity style={styles.closeModalButton} onPress={closeModal1}>
                    <Text style={styles.closeModalText}>Close</Text>
                  </TouchableOpacity>
                  <View style={styles.formFiled}>
                  <Text style={styles.closeModalText}>Item Count: {displayTick.length}</Text>                    
                  </View>
                  <View style={styles.formFiled}>
                  <Text style={styles.closeModalText}>Total Cost: </Text>                    
                  </View>
                  <View style={styles.formFiled3}>
                    <FlatList
                      data={issueNoteNoArray.data && displayTick
                      ? issueNoteNoArray.data.filter(item => displayTick.includes(item.imeiNo))
                      : []}
                      renderItem={({ item }) => <TableRow item={item} />}
                      keyExtractor={(item) => item.seqNo.toString()}
                    />
                  </View>

                  <View style={styles.submit}>
                    <TouchableOpacity style={styles.submitbtn} onPress={handleReset}>
                      <Image source={require('./img/reset.png')} style={styles.submitbuttonImage} />
                      <Text style={styles.submitbtnText}>Reset</Text>
                    </TouchableOpacity>
              
                    <TouchableOpacity style={styles.submitbtn} onPress={handleSubmit}>
                      <Image source={require('./img/submit.png')} style={styles.submitbuttonImage} />
                      <Text style={styles.submitbtnText}>Submit</Text>
                    </TouchableOpacity>
              
                  </View>
                </View>
            
              </View>
            </Modal>
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
    height:'90%'
  },
 formFiled:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
   
  },
  input:{
    width:'60%',
    borderBottomWidth: 1,  
    borderBottomColor: '#696969',  
    paddingBottom: 10,  
    marginBottom: 20, 
  },
  button: {
    padding: 10,
    borderRadius: 5,
   
  },
  buttonImage:{
    height:30,
    width:30
  },
  
  
  optionbtn:{
    width:'35%',
    height: 40,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: 'transparent',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    marginVertical: 10,
   
  },
  optionbtnText:{
    color:'#000',
    textAlign:'center',
    fontWeight:'800',

  },
  formFiled1:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    
   
  },
  Cart:{
    alignItems:'center',
    marginLeft:20,
    marginRight:20
   
  },
  Cartbtn:{
    backgroundColor:'#2C5E1A',
    width:'60%',
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
    flexDirection:'row',
    justifyContent:'space-between'
   
  },
  cartbuttonImage:{
    height:20,
    width:20
  },
  CartbtnText:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'800',
  },
  selectmodelbtn:{
    width:'28%',
    height: 60,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: 'transparent',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    marginVertical: 10,
   
  },
  selectmodelbtnText:{
    color:'#000',
    textAlign:'center',
    fontWeight:'800',

  },
  formFiled2: {
    padding:5,
    height:'45%'
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width:'90%',

  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft:'10%',
    marginVertical: 10,
    
  },
  tableCell: {
    fontSize: 13,
    marginVertical: 3,
    // paddingLeft:'10%',
    padding:'4%',
    width:'50%',


  },
  selectedbuttonImage:{
    height:20,
    width:20,
    margin:'5%'
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
  modalTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '90%',
  },
  LoadingbuttonImage:{
    height:100,
    width:100,
  },
  closeModalButton: {
    alignSelf: 'flex-end',
    padding: '10%',
  },
  closeModalText: {
    color: '#000',
    fontWeight: 'bold',
  },
  selectModelrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width:'90%',
  
  },
  selectModelcell: {
    fontSize: 14,
    marginVertical: 10,
    width:'100%',
  
  
  },
  formFiled3:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
   height:'65%'
  },
  formFiled4:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
   height:'15%'
  },
  modalContainer2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent2: {
    width: '100%',
    height:'100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin:'10%'
  
  },
  submit:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',

  },
  submitbtn:{
    backgroundColor:'#ba181b',
    width:'50%',
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
  submitbuttonImage: {
    height: 20,
    width: 20,
  },
  submitbtnText:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'800',
  },
  
  modalContent1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
    padding:'20%'  
  },
  
});

export default IssueInventoryIssueNext;
