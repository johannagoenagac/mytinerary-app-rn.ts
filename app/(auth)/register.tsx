import React from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../src/store/store';
import { registerUser } from '../../src/store/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/store/store';
import { useRouter } from 'expo-router';

const registerSchema = z.object({
  first_name: z.string().min(3).max(12),
  last_name: z.string().min(3).max(16),
  email: z.string().min(10).max(30).email(),
  password: z.string().min(8).max(16),
  country: z.string().min(3).max(20),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    const result = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(result)) {
      router.replace('/(tabs)');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nombre:</Text>
      <TextInput style={styles.input} onChangeText={(text) => setValue('first_name', text)} />
      <Text>Apellido:</Text>
      <TextInput style={styles.input} onChangeText={(text) => setValue('last_name', text)} />
      <Text>Email:</Text>
      <TextInput style={styles.input} onChangeText={(text) => setValue('email', text)} />
      <Text>Contraseña:</Text>
      <TextInput style={styles.input} secureTextEntry onChangeText={(text) => setValue('password', text)} />
      <Text>País:</Text>
      <TextInput style={styles.input} onChangeText={(text) => setValue('country', text)} />
      {error && <Text style={styles.error}>{error}</Text>}

      <View style={styles.buttonContainer}>
      <Button title={loading ? 'Registrando...' : 'Registrarse'} onPress={handleSubmit(onSubmit)} disabled={loading} />
      <Button title="Ya tengo una cuenta" onPress={() => router.push('/(auth)/login')} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
  error: { color: 'red', marginBottom: 10 },
  buttonContainer: { marginTop: 20, gap: 10 },
});
