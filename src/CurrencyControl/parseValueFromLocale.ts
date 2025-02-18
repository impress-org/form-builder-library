export default function parseValueFromLocale(amount: string): string {
    if (!amount) {
        return amount;
    }

    const {groupSeparator, decimalSeparator} = getNumberFormattingParts();

    return amount.replaceAll(groupSeparator, '').replace(decimalSeparator, '.');
}

export function getNumberFormattingParts(): { groupSeparator: string; decimalSeparator: string } {
    const numberFormat = new Intl.NumberFormat(window.navigator.language);
    const parts = numberFormat.formatToParts(1234.56);

    let groupSeparator = '';
    let decimalSeparator = '';

    for (const part of parts) {
        if (part.type === 'group') {
            groupSeparator = part.value;
        } else if (part.type === 'decimal') {
            decimalSeparator = part.value;
        }
    }

    return {groupSeparator, decimalSeparator};
}
