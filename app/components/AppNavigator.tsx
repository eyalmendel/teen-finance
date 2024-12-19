import { AppRoutesParamList, RouteNames } from '@config/routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListeningStyleScreen from '@screens/ListeningStyleScreen';
import GamingStyleScreen from '@screens/GamingStyleScreen';
import LearningStyleScreen from '@screens/LearningStyleScreen';
import ReadingStyleScreen from '@screens/ReadingStyleScreen';
import SubjectsScreen from '@screens/SubjectsScreen';
import WatchingStyleScreen from '@screens/WatchingStyleScreen';
import React from 'react';
import ArticleScreen from '@screens/ArticleScreen';
import QuizScreen from '@screens/QuizScreen';

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
                component={GamingStyleScreen}
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name={RouteNames.VIDEO}
                component={WatchingStyleScreen}
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name={RouteNames.AUDIO}
                component={ListeningStyleScreen}
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name={RouteNames.ARTICLE}
                component={ArticleScreen}
                options={{ headerShown: false }}
            ></Stack.Screen>
            <Stack.Screen
                name={RouteNames.QUIZ}
                component={QuizScreen}
                options={{ headerShown: false }}
            ></Stack.Screen>
        </Stack.Navigator>
    );
}

export default AppNavigator;
