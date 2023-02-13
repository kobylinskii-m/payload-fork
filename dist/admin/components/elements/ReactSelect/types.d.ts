export declare type Option = {
    [key: string]: unknown;
    value: unknown;
};
export declare type OptionGroup = {
    label: string;
    options: Option[];
};
export declare type Props = {
    className?: string;
    value?: Option | Option[];
    onChange?: (value: any) => void;
    onMenuOpen?: () => void;
    disabled?: boolean;
    showError?: boolean;
    options: Option[] | OptionGroup[];
    isMulti?: boolean;
    isLoading?: boolean;
    isOptionSelected?: any;
    isSortable?: boolean;
    isDisabled?: boolean;
    onInputChange?: (val: string) => void;
    onMenuScrollToBottom?: () => void;
    placeholder?: string;
    isSearchable?: boolean;
    isClearable?: boolean;
    filterOption?: (({ label, value, data }: {
        label: string;
        value: string;
        data: Option;
    }, search: string) => boolean) | undefined;
};
