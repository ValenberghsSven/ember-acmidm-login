import Oauth2 from 'torii/providers/oauth2-code';
import { configurable } from 'torii/configuration';

/**
 * This class implements authentication against ACM/IDM
 * using the OAuth2 authorization flow in a popup window.
 */
export default Oauth2.extend({
  name: 'acmidm-oauth2',

  baseUrl: configurable('baseUrl'),

  requiredUrlParams: Object.freeze([
    'response_type',
    'client_id',
    'redirect_uri',
    'state',
  ]),
  optionalUrlParams: Object.freeze(['scope']),
  responseParams: Object.freeze(['code']),

  scope: configurable('scope', 'openid'),

  redirectUri: configurable('redirectUri', function () {
    return this._super();
  }),

  open(options) {
    const opts = Object.assign({}, options, {
      resizable: true,
      scrollbars: true,
    });
    return this._super(opts);
  },
});
