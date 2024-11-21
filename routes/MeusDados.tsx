import { UserFromDatabase } from "@/models/UserFromDatabase.interface";
import { Button, Text, View, StyleSheet, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { auth, database } from "@/components/Firebase";

export default function MeusDados({ navigation, route }) {
  const [user, setUser] = useState<UserFromDatabase>();
  const [isEditing, setIsEditing] = useState(false);
  const { uid = "" } = route.params;

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    database
      .ref(`usuario/${uid}`)
      .once("value")
      .then((snapshot) => {
        setUser(snapshot.val());
        console.log(snapshot.val());
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function updateUser() {
    if (user) {
      database
        .ref(`usuario/${uid}`)
        .update({
          name: user.name,
          email: user.email,
          address: user.address,
          phone: user.phone,
          cnpj: user.cnpj,
        })
        .then(() => {
          console.log("Dados atualizados com sucesso!");
          setIsEditing(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Dados</Text>

      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={user?.name}
            onChangeText={(text) => setUser({ ...user, name: text })}
            placeholder="Nome"
            placeholderTextColor="#ffffff"
          />
          <TextInput
            style={styles.input}
            value={user?.email}
            onChangeText={(text) => setUser({ ...user, email: text })}
            placeholder="Email"
            placeholderTextColor="#ffffff"
          />
          <TextInput
            style={styles.input}
            value={user?.address}
            onChangeText={(text) => setUser({ ...user, address: text })}
            placeholder="Endereço"
            placeholderTextColor="#ffffff"
          />
          <TextInput
            style={styles.input}
            value={user?.phone}
            onChangeText={(text) => setUser({ ...user, phone: text })}
            placeholder="Telefone"
            placeholderTextColor="#ffffff"
          />
          <TextInput
            style={styles.input}
            value={user?.cnpj}
            onChangeText={(text) => setUser({ ...user, cnpj: text })}
            placeholder="CNPJ"
            placeholderTextColor="#ffffff"
          />
          <Button title="Salvar" onPress={updateUser} color="#00ff22" />
        </>
      ) : (
        <>
          <Text style={styles.text}>Nome: {user?.name}</Text>
          <Text style={styles.text}>Email: {user?.email}</Text>
          <Text style={styles.text}>Endereço: {user?.address}</Text>
          <Text style={styles.text}>Telefone: {user?.phone}</Text>
          <Text style={styles.text}>CNPJ: {user?.cnpj}</Text>
          <Button title="Editar" onPress={() => setIsEditing(true)} color="#007bff" />
        </>
      )}

      <Button title="Sair" onPress={() => auth.signOut()} color="#ff0000" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#004d00", // Fundo verde escuro
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    color: "white",
    textAlign: "center",
    marginBottom: 24,
  },
  text: {
    fontSize: 18,
    color: "white",
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: "#66bb6a", // Borda verde claro
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    color: "white",
  },
});
