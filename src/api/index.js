import configuration from './configure';
import queryBuilder from './queryBuilder';

const configure = ({ apiKey }) => {
    configuration.apiKey = apiKey;
};

// Call the configure function to set the API key
configure({ apiKey: configuration.apiKey });

export default {
    configure,
    card: queryBuilder('cards'),
    set: queryBuilder('sets'),
    type: queryBuilder('types'),
    subtype: queryBuilder('subtypes'),
    rarity: queryBuilder('rarities'),
    supertype: queryBuilder('supertypes')
};
