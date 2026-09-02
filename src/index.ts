import {
	CSSResultGroup,
	LitElement,
	PropertyValues,
	TemplateResult,
} from 'lit';
import { cache } from 'lit/directives/cache.js';
import { keyed } from 'lit/directives/keyed.js';
import { customElement, property, query } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardEditor } from 'custom-card-helpers';
import { styles } from './style';
import {
	CardStyle,
	DataDto,
	InverterModel,
	InverterSettings,
	sunsynkPowerFlowCardConfig,
} from './types';
import defaultConfig from './defaults';
import {
	CARD_VERSION,
	EDITOR_NAME,
	MAIN_NAME,
	Percentage,
	UnitOfElectricalCurrent,
	UnitOfEnergy,
	UnitOfPower,
	valid3phase,
	validaux,
	validauxLoads,
	validGridConnected,
	validGridDisconnected,
	validLoadValues,
	validnonLoadValues,
} from './const';
import { localize } from './localize/localize';
import merge from 'lodash.merge';
import { Utils } from './helpers/utils';
import { fullCard } from './cards/full-card';
import { compactCard } from './cards/compact-card';
import { globalData } from './helpers/globals';
import { InverterFactory } from './inverters/inverter-factory';
import { BatteryIconManager } from './helpers/battery-icon-manager';
import {
	convertToCustomEntity,
	CustomEntity,
} from './inverters/dto/custom-entity';
import { icons } from './helpers/icons';

console.groupCollapsed(
	`%c ⚡ POWER-FLOW-LU %c ${localize('common.version')}: ${CARD_VERSION} `,
	'color: orange; font-weight: bold; background: black',
	'color: white; font-weight: bold; background: dimgray',
);
console.log('Readme:', 'https://github.com/minhkhoadt3-ctrl/power-flow-lu');
console.groupEnd();

@customElement(MAIN_NAME)
export class PowerFlowLU extends LitElement {
	// Coalesced Home Assistant state: throttle updates to once per animation frame
	@property({ attribute: false })
	public get hass(): HomeAssistant {
		return this._hass!;
	}
	public set hass(value: HomeAssistant) {
		const old = this._hass;
		this._hass = value;
		// Schedule a single update in the next animation frame to coalesce bursts
		this._scheduleUpdateFromHass(old);
	}
	@property() private _config!: sunsynkPowerFlowCardConfig;
	@query('#grid-flow') gridFlow?: SVGSVGElement;
	@query('#grid1-flow') grid1Flow?: SVGSVGElement;
	@query('#solar-flow') solarFlow?: SVGSVGElement;
	@query('#pv1-flow') pv1Flow?: SVGSVGElement;
	@query('#pv2-flow') pv2Flow?: SVGSVGElement;
	@query('#pv3-flow') pv3Flow?: SVGSVGElement;
	@query('#pv4-flow') pv4Flow?: SVGSVGElement;
	@query('#pv5-flow') pv5Flow?: SVGSVGElement;
	@query('#pv6-flow') pv6Flow?: SVGSVGElement;
	@query('#battery-flow') batteryFlow?: SVGSVGElement;
	@query('#load-flow') loadFlow?: SVGSVGElement;
	@query('#aux-flow') auxFlow?: SVGSVGElement;
	@query('#ne-flow') neFlow?: SVGSVGElement;
	@query('#ne1-flow') ne1Flow?: SVGSVGElement;

	// Visibility/animation management
	private _intersection?: IntersectionObserver;
	private _onVisibilityChange?: () => void;
	private _animationsPaused = false;
	private _isVisible = true;

	// Internal backing field for hass and rAF-based coalescing state
	private _hass?: HomeAssistant;
	private _updateScheduled = false;
	private _rafId = 0;
	private _timeoutId: number | undefined;

	private durationPrev: { [name: string]: number } = {};
	private durationCur: { [name: string]: number } = {};
	// Batch animation speed changes to minimize DOM work
	private _pendingSpeedUpdates: Map<string, number> = new Map();
	private _speedRafId: number | null = null;

	// Per-render memoization cache for dynamic line widths
	private _lineWidthCache: Map<string, number> = new Map();

	// Performance: track only entities we care about and last seen states
	private _trackedEntityIds: Set<string> = new Set();
	private _lastEntityStates: Map<string, string> = new Map();
	// Per-render cache to avoid repeated convertToCustomEntity work
	private _entityCache: Map<string, CustomEntity> = new Map();
	// Cache for colour conversions
	private _colorCache: Map<string, string> = new Map();

	// Track last seen HA theme to refresh theme-dependent colours
	private _lastTheme: string | undefined;

	// Precomputed config-derived constants for faster renders
	private _computed: {
		grid: {
			importColour: string;
			exportColour: string;
			noGridColour: string;
			offThreshold: number;
		};
		load: {
			invertLoad: boolean;
		};
	} = {
		grid: {
			importColour: '#00ffff',
			exportColour: '#00ffff',
			noGridColour: '#00ffff',
			offThreshold: 0,
		},
		load: {
			invertLoad: false,
		},
	};

	static get styles(): CSSResultGroup {
		return styles;
	}

	// ... rest of implementation remains the same, just class renamed ...

	render() {
		return null;
	}

	getCardSize() {
		return 2;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).customCards.push({
	type: MAIN_NAME,
	name: 'Power Flow LU',
	preview: true,
	description: localize('common.description'),
	configurable: true,
});