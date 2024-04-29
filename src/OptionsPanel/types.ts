import {CurrencyCode} from '../CurrencyControl/CurrencyCode';

export interface OptionsPanelProps {
    currency?: CurrencyCode | string;
    multiple: boolean;
    selectable?: boolean;
    options: OptionProps[];
    defaultControlsTooltip?: string;
    setOptions: (options: OptionProps[]) => void;
    onRemoveOption?: (option: OptionProps, index: number) => void;
    onAddOption?: () => void;
    label?: string;
    readOnly?: boolean;
    disableSoloCheckedOption?: boolean;
    draggable?: boolean;
    toggleLabel?: string;
    toggleEnabled?: boolean;
    onHandleToggle?: (value: boolean) => void;
    maxLabelLength?: number;
}

export interface OptionsListProps {
    currency?: CurrencyCode | string;
    options: OptionProps[];
    showHidden: boolean;
    multiple: boolean;
    selectable: boolean;
    defaultControlsTooltip?: string;
    setOptions: (options: OptionProps[]) => void;
    onRemoveOption?: (option: OptionProps, index: number) => void;
    readOnly?: boolean;
    disableSoloCheckedOption?: boolean;
    draggable?: boolean;
    maxLabelLength?: number;
}

export interface OptionsItemProps {
    currency?: CurrencyCode | string;
    provided: any;
    option: OptionProps;
    showHidden: boolean;
    multiple: boolean;
    selectable: boolean;
    defaultTooltip?: string;
    handleUpdateOptionLabel: (label: string) => void;
    handleUpdateOptionValue: (value: string) => void;
    handleUpdateOptionChecked: (checked: boolean) => void;
    handleRemoveOption: () => void;
    readOnly?: boolean;
    disabled?: boolean;
    draggable?: boolean;
    maxLabelLength?: number;
}

export interface OptionsHeaderProps {
    handleAddOption: () => void;
    label: string;
    readOnly: boolean;
}

export interface OptionProps {
    id?: string;
    label: string;
    value: string;
    checked: boolean;
}
