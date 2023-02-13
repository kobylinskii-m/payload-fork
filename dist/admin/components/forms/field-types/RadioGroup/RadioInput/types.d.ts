import { OnChange } from '../types';
export declare type Props = {
    isSelected: boolean;
    option: {
        label: Record<string, string> | string;
        value: string;
    };
    onChange: OnChange;
    path: string;
};
