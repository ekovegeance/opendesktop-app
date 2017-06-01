'use strict';

import Component from 'js/Component.js';

export default class InstalledItemsPage extends Component {

    html() {
        if (!this.state) {
            return '';
        }

        const type = this.state.installType;

        let list = '';
        for (const itemKey of Object.keys(this.state.installedItems)) {
            if (this.state.installedItems[itemKey].install_type === type) {
                for (const file of this.state.installedItems[itemKey].files) {
                    const path = `${this.state.installTypes[type].destination}/${file}`;
                    const openFileParams = JSON.stringify({path: path});
                    const applyFileParams = JSON.stringify({path: path, installType: type});
                    const removeFileParams = JSON.stringify({itemKey: itemKey});
                    let applyCell = '';
                    if (this.state.isApplicableType) {
                        applyCell = `<td class="apply-file-cell"><button data-dispatch="apply-file" data-params='${applyFileParams}'>Apply</button></td>`;
                    }
                    list += `
                        <tr>
                        <td class="open-file-cell"><a href="#" data-dispatch="open-file" data-params='${openFileParams}'>${file}</a></td>
                        ${applyCell}
                        <td class="remove-file-cell"><button data-dispatch="remove-file" data-params='${removeFileParams}'>Remove</button></td>
                        </tr>
                    `;
                }
            }
        }

        return `
            <div class="installeditems-page-content">
            <h1 class="title">${this.state.installTypes[type].name}</h1>
            <table class="installeditems">${list}</table>
            </div>
        `;
    }

    style() {
        this.element.style.display = 'flex';
        this.element.style.flexFlow = 'column nowrap';
        this.element.style.width = '100%';
        this.element.style.height = '100%';

        return `
            .installeditems-page-content {
                flex: 1 1 auto;
                width: 100%;
                height: 100%;

                display: flex;
                flex-flow: column nowrap;
                align-items: center;
                overflow: auto;
            }

            .installeditems-page-content .title {
                margin: 1em 0;
            }

            .installeditems-page-content .installeditems {
                width: 640px;
                margin: 1em 0;
                border-top: 1px solid rgba(0,0,0,0.1);
                border-bottom: 1px solid rgba(0,0,0,0.1);
                border-collapse: collapse;
            }

            .installeditems-page-content .installeditems tr {
                border-top: 1px solid rgba(0,0,0,0.1);
            }

            .installeditems-page-content .installeditems .open-file-cell {
                width: 100%;
            }

            .installeditems-page-content .installeditems a {
                display: block;
                padding: 0.6em;
                background-color: transparent;
                color: #222222;
                text-decoration: none;
                transition: background-color 0.3s ease-out;
            }
            .installeditems-page-content .installeditems a:hover,
            .installeditems-page-content .installeditems a:active {
                background-color: #e0e0e0;
            }

            .installeditems-page-content .installeditems button {
                margin: 0 0.2em;
                padding: 0.3em 0.5em;
            }
        `;
    }

}
