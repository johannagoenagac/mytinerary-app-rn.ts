import React from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../src/store/store';
import { loginUser } from '../../src/store/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/store/store';
import { useRouter } from 'expo-router';

const loginSchema = z.object({
  email: z.string().min(10).max(30).email(),
  password: z.string().min(8).max(16),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      router.replace('/(tabs)/home');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <TextInput style={styles.input} onChangeText={(text) => setValue('email', text)} />
      <Text>Contraseña:</Text>
      <TextInput style={styles.input} secureTextEntry onChangeText={(text) => setValue('password', text)} />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title={loading ? 'Cargando...' : 'Iniciar Sesión'} onPress={handleSubmit(onSubmit)} disabled={loading} />
      <Button title="Registrarse" onPress={() => router.push('/(auth)/register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  error: { color: 'red', marginBottom: 10 },
});
