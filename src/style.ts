import { CSSResultGroup, css, html } from 'lit';

export const styles: CSSResultGroup = css`
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		width: 100%;
		padding: 7px;
	}

	.card {
		border-radius: var(--ha-card-border-radius, 11px);
		box-shadow: var(
			--ha-card-box-shadow,
			2px 2px 2px 3px rgba(0, 0, 0, 0.12),
			2px 2px 2px 2px rgba(0, 0, 0, 0.12),
			2px 2px 2px 2px rgba(0, 0, 0, 0.12)
		);
		background: var(--ha-card-background, var(--card-background-color, white));
		border-width: var(--ha-card-border-width);
		padding: 2px;
	}

	text {
		text-anchor: middle;
		dominant-baseline: middle;
	}

	.left-align {
		text-anchor: start;
	}
	.right-align {
		text-anchor: end;
	}
	.st1 {
		fill: #ff9b30;
	}
	.st2 {
		fill: #f3b3ca;
	}
	.st3 {
		font-size: 14px;
	}
	.st4 {
		font-size: 17px;
	}
	.st5 {
		fill: #969696;
	}
	.st6 {
		fill: #5fb6ad;
	}
	.st7 {
		fill: #5490c2;
	}
	.st8 {
		font-weight: 500;
	}
	.st9 {
		fill: #959595;
	}
	.st10 {
		font-size: 19px;
	}
	.st11 {
		fill: transparent;
	}
	.st12 {
		display: none;
	}
	.st13 {
		font-size: 25px;
	}
	.st14 {
		font-size: 15px;
	}
	.remaining-energy {
		font-size: 14px;
	}
`;

export const getDynamicStyles = (data) => html`
	<style>
		.essload1-icon {
			color: ${data.dynamicColourEssentialLoad1} !important;
			--mdc-icon-size: 33px;
		}

		.essload2-icon {
			color: ${data.dynamicColourEssentialLoad2} !important;
			--mdc-icon-size: 33px;
		}

		.essload1-small-icon {
			color: ${data.dynamicColourEssentialLoad1} !important;
			--mdc-icon-size: 21px;
		}

		.essload2-small-icon {
			color: ${data.dynamicColourEssentialLoad2} !important;
			--mdc-icon-size: 21px;
		}

		.essload3-small-icon {
			color: ${data.dynamicColourEssentialLoad3} !important;
			--mdc-icon-size: 21px;
		}

		.essload4-small-icon {
			color: ${data.dynamicColourEssentialLoad4} !important;
			--mdc-icon-size: 21px;
		}

		.essload5-small-icon {
			color: ${data.dynamicColourEssentialLoad5} !important;
			--mdc-icon-size: 21px;
		}

		.essload6-small-icon {
			color: ${data.dynamicColourEssentialLoad6} !important;
			--mdc-icon-size: 21px;
		}

		.grid-icon {
			color: ${data.customGridIconColour} !important;
			--mdc-icon-size: 65px;
		}

		.essload1-icon-full {
			color: ${data.dynamicColourEssentialLoad1} !important;
			--mdc-icon-size: 37px;
		}

		.aux-icon {
			color: ${data.auxDynamicColour} !important;
			--mdc-icon-size: 71px;
		}

		.aux-small-icon-1 {
			color: ${data.auxDynamicColourLoad1} !important;
			--mdc-icon-size: 25px;
		}

		.aux-small-icon-2 {
			color: ${data.auxDynamicColourLoad2} !important;
			--mdc-icon-size: 25px;
		}

		.aux-off-icon {
			color: ${data.auxOffColour} !important;
			--mdc-icon-size: 71px;
		}

		.nonessload1-icon {
			color: ${data.dynamicColourNonEssentialLoad1} !important;
			--mdc-icon-size: 33px;
		}

		.nonessload2-icon {
			color: ${data.dynamicColourNonEssentialLoad2} !important;
			--mdc-icon-size: 33px;
		}

		.nonessload3-icon {
			color: ${data.dynamicColourNonEssentialLoad3} !important;
			--mdc-icon-size: 33px;
		}

		.noness-icon {
			color: ${data.gridColour} !important;
			--mdc-icon-size: 71px;
		}

		.grid-icon-small {
			color: ${data.customGridIconColour} !important;
			--mdc-icon-size: 33px;
		}
	</style>
`;
