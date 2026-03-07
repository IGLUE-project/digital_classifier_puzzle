//Copy this file to config.js and specify your own settings

export let ESCAPP_APP_SETTINGS = {
  //Settings that can be specified by the authors
  skin: "STANDARD", //skin can be "STANDARD", "RETRO", or "FUTURISTIC".
  //background: "NONE", //background can be "NONE" or a URL.
  actionAfterSolve: "SHOW_MESSAGE", //actionAfterSolve can be "NONE" or "SHOW_MESSAGE".
  //message: "Custom message",

  //Settings that will be automatically specified by the Escapp server
  solutionLength: 4,
  locale:"es",
  items: JSON.stringify([
    { "iframe":true,
      "path": "https://sonsoles.me/balticsea2025/articles/cyp.html",    
      "true_or_false": false,
      "feedback": ""
    },
    { "iframe":true,
      "path": "https://sonsoles.me/balticsea2025/articles/poly.html",    
      "true_or_false": true,
      "feedback": ""
    },
    { "iframe":true,
      "path": "https://sonsoles.me/balticsea2025/articles/plants.html",    
      "true_or_false": true,
      "feedback": ""
    },
    { "iframe":true,
      "path": "https://sonsoles.me/balticsea2025/articles/almonds.html",    
      "true_or_false": true,
      "feedback": ""
    },
    { "iframe":true,
      "path": "https://sonsoles.me/balticsea2025/articles/maternal.html",    
      "true_or_false": false,
      "feedback": ""
    },
    {
      "iframe":true,
      "path": "https://sonsoles.me/balticsea2025/articles/rhodanese.html",    
      "true_or_false": true,
      "feedback": ""
    },
    {
      "iframe":true,
      "path": "https://sonsoles.me/balticsea2025/articles/cytochrome.html",    
      "true_or_false": false,
      "feedback": ""
    },
    {
      "iframe":true,
      "path": "https://sonsoles.me/balticsea2025/articles/blood.html",    
      "true_or_false": false,
      "feedback": ""
    }
  ]),
  escappClientSettings: {
    endpoint:"https://escapp.es/api/escapeRooms/id",
    linkedPuzzleIds: [1],
    rtc: false,
    preview: false
  },
};