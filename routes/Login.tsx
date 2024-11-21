import { auth } from '@/components/Firebase';
import { User } from '@/models/User.interface';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User>();
  const [isAboutViewed, setIsAboutViewed] = useState(false);

  useEffect(() => {
    async function checkAboutViewed() {
      const viewedStatus = await AsyncStorage.getItem('about_viewed');
      if (viewedStatus === 'true') {
        setIsAboutViewed(true);
      }
    }

    checkAboutViewed();
  }, []);

  useEffect(() => {
    if (user?.uid) {
      navigation.navigate('Landing', { uid: user?.uid });
    }
  }, [user]);

  async function login() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        console.log(response.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleAboutPress() {
    await AsyncStorage.setItem('about_viewed', 'true');
    setIsAboutViewed(true);
    navigation.navigate('About');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EcoBalance</Text>
      <Text style={styles.subtitle}>Bem-vindo!</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#ffffff"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        placeholder="Senha"
        secureTextEntry={true}
        placeholderTextColor="#ffffff"
      />

      <View style={styles.buttonContainer}>
        <Button title="Entrar" onPress={() => login()} color="#004d00" />
        <Button title="Criar Conta" onPress={() => navigation.navigate('Logon')} color="#66bb6a" />
      </View>

      <Button
        title="Sobre"
        color={isAboutViewed ? '#004d00' : '#66bb6a'}
        onPress={handleAboutPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#004d00', // Fundo verde escuro
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    color: '#ffffff', // Letras brancas
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    color: '#ffffff', // Letras brancas
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#66bb6a', // Borda verde claro
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    color: '#ffffff', // Texto branco
  },
  buttonContainer: {
    marginBottom: 16,
  },
});
