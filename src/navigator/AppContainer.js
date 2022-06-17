import React from 'react';
import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../scene/Home';


const stack = createStackNavigator();

const AppContainer = (props) => {

    return (
        <stack.Navigator>
            {/* <stack.Screen name='Home' component={Home} options={{
                headerShown: true, title: 'Profil',
                headerTitleStyle: {
                    color: '#fff'
                },
                headerTitleAlign: 'center',
                headerBackground: () =>
                    <LinearGradient
                        colors={['#05B1A1', '#006C90']}
                        style={{ flex: 1 }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    />,
                headerLeft: () => <Icon name='arrow-left' style={{ marginLeft: 20 }} size={16} color='#fff' />,
                headerRight: () => (
                    <View style={{ flexDirection: 'row' }}>
                        <Icon name='share-alt' style={{ marginRight: 20 }} size={20} color='#fff' />
                        <Icon name='user' style={{ marginRight: 20 }} size={20} color='#fff' />

                    </View>
                )

            }} /> */}
            <stack.Screen name='Home' component={Home} options={{ headerShown: false, title: 'Home', headerTitleAlign: 'center' }} />



        </stack.Navigator>

    )
}

export default AppContainer;