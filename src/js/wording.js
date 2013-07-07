var translations = {
  default: {
    'add': 'Add',
    'addNewCoverSlip': 'Add a new Cover Slip',
    'streamAggregator' : 'Flux Aggregator',
    'clock' : 'Clock',
    'image' : 'Image',
    'Choose which kind of Cover Slip you want to add.' :
    'Choose which kind of Cover Slip you wish to add.',
    'You can close this dialog by pressing the ESC key on your keyboard.':
    'You can close this dialog by pressing the ESC key on your keyboard.',
  },
  fr: {
    'add': 'ajouter',
    'addNewCoverSlip': 'Ajouter une nouvelle lamelle',
    'streamAggregator' : 'aggregateur de flux',
    'clock' : 'horloge',
    'image' : 'image',
    'Choose which kind of Cover Slip you want to add.' :
    'Choisissez quel type de lamelle vous souhaitez ajouter.',
    'You can close this dialog by pressing the ESC key on your keyboard.':
    'Vous pouvez fermer cette boîte de dialogue en appuyant sur la touche ESC de votre clavier.',
  }
};


var i18n = function(lang){
  function t(key){
    return translations[t.prototype.lang][key] || key;
  }
  t.prototype.lang = 'default';
  if(isset(translations[lang]) && lang){
    t.prototype.lang = lang;
  }
  return t;
};

i18n.prototype.lang = 'default';
