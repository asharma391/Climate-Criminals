# Catalogue and source policy

The initial catalogue carries forward the three company examples from the hackathon prototype. It is a curated historical collection, not a live feed, complete company index, or numerical sustainability rating.

| Company        | Source                                                                                                                                      | Date / context                                                            |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Siemens Energy | [Urgewald briefing](https://www.urgewald.org/en/medien/new-company-outdated-business-model-siemens-energy-fails-climate-and-human-rights-0) | February 9, 2021; advocacy organization’s assessment                      |
| Apple          | [Los Angeles Times opinion article](https://www.latimes.com/opinion/op-ed/la-oe-merchant-iphone-supplychain-20170723-story.html)            | July 23, 2017; historical sourcing discussion, may require subscription   |
| Aramco         | [ClientEarth’s Greenwashing Files](https://www.clientearth.org/projects/the-greenwashing-files/aramco)                                      | Undated historical profile, using historical corporate and emissions data |

## Adding or updating a record

Edit `src/data/companies.ts`. Include a stable unique ID, display name, narrow aliases, sector, short attributed summary, publisher, descriptive title, HTTPS URL, and publication date. Use an explicit label if a date is not available.

Prefer a specific company or legal-entity name to an ambiguous parent-company substring. Avoid unsupported accusations, current-tense claims derived only from old sources, and context-free aggregate scores. Clearly distinguish advocacy research, opinion, reporting, and a company’s own disclosures.

Review the source itself, keep summaries brief, and do not copy articles into the catalogue. Check alias behavior in `tests/matcher.test.ts`; run `npm run check` after changes. Refresh source links and summaries through reviewed commits, not hidden automatic substitutions.

## Interpretation

A match means that text resembles a bundled alias. It does not verify which entity the author meant, establish wrongdoing, or certify a purchase alternative. The project’s name is a brand; the UI presents attributed context and links for independent reading.
