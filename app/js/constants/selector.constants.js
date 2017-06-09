const BASE = 'bid';

export default {
    BASE: BASE,
    ROOT: `.${BASE}`,
    MAIN: `.${BASE}__main`,

    VISIBLE: `${BASE}--visible`,

    HEADER: `.${BASE}__header`,
    HEADER_HEADLINE: `.${BASE}__header .${BASE}__title--headline`,

    DIALOG: `.${BASE}__dialog`,
    DIALOG_MAIN: `.${BASE}__dialog .${BASE}__dialog__main`,
    DIALOG_SECTION: `.${BASE}__dialog .${BASE}__dialog__section`,
    DIALOG_SECTION_CONTAINER: `.${BASE}__dialog .${BASE}__dialog__section__container`,
    DIALOG_HEADER: `.${BASE}__dialog .${BASE}__dialog__header`,
    DIALOG_HEADER_HEADLINE: `.${BASE}__dialog .${BASE}__dialog__header__headline`,
    DIALOG_CLOSE: `.${BASE}__dialog .${BASE}__dialog__close`,

    MENU_POPOVER: `.${BASE}__popover[data-popover=menu]`,
    MENU_BUTTON: `.${BASE}__button-icon__button[data-button=menu]`,

    CERTIFICATE_POPOVER: `.${BASE}__popover[data-popover=certificate]`,
    CERTIFICATE_BUTTON: `.${BASE}__button-icon__button[data-button=certificate]`,

    POPOVER_CLOSE: `.${BASE}__popover .${BASE}__popover__close`,
    POPOVER_CLOSE__BUTTON: `.${BASE}__popover .${BASE}__popover__close button`,

    CONTENT_HEADER_HEADLINE: `.${BASE}__content__header--headline`,
    LIST_ITEM: `ul.${BASE}__list li`,
};