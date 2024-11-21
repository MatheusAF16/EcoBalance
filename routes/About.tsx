import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nosso Compromisso com a Ecologia</Text>

      {/* Vídeo incorporado */}
      <WebView
        style={styles.video}
        source={{ uri: 'https://youtu.be/HGnGGCAWsMQ' }}
        allowsInlineMediaPlayback
      />

      {/* Texto informativo */}
      <Text style={styles.text}>
        Redução e monitoramento da produção e do consumo de energia solar. Este
        projeto de monitoramento de energia para sistemas de painéis solares
        visa ajudar empresas a entender e otimizar a eficiência de seus
        sistemas de energia renovável. Através da coleta de dados de consumo e
        produção, é possível analisar em tempo real a geração de energia solar
        e o consumo das instalações, facilitando a identificação de padrões e
        possibilitando a implementação de estratégias de economia de energia.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#004d00', // Verde escuro
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#ffffff', // Branco
    textAlign: 'center',
  },
  video: {
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: '#ffffff', // Branco
    lineHeight: 24,
  },
});