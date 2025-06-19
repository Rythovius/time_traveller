import { Scenario } from '@/types/game'

export const scenarios: Scenario[] = [
  {
    id: 'rampjaar',
    title: 'Het Rampjaar',
    period: 'Gouden Eeuw Crisis',
    year: 1672,
    description: 'Nederland wordt bedreigd door Frankrijk, Engeland en twee Duitse staten. De Republiek staat op het punt van instorten.',
    setting: 'Je bevindt je in een belegerde stad tijdens een van de donkerste jaren in de Nederlandse geschiedenis.',
    mystery: 'Wat is het jaar van deze nationale crisis?',
    clues: [
      {
        id: 'observe_1',
        type: 'observe',
        title: 'Franse troepen',
        description: 'Kijk naar de soldaten buiten de stadsmuren',
        content: 'Franse soldaten in blauwe uniformen marcheren voorbij. Hun banieren tonen de lelie van de Zonnekoning. Ze roepen in het Frans over hun snelle opmars door de Republiek.',
        discovered: false,
        points: 10
      },
      {
        id: 'listen_1',
        type: 'listen',
        title: 'Gesprek over de stadhouder',
        description: 'Luister naar de burgers bij de poort',
        content: 'Burger 1: "De jonge prins van Oranje is nu stadhouder geworden!" Burger 2: "Willem is nog maar 22, kan hij ons redden van deze ramp?" Burger 1: "Hij moet wel, anders zijn we verloren aan de Fransen!"',
        discovered: false,
        points: 10
      },
      {
        id: 'read_1',
        type: 'read',
        title: 'Pamflet over de waterlinies',
        description: 'Lees het aanplakbiljet bij het stadhuis',
        content: 'PROCLAMATIE: Op bevel van de Staten van Holland worden de dijken doorgestoken! Het water zal ons beschermen tegen de vijand. Alle burgers moeten hun bezittingen in veiligheid brengen!',
        discovered: false,
        points: 10
      }
    ],
    npcs: [
      {
        id: 'burger_rampjaar',
        name: 'Meester Cornelis',
        role: 'Stadsbestuurder',
        description: 'Een bezorgde regentenzoon die de stad probeert te verdedigen',
        avatar: '👨‍💼',
        fallbackResponses: {
          'wat gebeurt er': [
            'De Fransen zijn onze grenzen overgestoken! Ze hebben al veel steden ingenomen.',
            'Het is een ramp! Drie landen vallen ons tegelijk aan.',
            'De vijanden komen van alle kanten. We hebben nog nooit zo\'n crisis meegemaakt.'
          ],
          'wie regeert': [
            'De jonge prins Willem is net stadhouder geworden. Hij is onze laatste hoop.',
            'De Staten van Holland hebben de macht, maar nu kijken ze naar de prins van Oranje.',
            'Johan de Witt is dood... de prins moet ons nu leiden.'
          ],
          'oorlog': [
            'Frankrijk, Engeland en twee Duitse staten vallen ons aan!',
            'De Zonnekoning wil ons vernietigen. Zijn troepen zijn overal.',
            'We vechten voor ons bestaan als vrije republiek.'
          ],
          'water': [
            'We hebben de dijken doorgestoken! Het water is onze redding.',
            'De Hollandse Waterlinie zal de vijand stoppen.',
            'Water is onze beste verdediging tegen de Franse cavalerie.'
          ]
        },
        conversationHistory: []
      }
    ],
    hints: [
      { range: [1670, 1674], hint: 'Je bent heel dicht bij het juiste jaar! Denk aan het "Rampjaar" van de Republiek.' },
      { range: [1665, 1679], hint: 'Je zit in de goede periode. Dit was het jaar van de grootste crisis voor de Republiek.' },
      { range: [1650, 1690], hint: 'Je zit in de 17e eeuw, maar denk aan het jaar dat "rampjaar" wordt genoemd.' }
    ]
  },
  {
    id: 'beeldenstorm',
    title: 'De Beeldenstorm',
    period: 'Opstand tegen Spanje',
    year: 1566,
    description: 'Protestantse opstandelingen vernielen katholieke beelden en kunstwerken in kerken door de hele Nederlanden.',
    setting: 'Je staat in een stad waar net een kerk is geplunderd door woedende protestanten.',
    mystery: 'In welk jaar vond deze religieuze opstand plaats?',
    clues: [
      {
        id: 'observe_2',
        type: 'observe',
        title: 'Vernielde kerkbeelden',
        description: 'Bekijk de schade in de kathedraal',
        content: 'Overal liggen gebroken stukken van heiligenbeelden. Altaren zijn omvergegooid en schilderijen zijn verscheurd. De kerk lijkt wel een slagveld.',
        discovered: false,
        points: 10
      },
      {
        id: 'listen_2',
        type: 'listen',
        title: 'Calvinistische preek',
        description: 'Luister naar de prediker buiten de stad',
        content: 'Prediker: "Gij zult geen gesneden beeld maken! De Roomse kerk heeft het volk bedrogen met afgoderij!" Menigte: "Weg met de beelden! Zuiver de tempels!"',
        discovered: false,
        points: 10
      },
      {
        id: 'read_2',
        type: 'read',
        title: 'Smeekschrift van de edelen',
        description: 'Lees het document bij de stadhouder',
        content: 'Aan Margaretha van Parma: Wij, edelen van de Nederlanden, verzoeken om religieuze tolerantie en het afschaffen van de Inquisitie. Het volk lijdt onder de strenge maatregelen van de koning.',
        discovered: false,
        points: 10
      }
    ],
    npcs: [
      {
        id: 'calvinist_beeldenstorm',
        name: 'Dominee Pieter',
        role: 'Calvinistische prediker',
        description: 'Een vurige protestantse prediker die tegen de katholieke kerk preekt',
        avatar: '⛪',
        fallbackResponses: {
          'waarom': [
            'De Roomse kerk heeft het volk bedrogen met afgoderij!',
            'God verbiedt gesneden beelden. We zuiveren zijn huis!',
            'Te lang heeft de paus ons onderdrukt met valse leer.'
          ],
          'beelden': [
            'Afgoderij! De Bijbel verbiedt het aanbidden van beelden.',
            'Deze stenen afgoden leiden het volk weg van de waarheid.',
            'Christus heeft geen gouden beelden nodig!'
          ],
          'kerk': [
            'De ware kerk heeft geen pracht en praal nodig.',
            'Eenvoud en Gods woord, dat is wat we nodig hebben.',
            'De Roomse kerk is corrupt en moet hervormd worden.'
          ],
          'koning': [
            'Filips wil ons dwingen tot zijn valse geloof!',
            'De Spaanse koning begrijpt onze nood niet.',
            'We zijn geen slaven van Madrid!'
          ]
        },
        conversationHistory: []
      }
    ],
    hints: [
      { range: [1564, 1568], hint: 'Je bent heel dicht bij het juiste jaar! Dit was het begin van de Nederlandse Opstand.' },
      { range: [1560, 1570], hint: 'Je zit in de goede periode. Denk aan het jaar van de grote beeldenstorm.' },
      { range: [1550, 1580], hint: 'Je zit in de 16e eeuw, maar denk aan het jaar van religieuze onrust.' }
    ]
  },
  {
    id: 'gouden_eeuw',
    title: 'De Gouden Eeuw',
    period: 'Nederlandse Bloeitijd',
    year: 1642,
    description: 'Nederland beleeft zijn grootste bloeiperiode. De VOC beheerst de wereldhandel en Amsterdam is het centrum van de wereldeconomie.',
    setting: 'Je staat op de kade van Amsterdam, waar VOC-schepen vol met schatten uit de Oost aankomen.',
    mystery: 'In welk jaar was Nederland op het hoogtepunt van zijn macht?',
    clues: [
      {
        id: 'observe_3',
        type: 'observe',
        title: 'VOC-schepen',
        description: 'Kijk naar de haven vol handelsschepen',
        content: 'Enorme schepen met het VOC-logo lossen hun lading. Zakken vol peper, kaneel en andere specerijen worden uitgeladen. Matrozen vertellen over hun reis naar Batavia.',
        discovered: false,
        points: 10
      },
      {
        id: 'listen_3',
        type: 'listen',
        title: 'Tulpenhandel',
        description: 'Luister naar de kooplieden op de beurs',
        content: 'Koopman 1: "Mijn tulpenbollen zijn vandaag weer verdubbeld in waarde!" Koopman 2: "Iedereen wil tulpen! Zelfs een eenvoudige bol kost nu meer dan een huis!"',
        discovered: false,
        points: 10
      },
      {
        id: 'read_3',
        type: 'read',
        title: 'Rembrandt schilderij',
        description: 'Bekijk het nieuwe schilderij in het gildehuis',
        content: 'Een prachtig groepsportret van de schutterij, geschilderd door meester Rembrandt van Rijn. Het toont de welvaart en trots van de Amsterdamse burgers.',
        discovered: false,
        points: 10
      }
    ],
    npcs: [
      {
        id: 'koopman_gouden_eeuw',
        name: 'Heer Van der Meer',
        role: 'VOC-koopman',
        description: 'Een rijke koopman die handelt met de Oost-Indië',
        avatar: '💰',
        fallbackResponses: {
          'welvaart': [
            'Amsterdam is het centrum van de wereldhandel geworden!',
            'Onze schepen brengen schatten uit de hele wereld.',
            'De Republiek is rijker dan ooit tevoren.'
          ],
          'tulpen': [
            'Tulpen zijn het nieuwe goud! Iedereen wil ze hebben.',
            'Mijn tulpenbollen zijn meer waard dan een heel huis!',
            'De tulpenhandel maakt ons allemaal rijk.'
          ],
          'compagnie': [
            'De VOC beheerst de zeeën! Onze vloot is de grootste ter wereld.',
            'Batavia is ons handelscentrum in de Oost.',
            'De Verenigde Oostindische Compagnie brengt ons grote winsten.'
          ],
          'kunst': [
            'Rembrandt en andere meesters maken prachtige werken!',
            'We kunnen ons de beste kunstenaars veroorloven.',
            'Onze welvaart toont zich in prachtige schilderijen.'
          ]
        },
        conversationHistory: []
      }
    ],
    hints: [
      { range: [1640, 1644], hint: 'Je bent heel dicht bij het hoogtepunt van de Gouden Eeuw!' },
      { range: [1635, 1650], hint: 'Je zit in de goede periode van de Nederlandse bloeitijd.' },
      { range: [1600, 1670], hint: 'Je zit in de Gouden Eeuw, maar denk aan het absolute hoogtepunt.' }
    ]
  },
  {
    id: 'bataafse_revolutie',
    title: 'Bataafse Revolutie',
    period: 'Franse Tijd',
    year: 1795,
    description: 'Met Franse hulp wordt de Republiek omgevormd tot de Bataafse Republiek. Vrijheid, Gelijkheid en Broederschap!',
    setting: 'Je staat op het Binnenhof waar net de nieuwe republiek is uitgeroepen.',
    mystery: 'In welk jaar werd de Bataafse Republiek gesticht?',
    clues: [
      {
        id: 'observe_4',
        type: 'observe',
        title: 'Franse soldaten',
        description: 'Kijk naar de soldaten die de stad zijn binnengetrokken',
        content: 'Franse soldaten in blauwe uniformen marcheren door de straten. Ze dragen banieren met "Liberté, Égalité, Fraternité" en worden begroet door patriotten.',
        discovered: false,
        points: 10
      },
      {
        id: 'listen_4',
        type: 'listen',
        title: 'Patriottenlied',
        description: 'Luister naar de zingende menigte',
        content: 'Menigte zingt: "Vrijheid komt met Franse macht, Oranje-tirannie is weggejaagd! Burgers, staat op voor uw recht, de Republiek wordt nu echt!"',
        discovered: false,
        points: 10
      },
      {
        id: 'read_4',
        type: 'read',
        title: 'Proclamatie van de Bataafse Republiek',
        description: 'Lees de aankondiging op het stadhuis',
        content: 'PROCLAMATIE: De Bataafse Republiek is geboren! Alle burgers zijn gelijk voor de wet. De rechten van de mens zijn heilig. Leve de Vrijheid!',
        discovered: false,
        points: 10
      }
    ],
    npcs: [
      {
        id: 'patriot_bataafse',
        name: 'Burger Janssen',
        role: 'Patriot en revolutionair',
        description: 'Een enthousiaste aanhanger van de nieuwe republikeinse idealen',
        avatar: '🗽',
        fallbackResponses: {
          'revolutie': [
            'Eindelijk zijn we bevrijd van de Oranje-tirannie!',
            'De Franse revolutie heeft ons geïnspireerd tot vrijheid!',
            'Nu zijn we echte burgers, geen onderdanen meer!'
          ],
          'franse': [
            'Onze Franse broeders hebben ons geholpen!',
            'Zonder Frankrijk waren we nooit bevrijd.',
            'Liberté, Égalité, Fraternité - dat is onze leus!'
          ],
          'vrijheid': [
            'Alle mensen zijn gelijk geboren!',
            'De rechten van de mens zijn eindelijk erkend.',
            'Geen koning meer, maar een vrije republiek!'
          ],
          'oranje': [
            'De stadhouder is gevlucht naar Engeland!',
            'Het Huis van Oranje heeft ons lang onderdrukt.',
            'Weg met de erfelijke macht!'
          ]
        },
        conversationHistory: []
      }
    ],
    hints: [
      { range: [1793, 1797], hint: 'Je bent heel dicht bij het jaar van de Bataafse Revolutie!' },
      { range: [1790, 1800], hint: 'Je zit in de goede periode van de Franse revolutionaire invloed.' },
      { range: [1780, 1810], hint: 'Je zit in de late 18e eeuw, denk aan de Franse revolutie.' }
    ]
  },
  {
    id: 'hongerwinter',
    title: 'Hongerwinter',
    period: 'Tweede Wereldoorlog',
    year: 1944,
    description: 'De laatste winter van de oorlog. West-Nederland lijdt honger door de Duitse blokkade na de mislukte operatie Market Garden.',
    setting: 'Je staat in de rij voor een gaarkeuken in een uitgehongerde stad.',
    mystery: 'In welk jaar vond deze verschrikkelijke hongerwinter plaats?',
    clues: [
      {
        id: 'observe_5',
        type: 'observe',
        title: 'Uitgehongerde mensen',
        description: 'Kijk naar de mensen in de rij',
        content: 'Magere mensen in dunne jassen staan geduldig te wachten. Kinderen hebben holle wangen en oude mensen leunen zwaar op stokken. Iedereen kijkt hoopvol naar de gaarkeuken.',
        discovered: false,
        points: 10
      },
      {
        id: 'listen_5',
        type: 'listen',
        title: 'Radio Oranje',
        description: 'Luister naar de illegale radio',
        content: 'Stem van Radio Oranje: "Volhouders! De geallieerden rukken op. Het zuiden is al bevrijd. Nog even volhouden, de bevrijding komt eraan!"',
        discovered: false,
        points: 10
      },
      {
        id: 'read_5',
        type: 'read',
        title: 'Ondergronds pamflet',
        description: 'Lees het illegale blaadje',
        content: 'HET VRIJE WOORD: De Duitsers blokkeren alle voedsel naar het westen. Maar de Tommies en Amerikanen komen eraan! Nederland zal herrijzen!',
        discovered: false,
        points: 10
      }
    ],
    npcs: [
      {
        id: 'burger_hongerwinter',
        name: 'Mevrouw De Vries',
        role: 'Moeder van drie kinderen',
        description: 'Een uitgeputte vrouw die probeert haar gezin in leven te houden',
        avatar: '👩‍👧‍👦',
        fallbackResponses: {
          'eten': [
            'We hebben al dagen alleen tulpenbollen gegeten.',
            'De kinderen huilen van de honger, maar er is niets.',
            'Gisteren heb ik de laatste aardappel opgegeten.'
          ],
          'oorlog': [
            'De Duitsers blokkeren al het voedsel naar het westen.',
            'Ze straffen ons voor de spoorwegstaking.',
            'Wanneer komt de bevrijding eindelijk?'
          ],
          'bevrijding': [
            'Radio Oranje zegt dat de geallieerden komen!',
            'Het zuiden is al bevrijd, wij moeten nog wachten.',
            'Mijn man zit ondergedoken, hopelijk overleeft hij het.'
          ],
          'kinderen': [
            'Mijn kleine Jan is zo mager geworden.',
            'De kinderen begrijpen niet waarom er geen eten is.',
            'Ik bid elke dag dat ze het overleven.'
          ]
        },
        conversationHistory: []
      }
    ],
    hints: [
      { range: [1943, 1945], hint: 'Je bent heel dicht bij het jaar van de Hongerwinter!' },
      { range: [1940, 1945], hint: 'Je zit in de oorlogsjaren, denk aan de laatste winter.' },
      { range: [1935, 1950], hint: 'Je zit rond de Tweede Wereldoorlog, maar denk aan de hongerwinter.' }
    ]
  },
  {
    id: 'provo',
    title: 'Provo-beweging',
    period: 'Jaren Zestig',
    year: 1966,
    description: 'Jonge rebellen in Amsterdam schudden het establishment wakker met happenings, witte fietsen en ludieke acties.',
    setting: 'Je staat op het Spui in Amsterdam waar een groep Provo\'s een happening organiseert.',
    mystery: 'In welk jaar was de Provo-beweging op zijn hoogtepunt?',
    clues: [
      {
        id: 'observe_6',
        type: 'observe',
        title: 'Witte fietsen',
        description: 'Kijk naar de bijzondere fietsen',
        content: 'Overal staan witte fietsen die iedereen gratis mag gebruiken. Jongeren met lang haar en kleurrijke kleding fietsen erop rond. Het is een protest tegen de auto-maatschappij.',
        discovered: false,
        points: 10
      },
      {
        id: 'listen_6',
        type: 'listen',
        title: 'Happening op het Spui',
        description: 'Luister naar de Provo\'s',
        content: 'Provo: "Het gezag moet worden geïrriteerd! Weg met de burgerlijke saatheid!" Menigte: "Provo! Provo!" Politie: "Doorlopen, doorlopen!"',
        discovered: false,
        points: 10
      },
      {
        id: 'read_6',
        type: 'read',
        title: 'Provo-blad',
        description: 'Lees het underground magazine',
        content: 'PROVO NR. 9: "De jeugd heeft de toekomst! Weg met de consumptiemaatschappij! Maak van Amsterdam een magisch centrum!"',
        discovered: false,
        points: 10
      }
    ],
    npcs: [
      {
        id: 'provo_activist',
        name: 'Roel',
        role: 'Provo-activist',
        description: 'Een jonge rebel met lang haar die het establishment uitdaagt',
        avatar: '✌️',
        fallbackResponses: {
          'happening': [
            'We irriteren het gezag met ludieke acties!',
            'Happenings zijn kunst en protest tegelijk.',
            'We maken de burgers wakker uit hun slaap!'
          ],
          'autoriteit': [
            'Het establishment is saai en onderdrukkend!',
            'Politie en politici begrijpen de jeugd niet.',
            'We hebben geen zin in hun burgerlijke regels!'
          ],
          'jeugd': [
            'De jeugd heeft de toekomst, niet die oude zakken!',
            'Wij maken van de wereld een betere plek.',
            'Lang haar en vrije liefde, dat is onze revolutie!'
          ],
          'fietsen': [
            'Witte fietsen voor iedereen! Gratis vervoer!',
            'Auto\'s vervuilen de stad, fietsen zijn de toekomst.',
            'Het Witte Fietsenplan is onze gift aan Amsterdam!'
          ]
        },
        conversationHistory: []
      }
    ],
    hints: [
      { range: [1964, 1968], hint: 'Je bent heel dicht bij het hoogtepunt van de Provo-beweging!' },
      { range: [1960, 1970], hint: 'Je zit in de jaren zestig, denk aan de jeugdrebellie.' },
      { range: [1955, 1975], hint: 'Je zit rond de jaren zestig, maar denk aan de Provo-tijd.' }
    ]
  }
]

export const getScenarioById = (id: string): Scenario | undefined => {
  return scenarios.find(scenario => scenario.id === id)
}

export const getRandomScenario = (): Scenario => {
  const randomIndex = Math.floor(Math.random() * scenarios.length)
  return scenarios[randomIndex]
}