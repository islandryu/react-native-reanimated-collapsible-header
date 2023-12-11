import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedReaction,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

const CollapsibleContext = createContext<{
  scrollY?: SharedValue<number>;
  shrinkRatio?: SharedValue<number>;
  maxHeaderHeight?: SharedValue<number>;
  minHeight?: SharedValue<number>;
}>({
  scrollY: undefined,
  shrinkRatio: undefined,
  maxHeaderHeight: undefined,
  minHeight: undefined,
});

export function useCollapsible() {
  const { scrollY, shrinkRatio, maxHeaderHeight, minHeight } =
    useContext(CollapsibleContext);
  if (!scrollY || !shrinkRatio || !maxHeaderHeight || !minHeight) {
    throw new Error('useCollapsible must be used within a CollapsibleWrapper');
  }
  return {
    scrollY,
    shrinkRatio,
    maxHeaderHeight,
    minHeight,
  };
}

export function CollapsibleWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollY = useSharedValue(0);
  const shrinkRatio = useSharedValue(0);
  const maxHeaderHeight = useSharedValue(0);
  const minHeight = useSharedValue(0);
  return (
    <CollapsibleContext.Provider
      value={{
        scrollY,
        shrinkRatio,
        maxHeaderHeight,
        minHeight,
      }}
    >
      <View>{children}</View>
    </CollapsibleContext.Provider>
  );
}

export function CollapsibleHeader({
  children,
  minHeight: minHeightProp = 50,
}: {
  children: React.ReactNode;
  minHeight?: number;
}) {
  const { scrollY, shrinkRatio, maxHeaderHeight, minHeight } = useCollapsible();

  useEffect(() => {
    minHeight.value = minHeightProp;
  }, [minHeightProp]);

  useAnimatedReaction(
    () => scrollY.value,
    (scrollY) => {
      shrinkRatio.value = scrollY / 100;
    }
  );

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    maxHeaderHeight.value = event.nativeEvent.layout.height;
  }, []);

  const wrapperStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [1, maxHeaderHeight.value - minHeight.value],
      [Math.max(maxHeaderHeight.value, minHeight.value), maxHeaderHeight.value],
      Extrapolate.CLAMP
    );
    return {
      height,
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, maxHeaderHeight.value],
      [0, -maxHeaderHeight.value],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        {
          translateY,
        },
      ],
    };
  });
  return (
    <Animated.View style={wrapperStyle}>
      <Animated.View onLayout={onLayout} style={contentStyle}>
        {children}
      </Animated.View>
    </Animated.View>
  );
}

export function CollapsibleContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scrollY, maxHeaderHeight, minHeight } = useCollapsible();

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const wrapperStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, maxHeaderHeight.value, Infinity],
      [0, -maxHeaderHeight.value, -maxHeaderHeight.value],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        {
          translateY,
        },
      ],
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, maxHeaderHeight.value, maxHeaderHeight.value],
      [0, maxHeaderHeight.value, maxHeaderHeight.value],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        {
          translateY,
        },
      ],
      paddingBottom: minHeight.value,
    };
  });

  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      onScroll={onScroll}
      style={wrapperStyle}
    >
      <Animated.View style={contentStyle}>{children}</Animated.View>
    </Animated.ScrollView>
  );
}
