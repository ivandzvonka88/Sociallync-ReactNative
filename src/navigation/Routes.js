import React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack"
import { createDrawerNavigator } from '@react-navigation/drawer';

import Splash from '../screens/splash/Splash'
import Login from '../screens/login/Login'
import Upload from '../screens/upload/Upload'
import Notification from '../screens/notification/Notification'
import ForgotPassword from '../screens/forgot/ForgotPassword'
import Profile from '../screens/profile/Profile'
import Register from '../screens/register/Register'
import TermCondition from '../screens/termcondtion/TermCondition'
import DrawerMenu from '../components/DrawerMenu';
import ChangePassword from '../screens/changepassword/ChangePassword';
import Confirmation from '../screens/confirmation/Confirmation';
import NotificationDetail from '../screens/notification/NotificationDetail';


const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <DrawerMenu {...props} />}>

            <Drawer.Screen name="Upload" component={Upload} options={{ headerShown: false }} />


        </Drawer.Navigator>
    )
}
export function AppNavigation() {
    return (
        <NavigationContainer>
            <MainNavigation />
        </NavigationContainer>
    )
}

const MvpStack = createStackNavigator()
function MainNavigation() {
    return (
        <MvpStack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>

            <MvpStack.Screen
                name="Splash"
                component={Splash} />

            <MvpStack.Screen
                name='Login'
                component={Login} />


            <MvpStack.Screen
                name={'Upload'}
                component={DrawerNavigator}
                options={{
                    title: "",
                    headerShown: false
                }} />

            <MvpStack.Screen
                name='Notification'
                component={Notification} />

            <MvpStack.Screen
                name='ForgotPassword'
                component={ForgotPassword} />

            <MvpStack.Screen
                name='Profile'
                component={Profile} />

            <MvpStack.Screen
                name='Register'
                component={Register} />

            <MvpStack.Screen
                name='TermCondition'
                component={TermCondition} />

            <MvpStack.Screen
                name='ChangePassword'
                component={ChangePassword} />

                <MvpStack.Screen
                name='Confirmation'
                component={Confirmation}/>

                <MvpStack.Screen
                name= 'NotificationDetail'
                component={NotificationDetail}/>


        </MvpStack.Navigator>
    )
}