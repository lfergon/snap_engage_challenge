# ** 27.12.2014 LFG ** #

  ** api/sample-chat-data.json:** 

    - This file contains an array that simulates the answer of a RESTFUL API that returns JSON. I'll use meteor for faster development as I've been using it for the last two years.

    - Altought I think that Ember.js or backbone could be a better option for this situation. 

** meteor packages **

      $> meteor add meteor-platform

      $> meteor add iron:router

      $> meteor add mrt:moment

      $> meteor add sacha:spin

      $> meteor add fezvrasta:bootstrap-material-design

      $> meteor add mrt:highcharts-with-exporting

      $> meteor add mrt:googlemaps

** For launch the app: **

      $> meteor run --port 8080

** For deployment **
  
      $> meteor deploy snaptest.meteor.com

** Serving at **
  
    http://snaptest.meteor.com

  * Data provided does not have a predefined structure, some fields are missed, for example "survey".

  ** BUGS **

      * 28.12.2014 LFG *
        
        - DONE 29.12.2014 LFG 'active' class for links in navbar is not working in the correct way

        - DONE 29.12.2014 LFG Google Maps is not draw correctly when we back from /stats. The problem is related to the width/heigth of the div that contains the map when the DOM is rendered -> TypeError: Cannot read property 'offsetWidth' of null

  ** IMPROVEMENTS **

    * 28.12.2014 LFG *

      1. DONE 28.12.2014 LFG The browsers charts need to implement the correct logic

      2. DONE 28.12.2014 LFG Browser languages of the user could be plot in a chart

      3. DONE 28.12.2014 LFG Line over columns charts to show the average times 

      4. DONE 28.12.2014 LFG stats.js needs to be refactor, redundant code

      5. DONE 28.12.2014 LFG The languages charts need to implement the correct logic

      6. DONE 28.12.2014 LFG Take care of the field type, offline or chat