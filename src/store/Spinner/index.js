import React, { createContext, useContext, useReducer } from 'react';
import Spinner from 'react-native-loading-spinner-overlay';

// Step 1: Define a context
const SpinnerContext = createContext();

// Step 2: Define a reducer function
const reducer = (state, action) => {
    switch (action.type) {
        case 'show':
            return { ...state,
                    visible: true 
                };
        case 'hidden':
            return { ...state,
                    visible: false 
                };
        case 'validUser':
            return { ...state,
                    validUser: true 
                };
        case 'invalidUser':
            return { ...state,
                    validUser: false 
                };
        default:
            return state;
    }
};

/* Step 3: Create a component that provides the
 context and manages state with useReducer
 */

function SpinnerProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, { visible: false, validUser: false });

    return (
        <SpinnerContext.Provider 
            value={{
                state,
                dispatch
            }}
        >
            <Spinner
                visible={state.visible}
                textContent={'Loading...'}
                textStyle={{ color: '#fff' }}
                overlayColor='rgba(0, 0, 0, 0.4)'
            />
            {children}
        </SpinnerContext.Provider>
    );
}

// Step 4: Create a custom 
// hook to access the context
function useSpinner() {
    const context = useContext(SpinnerContext);
    if (!context) {
        throw new Error(`useCounter must be used
                        within a SpinnerProvider`);
    }
    return context;
}

export { SpinnerProvider, useSpinner }