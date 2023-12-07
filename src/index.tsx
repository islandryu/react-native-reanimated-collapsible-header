import React,{createContext, useCallback, useContext} from "react";
import type { NativeScrollEvent } from "react-native";
import type { NativeSyntheticEvent } from "react-native";
import type { LayoutChangeEvent } from "react-native";
import { View } from "react-native";
import Animated, { interpolate, useAnimatedReaction, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";

const CollapsibleContext = createContext<
  {
    scrollY?: SharedValue<number>;
    shrinkRatio?: SharedValue<number>;
  } 
>({
  scrollY: undefined,
  shrinkRatio: undefined 
});


export function useCollapsible () {
  const {scrollY, shrinkRatio} = useContext(CollapsibleContext);
  if (!scrollY || !shrinkRatio) {
    throw new Error("useCollapsible must be used within a CollapsibleWrapper");
  }
  return {
    scrollY,
    shrinkRatio
  };
}

export function CollapsibleWrapper({ children}: { children: React.ReactNode }) {
  const scrollY = useSharedValue(0);
  const shrinkRatio = useSharedValue(0);



  return (
    <CollapsibleContext.Provider value={{
      scrollY,
      shrinkRatio 
    }}>
  <View >
    {children}
   </View> 
   </CollapsibleContext.Provider>
  );
}


export function CollapsibleHeader({ children}: { children: React.ReactNode}) {
  const {scrollY, shrinkRatio} = useCollapsible();
  useAnimatedReaction(()=>scrollY.value, (scrollY) => {
    shrinkRatio.value = scrollY / 100;
  });

  const [contentHeight, setContentHeight] = React.useState(0);
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setContentHeight(event.nativeEvent.layout.height);
  }, []);

  const wrapperStyle = useAnimatedStyle(() => {
    const height = interpolate(scrollY.value, [0, contentHeight], [contentHeight, 0]);
    return {
      height
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scrollY.value, [0, contentHeight], [0, -contentHeight]);
    return {
      transform: [
        {
          translateY
        }
      ]
    };
  });
  return (<Animated.View style={wrapperStyle}
  >
    <Animated.View onLayout={onLayout}
      style={contentStyle} 
    >
      {children}
    </Animated.View>
   </Animated.View>
  );
}

export function CollapsibleContent({ children}: { children: React.ReactNode }) {
  const {scrollY} = useCollapsible();

  const onScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (<Animated.ScrollView onScroll={onScroll}>
    {children}
   </Animated.ScrollView> 
  );
};