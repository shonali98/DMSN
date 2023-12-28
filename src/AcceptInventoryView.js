// import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image,TextInput,Alert,FlatList,Modal ,Button} from 'react-native';
import React , {useState}from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from 'react-native-date-picker';

function AcceptInventoryView({navigation,route}) {
  const { data } = route.params;

  console.log('Received dsrid:', data.data[0].extraParams);
  const [selectedOption, setSelectedOption] = useState('');
  // const [fromDate, setFromDate] = useState('');
  const [fromDate, setFromDate] = useState(new Date());

  const [toDate, setToDate] = useState(new Date());
  const[optionStatus,setOptionStatus]=useState();
  const [loadingIssueNo, setLoadingIssueNo] = useState(false);

  const handleback=()=>{
    navigation.navigate('AcceptInventory',{data})
  }

  const handleHome=()=>{
    navigation.navigate('Home',{data})
  }
  const handleOptionSelect = (option) => {
    // Implement your logic for handling option selection
    setSelectedOption(option)
    console.log("-----",option)
    if(option=='Accepted'){
      setOptionStatus(3)
    console.log("-----",selectedOption)

    }else if(option=='Pending'){
      setOptionStatus(2)
    }
  };

  // const handleFromDateChange = (text) => {
  //   if (text.length === 4 && !text.includes('/')) {
  //     text += '/';
  //   }// Check if the length is 7 and append "/" after the month
  // else if (text.length === 7 && !text.endsWith('/')) {
  //   text += '/';
  // }
  //   setFromDate(text);
  //   console.log('from date',text)
  // };
  const handleFromDateChange = (selectedDate) => {
    // Use the selected date directly
    console.log('from date', selectedDate);

  setFromDate(selectedDate);

  };
  

  // const handleToDateChange = (text) => {
  //   if (text.length === 4 && !text.includes('/')) {
  //     text += '/';
  //   }// Check if the length is 7 and append "/" after the month
  // else if (text.length === 7 && !text.endsWith('/')) {
  //   text += '/';
  // }
  //   setToDate(text);
  // };
  const handleToDateChange = (selectedDate) => {
    // Use the selected date directly
    console.log('from date', selectedDate);

    setToDate(selectedDate);


  };
  const parseCustomDate = (dateString) => {
    const [year, month, day] = dateString.split('/');
    return new Date(year, month - 1, day); // month is zero-based in JavaScript Date object
  };

  
    const [showFlatList,setShowFlatList]=useState(false)
    const [displayData, setDisplayData] = useState([]);
    const handleSearch = async() => {
      console.log("status",optionStatus)
      console.log("to date",toDate)
      console.log("from date",fromDate)

      try {
        setLoadingIssueNo(true);

        const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/AcceptInventories/getAcceptInventory?status=${optionStatus}&dsrId=${data.data[0].extraParams}`;

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {

          },
        });
        if (response.ok) {
  
          const data = await response.json();
          // console.log("Data received:", data);

      if (data && data.data && data.data.length > 0) {
        const issueDates = data.data.map((item) => item.issueDate);
        console.log("Issue Dates:", issueDates);

        // Convert fromDate and toDate to Date objects using parseCustomDate
        const startDate =fromDate;
        const endDate = toDate;
        console.log(fromDate)
        console.log(toDate)

        // Filter issueDates based on fromDate and toDate
        const filteredIssueDates = issueDates.filter(
          (date) => parseCustomDate(date) >= startDate && parseCustomDate(date) <= endDate
        );

        console.log("Filtered Issue Dates:", filteredIssueDates);

        // Now you can use the filteredIssueDates array to filter your data array
        const filteredData = data.data.filter((item) =>
          filteredIssueDates.includes(item.issueDate)
        );

        console.log("Filtered Data:", filteredData);
        setDisplayData(filteredData)
        if (filteredData.length > 0) {
          for (const item of filteredData) {
            // Assuming issueNo is the property you want to use
            // await handleGetItems(item.issueNo);
          }
        }
        setLoadingIssueNo(false);
        navigation.navigate('AcceptInventoryViewSearch',{data:data,displayData: filteredData,selectedOption:selectedOption})

      } else {
        console.log("No data or empty data array.");
      }
        

          
        } else {

          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
  
        console.error("Error during request:", error);
      }
        // setShowFlatList(true)

      };
      const TableHeader = () => (
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>ISSUE_NO </Text>
          {/* <Text style={styles.tableHeader}>ISSUE_DATE</Text> */}
          <Text style={styles.tableHeader}>ISSUE DATE</Text>
          <Text style={styles.tableHeader}>STATUS</Text>
          <Text style={styles.tableHeader}>MA.RE. NO </Text>

          {/* Add more headers as needed */}
        </View>
      );
      const TableRow = ({ item }) => (
        <View style={styles.tableRow}>
         
          <Text style={styles.tableCell}>{item.issueNo}</Text>
          <Text style={styles.tableCell}>{item.issueDate}</Text>
          <Text style={styles.tableCell}>{selectedOption}</Text>
          <Text style={styles.tableCell}>{item.manualReceiptNo}</Text>
{/* {item.additionalData && (
      <>
        <Text style={styles.tableCell}>{item.additionalData.imeiNo}</Text>
        <Text style={styles.tableCell}>{item.additionalData.modelNo}</Text>
      </>
    )} */}
          {/* Add more cells as needed */}
        </View>
      );
      const handleGetItems =async  (issueNo) => {
        try {
    
            const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/AcceptInventories/getAcceptInventoryImei?issueNo=${issueNo}`;
            // const apiUrl = `http://dmsn.lk:8282/SingerPortalWebService-4.1/Services/AcceptInventories/getAcceptInventoryImei?issueNo=17959`;
            
            const response = await fetch(apiUrl, {
              method: "GET",
              headers: {
    
              },
            });
    
            if (response.ok) {
    
              const data = await response.json();
              console.log("data",data)

              
            } else {
    
              console.error("Request failed with status:", response.status);
            }
          } catch (error) {
            console.error("Error during request:", error);
          }
        setShowFlatList(true)

        };
    
       
        // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
        // const [selectedDate, setSelectedDate] = useState(null);
      
        // const showDatePicker = () => {
        //   setDatePickerVisibility(true);
        // };
      
        // const hideDatePicker = () => {
        //   setDatePickerVisibility(false);
        // };
      
        // const handleConfirm = (date) => {
        //   setSelectedDate(date);
        //   hideDatePicker();
        // }; 


        // const [date, setDate] = useState(new Date());
        // const [mode, setMode] = useState('date'); // 'datetime', 'date', 'time'
      
        const [isDisplayEnableFromDate,setDisplayEnableFromDate]=useState(false)
        const handleDisplayFromDate=()=>{
          setDisplayEnableFromDate(!isDisplayEnableFromDate)
          setDisplayEnableToDate(false)
        }

        
        const [isDisplayEnableToDate,setDisplayEnableToDate]=useState(false)
        const handleDisplayToDate=()=>{
          setDisplayEnableToDate(!isDisplayEnableToDate)
          setDisplayEnableFromDate(false)
        }
      
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
            <Text style={styles.optionbtnText}>Accepted </Text>

            <TouchableOpacity
                style={[styles.radioButton, selectedOption === 'Accepted' && styles.selectedRadioButton]}
                onPress={() => handleOptionSelect('Accepted')}
            >
                {/* <Text style={styles.radioButtonText}>Option 1</Text> */}
            </TouchableOpacity>

        </View>
        <View style={styles.details}>
            <Text style={styles.optionbtnText}>Pending </Text>

            <TouchableOpacity
                style={[styles.radioButton, selectedOption === 'Pending' && styles.selectedRadioButton]}
                onPress={() => handleOptionSelect('Pending')}
            >
                {/* <Text style={styles.radioButtonText}>Option 2</Text> */}
            </TouchableOpacity>                
            
        </View>
        <View style={styles.details}>
            <View style={styles.details1}>
                <Text style={styles.optionbtnText1}>From Date </Text>         
                <Text> {fromDate.toLocaleDateString()}</Text>

            </View>
            <TouchableOpacity style={styles.datebtn} onPress={handleDisplayFromDate}>
            <Image source={require('./img/calender.png')} style={styles.datebuttonImage} />
          </TouchableOpacity>
        </View>
        <View style={styles.details}>
            <View style={styles.details1}>
                <Text style={styles.optionbtnText1}>To Date </Text>       
                {/* <TextInput
            style={styles.dateInput}
            placeholder="YYYY-MM-DD"
            value={toDate}
            onChangeText={handleToDateChange}
            keyboardType="numeric"
          />   */}
          <Text> {toDate.toLocaleDateString()}</Text>

            </View>
            <TouchableOpacity style={styles.datebtn} onPress={handleDisplayToDate}>
            <Image source={require('./img/calender.png')} style={styles.datebuttonImage} />
          </TouchableOpacity>
        </View>
        {/* --------------------- */}
        
        
      

      {isDisplayEnableFromDate && (
    <View style={styles.datePickerContainer}>
      <DatePicker
        date={fromDate}
        onDateChange={handleFromDateChange}
        mode="date"
        style={styles.datePicker}
      />

      
    </View>
  )}
{isDisplayEnableToDate && (
    <View style={styles.datePickerContainer}>
      <DatePicker
        date={toDate}
        onDateChange={handleToDateChange}
        mode="date"
        style={styles.datePicker}
      />

      
    </View>
  )}

        {/* --------------------- */}
        <View style={styles.search}>
            

            <TouchableOpacity
                style={[styles.searchButton]}
                onPress={handleSearch}
            >
                <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>                
            
        </View>
        {showFlatList && (
          <View style={styles.formFiled2}>
            <TableHeader />
            <FlatList
            data={displayData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <TableRow item={item} />}
          />

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
  details1:{
  },
  radioButton: {
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 30,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    width:'7%',
    height:'60%',
    marginBottom:'5%',
    marginTop:'5%'
    
  },
  selectedRadioButton: {
    backgroundColor: '#000',
  },
  radioButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  button: {
    padding: 10,
    borderRadius: 5,
   
  },
  buttonImage:{
    height:30,
    width:30
  },
  optionbtnText:{
    color:'#000'
  },
  optionbtnText1:{
    color:'#000',
    fontWeight:'500'
  },
  searchButton:{
    backgroundColor:'#ba181b',
    // padding:10,
    // margin:10,
    width:'40%',
    // borderRadius:50,
    height: 40,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 25,
    // backgroundColor: 'transparent',
    elevation: 5, // For Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    marginVertical: 10,
   
  },
  searchButtonText:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'800',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width:'60%',

  },
  tableHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft:'8%',
    marginRight:'8%',
    marginVertical: 1,
    // marginHorizontal:5
    
  },
  tableCell: {
    fontSize: 12,
    marginVertical: 1,
    // marginHorizontal:5,
    paddingLeft:'10%',
    paddingRight:'10%'
    // paddingLeft:'1%',
    // width:'50%',


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
  datebtn:{
    backgroundColor:'#ba181b',
    // width:'40%',
    // height: 40,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    elevation: 5, // For Android shadow
    shadowColor: '#000',
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    marginVertical: 10,
    

   
  },
  datebuttonImage: {
    height: 20,
    width: 20,
  },
  datePickerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
  },
  
});

export default AcceptInventoryView;
