import { Button, Text, View, StyleSheet } from "react-native";
import { useEffect } from "react";
import { auth } from "@/components/Firebase";
import { database } from "@/components/Firebase";

export default function LandingPage({ navigation, route }) {
    const { uid = '' } = route.params;

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        database
            .ref(`usuario/${uid}`)
            .once('value')
            .then((snapshot) => {
                console.log(snapshot.val());
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>EcoBalance</Text>
            <Text style={styles.subtitle}>Bem-vindo de volta!</Text>
            <Button
                title="Consumo e Produção"
                onPress={() => navigation.navigate('ThingerPage')} // Navega para a página ThingerPage
                color="#32CD32" // Verde claro
            />
            <Button
                title="Meus Dados"
                onPress={() => navigation.navigate('MeusDados', { uid })}
                color="#32CD32" // Verde claro
            />
            <Button
                title="Sair"
                onPress={() => {
                    auth.signOut();
                    navigation.navigate('Login');
                }}
                color="#006400" // Verde escuro
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#006400', // Fundo verde escuro
        padding: 24,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        color: 'white', // Título em branco
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 24,
        color: 'white', // Subtítulo em branco
        marginBottom: 16,
        textAlign: 'center',
    },
    uidText: {
        fontSize: 18,
        color: 'white', // Texto do ID em branco
        marginBottom: 24,
        textAlign: 'center',
    },
});
