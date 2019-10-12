import React, { useState, useEffect } from 'react';
import { 
    Image,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from 'react-native';
    
import AsyncStorage from '@react-native-community/async-storage';

import logo from '../assets/logo.png';
import SpotList from '../Components/SpotsList';

export default function List() {

    const [techs, setTechs] = useState([]);

    useEffect(() => {
        //Quando o usuário fazer o login suas tecnologia de interrese será salva no asyncStorage
        //Buscando as tecnologia de interesse salvas
        AsyncStorage.getItem('techs').then(storageTechs => {
            //Transformar as tecnologias que estão salva no asyncStorage que é uma String 
            //em um Array quebrando 'split' na virgula e retirando o espaço em branco
            const techsArray =  storageTechs.split(',').map(tech => tech.trim());
            //Setar os valor na variável de status 'techs'
            setTechs(techsArray);
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
            <ScrollView>
                {techs.map(tech => 
                    //Criar a lista de cada tecnologia
                    <SpotList key={tech} tech={tech} />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10,
    }
});