export declare type StepNavItem = {
    label: Record<string, string> | string;
    url?: string;
};
export declare type Context = {
    stepNav: StepNavItem[];
    setStepNav: (items: StepNavItem[]) => void;
};
