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
    toggleLabel = __('Show values', 'give'),
    toggleEnabled = false,
    onHandleToggle,
    maxLabelLength = 0,
    showToggle
}: OptionsPanelProps) {
    const [showHidden, setShowHidden] = useState<boolean>(toggleEnabled);

    const handleAddOption = (): void => {
        if (onAddOption) {
            onAddOption();
            return;
        }

        setOptions([...options, {label: '', value: '', checked: false}]);
    };

    const handleToggle = () => {
        setShowHidden(!showHidden);
        onHandleToggle(!showHidden);
    };

    return (
        <>
            {!readOnly && showToggle && (
                <PanelRow>
                    <ToggleControl label={toggleLabel} checked={showHidden} onChange={handleToggle} />
                </PanelRow>
            )}

            <PanelRow>
                <BaseControl id={'give'}>
                    <OptionsHeader handleAddOption={handleAddOption} label={label} readOnly={readOnly} />
                    <OptionsList
                        currency={isCurrencyMode(currency) && (currency as CurrencyCode)}
                        options={options}
                        showHidden={showHidden}
                        multiple={multiple}
                        selectable={selectable}
                        setOptions={setOptions}
                        defaultControlsTooltip={defaultControlsTooltip}
                        onRemoveOption={onRemoveOption}
                        readOnly={readOnly}
                        disableSoloCheckedOption={disableSoloCheckedOption}
                        draggable={draggable}
                        maxLabelLength={maxLabelLength}
                    />
                </BaseControl>
            </PanelRow>
        </>
    );
}
