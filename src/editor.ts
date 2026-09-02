import { html, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { EDITOR_NAME } from './const';
import { sunsynkPowerFlowCardConfig } from './types';
import { localize } from './localize/localize';
import { Utils } from './helpers/utils';

@customElement(EDITOR_NAME)
export class PowerFlowLUEditor extends LitElement implements LovelaceCardEditor {
	@property({ attribute: false }) public hass?: HomeAssistant;
	public setConfig(config: sunsynkPowerFlowCardConfig) {
		this._config = config;
	}

	private _config?: sunsynkPowerFlowCardConfig;

	render() {
		return html``;
	}
}
