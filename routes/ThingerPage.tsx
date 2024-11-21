import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ScrollView } from "react-native";
import axios from "axios";

export default function ThingerPage({ navigation }) {
    const userId = "larissa"; // ID do usuário no Thinger.io
    const deviceId = "testegs"; // ID do dispositivo
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXYiOiJ0ZXN0ZWdzIiwiaWF0IjoxNzMxMzI5Mjg2LCJqdGkiOiI2NzMxZmQwNjMyYTdjYzcxOTYwZGZmMDYiLCJzdnIiOiJ1cy1lYXN0LmF3cy50aGluZ2VyLmlvIiwidXNyIjoibGFyaXNzYSJ9.6JutD-Y6LlfNAR4EyOiLR0wFjQ_2NWdhMx2_klB2cgw"; // Token de autorização

    const [consumoEnergia, setConsumoEnergia] = useState(null);
    const [producaoEnergia, setProducaoEnergia] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchConsumoEnergia();
        fetchProducaoEnergia();
    }, []);

    async function fetchConsumoEnergia() {
        const url = `https://backend.thinger.io/v3/users/${userId}/devices/${deviceId}/callback/data`;
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setConsumoEnergia(response.data.consumo); // Atualize com a chave correta
        } catch (err) {
            setError("Erro ao buscar consumo de energia");
            console.error(err);
        }
    }

    async function fetchProducaoEnergia() {
        const url = `https://backend.thinger.io/v3/users/${userId}/devices/${deviceId}/callback/data`;
        try {
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducaoEnergia(response.data.producao); // Atualize com a chave correta
        } catch (err) {
            setError("Erro ao buscar produção de energia");
            console.error(err);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Consumo e Produção de Energia</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <View style={styles.card}>
                <Text style={styles.label}>Consumo Atual:</Text>
                <Text style={styles.value}>
                    {consumoEnergia !== null ? `${consumoEnergia} kWh` : "Carregando..."}
                </Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.label}>Produção Atual:</Text>
                <Text style={styles.value}>
                    {producaoEnergia !== null ? `${producaoEnergia} kWh` : "Carregando..."}
                </Text>
            </View>
            <Button
                title="Voltar"
                onPress={() => navigation.goBack()}
                color="#006400" // Verde escuro
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#006400", // Fundo verde escuro
        padding: 16,
    },
    title: {
        fontSize: 24,
        color: "white",
        textAlign: "center",
        marginBottom: 16,
    },
    card: {
        backgroundColor: "#32CD32", // Verde claro
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
    },
    label: {
        fontSize: 18,
        color: "white",
    },
    value: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    error: {
        fontSize: 16,
        color: "red",
        marginBottom: 16,
        textAlign: "center",
    },
});
