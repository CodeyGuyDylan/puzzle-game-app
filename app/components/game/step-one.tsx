'use client';

import { useCallback } from 'react';
import Button from '@/app/components/button';
import type { FC, SetStateAction, Dispatch } from 'react';

interface StepOneProps {
    setGameStep: Dispatch<SetStateAction<number>>;
}

const StepOne: FC< StepOneProps > = ( { setGameStep } ) => {
    const handleClick = useCallback( () => {
        setGameStep( 2 );
        localStorage.setItem( 'puzzle-game-step', '2' );
    }, [] );

    return (
        <>
            <div className="flex flex-col items-center justify-start p-8">
                <h1>Welcome to the game!</h1>
                <Button
                    text="Start the game"
                    handleClick={ handleClick }
                />
            </div>
        </>
    );
}

export default StepOne;
