import { useRoute } from '@react-navigation/core';
import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Image,
    Platform,



} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgCssUri } from 'react-native-svg';
import waterdrop from '../../assets/waterdrop.png';
import { Button } from '../Components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import DataTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';
import { loadPlant, PlantProps, savePlant } from '../libs/storage';

interface Params {
    plant: PlantProps;
}

export function PlantSave() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, SetShowDatePicker] = useState(Platform.OS == 'ios');
    const route = useRoute();
    const { plant } = route.params as Params;

    function handleChangeTime(event: Event, dateTime: Date | undefined) {
        if (Platform.OS === 'android') {
            SetShowDatePicker(oldState => !oldState);
        }

        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha um horário no futuro ⌚ ');
        }

        if (dateTime)
            setSelectedDateTime(dateTime);
    }

    function handleopenDateTimePickerForAndroid() {
        SetShowDatePicker(oldState => !oldState);
    }

    async function handleSave() {
        const data = await loadPlant();
        console.log(data);
        // try{
        //    await  savePlant({
        //        ...plant, 
        //        dateTimeNotification : selectedDateTime
        //     } );

        // }catch { Alert.alert('Não foi possível salvar. 😢'); }

    }

    return (
        <View style={styles.container}>
            <View style={styles.plantInfo}>
                <SvgCssUri
                    uri={plant.photo}
                    height={150}
                    width={150}
                />

                <Text style={styles.plantName}>{plant.name}</Text>

                <Text style={styles.plantAbout}>{plant.about}</Text>
            </View>

            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image
                        source={waterdrop}
                        style={styles.tipImage}
                    />
                    <Text style={styles.tipText}>{plant.water_tips}</Text>

                </View>
                <Text style={styles.alertLabel}>
                    Escolha o melhor horário para ser lembrada (o)
                    </Text>

                {showDatePicker && (

                    <DataTimePicker
                        value={selectedDateTime}
                        mode="time"
                        display='spinner'
                        onChange={handleChangeTime} />

                )}
                {
                    Platform.OS === 'android' && (
                        <TouchableOpacity
                            style={styles.dataTimePickerButton}
                            onPress={handleopenDateTimePickerForAndroid}
                        >
                            <Text style={styles.dataTimePickerText}>
                                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                            </Text>
                        </TouchableOpacity>
                    )
                }


                <Button
                    title='Cadastrar Planta'
                    onPress={handleSave}
                />

            </View>


        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape

    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20
    },
    plantName: {
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout: {
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10
    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        borderRadius: 20,
        padding: 20,
        position: 'relative',
        bottom: 60

    },
    tipImage: {
        width: 56,
        height: 56
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'
    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5
    },
    dataTimePickerText: {
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    },
    dataTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40

    }

})