import React, { createContext, useContext, useReducer, useRef, useCallback, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BottomSheetModalProvider, BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { isNullOrEmpty } from '@function';
import BackDrop from '@components/BackDrop';
import RenderHtml from '@components/RenderHtml';

const { width, height } = Dimensions.get('screen');
// Step 1: Define a context
const BottomSheetContext = createContext();

// Step 2: Define a reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case 'showModal':
            return {
                ...state,
                openModal: true,
                data: action.payload
            };
        case 'hiddenModal':
            return {
                ...state,
                openModal: false,
                data: []
            };
        default:
            return state;
    }
};

/* Step 3: Create a component that provides the
 context and manages state with useReducer
 */

function BottomSheetProvider({ children }) {
    const [state, dispatchBottomSheet] = useReducer(reducer, { openModal: false, data: null });
    const bottomSheetModalRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['40%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handleDismissModalPress = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
    }, []);

    useEffect(() => {
        if (state.openModal) {
            handlePresentModalPress();
        }
        else {
            handleDismissModalPress();
        }
    }, [state.openModal]);

    return (
        <BottomSheetContext.Provider
            value={{
                state,
                dispatchBottomSheet
            }}
        >
            <BottomSheetModalProvider>
                {children}
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    snapPoints={snapPoints}
                    onDismiss={() => { dispatchBottomSheet({ type: 'hiddenModal' }) }}
                    backdropComponent={(backdropProps) => (
                        <BackDrop 
                            {...backdropProps} 
                            enableTouchThrough={true} 
                            handleClick={() => dispatchBottomSheet({ type: 'hiddenModal' })} 
                        />
                    )}
                >
                    <BottomSheetScrollView style={styles.contentContainer}>
                        {!isNullOrEmpty(state.data) &&
                            <>
                                <Text style={styles.title}>{state?.data.TITLE.replace('<body>', '').replace('</body>', '')}</Text>
                                <Text style={[styles.desc]}>{state?.data.CONTENT_SUM.replace('<body>', '').replace('</body>', '')}</Text>
                                <RenderHtml value={state?.data?.CONTENT.replace(/\s+/g, ' ').trim()} />
                            </>
                        }
                    </BottomSheetScrollView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </BottomSheetContext.Provider>
    );
}

// Step 4: Create a custom 
// hook to access the context
function useBottomSheetModal() {
    const context = useContext(BottomSheetContext);
    if (!context) {
        throw new Error(`useBottomSheetModal must be used within a BottomSheetContext`);
    }
    return context;
}

export { BottomSheetProvider, useBottomSheetModal }

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        paddingHorizontal: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#005abc',
        marginBottom: 3,
    },
    desc: {
        fontWeight: '500',
        fontSize: 14,
        textShadow: '-1px 1px 10px rgba(0, 0, 0)',
        color: '#858585',
    },
});