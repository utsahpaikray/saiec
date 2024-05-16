module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
  rules: {
    'scss/at-rule-no-unknown': [true, { ignoreAtRules: ['@apply'] }],
    'block-closing-brace-newline-before': 'always',
    'color-function-notation': 'modern',
    'alpha-value-notation': null,
    'block-no-empty': true,
    'block-opening-brace-newline-after': 'always-multi-line',
    'block-opening-brace-newline-before': 'always-single-line',
    'block-opening-brace-space-before': 'always',
    'color-hex-case': 'lower',
    'color-hex-length': 'short',
    'declaration-bang-space-after': 'never',
    'declaration-bang-space-before': 'always',
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-no-shorthand-property-overrides': true,
    'declaration-block-semicolon-newline-after': 'always',
    'declaration-block-semicolon-newline-before': 'never-multi-line',
    'declaration-block-semicolon-space-after': 'always-single-line',
    'declaration-block-semicolon-space-before': 'never',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-block-trailing-semicolon': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-no-important': null,
    'font-family-name-quotes': 'always-unless-keyword',
    indentation: 2,
    'declaration-block-no-redundant-longhand-properties': [
      true,
      { ignoreShorthands: [/grid/] }
    ],
    'length-zero-no-unit': true,
    'string-quotes': 'single',
    'max-empty-lines': 2,
    'max-nesting-depth': 3,
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-name-no-vendor-prefix': true,
    'media-feature-range-operator-space-after': 'always',
    'media-feature-range-operator-space-before': 'always',
    'no-duplicate-selectors': true,
    'no-eol-whitespace': true,
    'no-missing-end-of-source-newline': true,
    'no-empty-source': null,
    'no-extra-semicolons': true,
    'number-max-precision': 6,
    'number-no-trailing-zeros': true,
    'selector-combinator-space-after': 'always',
    'selector-combinator-space-before': 'always',
    'selector-list-comma-newline-after': 'always',
    'selector-list-comma-newline-before': 'never-multi-line',
    'selector-no-vendor-prefix': null,
    'value-no-vendor-prefix': [true, { ignoreValues: ['/[A-Za-z]+/'] }],
    'property-no-vendor-prefix': [
      true,
      {
        ignoreProperties: ['/[A-Za-z]+/']
      }
    ],
    'selector-pseudo-class-case': 'lower',
    'selector-pseudo-element-case': 'lower',
    'selector-pseudo-element-colon-notation': 'double',
    'unit-case': 'lower',
    'selector-class-pattern':
      '^(^[a-zA-Z0-9!@#$&()\\-`.+,/:"]*$)(-[a-z0-9]+)*$',
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['ng-deep', '::ng-deep']
      }
    ],
    'unit-allowed-list': [
      'px',
      'em',
      'rem',
      '%',
      'pt',
      'vh',
      'vw',
      'vmin',
      'vmax',
      'deg',
      's',
      'ms',
      'fr'
    ]
  }
}
