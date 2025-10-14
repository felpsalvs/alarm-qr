# QR Alarm

An Android app that works as a smart alarm clock. The alarm only goes off when the user scans a pre-set QR code, ensuring they are truly awake and alert.

## 🎯 Features

- **QR Code Configuration**: Scan and save a reference QR code
- **Alarm System**: Looping sound + continuous vibration
- **QR Validation**: Camera scanner that compares the scanned QR code with the configured one
- **Auto Stop**: Alarm to automatically verify the correct QR code
- **Secure Storage**: QR code saved securely on the device
- **Offline Operation**: 100% offline, no internet required

## 🚀 How to Use

1. **First Setup**
- Open the app and go to the "Alarm" tab
- Tap "Configure QR" and scan the code you want to use
- The QR code will be saved automatically

2. **Use the Alarm**
- Tap "Start Alarm"
- The app has selected to play sound and vibrate
- Point the camera at the configured QR code
- The alarm to automatically detect the correct QR code

3. **Stop Manually**
- Use the "Stop" button as a fallback if the QR code is not available

## 🛠️ Technologies

- **React Native** + **Expo SDK 54**
- **TypeScript** for static typing
- **Expo Router** for navigation
- **expo-camera** for QR scanner
- **expo-av** for audio playback
- **expo-secure-store** for secure storage
- **expo-haptics** for haptic feedback

## 📄 License

This project is open source. See the LICENSE file for details.

## 🤝 Contribution

Contributions are welcome! Please:
1. Fork the project
2. Create a branch for your feature
3. Commit your changes
4. Open a pull request

---
**Developed with ❤️ to help people truly wake up!**