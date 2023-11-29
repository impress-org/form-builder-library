import type {CurrencyInputProps} from "react-currency-input-field";
import {useInstanceId} from '@wordpress/compose';
import {useState} from "@wordpress/element";
import {BaseControl} from "@wordpress/components";
import CurrencyInput from "react-currency-input-field";
import {CurrencyCode} from "./CurrencyCode";
import parseValueFromLocale from "./parseValueFromLocale";

interface CurrencyControlProps extends CurrencyInputProps {
    currency: CurrencyCode;
    label?: string;
    hideLabelFromVision?: boolean;
    help?: string;
}

export default function CurrencyControl ({label, help, hideLabelFromVision, value, onValueChange, currency, ...rest}: CurrencyControlProps) {
    const [localizedValue, setLocalizedValue] = useState(value);

    // simplified implementation of useBaseControlProps()
    const uniqueId = useInstanceId(BaseControl, 'wp-components-base-control');

    const updateValue = (value: string) => {
        setLocalizedValue(value);
        onValueChange(parseValueFromLocale(value));
    };

    return (
        <BaseControl label={label} help={help} id={uniqueId} hideLabelFromVision={hideLabelFromVision}>
            <CurrencyInput
                id={uniqueId}
                value={localizedValue}
                onValueChange={updateValue}
                className={'components-text-control__input'}
                allowDecimals={true}
                allowNegativeValue={false}
                maxLength={9}
                intlConfig={{locale: window.navigator.language, currency}}
                {...rest}
            />
        </BaseControl>
    );
};
