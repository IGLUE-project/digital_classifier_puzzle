//Copy this file to config.js and specify your own settings

export let ESCAPP_APP_SETTINGS = {
  //Settings that can be specified by the authors
  //background: "NONE", //background can be "NONE" or a URL.
  // button_ok: "Possible",
  // button_nok: "Dismiss",
  // sendText: "Check",
  // continueButtonText: "Continue",
  // send_disabled: "There are still items to classify",
  // retry: "It seems I haven't classified all the items correctly",
  // congrats: "Congratulations! You've correctly classified all the items.",
  // header: "Resource classification",
  // modalheader: "Resource classification",
  // modalcontent: "There are several items to review and classify on this tablet. They will help you complete the task. Review each item and decide whether it meets the criteria.",
  // modalinstructions0: "Instructions:",
  // modalinstructions1: "1. For each item, click 'Dismiss' if it does not meet your criteria. Otherwise, click 'Possible'.",
  // modalinstructions2: "2. Once you have classified ALL the items, click 'Check' to see if your classification is correct.",
  // modalheader2: "Resource classification",
  // feedback: "Comments:",
  // end: "Challenge completed",
  // review: "Review comments",

  //Settings that will be automatically specified by the Escapp server
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