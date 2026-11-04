import { TestBed } from '@angular/core/testing';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

import { CONTENT, provideContentTesting } from '../../testing/content-testing';

/** Every key path of a JSON value; array items are compared by index. */
function keyPaths(value: unknown, prefix = ''): string[] {
  if (Array.isArray(value)) return value.flatMap((item, i) => keyPaths(item, `${prefix}[${i}]`));
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, child]) => [
      `${prefix}.${key}`,
      ...keyPaths(child, `${prefix}.${key}`),
    ]);
  }
  return [];
}

describe('firebase-data content', () => {
  it('has the same structure in every language', () => {
    expect(keyPaths(CONTENT.en)).toEqual(keyPaths(CONTENT.es));
  });

  it('keeps private data out of the site', () => {
    const json = JSON.stringify(CONTENT);
    for (const key of ['phone', 'birthday', 'age']) {
      expect(json).not.toContain(`"${key}"`);
    }
  });

  it('only references registered icons', () => {
    TestBed.configureTestingModule({ providers: provideContentTesting() });
    const library = TestBed.inject(FaIconLibrary);

    for (const site of Object.values(CONTENT)) {
      const icons: [IconPrefix, string][] = [
        ...site.facts.items.map((fact): [IconPrefix, string] => ['fas', fact.icon]),
        ...site.services.items.map((service): [IconPrefix, string] => ['fas', service.icon]),
        ...site.hero.social.map((link): [IconPrefix, string] => ['fab', link.icon]),
      ];
      for (const [prefix, name] of icons) {
        expect(library.getIconDefinition(prefix, name as IconName))
          .withContext(`${prefix} ${name}`)
          .not.toBeNull();
      }
    }
  });
});
