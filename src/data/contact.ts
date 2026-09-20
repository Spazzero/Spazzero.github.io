import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
// Paired with the commented-out entries below. `noUnusedImports` is an error,
// so an import has to stay commented for exactly as long as its entry does.
// import { faAngellist } from '@fortawesome/free-brands-svg-icons/faAngellist';
// import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
// import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
// import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';

import profile from './profile.json';

export interface ContactItem {
  link: string;
  label: string;
  icon: IconDefinition;
}

const data: ContactItem[] = [
  {
    link: 'https://www.linkedin.com/in/gerald-y/',
    label: 'LinkedIn',
    icon: faLinkedinIn,
  },
  {
    link: 'https://github.com/Spazzero',
    label: 'GitHub',
    icon: faGithub,
  },
  /*
  {
    link: 'X account link',
    label: 'X',
    icon: faTwitter,
  },
  */

  /*
  {
    link: 'PLACEHOLDER LINK',
    label: 'Angel List',
    icon: faAngellist,
  },
  */

  /*
  {
    link: 'INSTA LINK',
    label: 'Instagram',
    icon: faInstagram,
  },
  */

  /*
  {
    link: 'FACEBOOK LINK',
    label: 'Facebook',
    icon: faFacebookF,
  },
  */

  {
    // One public address, shared with the contact CTA and JSON-LD.
    link: `mailto:${profile.email}`,
    label: 'Email',
    icon: faEnvelope,
  },
];

export default data;
