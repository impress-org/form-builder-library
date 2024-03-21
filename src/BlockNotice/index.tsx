type BlockNoticeProps = {
    title: string,
    description: string,
    href: string
}

export default function BlockNotice({title, description, href}: BlockNoticeProps) {
    return (
        <div className={'givewp-block-notice'}>
            <span className={'givewp-block-notice__title'}>{title}</span>
            <span className={'givewp-block-notice__description'}>{description}</span>
            <a className={'givewp-block-notice__anchor'} href={href} target={'_blank'} rel={'noreferrer noopener'} />
        </div>
    );
}
