import '@/components';

import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function Page() {
  return (
    <View style={styles.container}>
      <Link href="/foo" style={styles.link}>
        Visit Page (/foo)
      </Link>
      <Link href="/editor/foo" style={styles.link}>
        Visit Editor (/foo)
      </Link>
      <Link href="/bar" style={styles.link}>
        Visit Page (/bar)
      </Link>
      <Link href="/editor/bar" style={styles.link}>
        Visit Editor (/bar)
      </Link>
      <Link href="/baz" style={styles.link}>
        Visit Page (/baz)
      </Link>
      <Link href="/editor/baz" style={styles.link}>
        Visit Editor (/baz)
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 8,
  },
  link: {
    fontSize: 18,
    color: '#3B82F6',
  },
});
