const BID_OAUTH_GLOBAL = window.BID_OAUTH_GLOBAL || {};

/**
 * @typedef {Object} BidStore.GlobalData
 * @property {String} sid
 * @property {String} oidcAuthenticationUrl
 * @property {String} applicationName
 * @property {String} bankidLocale
 * @property {String} ui_locales
 * @property {String} nnin
 * @property {String} phoneNo
 * @property {String} birthday
 * @property {String} cancelUrl
 * @property {String} merchantName
 * @property {String} bimClientUrl
 * @property {String} returnUrl
 * @property {String} mobilePollerUrl
 * @property {String} xIdEnrollNextUrl
 * @property {String} xidAddClientUrl
 * @property {String} xIdAddClientNextUrl
 * @property {String} xIdRefreshNextUrl
 * @property {String} xIdStepupNextUrl
 * @property {String} xIdNextUrl
 * @property {String} replyHref
 * @property {String} xIdLaterNextUrl
 * @property {String} xIdAddDevicetNextUrl
 * @property {String} xIdAddDeviceAddClientNextUrl
 * @property {String} tinfoEnrollNextUrl
 * @property {String} tinfoAddNextUrl
 * @property {String} tinfoAddEditContactUrl
 * @property {String} editExtraInfo
 * @property {String} tinfoConsentNextUrl
 * @property {String} xidSwitchUserUrl
 * @property {String} tinfoSwitchUserUrl
 * @memberOf BidStore
 */

export default class BidStore {
    /**
     * @return {BidStore.GlobalData}
     */
    static getBidGlobalData() {
        return BID_OAUTH_GLOBAL;
    }
}