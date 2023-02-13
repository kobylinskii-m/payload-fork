import React from 'react';
import { Data } from '../Form/types';
export declare type Props = {
    path: string;
    label?: RowLabel;
    rowNumber?: number;
    className?: string;
};
export declare type RowLabelArgs = {
    data: Data;
    path: string;
    index?: number;
};
export declare type RowLabelFunction = (args: RowLabelArgs) => string;
export declare type RowLabelComponent = React.ComponentType<RowLabelArgs>;
export declare type RowLabel = string | Record<string, string> | RowLabelFunction | RowLabelComponent;
export declare function isComponent(label: RowLabel): label is RowLabelComponent;
