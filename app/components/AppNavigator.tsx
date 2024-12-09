import { AppRoutesParamList, RouteNames } from '@config/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AudioStyleScreen from '@screens/AudioStyleScreen';
import GameStyleScreen from '@screens/GameStyleScreen';
import LearningStyleScreen from '@screens/LearningStyleScreen';
import ReadingStyleScreen from '@screens/ReadingStyleScreen';
import SubjectsScreen from '@screens/SubjectsScreen';
import VideoStyleScreen from '@screens/VideoStyleScreen';
import React from 'react';

const Stack = createNativeStackNavigator<AppRoutesParamList>();

function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName={RouteNames.SUBJECTS}>
            <Stack.Screen
                name={RouteNames.SUBJECTS}
                component={SubjectsScreen}
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name={RouteNames.LEARNING_STYLE}
                component={LearningStyleScreen}
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name={RouteNames.READING}
                component={ReadingStyleScreen}
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name={RouteNames.GAMING}
                component={GameStyleScreen}
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name={RouteNames.VIDEO}
                component={VideoStyleScreen}
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name={RouteNames.AUDIO}
                component={AudioStyleScreen}
                options={{ headerShown: false }}
            ></Stack.Screen>
        </Stack.Navigator>
    );
}

export default AppNavigator;
