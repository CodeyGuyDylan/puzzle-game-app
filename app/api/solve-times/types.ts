import type { RowDataPacket } from "mysql2";

type VariantType = 'top' | 'recent' | 'average';

interface RowDataPacketWithDuration extends RowDataPacket {
    duration_seconds: string;
}
interface RowDataPacketWithAverageDuration extends RowDataPacket {
    average_duration: string;
}

type TopOrRedcentResult = RowDataPacketWithDuration[] | [];
type AverageResult = RowDataPacketWithAverageDuration[] | [];

type ResultType< T extends VariantType > =
    T extends 'top' | 'recent' ? TopOrRedcentResult :
    T extends 'average' ? AverageResult :
    never;

export type { VariantType, ResultType };