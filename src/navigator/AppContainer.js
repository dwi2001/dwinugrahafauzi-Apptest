import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../scene/Home';
import LinearGradient from 'react-native-linear-gradient';


const stack = createStackNavigator();

const AppContainer = (props) => {

    return (
        <stack.Navigator>
            <stack.Screen name='Home' component={Home} options={{
                headerTitleStyle: {
                    color: '#fff'
                },
                headerShown: true,
                title: 'contact',
                headerTitleAlign: 'center',
                headerBackground: () =>
                    <LinearGradient
                        colors={['#fff', '#FF8C00']}
                        style={{ flex: 1 }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    />,
            }} />
        </stack.Navigator>
    )
}

export default AppContainer;