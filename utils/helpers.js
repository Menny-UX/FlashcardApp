        // // scheduleLocalNotificationAsync
        // import React, { useState, useEffect, useRef } from 'react';
        // import AsyncStorage from '@react-native-community/async-storage';
        // import { View, Text , PermissionsAndroid } from 'react-native';
        // import * as Notifications from 'expo-notifications';
        // import * as Permissions from 'expo-permissions';

        // const NOTIFICATION_KEY = "flashcards:notifications";

        // Notifications.setNotificationHandler({
        //     handleNotification: async () => ({
        //       shouldShowAlert: true,
        //       shouldPlaySound: false,
        //       shouldSetBadge: false,
        //     }),
        //   });

        // //   await Notifications.cancelScheduledNotificationAsync(identifier)
        // export async function clearLocalNotification( ) {
        //     // return AsyncStorage.removeItem(NOTIFICATION_KEY)
        //     //     .then(await Notifications.cancelScheduledNotificationAsync())
        // }

        // function createNotification( ) {
        //     return{
        //         title: '♖Take a Flashcards Quiz!',
        //         body: "Don't Forget to take your Daily Quiz! Practice Makes PERFECT ✌",
        //         ios: {
        //             sound: true,
        //         },
        //         android: {
        //             sound: true,
        //             priority: 'high',
        //             sticky: false,
        //             vibrate: true,
        //         }
        //     }
        // }

        // export function setLocalNotification( ) {
        //     debugger;
        //     AsyncStorage.getItem(NOTIFICATION_KEY).then(
        //         (result)=>JSON.parse(result)
        //     )
        //     .then((data)=> {
        //         if(data === null) {
        //             Permissions.askAsync(Permissions.NOTIFICATIONS)
        //             .then(({status}) => {
        //                 if(status === 'granted'){
        //                 //    Notifications.cancelAllScheduledNotificationsAsync()

        //                    let tomorrow = new Date()
        //                    tomorrow.setDate(tomorrow.getDate() +1)
        //                    tomorrow.setHours(20)
        //                    tomorrow.setMinutes(8)

        //                    Notifications.scheduleNotificationAsync({
        //                     content: {
        //                         title: '♖Take a Flashcards Quiz!',
        //                         body: "Don't Forget to take your Daily Quiz! Practice Makes PERFECT ✌",
        //                     },
        //                     trigger: {
        //                       time: tomorrow,
        //                       repeat: 'day',
        //                     },
        //                   });

        //                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
        //                 }
        //             })


        //         }
        //     })
        // }

        import * as Notifications from "expo-notifications";
        import * as Permissions from "expo-permissions";

        export const askPermissions = async () => {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== "granted") {
            return false;
        }
        return true;
        };

        export const scheduleNotification = async () => {
            let tomorrow = new Date()
            tomorrow.setDate(tomorrow.getDate() +1)
            tomorrow.setHours(20)
            tomorrow.setMinutes(8)
            let notificationId = Notifications.scheduleLocalNotificationAsync(
              {
                title: '♖Take a Flashcards Quiz!',
                body: "Don't Forget to take your Daily Quiz! Practice Makes PERFECT ✌",
              },
              {
                time: tomorrow,
                repeat: 'day',
              },
            );
            console.log(notificationId);
          };

        //   Notifications.dismissAllNotificationsAsync() 