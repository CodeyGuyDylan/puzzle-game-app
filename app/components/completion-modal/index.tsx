'use client';

import useGetPuzzleData from "@/app/hooks/use-get-puzzle-data";
import getStringCountPrefixArray from "@/app/lib/get-string-count-prefix-array";
import { SOLVE_TIMES_AVERAGE, SOLVE_TIMES_RECENT, SOLVE_TIMES_TOP } from "@/app/api/solve-times/constants";
import TypewriterText from "../typewriter-text";
import Button from '../button';
import { TYPEWRITER_TIME_PER_LETTER } from "../typewriter-text";
import { useMemo } from 'react';
import type { FC, Dispatch, SetStateAction } from 'react';

interface CompletionModalProps {
    setGameStep: Dispatch<SetStateAction<number>>;
}

const CompletionModal: FC<CompletionModalProps> = ( { setGameStep } ) => {
    const { data: averageData, loading: isAverageLoading } = useGetPuzzleData( SOLVE_TIMES_AVERAGE );
    const { data: topData, loading: isTopLoading } = useGetPuzzleData( SOLVE_TIMES_TOP );
    const { data: recentData, loading: isRecentLoading } = useGetPuzzleData( SOLVE_TIMES_RECENT );

    const isLoading = isAverageLoading || isTopLoading || isRecentLoading;

    const textArray = useMemo( () => {
        if ( isLoading ) {
            return {
                content: [],
                prefix: []
            };
        }

        const averageDuration = Math.round( Number( averageData[0].average_duration ) * 100 ) / 100;

        const contentArray = [
            "Puzzle Completed!",
            "Your time:",
            "300s",
            "Average time (worldwide):",
            `${averageDuration.toString()}s`,
            "Top times (worldwide):",
            ...topData.map( ( row, index ) => {
                const duration = Math.round( Number( row.duration_seconds ) * 100 ) / 100;

                return `${index + 1}: ${duration.toString()}s`;
            } ),
            "Recent times (worldwide):",
            ...recentData.map( ( row, index ) => {
                const duration = Math.round( Number( row.duration_seconds ) * 100 ) / 100;

                return `${index + 1}: ${duration.toString()}s`;
            } )
        ];

        const prefixArray = getStringCountPrefixArray( contentArray );

        return {
            content: contentArray,
            prefix: prefixArray
        }
    }, [ isLoading ] );

    const { content, prefix } = textArray;

    const handleClick = () => {
        setGameStep( 1 );
        localStorage.setItem( 'puzzle-game-step', '1' );
    }

    return (
        <dialog
            className="absolute top-0 left-0 size-full flex items-center justify-center bg-gray-400 opacity-70"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <div className="relative flex flex-col items-center min-w-xs min-h-[600px] bg-white rounded-lg">
                { isLoading ? (
                    <div className="flex items-center justify-center" aria-live="polite">
                        <div className="w-3 h-6 bg-black animate-blink m-4" />
                        <span className="sr-only">Loading puzzle completion data</span>
                    </div>
                ) : (
                <>
                    <h1 id="modal-title" className="text-2xl font-bold text-center p-4">
                        <TypewriterText text={ content[0] } />
                    </h1>

                    <div id="modal-description">
                        <h2 className="text-xl font-bold text-center p-2">
                            <TypewriterText text={ content[1] } delay={ prefix[0] * TYPEWRITER_TIME_PER_LETTER } />
                        </h2>

                        <section className="mb-3" aria-labelledby="your-time">
                            <h3 id="your-time" className="sr-only">Your time</h3>
                            <p className="text-lg text-center">
                                <TypewriterText text={ content[2] } delay={ prefix[1] * TYPEWRITER_TIME_PER_LETTER } />
                            </p>
                        </section>

                        <section className="mb-3" aria-labelledby="average-time">
                            <h3 id="average-time" className="text-xl font-bold text-center p-2">
                                <TypewriterText text={ content[3] } delay={ prefix[2] * TYPEWRITER_TIME_PER_LETTER } />
                            </h3>
                            <p className="text-lg text-center">
                                <TypewriterText text={ content[4] } delay={ prefix[3] * TYPEWRITER_TIME_PER_LETTER } />
                            </p>
                        </section>

                        <section className="mb-3" aria-labelledby="top-times">
                            <h3 id="top-times" className="text-xl font-bold p-2">
                                <TypewriterText text={ content[5] } delay={ prefix[4] * TYPEWRITER_TIME_PER_LETTER } />
                            </h3>
                            <ol className="mx-auto w-fit">
                                {Array.from({ length: topData.length }).map((_, index) => (
                                    <li className="text-lg" key={index}>
                                        <TypewriterText text={content[6 + index]} delay={prefix[5 + index] * TYPEWRITER_TIME_PER_LETTER} />
                                    </li>
                                ))}
                            </ol>
                        </section>

                        <section className="mb-3" aria-labelledby="recent-times">
                            <h3 id="recent-times" className="text-xl font-bold p-2">
                                <TypewriterText text={ content[6 + topData.length] } delay={ prefix[5 + topData.length] * TYPEWRITER_TIME_PER_LETTER } />
                            </h3>
                            <ol className="mx-auto w-fit">
                                {Array.from({ length: recentData.length }).map((_, index) => (
                                    <li className="text-lg" key={index}>
                                        <TypewriterText text={content[7 + topData.length + index]} delay={prefix[6 + topData.length + index] * TYPEWRITER_TIME_PER_LETTER} />
                                    </li>
                                ))}
                            </ol>
                        </section>
                    </div>
                </>
                ) }
                
                <Button
                    className="absolute bottom-6 w-1/2"
                    text="Play Again"
                    handleClick={ handleClick }
                    ariaLabel="Close completion results and play again"
                    dataDismiss="dialog"
                />
            </div>
        </dialog>
    )
}

export default CompletionModal;
