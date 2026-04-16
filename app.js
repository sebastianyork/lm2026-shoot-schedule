// Error handler - shows errors on page instead of blank screen
window.onerror = function(msg, url, line, col, err) {
  var d = document.createElement('div');
  d.style.cssText = 'padding:20px;font-family:sans-serif;background:#fff;color:#c00;font-size:14px;';
  d.innerHTML = '<strong>JS Error (line ' + line + '):</strong><br>' + msg + (err ? '<pre style="font-size:11px">' + err.stack + '</pre>' : '');
  document.body.prepend(d);
};


// ─────────────────────────────────────────
//  HELPERS  (function declarations → hoisted)
// ─────────────────────────────────────────
function _id()  { return 'x' + Math.random().toString(36).slice(2,9); }
function _shots(arr) { return arr.map(t => ({ id: _id(), text: t, done: false })); }
function _trainer(name, arr) { return { id: _id(), name, shots: _shots(arr) }; }
function _coaches(arr) {
  return ['Coach Jamie-Ray','Coach Kim','Coach Cory','Coach Josh','Coach Scott','Coach Dice','Coach Brian','Coach Sherica']
    .map(n => _trainer(n, arr));
}
function _selectedCoaches(names, arr) {
  return names.map(n => _trainer(n, arr));
}
function _dailyPhotos(location) {
  return [_trainer('General', [
    `Pristine wide shot — ${location}`,
    `Pristine detail/texture shot — ${location}`,
    'Candid shot of people at location — natural & unposed',
    'Portrait / close-up of a team member or subject',
    'Atmosphere & mood shot — light, environment, energy',
  ])];
}
function uid()  { return _id(); }
function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function allShotsForDay(d) {
  return d.locations.flatMap(l => l.trainers.flatMap(t => t.shots));
}

// ─────────────────────────────────────────
//  INITIAL DATA
// ─────────────────────────────────────────
const INITIAL_DAYS = [
  {
    id: 'd0417', label: 'Friday, 17 April', tab: 'Fri 17',
    calltime: '9:00 AM — Hotel Lobby at Park Hyatt, then depart for location', weather: 'Overcast, 49–63°F, 20% rain', meetAt: 'Evolution London, Battersea Park', dri: 'Tanea Jackson', locationAddress: 'Evolution London, Chelsea Bridge Gate, Battersea Park, Queenstown Rd, London SW11 4NJ',
    locations: [
      { id: 'l417z', name: '📍 Evolution London — Chelsea Bridge Gate, Battersea Park, Queenstown Rd, London SW11 4NJ', mapsUrl: 'https://maps.apple.com/?q=Evolution+London+Battersea+Park&ll=51.4813,-0.1559', activeTrainer: 0,
        trainers: [_trainer('General', ['Confirm arrival at Evolution London, Battersea Park', 'Scout filming positions inside & outside venue'])]
      },
      { id: 'l417a', name: 'Evolution London — Community Engagement (10 AM – 12 PM)', activeTrainer: 0,
        trainers: [
          _trainer('Coach Joe Wicks', [
            '10:00 AM — 200 London school kids arrive',
            '⚠️ DO NOT FILM students wearing WHITE WRISTBANDS',
            'Apple Fitness+ x Joe Wicks — hour of fitness & movement education',
            'Joe Wicks greeting Coach Cory',
            'Joe Wicks greeting Coach Kim',
            'Joe Wicks & school kids working out',
            'Joe Wicks & school kids laughing',
            'Joe Wicks & school kids jumping',
            'Joe Wicks & school kids running',
            'Joe Wicks & school kids listening',
            'Joe Wicks & school kids dancing to music',
            'Joe Wicks & school kids high fiving each other',
            'Close-up — Joe Wicks teaching',
            'Close-up — Joe Wicks talking with students',
            'Close-up — Joe Wicks exercising',
            'Close-up — Joe Wicks greeting Apple team members',
            'Over the shoulder shot — Joe Wicks, Coach Kim & Coach Cory (no kids in shot)',
            'Over the shoulder — Fireside Chat',
          ]),
          _trainer('Coach Kim', [
            '⚠️ DO NOT FILM students wearing WHITE WRISTBANDS',
            'Close-up shots of Coach Kim',
            'DO NOT post any content — event includes minors',
            'ONLY exception: if Joe Wicks takes a close-up selfie (no one identifiable) — re-share only',
          ]),
          _trainer('Coach Cory', [
            '⚠️ DO NOT FILM students wearing WHITE WRISTBANDS',
            'Close-up shots of Coach Cory',
            'DO NOT post any content — event includes minors',
            'ONLY exception: if Joe Wicks takes a close-up selfie (no one identifiable) — re-share only',
          ]),
        ]
      },      { id: 'd0417_photos', name: '📷 Daily Photos', activeTrainer: 0,
        trainers: _dailyPhotos('Evolution London, Battersea Park')
      },
      { id: 'd0417_battersea', name: '📍 Apple Battersea — End of Day', mapsUrl: 'https://maps.apple.com/?q=Apple+Battersea+Power+Station+London&ll=51.4836,-0.1441', activeTrainer: 0,
        trainers: [_trainer('General', [
          'Upload content to Box at Apple Battersea',
          'Back up footage to both hard drives',
          'Choose selects for the day',
        ])]
      },
    ],
      { id: 'd0417_parkhyatt', name: '📍 Return to Base Camp — Park Hyatt London River, 7 Nine Elms Lane, London SW8 5PH', mapsUrl: 'https://maps.apple.com/?q=Park+Hyatt+London+River&ll=51.4855,-0.1258', activeTrainer: 0,
        trainers: [_trainer('General', ['Return to Park Hyatt London River', 'Debrief on the day'])]
      },
      { id: 'd0417_prep', name: 'Production Prep (PM)', activeTrainer: 0,
        trainers: [_trainer('General', [
          'Clint to check gear & charge all devices',
          'Format cards / back up footage',
          'Review footage from today',
        ])]
      },
    eod: [false, false, false]
  },
  {
    id: 'd0420', label: 'Monday, 20 April — Prep / Location Scout Day', tab: 'Mon 20',
    calltime: '', weather: 'Overcast, 41–59°F, 10% rain', meetAt: '', locationAddress: 'Apple Regent Street, 235 Regent St, London W1B 2EL',
    locations: [
      { id: 'l420a', name: 'Prep', activeTrainer: 0,
        trainers: [_trainer('General', [''])]
      },
      { id: 'l420b', name: 'Apple Regent Street — 235 Regent St, London W1B 2EL', mapsUrl: 'https://maps.apple.com/?q=Apple+Regent+Street+London&ll=51.5125,-0.1415', activeTrainer: 0,
        trainers: [
          _trainer('General', [
            'Clean shots of decals — morning before foot traffic',
            'Clean shots — evening with internal store lights on',
            'Action shots of exterior — people walking by',
            'Action shots of runners running by',
            'Shots of people taking selfies with decals',
            'If possible — F+ trainers in front of decals',
          ])
        ]
      },      { id: 'd0420_photos', name: '📷 Daily Photos', activeTrainer: 0,
        trainers: _dailyPhotos('Apple Regent Street & Central London')
      },
      { id: 'd0420_battersea', name: '📍 Apple Battersea — End of Day', mapsUrl: 'https://maps.apple.com/?q=Apple+Battersea+Power+Station+London&ll=51.4836,-0.1441', activeTrainer: 0,
        trainers: [_trainer('General', [
          'Upload content to Box at Apple Battersea',
          'Back up footage to both hard drives',
          'Choose selects for the day',
        ])]
      },
    ],
      { id: 'd0420_parkhyatt', name: '📍 Return to Base Camp — Park Hyatt London River, 7 Nine Elms Lane, London SW8 5PH', mapsUrl: 'https://maps.apple.com/?q=Park+Hyatt+London+River&ll=51.4855,-0.1258', activeTrainer: 0,
        trainers: [_trainer('General', ['Return to Park Hyatt London River', 'Debrief on the day'])]
      },
      { id: 'd0420_prep', name: 'Production Prep (PM)', activeTrainer: 0,
        trainers: [_trainer('General', [
          'Clint to check gear & charge all devices',
          'Format cards / back up footage',
          'Review footage from today',
        ])]
      },
    eod: [false, false, false]
  },
  {
    id: 'd0421', label: 'Tuesday, 21 April — Prep', tab: 'Tue 21',
    calltime: '', weather: 'Overcast, 43–59°F, 21% rain', meetAt: '', locationAddress: 'London — Prep Day',
    locations: [
      { id: 'l421a', name: 'Prep', activeTrainer: 0,
        trainers: [_trainer('General', [''])]
      },      { id: 'd0421_photos', name: '📷 Daily Photos', activeTrainer: 0,
        trainers: _dailyPhotos('London')
      },
      { id: 'd0421_battersea', name: '📍 Apple Battersea — End of Day', mapsUrl: 'https://maps.apple.com/?q=Apple+Battersea+Power+Station+London&ll=51.4836,-0.1441', activeTrainer: 0,
        trainers: [_trainer('General', [
          'Upload content to Box at Apple Battersea',
          'Back up footage to both hard drives',
          'Choose selects for the day',
        ])]
      },
    ],
      { id: 'd0421_parkhyatt', name: '📍 Return to Base Camp — Park Hyatt London River, 7 Nine Elms Lane, London SW8 5PH', mapsUrl: 'https://maps.apple.com/?q=Park+Hyatt+London+River&ll=51.4855,-0.1258', activeTrainer: 0,
        trainers: [_trainer('General', ['Return to Park Hyatt London River', 'Debrief on the day'])]
      },
      { id: 'd0421_prep', name: 'Production Prep (PM)', activeTrainer: 0,
        trainers: [_trainer('General', [
          'Clint to check gear & charge all devices',
          'Format cards / back up footage',
          'Review footage from today',
        ])]
      },
    eod: [false, false, false]
  },
  {
    id: 'd0422', label: 'Wednesday, 22 April', tab: 'Wed 22',
    calltime: '9:00 AM', weather: 'Light drizzle, 45–53°F, 21% rain', meetAt: 'Battersea Power Station', locationAddress: 'Battersea Power Station, Circus Rd West, London SW11 8EZ',
    locations: [
      { id: 'l422a', name: 'Battersea Power Station — Apple Watch Run Experience (9 AM – 6:30 PM)', activeTrainer: 0,
        trainers: _selectedCoaches(['Coach Brian','Coach Cory','Coach Josh','Coach Scott','Coach Sherica'], [
          'Brief 60–70 influencers',
          'New-to and switchers activation',
          'Social posts highlighting key Apple Watch features for runners',
          'Trainer interview pull-asides',
          'B-roll: Battersea Power Station exterior & event setup',
          'Wide establishing — full event floor',
        ])
      },
      { id: 'l422b', name: '📋 Social: Apple Watch Experience Tasks', activeTrainer: 0,
        trainers: [
          _trainer('Coach Cory', [
            'Re-share Brian\'s selfie video when tagged',
          ]),
          _trainer('Coach Josh', [
            'Re-share Brian\'s selfie video when tagged',
          ]),
          _trainer('Coach Scott', [
            'Re-share Brian\'s selfie video when tagged',
          ]),
          _trainer('Coach Brian', [
            'Record selfie video at installation with full trainer group (before guests arrive)',
            'Script: "Hey team! We\'re here in London with my Fitness+ teammates learning more about Apple Watch! Let\'s go!"',
            'Tag Sherica, Cory, Josh, Scott to re-share',
          ]),
          _trainer('Coach Sherica', [
            'Re-share Brian\'s selfie video when tagged',
          ]),
        ]
      },      { id: 'd0422_photos', name: '📷 Daily Photos', activeTrainer: 0,
        trainers: _dailyPhotos('Battersea Power Station')
      },
      { id: 'd0422_battersea', name: '📍 Apple Battersea — End of Day', mapsUrl: 'https://maps.apple.com/?q=Apple+Battersea+Power+Station+London&ll=51.4836,-0.1441', activeTrainer: 0,
        trainers: [_trainer('General', [
          'Upload content to Box at Apple Battersea',
          'Back up footage to both hard drives',
          'Choose selects for the day',
        ])]
      },
    ],
      { id: 'd0422_parkhyatt', name: '📍 Return to Base Camp — Park Hyatt London River, 7 Nine Elms Lane, London SW8 5PH', mapsUrl: 'https://maps.apple.com/?q=Park+Hyatt+London+River&ll=51.4855,-0.1258', activeTrainer: 0,
        trainers: [_trainer('General', ['Return to Park Hyatt London River', 'Debrief on the day'])]
      },
      { id: 'd0422_prep', name: 'Production Prep (PM)', activeTrainer: 0,
        trainers: [_trainer('General', [
          'Clint to check gear & charge all devices',
          'Format cards / back up footage',
          'Review footage from today',
        ])]
      },
    eod: [false, false, false]
  },
  {
    id: 'd0423', label: 'Thursday, 23 April', tab: 'Thu 23',
    calltime: '', weather: 'Overcast, 42–66°F, 25% rain', meetAt: '', locationAddress: 'Apple Brompton, 17-27 Brompton Rd, London SW1X 9LF',
    locations: [
      { id: 'l423z', name: '📍 Apple Brompton — Morning Walkthrough (17-27 Brompton Rd, London SW1X 9LF)', mapsUrl: 'https://maps.apple.com/?q=Apple+Brompton+Street+London&ll=51.5125,-0.1415', activeTrainer: 0,
        trainers: [
          _trainer('General', [
            '⚠️ IMPORTANT — Morning walkthrough at Apple Brompton store',
            'Arrive at Apple Brompton for morning walkthrough',
            'Scout all filming positions — interior & exterior',
            'Check event setup & staging',
            'Check video wall placement & lighting',
            'Confirm camera angles for panel & audience',
            'Check sight lines for 5K run departure',
            'Confirm access points & crew positions',
            'Liaise with store team & event team on the day plan',
          ])
        ]
      },
      { id: 'l423a', name: 'Creator Cohort Welcome Programming — All Trainers', activeTrainer: 0,
        trainers: _coaches([
        ])
      },
      { id: 'l423b', name: 'Apple Brompton — TAA Panel + 5K Shakeout Run (6:30 PM – 8:30 PM)', activeTrainer: 0,
        trainers: [
          _trainer('Coach Jamie-Ray', [
            'Record 5K video diary for Stories',
            'Photos back at Store after event',
          ]),
          _trainer('Coach Kim', [
          ]),
          _trainer('Coach Cory', [
            'Q&A Panel — Cory moderating',
          ]),
          _trainer('Coach Josh', [
          ]),
          _trainer('Coach Scott', [
          ]),
          _trainer('Coach Dice', [
            'Record 5K video diary for Stories',
            'Photos back at Store after event',
          ]),
          _trainer('Coach Brian', [
            'Record 5K video diary for Stories',
            'Photos back at Store after event',
          ]),
          _trainer('Coach Sherica', [
            'Q&A Panel — Sherica panelist',
          ]),
        ]
      },
      { id: 'l423f', name: '🏃 5K Shakeout Run — Shot List', activeTrainer: 0,
        trainers: [
          _trainer('General', [
            '— LEAVING STORE —',
            'Hi-energy shots of group leaving store with decals in background',
            'Wide shot — group exit from store entrance',
            '— WARM UP —',
            'Wide shot — full warm up set up',
            'Medium shots — branded elements',
            'Wide shot — full group warming up',
            'Medium shot — trainers in centre warming up the crowd',
            'Potential group huddle shot before run',
            '— DURING RUN —',
            'Candids of trainers and attendees running',
            'Optimise for runners in green shirts',
            'Wide shot — group running together',
            'Close-ups — trainer faces, energy & effort',
            '⚠️ NOTE: Audience will be on the move — second photographer / bike for photographer may be required',
            '— COOL DOWN —',
            'Wide shot — full group during cool down',
            'Medium shot — trainers in centre addressing crowd',
            '— AT STORE —',
            'Group shot — participants and Apple retail team members',
            'Group shot — with store decals in background',
          ])
        ]
      },
      { id: 'l423e', name: '🎤 Panel & Audience Shots', activeTrainer: 0,        trainers: [
          _trainer('General', [
            '— PRE-EVENT —',
            'Video wall — full name of the event',
            'Video wall detail & establishing B-roll',
            '— DURING EVENT: WIDE —',
            'Wide shot — full panel in front of video wall',
            'Wide shot — include as many attendees as possible in frame',
            'Wide shot — show full crowd, no empty chairs',
            'Wide shot — full video wall in frame',
            '— DURING EVENT: MEDIUM —',
            'Medium shot — panelists, include as many attendees as possible',
            'Medium shot — video wall centred in the image',
            'Medium shot — animated panelist shots / good energy',
            '— DURING EVENT: CLOSE-UPS —',
            'Close-up — panelists in front of video wall (straight on)',
            'Close-up — panelists in front of video wall (from the side)',
            '— PANEL SPEAKERS —',
            'Wide shot — full panel on stage',
            'Cory Wharton-Malcolm — wide & close-up',
            'Cory Wharton-Malcolm speaking to audience',
            'Sherica Holmon — wide & close-up',
            'Sherica Holmon speaking to audience',
            'Dora Akim — wide & close-up',
            'Dora Akim speaking to audience',
            'Hellah Sidibe — wide & close-up',
            'Hellah Sidibe speaking to audience',
            'Becky Briggs — wide & close-up',
            'Becky Briggs speaking to audience',
            'Joe Wicks — wide & close-up',
            'Joe Wicks speaking to audience',
            'Panel interaction — speakers talking to each other',
            'Reaction shots across the panel',
            '— AUDIENCE —',
            'Wide shot — full audience',
            'Coach Josh in audience — wide & close-up',
            'Coach Scott in audience — wide & close-up',
            'Coach Jamie-Ray in audience — wide & close-up',
            'Coach Kim in audience — wide & close-up',
            'Coach Brian in audience — wide & close-up',
            'Coach Dice in audience — wide & close-up',
            'Audience reaction shots — applause, engagement',
            'Audience wide — energy & atmosphere B-roll',
          ])
        ]
      },      { id: 'd0423_photos', name: '📷 Daily Photos', activeTrainer: 0,
        trainers: _dailyPhotos('Apple Brompton Store')
      },
      { id: 'd0423_battersea', name: '📍 Apple Battersea — End of Day', mapsUrl: 'https://maps.apple.com/?q=Apple+Battersea+Power+Station+London&ll=51.4836,-0.1441', activeTrainer: 0,
        trainers: [_trainer('General', [
          'Upload content to Box at Apple Battersea',
          'Back up footage to both hard drives',
          'Choose selects for the day',
        ])]
      },
    ],
      { id: 'd0423_parkhyatt', name: '📍 Return to Base Camp — Park Hyatt London River, 7 Nine Elms Lane, London SW8 5PH', mapsUrl: 'https://maps.apple.com/?q=Park+Hyatt+London+River&ll=51.4855,-0.1258', activeTrainer: 0,
        trainers: [_trainer('General', ['Return to Park Hyatt London River', 'Debrief on the day'])]
      },
      { id: 'd0423_prep', name: 'Production Prep (PM)', activeTrainer: 0,
        trainers: [_trainer('General', [
          'Clint to check gear & charge all devices',
          'Format cards / back up footage',
          'Review footage from today',
        ])]
      },
    eod: [false, false, false]
  },
  {
    id: 'd0424', label: 'Friday, 24 April', tab: 'Fri 24',
    calltime: '', weather: 'Overcast, 46–52°F, 24% rain', meetAt: '', locationAddress: 'SoHo, London & 1 Boiler House, Battersea Power Station, SW11 8EZ',
    locations: [
      { id: 'l424a', name: 'SoHo — Strava Breakfast (9:30 AM – 11:30 AM)', activeTrainer: 0,
        trainers: [
          _trainer('Coach Jamie-Ray', [
            'Run or Walk + Breakfast',
            'Group photo at step and repeat',
          ]),
          _trainer('Coach Kim', [
            'Run or Walk + Breakfast',
            'Group photo at step and repeat',
          ]),
          _trainer('Coach Cory', [
            'Run or Walk + Breakfast',
            'Group photo at step and repeat',
          ]),
          _trainer('Coach Josh', [
            'Run or Walk + Breakfast',
            'Group photo at step and repeat',
          ]),
          _trainer('Coach Scott', [
            'Run or Walk + Breakfast',
            'Group photo at step and repeat',
          ]),
          _trainer('Coach Brian', [
            'Run or Walk + Breakfast',
            'Group photo at step and repeat',
          ]),
        ]
      },
      { id: 'l424b', name: 'Photo Walk — JR, Dice, Kim', activeTrainer: 0,
        trainers: [
          _trainer('Coach Jamie-Ray', [
            'DITL: Film "get ready for bib pick-up" with fellow creators',
            'Mention Sherica on the day (iterate in the moment)',
          ]),
          _trainer('Coach Kim', [
            'Capture content during photo walk',
          ]),
          _trainer('Coach Dice', [
            'Capture content during photo walk',
          ]),
        ]
      },
      { id: 'l424c', name: '1 Boiler House, BPS — VIP Event (5:30 PM – 7:30 PM)', activeTrainer: 0,
        trainers: _coaches([
          '150 guests max',
        ])
      },      { id: 'd0424_photos', name: '📷 Daily Photos', activeTrainer: 0,
        trainers: _dailyPhotos('SoHo & Battersea Power Station')
      },
      { id: 'd0424_battersea', name: '📍 Apple Battersea — End of Day', mapsUrl: 'https://maps.apple.com/?q=Apple+Battersea+Power+Station+London&ll=51.4836,-0.1441', activeTrainer: 0,
        trainers: [_trainer('General', [
          'Upload content to Box at Apple Battersea',
          'Back up footage to both hard drives',
          'Choose selects for the day',
        ])]
      },
    ],
      { id: 'd0424_parkhyatt', name: '📍 Return to Base Camp — Park Hyatt London River, 7 Nine Elms Lane, London SW8 5PH', mapsUrl: 'https://maps.apple.com/?q=Park+Hyatt+London+River&ll=51.4855,-0.1258', activeTrainer: 0,
        trainers: [_trainer('General', ['Return to Park Hyatt London River', 'Debrief on the day'])]
      },
      { id: 'd0424_prep', name: 'Production Prep (PM)', activeTrainer: 0,
        trainers: [_trainer('General', [
          'Clint to check gear & charge all devices',
          'Format cards / back up footage',
          'Review footage from today',
        ])]
      },
    eod: [false, false, false]
  },
  {
    id: 'd0425', label: 'Saturday, 25 April', tab: 'Sat 25',
    calltime: '9:15 AM', weather: 'Partly cloudy, 40–61°F, 25% rain', meetAt: 'Apple Brompton', locationAddress: 'Apple Brompton, 17-27 Brompton Rd, London SW1X 9LF',
    locations: [
      { id: 'l425z', name: '📍 Apple Brompton — 17-27 Brompton Rd, London SW1X 9LF', activeTrainer: 0,
        trainers: [_trainer('General', [
          '9:15 AM — Arrive at Apple Brompton',
          'Confirm check-in & set up filming positions',
          'Scout studio interior & exterior filming positions',
          '📱 REMINDER: Download the TCS London Marathon app to track all runners on race day',
        ])]
      },
      { id: 'l425aa', name: '🎙 The Daily Download — Podcast Recording (10:30 AM – 11:30 AM)', activeTrainer: 0,
        trainers: [
          _trainer('📹 Video Shots', [
            '— EXTERIOR —',
            'Apple Brompton store exterior — establishing wide shot',
            'Store exterior with signage & decals — B-roll',
            'Hosts arriving at store — candid video',
            '— STUDIO INTERIOR —',
            'Studio interior wide — full set establishing shot',
            'Studio interior — branded elements & set dressing B-roll',
            'Studio interior — lighting & atmosphere B-roll',
            'Podcast set detail shots — mics, headphones, branding',
            '— HOSTS & GUEST —',
            'Paula Radcliffe — wide & close-up on set',
            'Paula Radcliffe speaking / hosting',
            'Chris Thompson — wide & close-up on set',
            'Chris Thompson speaking / hosting',
            'Cory Wharton Malcolm — wide & close-up on set',
            'Cory Wharton Malcolm as guest — speaking',
            'All three together — wide shot of full set',
            'Host & guest interaction — candid energy',
            'Reaction shots across hosts & guest',
            '— THE DAILY DOWNLOAD —',
            'The Daily Download branding / title card shot',
            'Recording in progress — wide studio shot',
            'Behind the scenes — production crew B-roll',
            '— CORY INTERVIEW —',
            'Cory Wharton Malcolm interview — wide shot',
            'Cory Wharton Malcolm interview — medium shot',
            'Cory Wharton Malcolm interview — close-up',
            'Cory answering questions — candid energy',
            'Cory & hosts interacting — natural conversation',
            'Cory gesturing / animated interview moments',
            'Over-the-shoulder shot — Cory being interviewed',
            'Cory laughing / reacting — authentic moments',
            '— AUDIENCE TRAINERS —',
            'Coach Kim reacting to podcast — candid video',
            'Coach Scott reacting to podcast — candid video',
            'Coach Jamie-Ray reacting to podcast — candid video',
            '— DURING EVENT —',
            'Wide shot — full panel in front of video wall',
            'Wide shot — include as many attendees as possible',
            'Wide shot — show full crowd, no empty chairs',
            'Wide shot — full video wall in frame',
            'Medium shot — panelists, include as many attendees as possible',
            'Medium shot — video wall centred in frame',
          ]),
          _trainer('📷 Photo Shots', [
            '— PRE-EVENT —',
            'Shot of video wall — full name of the event',
            '— DURING EVENT: WIDE —',
            'Wide shot — full panel in front of video wall',
            'Wide shot — as many attendees as possible in frame',
            'Wide shot — full crowd, no empty chairs',
            'Wide shot — full video wall in frame',
            '— DURING EVENT: MEDIUM —',
            'Medium shot — panelists with as many attendees as possible',
            'Medium shot — video wall centred in the image',
            '— DURING EVENT: CLOSE-UPS —',
            'Close-up — panelists in front of video wall (straight on)',
            'Close-up — panelists in front of video wall (from the side)',
            '— AUDIENCE TRAINERS —',
            'Coach Kim in audience — wide & close-up',
            'Coach Scott in audience — wide & close-up',
            'Coach Jamie-Ray in audience — wide & close-up',
            'All three trainers in audience together — group shot',
            '— POST-EVENT —',
            'Group photo — all attendees, panelists & retail staff in front of video wall',
            '⚠️ NOTE: Photographer to gather group for this shot',
            'Group photo — all trainers & retail staff',
            'Panel team photo — panelists only, nice background (store wall / video wall)',
            'Candids — fly-on-the-wall shots post-event',
            'Candids — panelists and attendees interacting post-event',
          ]),
        ]
      },
      { id: 'l425a', name: 'Apple Brompton — TAA Live Podcast with Paula Radcliffe (10:30 AM – 11:30 AM)', activeTrainer: 0,
        trainers: [
          _trainer('Coach Jamie-Ray', [
          ]),
          _trainer('Coach Kim', [
          ]),
          _trainer('Coach Cory', [
            'Apple Fitness+ Trainer Cory Wharton Malcolm',
            'Paula Radcliffe "Road to London" live podcast recording',
            'Capture selfie with Paula Radcliffe in real time',
          ]),
          _trainer('Coach Josh', [
          ]),
          _trainer('Coach Scott', [
          ]),
          _trainer('Coach Dice', [
          ]),
          _trainer('Coach Brian', [
          ]),
          _trainer('Coach Sherica', [
          ]),
        ]
      },
      { id: 'l425b', name: 'Creator Cohort Programming', activeTrainer: 0,
        trainers: _coaches([
        ])
      },
      { id: 'l425c', name: '5KM Run', activeTrainer: 0,
        trainers: _coaches([
          'Wide shot — runners at start of 5KM',
          'Coaches leading the run — front pack',
          'Mid-run action shots',
          'Close-ups — coaches running & encouraging',
          'Crowd & spectator energy B-roll',
          'Finish line — coaches crossing',
          'Post-run group celebration',
        ])
      },      { id: 'd0425_photos', name: '📷 Daily Photos', activeTrainer: 0,
        trainers: _dailyPhotos('Apple Brompton Store')
      },
      { id: 'd0425_battersea', name: '📍 Apple Battersea — End of Day', mapsUrl: 'https://maps.apple.com/?q=Apple+Battersea+Power+Station+London&ll=51.4836,-0.1441', activeTrainer: 0,
        trainers: [_trainer('General', [
          'Upload content to Box at Apple Battersea',
          'Back up footage to both hard drives',
          'Choose selects for the day',
        ])]
      },
    ],
      { id: 'd0425_parkhyatt', name: '📍 Return to Base Camp — Park Hyatt London River, 7 Nine Elms Lane, London SW8 5PH', mapsUrl: 'https://maps.apple.com/?q=Park+Hyatt+London+River&ll=51.4855,-0.1258', activeTrainer: 0,
        trainers: [_trainer('General', ['Return to Park Hyatt London River', 'Debrief on the day'])]
      },
      { id: 'd0425_prep', name: 'Production Prep (PM)', activeTrainer: 0,
        trainers: [_trainer('General', [
          'Clint to check gear & charge all devices',
          'Format cards / back up footage',
          'Review footage from today',
        ])]
      },
    eod: [false, false, false]
  },
  {
    id: 'd0426', label: 'Sunday, 26 April — Race Day 🏃', tab: 'Sun 26',
    calltime: '', weather: 'Overcast, 44–59°F, 26% rain', meetAt: '', dri: '', locationAddress: 'Victoria Embankment, London WC2N 5DJ & The Mall, London SW1A 1AA',
    locations: [
      { id: 'l426i', name: '🎵 Mile 24 — Apple Music Activation, Victoria Embankment, London WC2N 5DJ', mapsUrl: 'https://maps.apple.com/?q=Victoria+Embankment+London+WC2N+5DJ&ll=51.5033,-0.1195', activeTrainer: 0,
        trainers: [
          _trainer('General', [
            '— PERFORMANCE SCHEDULE —',
            '10:00 AM – 12:00 PM: Tempo Run Club DJs',
            '12:00 PM – 2:00 PM: Joel Corry',
            '2:00 PM – 3:30 PM: Mel C',
            '3:30 PM – 5:00 PM: Switch Disco',
            '5:00 PM – 7:00 PM: NAINA',
            '— WIDE SHOTS —',
            'Wide shot — Apple Music installation with spectators on either side',
            'Wide shot — include runners in front of installation',
            'Wide shot — include London backdrop where possible',
            'Wide shot — full crowd & stage energy',
            'Wide shot — full activation with branding visible',
            '— MEDIUM SHOTS —',
            'Medium shot — DJs performing, include spectators',
            'Medium shot — main talent performing, include spectators',
            'Medium shot — MCs on stage, include spectators',
            'Medium shot — capture energy & excitement of spectators',
            'Medium shot — capture energy & excitement of runners passing',
            '— CLOSE-UPS —',
            'Close-up — talent performing',
            'Close-up — MCs addressing crowd',
            'Close-up — spectator reactions & excitement',
            'Close-up — runner reactions to music',
            '— TEMPO RUN CLUB DJ\'S (10:00 AM – 12:00 PM) —',
            'Tempo Run Club DJs — wide & close-up',
            'Tempo Run Club DJs in action — detail shots',
            'Crowd energy during Tempo Run Club set',
            '— JOEL CORRY (12:00 PM – 2:00 PM) —',
            'Joel Corry performing — wide & close-up',
            'Joel Corry hyping up the crowd',
            'Joel Corry DJ set — detail shots',
            '— MEL C (2:00 PM – 3:30 PM) —',
            'Mel C performing — wide & close-up',
            'Mel C hyping up the crowd',
            'Mel C hyping up passing runners',
            'Mel C on stage — detail shots',
            '— SWITCH DISCO (3:30 PM – 5:00 PM) —',
            'Switch Disco performing — wide & close-up',
            'Switch Disco hyping up the crowd',
            'Switch Disco DJ set — detail shots',
            '— NAINA (5:00 PM – 7:00 PM) —',
            'NAINA performing — wide & close-up',
            'NAINA hyping up the crowd',
            'NAINA DJ set — detail shots',
            '— MC\'S —',
            'Cory Wharton Malcolm as MC — wide & close-up',
            'Cory Wharton Malcolm addressing the crowd',
            'Rebecca Judd as MC — wide & close-up',
            'Rebecca Judd addressing the crowd',
            'Cory & Rebecca together — MC duo shot',
            '— GROUP —',
            'Group shot — all artists together',
            'Artists interacting — candid energy',
            'Behind the scenes — backstage / artist area B-roll',
            'Apple Music branding — signage, banners & stage set detail',
          ])
        ]
      },
      { id: 'l426f', name: 'The Mall — Finish Line (Mile 26.2)', mapsUrl: 'https://maps.apple.com/?q=The+Mall+London&ll=51.5021,-0.1363', activeTrainer: 0,
        trainers: [
          _trainer('General', [
            '— WIDE SHOTS —',
            'Wide establishing shot — finish line on The Mall',
            'Wide shot — runners crossing the finish line',
            'Wide shot — crowds lining The Mall',
            'Wide shot — Buckingham Palace backdrop with finishers',
            '— MEDIUM SHOTS —',
            'Medium shot — finishers crossing the line',
            'Medium shot — medal ceremony',
            'Medium shot — finishers wrapped in foil blankets',
            '— CLOSE-UPS —',
            'Close-up — finish line timing gantry',
            'Close-up — runner crossing the line — emotion & reaction',
            'Close-up — arms raised / celebration moments',
            'Close-up — tears & emotional finishes',
            'Close-up — medal being placed around neck',
            '— RUNNERS —',
            'Sherica crossing the finish line 🎉',
            'Sherica — emotion & celebration at finish',
            'Jamie-Ray crossing the finish line 🎉',
            'Jamie-Ray — emotion & celebration at finish',
            'Gemma crossing the finish line 🎉',
            'Gemma — emotion & celebration at finish',
            'Post-race — group selfies & celebrations',
            'Post-race — family reunion moments',
            'Results board / timing display',
          ])
        ]
      },      { id: 'd0426_photos', name: '📷 Daily Photos', activeTrainer: 0,
        trainers: _dailyPhotos('Victoria Embankment & The Mall')
      },
      { id: 'd0426_battersea', name: '📍 Apple Battersea — End of Day', mapsUrl: 'https://maps.apple.com/?q=Apple+Battersea+Power+Station+London&ll=51.4836,-0.1441', activeTrainer: 0,
        trainers: [_trainer('General', [
          'Upload content to Box at Apple Battersea',
          'Back up footage to both hard drives',
          'Choose selects for the day',
        ])]
      },
    ],
      { id: 'd0426_parkhyatt', name: '📍 Return to Base Camp — Park Hyatt London River, 7 Nine Elms Lane, London SW8 5PH', mapsUrl: 'https://maps.apple.com/?q=Park+Hyatt+London+River&ll=51.4855,-0.1258', activeTrainer: 0,
        trainers: [_trainer('General', ['Return to Park Hyatt London River', 'Debrief on the day'])]
      },
      { id: 'd0426_prep', name: 'Production Prep (PM)', activeTrainer: 0,
        trainers: [_trainer('General', [
          'Clint to check gear & charge all devices',
          'Format cards / back up footage',
          'Review footage from today',
        ])]
      },
    eod: [false, false, false]
  }
];

const EOD_LABELS = [
  '✅ Choose selects',
  '💾 Upload to both hard drives',
  '🏢 Upload to Box at Apple Battersea'
];

// ─────────────────────────────────────────
//  STATE
// ─────────────────────────────────────────
let state;
let activeDay = 0;
let saveTimer = null;

// Migrate old data (location.shots[]) → new (location.trainers[])
function migrateState(s) {
  if (s && s.days) {
    s.days.forEach(day => {
      (day.locations || []).forEach(loc => {
        if (loc.shots && !loc.trainers) {
          loc.trainers = [{ id: _id(), name: 'General', shots: loc.shots }];
          delete loc.shots;
        }
        if (loc.activeTrainer === undefined) loc.activeTrainer = 0;
      });
    });
  }
  return s;
}

function loadState() {
  const hash = window.location.hash.slice(1);
  if (hash) {
    try {
      const decoded = JSON.parse(decodeURIComponent(atob(hash)));
      if (decoded && decoded.days) {
        state = migrateState(decoded);
        showToast('📎 Loaded shared schedule');
        window.location.hash = '';
        return;
      }
    } catch(e) {}
  }
  const saved = localStorage.getItem('lm2026_v40_schedule');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.days) { state = migrateState(parsed); return; }
    } catch(e) {}
  }
  state = { days: JSON.parse(JSON.stringify(INITIAL_DAYS)) };
}

function saveState() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    localStorage.setItem('lm2026_v16_schedule', JSON.stringify(state));
  }, 300);
}

// ─────────────────────────────────────────
//  RENDER
// ─────────────────────────────────────────
function render() {
  renderTabs();
  renderDays();
}

function renderTabs() {
  const bar = document.getElementById('tabbar');
  bar.innerHTML = state.days.map((d, i) => {
    const shots = allShotsForDay(d);
    const hasContent = d.calltime || d.weather || d.meetAt || shots.some(s => s.done);
    return `<button class="tab-btn ${i === activeDay ? 'active' : ''}" onclick="switchDay(${i})">
      ${d.tab}<span class="tab-dot ${hasContent ? 'filled' : ''}"></span>
    </button>`;
  }).join('');
}

function renderDays() {
  const main = document.getElementById('main');
  main.innerHTML = state.days.map((d, di) => `
    <div class="day-panel ${di === activeDay ? 'active' : ''}" id="panel-${di}">
      <div class="basecamp-card">
        <span class="basecamp-icon">🏨</span>
        <div>
          <div class="basecamp-label">Base Camp</div>
          <div class="basecamp-address">Park Hyatt London River &nbsp;·&nbsp; 7 Nine Elms Lane, London GB SW8 5PH</div>
        </div>
      </div>
      ${renderDayHeader(d, di)}
      ${renderInfoCard(d, di)}
      <div class="section-label">📍 Locations & Shots</div>
      ${d.locations.map((loc, li) => renderLocation(d, di, loc, li)).join('')}
      <button class="btn-add-location" onclick="addLocation(${di})">＋ Add Location</button>
      <div class="section-label">🌙 End of Day Checklist</div>
      ${renderEOD(d, di)}
    </div>
  `).join('');
}

function renderDayHeader(d, di) {
  const allShots = allShotsForDay(d);
  const total = allShots.length;
  const done  = allShots.filter(s => s.done).length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
  return `
    <div class="day-header">
      <h2>${d.label}</h2>
      <div class="progress-pill">
        <div class="pbar"><div class="pbar-fill" style="width:${pct}%"></div></div>
        ${done}/${total} shots
      </div>
    </div>`;
}

function renderInfoCard(d, di) {
  return `
    <div class="info-card">
      <div class="info-field">
        <label><span class="field-icon">🚗</span> Departure from Hotel</label>
        <input type="text" placeholder="e.g. 9:00 AM" value="${esc(d.calltime)}"
          oninput="updateInfo(${di},'calltime',this.value)" />
      </div>
      <div class="info-field">
        <label><span class="field-icon">🌤</span> Weather Forecast</label>
        <input type="text" placeholder="e.g. Cloudy, 65°F" value="${esc(d.weather)}"
          oninput="updateInfo(${di},'weather',this.value)" />
      </div>
      <div class="info-field">
        <label><span class="field-icon">🏨</span> Headed to Location</label>
        <input type="text" placeholder="e.g. Park Hyatt London River" value="${esc(d.meetAt)}"
          oninput="updateInfo(${di},'meetAt',this.value)" />
      </div>
      <div class="info-field">
        <label><span class="field-icon">📍</span> Location Address</label>
        <input type="text" placeholder="e.g. 17-27 Brompton Rd, London SW1X 9LF" value="${esc(d.locationAddress||'')}"
          oninput="updateInfo(${di},'locationAddress',this.value)" />
      </div>
      <div class="info-field">
        <label><span class="field-icon">👤</span> DRI</label>
        <input type="text" placeholder="Directly Responsible Individual" value="${esc(d.dri||'')}"
          oninput="updateInfo(${di},'dri',this.value)" />
      </div>
    </div>`;
}

function renderLocation(d, di, loc, li) {
  const at      = loc.activeTrainer || 0;
  const trainer = loc.trainers[at];
  return `
    <div class="location-card" id="loc-${di}-${li}">
      <div class="location-header">
        <span class="loc-pin">📍</span>
        <input class="loc-name-input" type="text" placeholder="Location name…"
          value="${esc(loc.name)}" oninput="updateLocName(${di},${li},this.value)" />
        ${loc.mapsUrl ? `<a class="loc-maps-link" href="${loc.mapsUrl}" target="_blank">🗺 Open in Maps</a>` : ''}
        <button class="btn-remove-loc" onclick="removeLocation(${di},${li})" title="Remove location">×</button>
      </div>
      <div class="trainer-tabs-bar">
        ${loc.trainers.map((t, ti) => `
          <div class="trainer-tab-wrap ${ti === at ? 'active' : ''}"
               onclick="switchTrainer(${di},${li},${ti})">
            <input class="trainer-tab-name ${ti === at ? 'active' : ''}" type="text"
              value="${esc(t.name)}" placeholder="Trainer…"
              onclick="event.stopPropagation()"
              onfocus="switchTrainer(${di},${li},${ti})"
              oninput="updateTrainerName(${di},${li},${ti},this.value)" />
            ${loc.trainers.length > 1 ? `
              <button class="btn-remove-trainer" title="Remove trainer"
                onclick="event.stopPropagation();removeTrainer(${di},${li},${ti})">×</button>
            ` : ''}
          </div>
        `).join('')}
        <button class="btn-add-trainer" onclick="addTrainer(${di},${li})">＋ Trainer</button>
      </div>
      <div class="location-shots">
        <div class="shots-heading" id="sh-${di}-${li}">Shots — ${esc(trainer.name)}</div>
        <div class="shot-list" id="shots-${di}-${li}">
          ${trainer.shots.map((s, si) => renderShot(di, li, at, s, si)).join('')}
        </div>
        <button class="btn-add-shot" onclick="addShot(${di},${li})">＋ Add shot</button>
      </div>
    </div>`;
}

function renderShot(di, li, ti, s, si) {
  return `
    <div class="shot-item" id="shot-${di}-${li}-${ti}-${si}">
      <input type="checkbox" class="shot-cb" ${s.done ? 'checked' : ''}
        onchange="toggleShot(${di},${li},${ti},${si},this.checked)" />
      <input type="text" class="shot-text-input ${s.done ? 'done' : ''}"
        value="${esc(s.text)}" placeholder="Describe the shot…"
        oninput="updateShotText(${di},${li},${ti},${si},this.value)" />
      <button class="btn-remove-shot" onclick="removeShot(${di},${li},${ti},${si})" title="Remove">✕</button>
    </div>`;
}

function renderEOD(d, di) {
  return `
    <div class="eod-card">
      <div class="eod-heading">📋 Wrap Checklist</div>
      ${EOD_LABELS.map((lbl, i) => `
        <div class="eod-item ${d.eod[i] ? 'checked' : ''}" id="eod-${di}-${i}">
          <input type="checkbox" class="eod-cb" id="eodcb-${di}-${i}" ${d.eod[i] ? 'checked' : ''}
            onchange="toggleEOD(${di},${i},this.checked)" />
          <label class="eod-label" for="eodcb-${di}-${i}">${lbl}</label>
        </div>
      `).join('')}
    </div>`;
}

// ─────────────────────────────────────────
//  ACTIONS — Day
// ─────────────────────────────────────────
function switchDay(i) {
  activeDay = i;
  render();
  document.getElementById('main').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function updateInfo(di, field, val) {
  state.days[di][field] = val;
  saveState();
  updateTabDot(di);
}

// ─────────────────────────────────────────
//  ACTIONS — Location
// ─────────────────────────────────────────
function updateLocName(di, li, val) {
  state.days[di].locations[li].name = val;
  saveState();
}

function addLocation(di) {
  state.days[di].locations.push({
    id: _id(), name: '', activeTrainer: 0,
    trainers: _coaches([''])
  });
  render();
  saveState();
}

function removeLocation(di, li) {
  if (state.days[di].locations.length === 1) {
    showToast('⚠️ At least one location is required'); return;
  }
  state.days[di].locations.splice(li, 1);
  render();
  saveState();
}

// ─────────────────────────────────────────
//  ACTIONS — Trainer tabs
// ─────────────────────────────────────────
function switchTrainer(di, li, ti) {
  if (state.days[di].locations[li].activeTrainer === ti) return;
  state.days[di].locations[li].activeTrainer = ti;
  render();
  saveState();
}

function addTrainer(di, li) {
  const loc = state.days[di].locations[li];
  // Pre-fill shot list from the first trainer's shot texts (all unchecked)
  const template = loc.trainers[0].shots.map(s => ({ id: _id(), text: s.text, done: false }));
  loc.trainers.push({ id: _id(), name: 'Trainer ' + (loc.trainers.length + 1), shots: template });
  loc.activeTrainer = loc.trainers.length - 1;
  render();
  saveState();
  setTimeout(() => {
    const tabs = document.querySelectorAll(`#loc-${di}-${li} .trainer-tab-name`);
    if (tabs.length) { const last = tabs[tabs.length - 1]; last.focus(); last.select(); }
  }, 50);
}

function removeTrainer(di, li, ti) {
  const loc = state.days[di].locations[li];
  if (loc.trainers.length === 1) { showToast('⚠️ At least one trainer tab required'); return; }
  loc.trainers.splice(ti, 1);
  loc.activeTrainer = Math.min(loc.activeTrainer, loc.trainers.length - 1);
  render();
  saveState();
}

function updateTrainerName(di, li, ti, val) {
  state.days[di].locations[li].trainers[ti].name = val;
  const heading = document.getElementById(`sh-${di}-${li}`);
  if (heading && state.days[di].locations[li].activeTrainer === ti) {
    heading.textContent = 'Shots — ' + val;
  }
  saveState();
}

// ─────────────────────────────────────────
//  ACTIONS — Shots
// ─────────────────────────────────────────
function addShot(di, li) {
  const loc = state.days[di].locations[li];
  const ti  = loc.activeTrainer || 0;
  loc.trainers[ti].shots.push({ id: _id(), text: '', done: false });
  render();
  saveState();
  setTimeout(() => {
    const shots = document.querySelectorAll(`#shots-${di}-${li} .shot-text-input`);
    if (shots.length) shots[shots.length - 1].focus();
  }, 50);
}

function removeShot(di, li, ti, si) {
  const shots = state.days[di].locations[li].trainers[ti].shots;
  if (shots.length === 1) { showToast('⚠️ At least one shot required'); return; }
  shots.splice(si, 1);
  render();
  saveState();
}

function toggleShot(di, li, ti, si, checked) {
  state.days[di].locations[li].trainers[ti].shots[si].done = checked;
  const input = document.querySelector(`#shot-${di}-${li}-${ti}-${si} .shot-text-input`);
  if (input) input.classList.toggle('done', checked);
  const allShots = allShotsForDay(state.days[di]);
  const done = allShots.filter(s => s.done).length;
  const pct  = Math.round((done / allShots.length) * 100);
  const fill = document.querySelector(`#panel-${di} .pbar-fill`);
  const pill = document.querySelector(`#panel-${di} .progress-pill`);
  if (fill) fill.style.width = pct + '%';
  if (pill) pill.lastChild.textContent = ` ${done}/${allShots.length} shots`;
  saveState();
  updateTabDot(di);
}

function updateShotText(di, li, ti, si, val) {
  state.days[di].locations[li].trainers[ti].shots[si].text = val;
  saveState();
}

function toggleEOD(di, i, checked) {
  state.days[di].eod[i] = checked;
  const item = document.getElementById(`eod-${di}-${i}`);
  if (item) item.classList.toggle('checked', checked);
  saveState();
}

function updateTabDot(di) {
  const d = state.days[di];
  const shots = allShotsForDay(d);
  const hasContent = d.calltime || d.weather || d.meetAt || shots.some(s => s.done);
  const dot = document.querySelectorAll('.tab-dot')[di];
  if (dot) dot.classList.toggle('filled', !!hasContent);
}

// ─────────────────────────────────────────
//  SHARE / EXPORT / IMPORT
// ─────────────────────────────────────────
function shareState() {
  try {
    const encoded = btoa(encodeURIComponent(JSON.stringify(state)));
    const url = `${window.location.origin}${window.location.pathname}#${encoded}`;
    navigator.clipboard.writeText(url).then(() => showToast('🔗 Shareable link copied!'));
  } catch(e) { showToast('⚠️ Could not copy link'); }
}

function exportJSON() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'lm2026-schedule.json';
  a.click();
  showToast('⬇ Schedule exported');
}

function importJSON() {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = '.json';
  input.onchange = e => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (parsed && parsed.days) {
          state = migrateState(parsed); render(); saveState();
          showToast('⬆ Schedule imported');
        } else showToast('⚠️ Invalid file');
      } catch { showToast('⚠️ Could not parse file'); }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ─────────────────────────────────────────
//  TOAST
// ─────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

// ─────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────
try {
  loadState();
  render();
} catch(e) {
  var d = document.createElement('div');
  d.style.cssText = 'padding:20px;font-family:sans-serif;background:#fff;color:#c00;font-size:14px;';
  d.innerHTML = '<strong>Init Error:</strong><br>' + e.message + '<pre style="font-size:11px">' + e.stack + '</pre>';
  document.body.prepend(d);
}
