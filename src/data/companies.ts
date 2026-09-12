export interface Company {
  id: string;
  name: string;
  aliases: string[];
  sector: string;
  summary: string;
  source: { publisher: string; title: string; url: string; published: string };
}
// Curated records, not a live rating feed. Preserve attribution and source dates.
export const companies: Company[] = [
  {
    id: 'siemens-energy',
    name: 'Siemens Energy',
    aliases: ['Siemens Energy'],
    sector: 'Energy technology',
    summary:
      'Urgewald criticized Siemens Energy’s coal and gas project commitments in a 2021 briefing.',
    source: {
      publisher: 'Urgewald',
      title: 'Siemens Energy: climate and human rights briefing',
      published: '2021-02-09',
      url: 'https://www.urgewald.org/en/medien/new-company-outdated-business-model-siemens-energy-fails-climate-and-human-rights-0',
    },
  },
  {
    id: 'apple',
    name: 'Apple',
    aliases: ['Apple Inc.', 'Apple'],
    sector: 'Consumer technology',
    summary:
      'A 2017 opinion article examines raw-material sourcing for iPhones.',
    source: {
      publisher: 'Los Angeles Times · Opinion',
      title: 'iPhone raw-material sourcing',
      published: '2017-07-23',
      url: 'https://www.latimes.com/opinion/op-ed/la-oe-merchant-iphone-supplychain-20170723-story.html',
    },
  },
  {
    id: 'aramco',
    name: 'Aramco',
    aliases: ['Saudi Aramco', 'Aramco'],
    sector: 'Oil & gas',
    summary:
      'ClientEarth examines Aramco’s climate messaging alongside historical emissions and fossil-fuel expansion.',
    source: {
      publisher: 'ClientEarth',
      title: 'The Greenwashing Files: Aramco',
      published: 'Undated historical profile',
      url: 'https://www.clientearth.org/projects/the-greenwashing-files/aramco',
    },
  },
];
