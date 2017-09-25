const STORAGE_KEY_USERS = 'xid-news-users';
const STORAGE_KEY_LOGGED_IN_USER = 'xid-news-user-logged-in';
const NEWS = {
    default: {
        main: [{
            image: 'img/article/001.jpeg',
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            size: 'large',
            custom: false
        }, {
            image: 'img/article/010.jpeg',
            title: 'Nulla id mauris congue',
            size: 'small',
            custom: false
        }, {
            image: 'img/article/013.jpeg',
            title: 'Proin eget mi dictum',
            size: 'medium-x',
            custom: false
        }],
        sidebar: [{
            image: 'img/article/011.jpeg',
            title: 'Aenean tincidunt lectus ac fringilla dignissim',
            size: 'medium',
            custom: false
        }, {
            image: 'img/article/012.jpeg',
            title: 'Vivamus maximus lorem a mi sollicitudin',
            size: 'medium',
            custom: false
        }, {
            list: [
                'Sed aliquet dui non tincidunt consequat',
                'Phasellus dapibus dolor vel neque vulputate facilisis.',
                'In et urna pellentesque, suscipit turpis sit amet',
                'Ut vel nibh tempor, iaculis leo semper',
                'Proin nec risus fermentum, commodo arcu vel'
            ],
            size: 'large',
            custom: false
        }],
        bottom: [{
            image: 'img/article/006.jpeg',
            title: 'Quisque ullamcorper purus eget metus',
            size: 'small',
            custom: false
        }, {
            image: 'img/article/014.jpeg',
            title: 'Mauris at risus non magna',
            size: 'small',
            custom: false,
            color: 'red'
        }, {
            image: 'img/article/008.jpeg',
            title: 'Sed fringilla nibh',
            size: 'small',
            custom: false
        }],
    },
    customise: {
        main: [{
            image: 'img/article/001.jpeg',
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            size: 'large',
            custom: false
        }, {
            image: 'img/article/005.jpeg',
            title: 'Integer rutrum nunc in libero',
            size: 'small',
            custom: true
        }, {
            image: 'img/article/004.jpeg',
            title: 'Ut ut lacus placerat lorem efficitur fringilla',
            size: 'medium-x',
            custom: true
        }],
        sidebar: [{
            image: 'img/article/002.jpeg',
            title: 'Curabitur maximus eros convallis',
            size: 'medium',
            custom: true
        }, {
            image: 'img/article/003.jpeg',
            title: '{{place}} today: Traffic chaos',
            size: 'medium',
            custom: true
        }, {
            list: [
                'Sed aliquet dui non tincidunt consequat',
                'Phasellus dapibus dolor vel neque vulputate facilisis.',
                'In et urna pellentesque, suscipit turpis sit amet',
                'Ut vel nibh tempor, iaculis leo semper',
                'Proin nec risus fermentum, commodo arcu vel'
            ],
            size: 'large',
            custom: false
        }],
        bottom: [{
            image: 'img/article/006.jpeg',
            title: 'Quisque ullamcorper purus eget metus',
            size: 'small',
            custom: false
        }, {
            image: 'img/article/007.jpeg',
            title: 'Phasellus congue sapien at urna',
            size: 'small',
            custom: true,
            color: 'red'
        }, {
            image: 'img/article/008.jpeg',
            title: 'Sed fringilla nibh',
            size: 'small',
            custom: false
        }],
    }
};

const ADS = {
    default: {
        primary: 'img/article/red.png',
        secondary: 'img/article/BankID_ad.png'
    },
    customise: {
        primary: 'img/article/green.png',
        secondary: 'img/article/BankID_ad.png'
    }
};

const WEATHER_ICON = {
    CLOUD: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiAgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiPiAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik02LDE5QTUsNSAwIDAsMSAxLDE0QTUsNSAwIDAsMSA2LDlDNyw2LjY1IDkuMyw1IDEyLDVDMTUuNDMsNSAxOC4yNCw3LjY2IDE4LjUsMTEuMDNMMTksMTFBNCw0IDAgMCwxIDIzLDE1QTQsNCAwIDAsMSAxOSwxOUg2TTE5LDEzSDE3VjEyQTUsNSAwIDAsMCAxMiw3QzkuNSw3IDcuNDUsOC44MiA3LjA2LDExLjE5QzYuNzMsMTEuMDcgNi4zNywxMSA2LDExQTMsMyAwIDAsMCAzLDE0QTMsMyAwIDAsMCA2LDE3SDE5QTIsMiAwIDAsMCAyMSwxNUEyLDIgMCAwLDAgMTksMTNaIiAvPjwvc3ZnPg==',
    RAIN: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiAgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiPiAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik02LDE0QTEsMSAwIDAsMSA3LDE1QTEsMSAwIDAsMSA2LDE2QTUsNSAwIDAsMSAxLDExQTUsNSAwIDAsMSA2LDZDNywzLjY1IDkuMywyIDEyLDJDMTUuNDMsMiAxOC4yNCw0LjY2IDE4LjUsOC4wM0wxOSw4QTQsNCAwIDAsMSAyMywxMkE0LDQgMCAwLDEgMTksMTZIMThBMSwxIDAgMCwxIDE3LDE1QTEsMSAwIDAsMSAxOCwxNEgxOUEyLDIgMCAwLDAgMjEsMTJBMiwyIDAgMCwwIDE5LDEwSDE3VjlBNSw1IDAgMCwwIDEyLDRDOS41LDQgNy40NSw1LjgyIDcuMDYsOC4xOUM2LjczLDguMDcgNi4zNyw4IDYsOEEzLDMgMCAwLDAgMywxMUEzLDMgMCAwLDAgNiwxNE0xNC44MywxNS42N0MxNi4zOSwxNy4yMyAxNi4zOSwxOS41IDE0LjgzLDIxLjA4QzE0LjA1LDIxLjg2IDEzLDIyIDEyLDIyQzExLDIyIDkuOTUsMjEuODYgOS4xNywyMS4wOEM3LjYxLDE5LjUgNy42MSwxNy4yMyA5LjE3LDE1LjY3TDEyLDExTDE0LjgzLDE1LjY3TTEzLjQxLDE2LjY5TDEyLDE0LjI1TDEwLjU5LDE2LjY5QzkuOCwxNy41IDkuOCwxOC43IDEwLjU5LDE5LjVDMTEsMTkuOTMgMTEuNSwyMCAxMiwyMEMxMi41LDIwIDEzLDE5LjkzIDEzLjQxLDE5LjVDMTQuMiwxOC43IDE0LjIsMTcuNSAxMy40MSwxNi42OVoiIC8+PC9zdmc+',
    RAIN2: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjRkZGIiBkPSJNNC41IDEzLjU5Yy41LjI4LjY0LjkxLjM3IDEuMzctLjI4LjQ4LS44Ny42NC0xLjM3LjM3QTQuOTggNC45OCAwIDAgMSAxIDExYTUgNSAwIDAgMSA1LTVjMS0yLjM1IDMuMy00IDYtNCAzLjQzIDAgNi4yNCAyLjY2IDYuNSA2LjAzTDE5IDhhNCA0IDAgMCAxIDQgNCA0IDQgMCAwIDEtNCA0IDEgMSAwIDAgMS0xLTEgMSAxIDAgMCAxIDEtMSAyIDIgMCAwIDAgMi0yIDIgMiAwIDAgMC0yLTJoLTJWOWE1IDUgMCAwIDAtNS01QzkuNSA0IDcuNDUgNS44MiA3LjA2IDguMTkgNi43MyA4LjA3IDYuMzcgOCA2IDhhMyAzIDAgMCAwLTMgM2MwIDEuMTEuNiAyLjA4IDEuNSAyLjZ2LS4wMW01LTIuNTloM2wtMiA0aDJsLTMuNzUgNyAuNzUtNUg3bDIuNS02bTggNy42N2MwIDEuMjktMSAyLjMzLTIuMjUgMi4zM1MxMyAxOS45NiAxMyAxOC42N2MwLTEuNTUgMi4yNS00LjE3IDIuMjUtNC4xN3MyLjI1IDIuNjIgMi4yNSA0LjE3eiIvPjwvc3ZnPg==',
    SNOW: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiAgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiPiAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik02LDE0QTEsMSAwIDAsMSA3LDE1QTEsMSAwIDAsMSA2LDE2QTUsNSAwIDAsMSAxLDExQTUsNSAwIDAsMSA2LDZDNywzLjY1IDkuMywyIDEyLDJDMTUuNDMsMiAxOC4yNCw0LjY2IDE4LjUsOC4wM0wxOSw4QTQsNCAwIDAsMSAyMywxMkE0LDQgMCAwLDEgMTksMTZIMThBMSwxIDAgMCwxIDE3LDE1QTEsMSAwIDAsMSAxOCwxNEgxOUEyLDIgMCAwLDAgMjEsMTJBMiwyIDAgMCwwIDE5LDEwSDE3VjlBNSw1IDAgMCwwIDEyLDRDOS41LDQgNy40NSw1LjgyIDcuMDYsOC4xOUM2LjczLDguMDcgNi4zNyw4IDYsOEEzLDMgMCAwLDAgMywxMUEzLDMgMCAwLDAgNiwxNE03Ljg4LDE4LjA3TDEwLjA3LDE3LjVMOC40NiwxNS44OEM4LjA3LDE1LjUgOC4wNywxNC44NiA4LjQ2LDE0LjQ2QzguODUsMTQuMDcgOS41LDE0LjA3IDkuODgsMTQuNDZMMTEuNSwxNi4wN0wxMi4wNywxMy44OEMxMi4yMSwxMy4zNCAxMi43NiwxMy4wMyAxMy4yOSwxMy4xN0MxMy44MywxMy4zMSAxNC4xNCwxMy44NiAxNCwxNC40TDEzLjQxLDE2LjU5TDE1LjYsMTZDMTYuMTQsMTUuODYgMTYuNjksMTYuMTcgMTYuODMsMTYuNzFDMTYuOTcsMTcuMjQgMTYuNjYsMTcuNzkgMTYuMTIsMTcuOTNMMTMuOTMsMTguNUwxNS41NCwyMC4xMkMxNS45MywyMC41IDE1LjkzLDIxLjE1IDE1LjU0LDIxLjU0QzE1LjE1LDIxLjkzIDE0LjUsMjEuOTMgMTQuMTIsMjEuNTRMMTIuNSwxOS45M0wxMS45MywyMi4xMkMxMS43OSwyMi42NiAxMS4yNCwyMi45NyAxMC43MSwyMi44M0MxMC4xNywyMi42OSA5Ljg2LDIyLjE0IDEwLDIxLjZMMTAuNTksMTkuNDFMOC40LDIwQzcuODYsMjAuMTQgNy4zMSwxOS44MyA3LjE3LDE5LjI5QzcuMDMsMTguNzYgNy4zNCwxOC4yMSA3Ljg4LDE4LjA3WiIgLz48L3N2Zz4=',
    SUN: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiAgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiPiAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xMiw3QTUsNSAwIDAsMSAxNywxMkE1LDUgMCAwLDEgMTIsMTdBNSw1IDAgMCwxIDcsMTJBNSw1IDAgMCwxIDEyLDdNMTIsOUEzLDMgMCAwLDAgOSwxMkEzLDMgMCAwLDAgMTIsMTVBMywzIDAgMCwwIDE1LDEyQTMsMyAwIDAsMCAxMiw5TTEyLDJMMTQuMzksNS40MkMxMy42NSw1LjE1IDEyLjg0LDUgMTIsNUMxMS4xNiw1IDEwLjM1LDUuMTUgOS42MSw1LjQyTDEyLDJNMy4zNCw3TDcuNSw2LjY1QzYuOSw3LjE2IDYuMzYsNy43OCA1Ljk0LDguNUM1LjUsOS4yNCA1LjI1LDEwIDUuMTEsMTAuNzlMMy4zNCw3TTMuMzYsMTdMNS4xMiwxMy4yM0M1LjI2LDE0IDUuNTMsMTQuNzggNS45NSwxNS41QzYuMzcsMTYuMjQgNi45MSwxNi44NiA3LjUsMTcuMzdMMy4zNiwxN00yMC42NSw3TDE4Ljg4LDEwLjc5QzE4Ljc0LDEwIDE4LjQ3LDkuMjMgMTguMDUsOC41QzE3LjYzLDcuNzggMTcuMSw3LjE1IDE2LjUsNi42NEwyMC42NSw3TTIwLjY0LDE3TDE2LjUsMTcuMzZDMTcuMDksMTYuODUgMTcuNjIsMTYuMjIgMTguMDQsMTUuNUMxOC40NiwxNC43NyAxOC43MywxNCAxOC44NywxMy4yMUwyMC42NCwxN00xMiwyMkw5LjU5LDE4LjU2QzEwLjMzLDE4LjgzIDExLjE0LDE5IDEyLDE5QzEyLjgyLDE5IDEzLjYzLDE4LjgzIDE0LjM3LDE4LjU2TDEyLDIyWiIgLz48L3N2Zz4=',
    SUN2: 'data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjRkZGIiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTYuNzYgNC44NGwtMS44LTEuNzktMS40MSAxLjQxIDEuNzkgMS43OSAxLjQyLTEuNDF6TTQgMTAuNUgxdjJoM3YtMnptOS05Ljk1aC0yVjMuNWgyVi41NXptNy40NSAzLjkxbC0xLjQxLTEuNDEtMS43OSAxLjc5IDEuNDEgMS40MSAxLjc5LTEuNzl6bS0zLjIxIDEzLjdsMS43OSAxLjggMS40MS0xLjQxLTEuOC0xLjc5LTEuNCAxLjR6TTIwIDEwLjV2Mmgzdi0yaC0zem0tOC01Yy0zLjMxIDAtNiAyLjY5LTYgNnMyLjY5IDYgNiA2IDYtMi42OSA2LTYtMi42OS02LTYtNnptLTEgMTYuOTVoMlYxOS41aC0ydjIuOTV6bS03LjQ1LTMuOTFsMS40MSAxLjQxIDEuNzktMS44LTEuNDEtMS40MS0xLjc5IDEuOHoiLz48L3N2Zz4=',
    WIND: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiAgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiB2aWV3Qm94PSIwIDAgMjQgMjQiPiAgIDxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik00LDEwQTEsMSAwIDAsMSAzLDlBMSwxIDAgMCwxIDQsOEgxMkEyLDIgMCAwLDAgMTQsNkEyLDIgMCAwLDAgMTIsNEMxMS40NSw0IDEwLjk1LDQuMjIgMTAuNTksNC41OUMxMC4yLDUgOS41Niw1IDkuMTcsNC41OUM4Ljc4LDQuMiA4Ljc4LDMuNTYgOS4xNywzLjE3QzkuOSwyLjQ1IDEwLjksMiAxMiwyQTQsNCAwIDAsMSAxNiw2QTQsNCAwIDAsMSAxMiwxMEg0TTE5LDEyQTEsMSAwIDAsMCAyMCwxMUExLDEgMCAwLDAgMTksMTBDMTguNzIsMTAgMTguNDcsMTAuMTEgMTguMjksMTAuMjlDMTcuOSwxMC42OCAxNy4yNywxMC42OCAxNi44OCwxMC4yOUMxNi41LDkuOSAxNi41LDkuMjcgMTYuODgsOC44OEMxNy40Miw4LjM0IDE4LjE3LDggMTksOEEzLDMgMCAwLDEgMjIsMTFBMywzIDAgMCwxIDE5LDE0SDVBMSwxIDAgMCwxIDQsMTNBMSwxIDAgMCwxIDUsMTJIMTlNMTgsMThINEExLDEgMCAwLDEgMywxN0ExLDEgMCAwLDEgNCwxNkgxOEEzLDMgMCAwLDEgMjEsMTlBMywzIDAgMCwxIDE4LDIyQzE3LjE3LDIyIDE2LjQyLDIxLjY2IDE1Ljg4LDIxLjEyQzE1LjUsMjAuNzMgMTUuNSwyMC4xIDE1Ljg4LDE5LjcxQzE2LjI3LDE5LjMyIDE2LjksMTkuMzIgMTcuMjksMTkuNzFDMTcuNDcsMTkuODkgMTcuNzIsMjAgMTgsMjBBMSwxIDAgMCwwIDE5LDE5QTEsMSAwIDAsMCAxOCwxOFoiIC8+PC9zdmc+'
};

const WEATHER_YAHOO_CODE = {
    CLOUD: [19, 20, 21, 22, 23, 25, 26, 27, 28, 29, 30, 44,],
    RAIN: [6, 8, 9, 10, 11, 12, 35, 37, 38, 39, 40, 45, 47,],
    SNOW: [5, 7, 13, 14, 15, 16, 17, 18, 41, 42, 43, 46,],
    SUN: [31, 32, 33, 34, 36,],
    WIND: [0, 1, 2, 3, 24,],
};

const WEATHER = {
    default: {
        icon: WEATHER_ICON.SUN,
        text: '22°C',
        color: 'red',
        subtext: 'Bergen'
    },
    customise: {
        icon: WEATHER_ICON.RAIN,
        text: '-5°C',
        color: 'blue',
        subtext: 'Oslo'
    }
};

export default {ADS, NEWS, WEATHER, WEATHER_ICON, WEATHER_YAHOO_CODE, STORAGE_KEY_USERS, STORAGE_KEY_LOGGED_IN_USER};