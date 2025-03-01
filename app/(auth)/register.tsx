import React from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../src/store/store';
import { registerUser } from '../../src/store/authSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../src/store/store';
import { useRouter } from 'expo-router';

const registerSchema = z.object({
  first_name: z.string().min(3, 'Debe tener al menos 3 caracteres').max(12),
  last_name: z.string().min(3, 'Debe tener al menos 3 caracteres').max(16),
  email: z.string().email('Correo inválido').min(10).max(30),
  password: z.string().min(8, 'Debe tener al menos 8 caracteres').max(16),
  country: z.string().min(3, 'Debe tener al menos 3 caracteres').max(20),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const dispatch = useAppDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const { control, handleSubmit, formState } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      country: '',
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    console.log('Datos a enviar:', data); // Verifica que los datos estén correctos
    const result = await dispatch(registerUser(data));
    console.log('Resultado del registro:', result);

    if (registerUser.fulfilled.match(result)) {
      router.replace('/(tabs)/home');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nombre:</Text>
      <Controller
        control={control}
        name="first_name"
        render={({ field: { onChange, value }, fieldState }) => (
          <>
            <TextInput style={styles.input} onChangeText={onChange} value={value} />
            {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
          </>
        )}
      />

      <Text>Apellido:</Text>
      <Controller
        control={control}
        name="last_name"
        render={({ field: { onChange, value }, fieldState }) => (
          <>
            <TextInput style={styles.input} onChangeText={onChange} value={value} />
            {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
          </>
        )}
      />

      <Text>Email:</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value }, fieldState }) => (
          <>
            <TextInput style={styles.input} onChangeText={onChange} value={value} keyboardType="email-address" />
            {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
          </>
        )}
      />

      <Text>Contraseña:</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value }, fieldState }) => (
          <>
            <TextInput style={styles.input} secureTextEntry onChangeText={onChange} value={value} />
            {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
          </>
        )}
      />

      <Text>País:</Text>
      <Controller
        control={control}
        name="country"
        render={({ field: { onChange, value }, fieldState }) => (
          <>
            <TextInput style={styles.input} onChangeText={onChange} value={value} />
            {fieldState.error && <Text style={styles.error}>{fieldState.error.message}</Text>}
          </>
        )}
      />

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
