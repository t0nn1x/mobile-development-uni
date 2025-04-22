import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  Alert,
} from "react-native";
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import { useGame } from "../contexts/GameContext";
import Colors from "../constants/Colors";

const { width, height } = Dimensions.get("window");

// Direction constants for FlingGestureHandler
// Explicitly define these constants instead of using Direction enum
const DIRECTION = {
  RIGHT: 1,
  LEFT: 2,
  UP: 4,
  DOWN: 8,
};

const ClickableObject: React.FC = () => {
  const {
    addScore,
    updateClicks,
    updateDoubleClicks,
    updateLongPresses,
    updateDrags,
    updateSwipeRight,
    updateSwipeLeft,
    updatePinches,
  } = useGame();

  // Animation values
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  // Debug states for gesture feedback
  const [longPressActive, setLongPressActive] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState("");

  // Object size state for pinch
  const [objectSize, setObjectSize] = useState(100);

  // Refs for gesture handlers
  const doubleTapRef = useRef(null);
  const singleTapRef = useRef(null);
  const longPressRef = useRef(null);

  // Show feedback for the direction of swipe
  useEffect(() => {
    if (swipeDirection) {
      setTimeout(() => setSwipeDirection(""), 2000);
    }
  }, [swipeDirection]);

  // Handle single tap
  const onSingleTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // Add 1 point for a single tap
      addScore(1);
      updateClicks();

      // Feedback animation
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  // Handle double tap
  const onDoubleTap = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // Add 2 points for a double tap
      addScore(2);
      updateDoubleClicks();

      // Feedback animation
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.4,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();

      // Visual feedback
      Alert.alert("Подвійний клік!", "Ви отримали 2 очки!");
    }
  };

  // Handle long press - FIXED: reduced duration and added better feedback
  const onLongPress = (event: any) => {
    if (event.nativeEvent.state === State.BEGAN) {
      // Visual feedback that long press has started
      setLongPressActive(true);
    }

    if (event.nativeEvent.state === State.ACTIVE) {
      // Long press completed successfully
      setLongPressActive(false);

      // Add 5 points for a long press
      addScore(5);
      updateLongPresses();

      // Feedback animation
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Visual feedback
      Alert.alert("Довге натискання!", "Ви отримали 5 очок!");
    }

    if (
      event.nativeEvent.state === State.FAILED ||
      event.nativeEvent.state === State.CANCELLED
    ) {
      // Long press was interrupted
      setLongPressActive(false);
    }
  };

  // Handle pan (drag)
  const onPanGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
    { useNativeDriver: true }
  );

  const onPanHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      // Update task after dragging
      updateDrags();

      // Return to original position with animation
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();

      // Visual feedback
      Alert.alert("Перетягування!", "Ви перетягнули об'єкт!");
    }
  };

  // FIXED: Swipe handlers
  const onSwipeRight = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // Add points and update task
      addScore(3);
      updateSwipeRight();
      setSwipeDirection("право");

      // Visual feedback animation
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Rotate animation
      Animated.timing(rotate, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        rotate.setValue(0);
      });

      // Visual feedback
      Alert.alert("Свайп вправо!", "Ви отримали 3 очки!");
    }
  };

  const onSwipeLeft = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      // Add points and update task
      addScore(3);
      updateSwipeLeft();
      setSwipeDirection("ліво");

      // Visual feedback animation
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Rotate animation
      Animated.timing(rotate, {
        toValue: -1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        rotate.setValue(0);
      });

      // Visual feedback
      Alert.alert("Свайп вліво!", "Ви отримали 3 очки!");
    }
  };

  // Handle pinch (zoom)
  const onPinchGestureEvent = (event: any) => {
    const newSize = 100 * event.nativeEvent.scale;
    setObjectSize(Math.min(Math.max(newSize, 50), 200));
  };

  const onPinchHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      // Add points and update task
      addScore(4);
      updatePinches();

      // Reset size after some time
      setTimeout(() => {
        setObjectSize(100);
      }, 1000);

      // Visual feedback
      Alert.alert("Змінено розмір!", "Ви отримали 4 очки!");
    }
  };

  // Convert rotate value to string for transform
  const spin = rotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-45deg", "0deg", "45deg"],
  });

  return (
    <View style={styles.container}>
      {/* Message for active long press */}
      {longPressActive && (
        <View style={styles.feedbackBanner}>
          <Text style={styles.feedbackText}>
            Утримуйте ще трохи для довгого натискання...
          </Text>
        </View>
      )}

      {/* Message for swipe direction */}
      {swipeDirection && (
        <View style={styles.feedbackBanner}>
          <Text style={styles.feedbackText}>Свайп в {swipeDirection}!</Text>
        </View>
      )}

      {/* Double Tap Handler */}
      <TapGestureHandler
        ref={doubleTapRef}
        onHandlerStateChange={onDoubleTap}
        numberOfTaps={2}
      >
        <Animated.View>
          {/* Single Tap Handler */}
          <TapGestureHandler
            ref={singleTapRef}
            onHandlerStateChange={onSingleTap}
            waitFor={doubleTapRef}
          >
            <Animated.View>
              {/* Long Press Handler - FIXED: reduced duration */}
              <LongPressGestureHandler
                ref={longPressRef}
                minDurationMs={1500} // Reduced from 3000ms
                onHandlerStateChange={onLongPress}
              >
                <Animated.View>
                  {/* Pan Handler */}
                  <PanGestureHandler
                    onGestureEvent={onPanGestureEvent}
                    onHandlerStateChange={onPanHandlerStateChange}
                  >
                    <Animated.View>
                      {/* Pinch Handler */}
                      <PinchGestureHandler
                        onGestureEvent={onPinchGestureEvent}
                        onHandlerStateChange={onPinchHandlerStateChange}
                      >
                        <Animated.View
                          style={[
                            styles.clickableObject,
                            {
                              width: objectSize,
                              height: objectSize,
                              transform: [
                                { scale },
                                { translateX },
                                { translateY },
                                { rotate: spin },
                              ],
                              // Add visual feedback for long press
                              borderColor: longPressActive
                                ? Colors.warning
                                : "transparent",
                              borderWidth: longPressActive ? 3 : 0,
                            },
                          ]}
                        >
                          <Text style={styles.objectText}>Tap Me!</Text>

                          {/* Instructions for better usability */}
                          <Text style={styles.instructionText}>
                            Клік, подвійний клік, перетягни, масштабуй...
                          </Text>
                        </Animated.View>
                      </PinchGestureHandler>
                    </Animated.View>
                  </PanGestureHandler>
                </Animated.View>
              </LongPressGestureHandler>
            </Animated.View>
          </TapGestureHandler>
        </Animated.View>
      </TapGestureHandler>

      {/* FIXED: Separate swipe handlers with numeric values instead of Direction enum */}
      <View style={styles.swipeArea}>
        <Text style={styles.swipeInstructions}>Зробіть свайп тут ↔️</Text>

        <FlingGestureHandler
          direction={DIRECTION.RIGHT}
          onHandlerStateChange={onSwipeRight}
        >
          <View style={styles.swipeDetector}>
            <FlingGestureHandler
              direction={DIRECTION.LEFT}
              onHandlerStateChange={onSwipeLeft}
            >
              <View style={styles.swipeDetector} />
            </FlingGestureHandler>
          </View>
        </FlingGestureHandler>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  clickableObject: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  objectText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  instructionText: {
    color: "white",
    fontSize: 10,
    textAlign: "center",
    opacity: 0.7,
    marginTop: 5,
  },
  feedbackBanner: {
    position: "absolute",
    top: -70,
    backgroundColor: Colors.info,
    padding: 10,
    borderRadius: 5,
    zIndex: 10,
  },
  feedbackText: {
    color: "white",
    fontWeight: "bold",
  },
  swipeArea: {
    marginTop: 50,
    width: "80%",
    alignItems: "center",
  },
  swipeInstructions: {
    marginBottom: 10,
    color: Colors.text,
  },
  swipeDetector: {
    width: 250,
    height: 50,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ClickableObject;
