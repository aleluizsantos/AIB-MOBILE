import React, { useState, useEffect } from 'react';
import { 
    Platform,
    View, 
    KeyboardAvoidingView, 
    Text, 
    Image, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../Services/api';
import logo from  '../assets/logo.png';

export default function Login( { navigation } ) {

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => { 
        //Verifica se o usuário já esta logado e seu id esta salvo no asyncStorage
        AsyncStorage.getItem('user').then(user => {
            if(user) {
                navigation.navigate('List');
            }
        })
     }, [])

    // Criar a Session com o usuario 
    async function handleSubmit() {
        const response = await api.post('/sessions', {
            email
        })

        const { _id } = response.data;

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView 
            enabled={Platform.OS == 'ios'} 
            behavior='padding' 
            style={styles.container}
        >
            <Image source={logo} />
            
            <View style={styles.form}>
                <Text style={styles.label}>Seu E-mail *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Seu e-mail'
                    placeholderTextColor='#999'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Tecnologias *</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Tecnologias de interesse'
                    placeholderTextColor='#999'
                    autoCapitalize='words'
                    autoCorrect={false}
                    value={techs}
                    onChangeText={setTechs}
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar Spot</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        marginBottom: 20,
        borderRadius: 2,
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },  
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});