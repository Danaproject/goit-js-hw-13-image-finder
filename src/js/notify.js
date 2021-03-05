import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import { alert, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/Material.css';
import { defaults } from '@pnotify/core';

defaults.styling = 'material';
defaults.icons = 'material';

defaultModules.set(PNotifyMobile, {});

function notify() {
    alert({
        text: 'No matches found. Please enter a valid word!',
        width: '340px',
        delay: 3000,
    });
}

export default notify;