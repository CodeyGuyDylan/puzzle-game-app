'use client';

import { useEffect, useState } from 'react';

const useGetPuzzleStep = () => {
    const [ step, setStep ] = useState( 0 );
    const [ isLoading, setLoading ] = useState( true );

    useEffect( () => {
        const currentStep = localStorage.getItem( 'puzzle-game-step' );

        if ( currentStep ) {
            const parsedStep = parseInt( currentStep, 10 );
            if ( ! isNaN( parsedStep ) && parsedStep >= 1 && parsedStep <= 3 ) {
                setStep( parsedStep );
            }
        } else {
            localStorage.setItem( 'puzzle-game-step', '1' );
            setStep( 1 );
        }

        setLoading( false );
    }, [] );

    return {
        step,
        isLoading,
    };
}

export default useGetPuzzleStep;
