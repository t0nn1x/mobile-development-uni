# Mobile Development Lab 3

This is a React Native mobile application that demonstrates the use of various gesture handlers in a clicker game format. Users can interact with objects using different gestures to earn points and complete challenges.

## Project Description

The application contains two main screens:
1. Game Screen - features an interactive object that responds to various gestures
2. Tasks Screen - displays a list of tasks/challenges to complete

The app implements the following gesture handlers:
- TapGestureHandler (single tap) - earns 1 point
- TapGestureHandler (double tap) - earns 2 points
- LongPressGestureHandler - earns 5 points for holding 1.5 seconds
- PanGestureHandler - allows dragging the object across the screen
- FlingGestureHandler - earns 3 points for swiping left or right
- PinchGestureHandler - earns 4 points for scaling the object

## Installation and Setup

### Prerequisites
- Node.js (14.0 or later)
- npm or yarn
- Expo CLI
- iOS simulator or Android emulator (or a physical device)

### Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/t0nn1x/mobile-development-uni.git
cd mobile-development-uni/lab3
```

2. Install dependencies:
```bash
npm install react-native-gesture-handler react-native-reanimated @react-navigation/native @react-navigation/stack expo-status-bar react-native-safe-area-context react-native-screens
```

3. Start the application:
```bash
npx expo start
```

4. Run on iOS simulator:
```bash
npx expo start --ios
```

5. Run on Android emulator:
```bash
npx expo start --android
```

## Project Structure

```
/lab3
  ├── App.tsx                     // Main App component with gesture handler setup
  ├── components/                 // Reusable components
  │   ├── ClickableObject.tsx     // Object responding to gestures
  │   ├── Counter.tsx             // Score counter component
  │   └── TaskItem.tsx            // Task list item component
  ├── contexts/                   // React contexts
  │   └── GameContext.tsx         // Game state management context
  ├── navigation/                 // Navigation configuration
  │   └── index.tsx               // Stack navigation setup
  ├── screens/                    // App screens
  │   ├── GameScreen.tsx          // Main game screen
  │   └── TasksScreen.tsx         // Tasks list screen
  └── constants/                  // App constants
      └── Colors.ts               // Color definitions
```

## Video Demonstration

[![Watch the video](https://imgs.search.brave.com/5Pldd5sdWBd5OKltu_y34X9U7tmunie5B23IsRVsi7w/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by95b3V0dWJlLWxv/Z28tdmlkZW8tcGxh/eWVyLTNkLWRlc2ln/bi12aWRlby1tZWRp/YS1wbGF5ZXItaW50/ZXJmYWNlXzQxMjA0/LTExMTk0LmpwZz9z/ZW10PWFpc19jb3Vu/dHJ5X2Jvb3N0Jnc9/NzQw)](https://drive.google.com/file/d/1dUscnPjBgiL8CxwWKW9EcX3bHJMsLSDN/view?usp=drivesdk)

## Technologies Used

- React Native
- Expo
- react-native-gesture-handler (for handling various touch gestures)
- react-native-reanimated (for fluid animations)
- React Navigation (for screen navigation)
- React Context API (for state management)
- TypeScript (for type safety)

## Code Style Guidelines

The project follows these code style guidelines:
- Component modularity for improved reusability
- Using Context API for global state management
- Type safety using TypeScript interfaces
- Separation of concerns between components
- Clear gesture handler implementation with feedback
- Effective use of animations for better user experience
- Consistent naming conventions and code formatting

## Author

Created by Khrobust Anton, IPZ-21-5.
