import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { HapticTab } from '@/components/HapticTab';
import AddItem from './add';


export default function Layout() {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <>
            <Tabs screenOptions={{
                headerTransparent: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarButton: HapticTab,
                tabBarStyle: {
                    position: "absolute",
                    bottom: 30,
                    marginHorizontal: 16,
                    // height: 'auto',
                    // maxHeight: 44,
                    height: 50,
                    width: '90%',
                    paddingVertical: 15,
                    backgroundColor: 'rgba( 51, 51, 51, 0.90 )',
                    borderWidth: 1,
                    borderColor: 'rgba( 255, 255, 255, 0.18 )',
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 5,
                }
                // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                // headerShown: false,
                // tabBarButton: HapticTab,
                // tabBarBackground: TabBarBackground,
                // tabBarStyle: Platform.select({
                // ios: {
                //     // Use a transparent background on iOS to show the blur effect
                //     position: 'absolute',
                // },
                // default: {},
                // }),
            }}>
                <Tabs.Screen 
                    name="index"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{
                                alignItems: 'center',
                                marginVertical: 'auto',
                                // paddingTop: 10
                            }}>
                                <Ionicons
                                    name={focused ? "home" : "home-outline"}
                                    color={focused ? "#FEFEFA" : "#FEFEFA"}
                                    size={24}
                                />
                            </View>
                        )
                    }}
                />
                <Tabs.Screen 
                    name="calendar"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{
                                alignItems: 'center',
                                marginVertical: 'auto',
                                // paddingTop: 10
                            }}>
                                <Ionicons
                                    name={focused ? "calendar" : "calendar-outline"}
                                    color={focused ? "#FEFEFA" : "#FEFEFA"}
                                    size={24}
                                />
                            </View>
                        )
                    }}
                />
                <Tabs.Screen 
                    name="add"
                    listeners={{
                        tabPress: (e) => {
                            e.preventDefault();
                            setShowModal(true);
                        }
                    }}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{
                                // marginVertical: 'auto',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: 70,
                                width: 70,
                                // borderRadius: 999,
                                // backgroundColor: '#FF70A6'
                            }}>
                                <Ionicons
                                    name={focused ? "add-circle" : "add-circle"}
                                    color={focused ? "#FF70A6" : "#FEFEFA"}
                                    size={70}
                                />
                            </View>
                        )
                    }}
                />
                <Tabs.Screen 
                    name="explore"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{
                                alignItems: 'center',
                                marginVertical: 'auto'
                                // paddingTop: 10
                            }}>
                                <Ionicons
                                    name={focused ? "stats-chart" : "stats-chart-outline"}
                                    color={focused ? "#FEFEFA" : "#FEFEFA"}
                                    size={24}
                                />
                            </View>
                        )
                    }}
                />
                <Tabs.Screen 
                    name="settings"
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <View style={{
                                alignItems: 'center',
                                marginVertical: 'auto'
                                // paddingTop: 10
                            }}>
                                <Ionicons
                                    name={focused ? "settings" : "settings-outline"}
                                    color={focused ? "#FEFEFA" : "#FEFEFA"}
                                    size={24}
                                />
                            </View>
                        )
                    }}
                />
            </Tabs>
            <AddItem visible={showModal} onClose={() => setShowModal(false)} />
        </>
    )
}