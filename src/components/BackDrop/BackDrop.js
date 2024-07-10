import React, { useMemo } from "react";
import { Pressable, Dimensions } from 'react-native';
import { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";

const { width, height } = Dimensions.get('screen');

const Backdrop = ({ animatedIndex, style, handleClick }: BottomSheetBackdropProps) => {
    // animated variables
    const containerAnimatedStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            animatedIndex.value,
            [0, 1],
            [0, 1],
            Extrapolate.CLAMP
        ),
    }));

    // styles
    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: 'rgba(0,0,0,.25)',
            },
            //containerAnimatedStyle,
        ],
        [style, containerAnimatedStyle]
    );

    return (
        <Animated.View style={containerStyle}>
            <Pressable onPress={handleClick} style={{width: width, height: height}} />
        </Animated.View>
    );
};

export default Backdrop;