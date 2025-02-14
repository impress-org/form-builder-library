import type {CurrencyInputProps} from 'react-currency-input-field';
import CurrencyInput from 'react-currency-input-field';
import {useInstanceId} from '@wordpress/compose';
import {useEffect, useState} from '@wordpress/element';
import {BaseControl} from '@wordpress/components';
import {CurrencyCode} from './CurrencyCode';
import parseValueFromLocale from './parseValueFromLocale';

interface CurrencyControlProps extends CurrencyInputProps {
    currency: CurrencyCode;
    label?: string;
    hideLabelFromVision?: boolean;
    help?: string;
}

const formatter = new Intl.NumberFormat(navigator.language);
const groupSeparator = formatter.format(1000).replace(/[0-9]/g, '');
const decimalSeparator = formatter.format(1.1).replace(/[0-9]/g, '');


export default function CurrencyControl({
    label,
    help,
    hideLabelFromVision,
    value,
    onValueChange,
    currency,
    ...rest
}: CurrencyControlProps) {
    const [localizedValue, setLocalizedValue] = useState(value);

    useEffect(() => {
        if (value !== localizedValue) {
            setLocalizedValue(value);
        }
    }, [value]);

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
                disableAbbreviations
                decimalSeparator={decimalSeparator}
                groupSeparator={
                    /**
                     * Replace non-breaking space to avoid conflict with the suffix separator.
                     * @link https://github.com/cchanxzy/react-currency-input-field/issues/266
                     */
                    groupSeparator.replace(/\u00A0/g, ' ')
                }
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
}
