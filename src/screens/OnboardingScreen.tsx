import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

const SPLASH = require('../../assets/chow_splash.png');

export function OnboardingScreen() {
  const { completeOnboarding } = useAuth();
  const insets = useSafeAreaInsets();

  const imageScale = useRef(new Animated.Value(1.12)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentSlide = useRef(new Animated.Value(36)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(imageScale, {
        toValue: 1,
        duration: 7000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(350),
        Animated.parallel([
          Animated.timing(contentOpacity, {
            toValue: 1,
            duration: 650,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(contentSlide, {
            toValue: 0,
            duration: 650,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(buttonScale, {
          toValue: 1.04,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(buttonScale, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    const pulseDelay = setTimeout(() => pulse.start(), 1200);
    return () => {
      clearTimeout(pulseDelay);
      pulse.stop();
    };
  }, [imageScale, overlayOpacity, contentOpacity, contentSlide, buttonScale]);

  const handleGetStarted = async () => {
    await completeOnboarding();
  };

  const onPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageClip}>
        <Animated.Image
          source={SPLASH}
          style={[styles.backgroundImage, { transform: [{ scale: imageScale }] }]}
          resizeMode="cover"
        />
      </View>

      <Animated.View style={[styles.fadeOverlay, { opacity: overlayOpacity }]} pointerEvents="none">
        <View style={styles.fadeTop} />
        <View style={styles.fadeBottom} />
      </Animated.View>

      <View style={[styles.bottom, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: contentOpacity,
              transform: [{ translateY: contentSlide }],
            },
          ]}>
          <Text style={styles.tagline}>Order from the best spots near you</Text>
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <Pressable
              style={styles.button}
              onPress={handleGetStarted}
              onPressIn={onPressIn}
              onPressOut={onPressOut}>
              <Text style={styles.buttonText}>Get Started</Text>
            </Pressable>
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  imageClip: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  fadeOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  fadeTop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  fadeBottom: {
    height: '42%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: colors.overlay,
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 8,
  },
  tagline: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '700',
  },
});
