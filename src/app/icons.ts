import { inject } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import {
  faArrowUp,
  faBars,
  faBookOpen,
  faBuilding,
  faCalendarDays,
  faCertificate,
  faChartLine,
  faChartSimple,
  faChevronRight,
  faCode,
  faComments,
  faDiagramProject,
  faEnvelope,
  faFileLines,
  faGlobe,
  faHouse,
  faLocationDot,
  faQuoteLeft,
  faQuoteRight,
  faRightLeft,
  faRobot,
  faServer,
  faShieldHalved,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Registers only the icons the site uses, so the bundle doesn't include the
 * whole Font Awesome packs. Icons referenced by name in `firebase-data/*.json`
 * (facts, services, social links) must be added here.
 */
export function registerIcons(): void {
  inject(FaIconLibrary).addIcons(
    // Layout
    faArrowUp,
    faBars,
    faXmark,
    faChevronRight,
    faQuoteLeft,
    faQuoteRight,
    faLocationDot,
    faEnvelope,
    // Navigation
    faHouse,
    faUser,
    faChartSimple,
    faFileLines,
    faBookOpen,
    faServer,
    faComments,
    // Facts
    faCalendarDays,
    faBuilding,
    faDiagramProject,
    faCertificate,
    // Services
    faCode,
    faGlobe,
    faRightLeft,
    faRobot,
    faChartLine,
    faShieldHalved,
    // Social
    faLinkedin,
    faGithub,
    faFacebook,
    faInstagram,
    faXTwitter,
  );
}
