import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function TryOnScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  const pickFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Gallery access is required to select a photo.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const pickFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Camera access is required to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Try-On</ThemedText>

      <View style={styles.previewBox}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
        ) : (
          <ThemedText style={styles.placeholderText}>No photo selected yet</ThemedText>
        )}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={pickFromCamera}>
          <ThemedText style={styles.buttonText}>📷 Camera</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={pickFromGallery}>
          <ThemedText style={styles.buttonText}>🖼️ Gallery</ThemedText>
        </TouchableOpacity>
      </View>

      {photoUri && (
        <TouchableOpacity
          style={styles.retakeButton}
          onPress={() => setPhotoUri(null)}
        >
          <ThemedText style={styles.retakeText}>Remove Photo</ThemedText>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    marginBottom: 20,
  },
  previewBox: {
    width: 280,
    height: 360,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  placeholderText: {
    opacity: 0.5,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    backgroundColor: '#1D3D47',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  retakeButton: {
    marginTop: 16,
  },
  retakeText: {
    color: '#D9534F',
  },
});