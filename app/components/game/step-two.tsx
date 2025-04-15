'use client';

import { useCallback, useState } from 'react';
import Button from '../button';
import type { FC, SetStateAction, Dispatch } from 'react';

interface StepTwoProps {
    setGameStep: Dispatch<SetStateAction<number>>;
}

const StepTwo: FC< StepTwoProps > = ( { setGameStep } ) => {
    const [ clickCount, setClickCount ] = useState( 0 );

    const handleClick = () => {
        setClickCount( prev => prev + 1 );

        if ( clickCount >= 13 ) {
            setGameStep ( 3 );
            localStorage.setItem( 'puzzle-game-step', '3' );
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-start p-8">
                <p>Press <button className="cursor-pointer" role="button" onClick={ handleClick }>this button</button> 13 times</p>
                <Button
                    text="Press me!"
                    handleClick={ () => void( 0 ) }
                />
            </div>
        </>
    );
}

export default StepTwo;
