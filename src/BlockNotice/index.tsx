import {ReactNode} from 'react';
import './styles.scss';

type BlockNoticeProps = {
    title: string;
    description?: string;
    href?: string;
    anchorText?: string;
    children?: ReactNode;
};

export default function BlockNotice({title, description, href, anchorText, children}: BlockNoticeProps) {
    return (
        <div className={'givewp-block-notice'}>
            <span className={'givewp-block-notice__title'}>{title}</span>
            {description && <span className={'givewp-block-notice__description'}>{description}</span>}
            {children}
            {href && (
                <a className={'givewp-block-notice__anchor'} href={href} target={'_blank'} rel={'noreferrer noopener'}>
                    {anchorText}
                </a>
            )}
        </div>
    );
}
