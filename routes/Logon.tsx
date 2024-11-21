import { auth, database } from '@/components/Firebase';
import { User } from '@/models/User.interface';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, TextInput, View, Text } from 'react-native';

export default function Logon({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<User>();

  useEffect(() => {
    if (user?.uid) {
      navigation.navigate('Landing', { uid: user?.uid });
      saveUserOnDatabaser();
    }
  }, [user]);

  async function saveUserOnDatabaser() {
    database
      .ref(`usuario/${user?.uid}`)
      .set({
        name: name,
        email: email,
        phone: phone,
        address: address,
        cnpj: cnpj,
        uid: user?.uid,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function CreateUser() {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        console.log('Usuário criado:', { name, email, phone, address, cnpj });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta - EcoBalance</Text>
      <TextInput
        placeholder="Nome"
        onChangeText={(text) => setName(text)}
        style={styles.input}
        placeholderTextColor="#ffffff"
      />
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        placeholderTextColor="#ffffff"
      />
      <TextInput
        placeholder="Telefone"
        onChangeText={(text) => setPhone(text)}
        style={styles.input}
        placeholderTextColor="#ffffff"
      />
      <TextInput
        placeholder="Endereço"
        onChangeText={(text) => setAddress(text)}
        style={styles.input}
        placeholderTextColor="#ffffff"
      />
      <TextInput
        placeholder="CNPJ"
        onChangeText={(text) => setCnpj(text)}
        style={styles.input}
        placeholderTextColor="#ffffff"
      />
      <TextInput
        placeholder="Senha"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        style={styles.input}
        placeholderTextColor="#ffffff"
      />
      <Button title="Criar Usuário" onPress={() => CreateUser()} color="#66bb6a" />
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
    fontSize: 28,
    color: '#ffffff', // Letras brancas
    textAlign: 'center',
    marginBottom: 24,
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
});
