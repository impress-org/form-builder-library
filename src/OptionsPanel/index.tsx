import {BaseControl, PanelRow, ToggleControl} from '@wordpress/components';
import {useState} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import OptionsHeader from './OptionsHeader';
import OptionsList from './OptionsList';
import {OptionsPanelProps} from './types';
import {isCurrencyMode} from './utils';
import {CurrencyCode} from '../CurrencyControl/CurrencyCode';

import './styles.scss';

export default function Options({
    currency,
    multiple,
    selectable = true,
    options,
    setOptions,
    defaultControlsTooltip,
    onAddOption,
    onRemoveOption,
    readOnly = false,
    label = __('Options', 'give'),
    disableSoloCheckedOption = false,
    draggable = true,
    hasDescriptions,
}: OptionsPanelProps) {
    const [showValues, setShowValues] = useState<boolean>(false);
    const [showDescription, setShowDescription] = useState<boolean>(hasDescriptions);

    const handleAddOption = (): void => {
        if (onAddOption) {
            onAddOption();
            return;
        }

        setOptions([...options, {label: '', value: '', checked: false, description: ''}]);
    };

    return (
        <>
            {!isCurrencyMode(currency) && !readOnly && (
                <PanelRow>
                    <ToggleControl
                        label={__('Show values', 'give')}
                        checked={showValues}
                        onChange={() => setShowValues(!showValues)}
                    />
                </PanelRow>
            )}
            {hasDescriptions && (
                <PanelRow>
                    <ToggleControl
                        className={'givewp-amount-description-toggle'}
                        label={__('Enable amount description', 'give')}
                        checked={showDescription}
                        onChange={() => setShowDescription(!showDescription)}
                    />
                </PanelRow>
            )}
            <PanelRow>
                <BaseControl id={'give'}>
                    <OptionsHeader handleAddOption={handleAddOption} label={label} readOnly={readOnly} />
                    <OptionsList
                        currency={isCurrencyMode(currency) && (currency as CurrencyCode)}
                        options={options}
                        showValues={showValues}
                        multiple={multiple}
                        selectable={selectable}
                        setOptions={setOptions}
                        defaultControlsTooltip={defaultControlsTooltip}
                        onRemoveOption={onRemoveOption}
                        readOnly={readOnly}
                        disableSoloCheckedOption={disableSoloCheckedOption}
                        draggable={draggable}
                        showDescription={showDescription}
                    />
                </BaseControl>
            </PanelRow>
        </>
    );
}
