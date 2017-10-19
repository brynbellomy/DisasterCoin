# CS 4288: Web-based System Architecture 
## Programming Assignment 3

## Overview

For this assignment you are to continuing to expand on the card game playing application we built in Assignments #1 and #2.  Listed below are the requirements for the specific enhancements you need to make and how they will be graded.  Follow the directions closely and the site will that much closer to being usable.

### Enhancements

### A. Get your game on!! (40pts)

We need to start building actual card playing logic and capabilities into our application.  So, lets start small and build up over the next few assignments.  Here is what you need to enable:

* Build a new function called _shuffleCards_ (skeleton is in: _src/server/solitare.js_).  This will be a server-side function that generates an array of randomized cards.  The return from this call should be a JSON array that is a randomized set of shuffled cards.  The returned JSON array should be of the following form:

```
[{ "suit": "clubs", "value": 7 }, { "suit": "diamonds", "value": 12 }, ... ]
```

We need to start laying out the cards according to the game we want to play.  The game we will attempt to implement will be simple [Klondyke Solitare](https://en.wikipedia.org/wiki/Klondike_(solitaire)).  When your _/game_ page loads it will get an initial state for the game.  Implement this in the _initialState()_ method in _/src/server/solitare.js_.

* You must follow the rules of the game in terms of how many cards go in each pile.

* It should appropriatly leverage the shuffleCards() function created above.

* It should look something like this:
 
```
{
     pile1: [{"suit": "clubs", "value": 7, "up": true}, {"suit": "diamonds", "value": 12, "up": false}, ...],
     pile2: [...],
     ...
     pile7: [...],
     stack1: [...],
     ...
     stack4: [...],
     draw: [...],
     discard: [...]
}
```

* Lastly, using the above data structure, render the game onto the _game_ page with cards in the appropriate places according to the game rules.  Cards should face up and down correctly and the overall game page should layout like the Klondike game shown in the wiki page.


###C. Add client-side state (10pts)

The game screen is not your entire application.  We need to build the rest of our application to support it.  So, we need to enable all of the normal functions our users expect.  For example, once a user logs in, they should be recognized as logged in until they log out.  This awareness should persist even on reload of the browser.

Here are the criteria for this task:

* On the profile page show a link to the register and login pages by default.  If a person has logged in, remove these links and replace it with the person's Gravatar icon (based on their email address).  If logged in, they should also have a link to log out (though this will not do anything for now).

* On the profile page, we want a user to be able to edit their profile.  So, on the profile page, if the profile is for the same username as the one the user is logged in as, make an edit button/link visible.  This button should navigate the user to /edit.  For now, nothing needs to actually be at this address.

* Only let a logged-in user go to the start page to initiate a new game.  Have the _/start_ page check if a user is logged in.  If not, automatically redirect them to the _/login_ page.  The _/profile_ page should also only display the link to the _/start_ page if the user is logged in.


## SPA Build Process (10 pts)

Since we are writing a single page app we must have a robust build process.  Use the Webpack template developed in class as the basis for your build process.  Your application should build cleanly with no errors or warnings and should put the output file into the /public/js folder.



## Single Page Application (40pts)

Rewrite your client-side application to build as a single page app.  Use the React view framework and the starter code we developed in class as the starting point.  You will need to do the following:

* Build as a single page app
* Leverage React Router (v4) for all client-side page routing
* Rewrite all pages to be entirely React-based views


## Building & Testing

We have developed a set of automated tests that verify some of the capabilities and functionality of your site.

* We will apply these tests via Travis (also to be discussed in class)
* These tests will be used by the graders as a first assessment of your code


## Grading Criteria:

Meet the description above and you get all of the points.  As functionality isn't working, visual styling is not as desired, or things are simply missing, points will be deducted.


## Submission:

Ensure your files are in a clean and organized folder hierarchy.  Make sure your package.json is complete and up-to-date.  Commit all necessary files (not node_modules) to your GitHub repository.  Grading will follow pretty much the same script on every assignment:

* Clone student's repo
* Run ```npm install``` and all dependencies are installed
* Run ```npm run build``` and the web app client is built
* Run ```npm run start``` and the web app server is running
* Navigate to localhost:8080 and the grader is on the landing page
* Run ```npm run test``` to execute all of the test scripts locally

Your repo must be compliant with these steps.  It is easy to practice this on your local machine to ensure you have everything in the right place.

You must enable Travis builds of your code.  Failure to do so will result in a 40pt deduction.  Make sure your code passes all of the Travis automated unit tests.  Again, failure to ensure this will result in significant point deductions.



