# Teen Finance

This is a React Native application built with Expo.

## Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js (v20.13.1 or newer):** You can download it from [nodejs.org](https://nodejs.org/).
-   **Expo CLI:** Install it globally using `npm install -g expo-cli`.
-   **A mobile device or emulator:**
    -   **Physical device:** You'll need the Expo Go app installed on your iOS or Android device.
    -   **Android Emulator:** You can use Android Studio to set up an emulator.
    -   **iOS Simulator:** Requires macOS and Xcode.

## Installation

1.  **Clone the repository using the `git clone` command**
2.  **Install dependencies:**

    ```bash
    npm install
    ```

## Running the App

There are several ways to run the app locally:

**1. Using Expo Go (Recommended for quick testing):**

-   **Start the development server:**

    ```bash
    expo start
    # or
    npx expo start
    ```

-   **Open the Expo Go app on your mobile device (or emulator).**
-   **Scan the QR code displayed in your terminal** with the Expo Go app. Alternatively, if you are running on a simulator you can press 'i' for iOS simulator or 'a' for android emulator in the terminal.

**2. Running on an Android Emulator (If you have one configured):**

-   **Start the development server:**

    ```bash
    expo start
    # or
    npx expo start
    ```

-   Press 'a' in the terminal to open the app in your connected Android Emulator.

**3. Running on an iOS Simulator (Requires macOS and Xcode):**

-   **Start the development server:**

    ```bash
    expo start
    # or
    npx expo start
    ```

-   Press 'i' in the terminal to open the app in the iOS Simulator.

**4. Building standalone apps (For distribution):**

For building standalone APKs (Android) or IPA (iOS) files for distribution on app stores, you'll need to use Expo's build services. Refer to the Expo documentation for detailed instructions: [https://docs.expo.dev/build/introduction/](https://docs.expo.dev/build/introduction/)

## Troubleshooting

-   **If you encounter dependency issues:** Try deleting the `node_modules` folder and the `package-lock.json` or `yarn.lock` file, and then running `npm install`.
-   **If you have issues with Expo Go:** Make sure your device and development machine are on the same Wi-Fi network.
-   **For other issues:** Consult the Expo documentation: [https://docs.expo.dev/](https://docs.expo.dev/).
