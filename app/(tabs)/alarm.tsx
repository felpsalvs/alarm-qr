import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { AlarmConstants } from '@/constants/theme';
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import * as SecureStore from 'expo-secure-store';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

type Barcode = {
  data: string;
  type: string;
};

export default function AlarmScreen() {
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [expectedQrContent, setExpectedQrContent] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const vibrationIntervalRef = useRef<number | null>(null);

  const hasCameraPermission = useMemo(() => permission?.granted === true, [permission]);

  const startVibrationLoop = useCallback(() => {
    if (vibrationIntervalRef.current) return;
    // Use strong haptics pattern as a stand-in for alarm sound until sound asset is added
    vibrationIntervalRef.current = setInterval(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }, 1200);
  }, []);

  const stopVibrationLoop = useCallback(() => {
    if (vibrationIntervalRef.current) {
      clearInterval(vibrationIntervalRef.current);
      vibrationIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopVibrationLoop();
  }, [stopVibrationLoop]);

  useEffect(() => {
    // Load expected QR from secure storage
    (async () => {
      try {
        const saved = await SecureStore.getItemAsync(AlarmConstants.expectedQrKey);
        if (saved) setExpectedQrContent(saved);
      } catch {}
    })();
  }, []);

  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const startAlarmSound = useCallback(async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        staysActiveInBackground: true,
        allowsRecordingIOS: false,
        shouldDuckAndroid: false,
      });
      const { sound: created } = await Audio.Sound.createAsync(
        { uri: AlarmConstants.fallbackAlarmUrl },
        { isLooping: true, volume: 1.0, shouldPlay: true }
      );
      setSound(created);
      await created.playAsync();
    } catch {
      // fallback to haptics only
    }
  }, []);

  const stopAlarmSound = useCallback(async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }
    } catch {}
    setSound(null);
  }, [sound]);

  const startAlarm = useCallback(async () => {
    setIsAlarmActive(true);
    startVibrationLoop();
    await startAlarmSound();
    if (!hasCameraPermission) {
      await requestPermission();
    }
    setIsScannerOpen(true);
  }, [hasCameraPermission, requestPermission, startVibrationLoop, startAlarmSound]);

  const stopAlarm = useCallback(() => {
    stopVibrationLoop();
    void stopAlarmSound();
    setIsAlarmActive(false);
    setIsScannerOpen(false);
  }, [stopVibrationLoop, stopAlarmSound]);

  const onBarcodeScanned = useCallback(
    ({ data }: Barcode) => {
      if (!expectedQrContent) return;
      if (data === expectedQrContent) {
        stopAlarm();
      }
    },
    [expectedQrContent, stopAlarm]
  );

  const openScannerToSetTarget = useCallback(async () => {
    if (!hasCameraPermission) {
      await requestPermission();
    }
    setIsScannerOpen(true);
  }, [hasCameraPermission, requestPermission]);

  return (
    <ThemedView style={styles.container}>
      {!isScannerOpen && (
        <View style={styles.content}>
          <ThemedText type="title">Alarme com QR</ThemedText>
          <ThemedText style={styles.spaced}>
            {expectedQrContent
              ? 'QR configurado. Inicie o alarme para exigir a leitura.'
              : 'Nenhum QR configurado. Leia um QR para definir o alvo.'}
          </ThemedText>
          <View style={styles.row}>
            <Button onPress={openScannerToSetTarget}>
              {expectedQrContent ? 'Reconfigurar QR' : 'Configurar QR'}
            </Button>
            <View style={{ width: 12 }} />
            {isAlarmActive ? (
              <Button onPress={stopAlarm} variant="secondary">
                Parar
              </Button>
            ) : (
              <Button onPress={startAlarm} disabled={!expectedQrContent}>
                Iniciar alarme
              </Button>
            )}
          </View>
          {!expectedQrContent && (
            <ThemedText style={styles.hint}>
              Dica: primeiro, toque em Configurar QR e escaneie o código desejado.
            </ThemedText>
          )}
        </View>
      )}

      {isScannerOpen && (
        <View style={styles.scannerContainer}>
          <CameraView
            style={styles.camera}
            facing="back"
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            onBarcodeScanned={({ data, type }) => {
              // If not configured yet, save as target; otherwise, validate to stop alarm
              if (!expectedQrContent) {
                setExpectedQrContent(data);
                try {
                  void SecureStore.setItemAsync(AlarmConstants.expectedQrKey, data);
                } catch {}
                setIsScannerOpen(false);
                return;
              }
              onBarcodeScanned({ data, type });
            }}
          />
          <View style={styles.overlayBottom}>
            <Button onPress={() => setIsScannerOpen(false)} variant="secondary">
              Fechar câmera
            </Button>
          </View>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    gap: 12,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaced: {
    marginTop: 8,
  },
  hint: {
    marginTop: 12,
    opacity: 0.7,
  },
  scannerContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  overlayBottom: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});


