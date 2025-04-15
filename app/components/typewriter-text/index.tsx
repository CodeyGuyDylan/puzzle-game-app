import { useEffect, useState, type FC } from 'react';

export const TYPEWRITER_TIME_PER_LETTER = 50; // milliseconds

interface TypewriterTextProps {
    text: string;
    delay?: number;
}

const TypewriterText: FC<TypewriterTextProps> = ( { text, delay = 0 } ) => {
    const [ renderedText, setRenderedText ] = useState('');

    useEffect( () => {
        const typewriterEffect = async () => {
            await new Promise( ( resolve ) => setTimeout( resolve, delay ) );

            const typewriterInterval = setInterval( () => {
                setRenderedText( ( prev ) => {
                    const nextChar = text[ prev.length ];
                    return nextChar ? prev + nextChar : prev;
                } );
            }, TYPEWRITER_TIME_PER_LETTER );

            return () => {
                clearInterval( typewriterInterval );
            }
        }

        typewriterEffect();
    }, [] );

    return (
        <span>
            { renderedText }
        </span>
    )
}

export default TypewriterText;