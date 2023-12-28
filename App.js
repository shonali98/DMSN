import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/Login';
import Home from './src/Home';
import AcceptInventory from './src/AcceptInventory';
import AcceptInventoryAccept from './src/AcceptInventoryAccept';
import AcceptInventoryView from './src/AcceptInventoryView';
import IssueInventory from './src/IssueInventory';
import IssueInventoryIssue from './src/IssueInventoryIssue';
import IssueInventoryIssueNext from './src/IssueInventoryIssueNext';
import WarrantyRegistration from './src/WarrantyRegistration';
import WarrantyRegistrationScan from './src/WarrantyRegistrationScan';
import WarrantyRegistrationView from './src/WarrantyRegistrationView';
import IssueInventoryView from './src/IssueInventoryView';
import MyStore from './src/MyStore';
import MyStoreDetails from './src/MyStoreDetails';
import AcceptInventoryViewSearch from './src/AcceptInventoryViewSearch';
import AcceptInventoryViewSearchView from './src/AcceptInventoryViewSearchView';
import WarrantyRegistrationViewDetails from './src/WarrantyRegistrationViewDetails';
import WarrantyRegistrationViewDetailsForm from './src/WarrantyRegistrationViewDetailsForm';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AcceptInventory" component={AcceptInventory} />
        <Stack.Screen name="AcceptInventoryAccept" component={AcceptInventoryAccept} />
        <Stack.Screen name="AcceptInventoryView" component={AcceptInventoryView} />
        <Stack.Screen name="AcceptInventoryViewSearch" component={AcceptInventoryViewSearch} />
        <Stack.Screen name="AcceptInventoryViewSearchView" component={AcceptInventoryViewSearchView} />

        <Stack.Screen name="IssueInventory" component={IssueInventory} />
        <Stack.Screen name="IssueInventoryIssue" component={IssueInventoryIssue} />
        <Stack.Screen name="IssueInventoryIssueNext" component={IssueInventoryIssueNext} />
        <Stack.Screen name="WarrantyRegistration" component={WarrantyRegistration} />
        <Stack.Screen name="WarrantyRegistrationScan" component={WarrantyRegistrationScan} />
        <Stack.Screen name="WarrantyRegistrationView" component={WarrantyRegistrationView} />
        <Stack.Screen name="WarrantyRegistrationViewDetails" component={WarrantyRegistrationViewDetails} />
        <Stack.Screen name="WarrantyRegistrationViewDetailsForm" component={WarrantyRegistrationViewDetailsForm} />


        <Stack.Screen name="IssueInventoryView" component={IssueInventoryView} />
        <Stack.Screen name="MyStore" component={MyStore} />
        <Stack.Screen name="MyStoreDetails" component={MyStoreDetails} />






      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
