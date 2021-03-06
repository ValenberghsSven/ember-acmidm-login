import { warn } from '@ember/debug';
import Component from '@ember/component';
import layout from '../templates/components/acmidm-login';
import { inject as service } from '@ember/service';

export default Component.extend({
  layout,
  session: service('session'),
  actions: {
    login() {
      this.set('errorMessage', '');
      this.session.authenticate('authenticator:torii', 'acmidm-oauth2').catch((reason) => {
        warn(reason.error || reason, { id: 'authentication.failure' });

        if (reason.status == 403)
          this.set('errorMessage', 'U heeft geen toegang tot deze applicatie.');
        else
          this.set('errorMessage', 'Fout bij het aanmelden. Gelieve opnieuw te proberen.');
      });
    }
  }
});
