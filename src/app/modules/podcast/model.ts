export interface Podcast {
  'im:name': {
    label: 'The Joe Budden Podcast';
  };
  'im:image': {
    label: string;
    attributes: {
      height: string;
    };
  }[];
  summary: {
    label: string;
  };
  'im:price': {
    label: string;
    attributes: {
      amount: string;
      currency: string;
    };
  };
  'im:contentType': {
    attributes: {
      term: string;
      label: string;
    };
  };
  rights: {
    label: string;
  };
  title: {
    label: string;
  };
  link: {
    attributes: {
      rel: string;
      type: string;
      href: string;
    };
  };
  id: {
    label: string;
    attributes: {
      'im:id': string;
    };
  };
  'im:artist': {
    label: string;
    attributes: {
      href: string;
    };
  };
  category: {
    attributes: {
      'im:id': string;
      term: string;
      scheme: string;
      label: string;
    };
  };
  'im:releaseDate': {
    label: string;
    attributes: {
      label: string;
    };
  };
}

export interface Episode {
  releaseDate: string;
  trackName: string;
  trackTimeMillis: string;
  trackId: string;
  previewUrl: string;
  shortDescription: string;
  collectionName: string;
}
