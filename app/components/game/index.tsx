'use client';

import { useState, useEffect } from 'react';
import useGetPuzzleStep from '@/app/hooks/use-get-puzzle-step';
import StepOne from './step-one';
import StepTwo from './step-two';
import CompletionModal from '../completion-modal';

const Game = () => {
    const [ gameStep, setGameStep ] = useState( -1 );
    const { step, isLoading } = useGetPuzzleStep();

    useEffect( () => {
        setGameStep( step );
    }, [ step ] );

    if ( isLoading ) {
        return (
            <div className="flex items-start justify-center min-h-screen">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin" role="status">
                    <span className="sr-only">Loading puzzle...</span>
                </div>
            </div>
        );
    }

    switch ( gameStep ) {
        case 1:
            return <StepOne setGameStep={ setGameStep } />;
        case 2:
            return <StepTwo setGameStep={ setGameStep } />;
        case 3:
            return <CompletionModal setGameStep={ setGameStep } />;
        default:
            return <div>Invalid step</div>;
    }
};

export default Game;