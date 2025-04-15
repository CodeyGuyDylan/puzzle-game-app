'use client';

import { useEffect, useState } from 'react';
import type { VariantType, ResultType } from '@/app/api/solve-times/types';

const useGetPuzzleData = <T extends VariantType>( variant: T ) => {
    const [puzzleData, setPuzzleData] = useState<ResultType<T> | []>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        const fetchPuzzleData = async () => {
            try {
                setLoading( true );

                const response = await fetch(`/api/solve-times?variant=${variant}`);

                if (!response.ok) {
                    throw new Error("Averages data not found");
                }

                const data = await response.json() as ResultType<T>;
                setPuzzleData(data);
            } catch (error) {
                setError(`Error fetching average data: ${error}`);
            } finally {
                setLoading( false );
            }
        }

        fetchPuzzleData();
    }, [ variant ] );

    return { data: puzzleData, error, loading };
}

export default useGetPuzzleData;
