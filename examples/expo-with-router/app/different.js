import { Button, Platform, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { ScrshotArea } from '../components/ScrshotArea';

export default function Page() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrshotArea>
        <View style={styles.main}>
          <Text style={styles.title}>Different World</Text>
          <Text style={styles.subtitle}>I'm running on {Platform.OS} ({Platform.Version})</Text>
          <Button title="Home screen" onPress={() => { router.push('/') }} />
        </View>
      </ScrshotArea>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
