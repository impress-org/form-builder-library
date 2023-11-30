import {CurrencyCode} from '../CurrencyControl/CurrencyCode';

export const isCurrencyMode = (currency: string) =>
    Object.values(CurrencyCode).includes(currency as unknown as CurrencyCode);
