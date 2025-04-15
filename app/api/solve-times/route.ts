import { NextResponse } from 'next/server';
import getMySQLConnection from '@/app/lib/my-sql-connection';
import { SOLVE_TIMES_AVERAGE, SOLVE_TIMES_RECENT, SOLVE_TIMES_TOP } from './constants';
import type { VariantType, ResultType } from './types';

const acceptedTypes: VariantType[] = [ SOLVE_TIMES_AVERAGE, SOLVE_TIMES_TOP, SOLVE_TIMES_RECENT ];

const getQuery = ( variant: VariantType ) => {
    switch ( variant ) {
        case SOLVE_TIMES_TOP:
            return `SELECT duration_seconds FROM puzzle_solve_times WHERE duration_seconds IS NOT NULL ORDER BY duration_seconds ASC LIMIT 3;`;
        case SOLVE_TIMES_RECENT:
            return `SELECT duration_seconds FROM puzzle_solve_times WHERE duration_seconds IS NOT NULL ORDER BY start_time DESC LIMIT 3;`;
        case SOLVE_TIMES_AVERAGE:
            return `SELECT AVG(duration_seconds) AS average_duration FROM puzzle_solve_times;`;
        default:
            throw new Error('Invalid query type');
    }
}

export async function GET(request: Request) {
    const connection = await getMySQLConnection();

    const {searchParams} = new URL(request.url);
    const rawVariant = ( searchParams.get('variant') ?? null ) as VariantType;

    // Validate the query type
    const variant = acceptedTypes.includes(rawVariant) ? rawVariant : null;

    if ( ! variant ) {
        return NextResponse.json(
            { error: 'Query type is required' },
            { status: 400 }
        );
    }

    const queryString = getQuery(variant);

    try {
        const [rows] = await connection.query<ResultType<VariantType>[]>(queryString);

        return NextResponse.json( rows );
    } catch (error) {
        return NextResponse.json(
            { error },
            { status: 500 }
        );
    }
}
