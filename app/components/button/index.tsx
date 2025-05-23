import type { FC } from 'react';

interface ButtonProps {
    text: string;
    handleClick: () => void;
    className?: string;
    ariaLabel?: string;
    dataDismiss?: string;
}

const Button: FC<ButtonProps> = ( { text, handleClick, className } ) => {
    return (
        <button
            role="button"
            onClick={ handleClick }
            className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 cursor-pointer ${className}`}
            aria-label={ text }
            data-dismiss={ text }
        >
            { text }
        </button>
    )
}

export default Button;
