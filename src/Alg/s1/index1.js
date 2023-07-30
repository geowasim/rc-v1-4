console.log("hinpm ");
var Calendar = (function () {
  var layOutDay = function (events) {
    var eventsLength = events.length;
    var timeslots = [];
    var event, i, j;

    // Step 0: Sort events by id.
    events = events.sort(function (a, b) {
      return a.start - b.start;
    });
    console.log("events", events);
    // Step 1: Initialize timeslots.
    for (i = 0; i < 720; i++) {
      timeslots[i] = [];
    }

    // Step 2: Arrange the events by timeslot.
    for (i = 0; i < eventsLength; i++) {
      event = events[i];

      // Safety first.
      if (event.start > event.end) {
        var temp = event.start;
        event.start = event.end;
        event.end = temp;
      }

      for (j = event.start; j < event.end; j++) {
        //previously : using id, but event with id can be deleted
        //timeslots[j].push(event.id);
        //index1 changes

        if (timeslots[j].length === 0) {
          timeslots[j].push(1);
        } else if (timeslots[j].length > 0) {
          timeslots[j].push(timeslots[j].length + 1);
        }
      }
    }

    // Step 3: Get each event it's horizontal position,
    //         and figure out the max number of conflicts it has.
    for (i = 0; i < 720; i++) {
      var next_hindex = 0;
      var timeslotLength = timeslots[i].length;

      // If there's at least one event in the timeslot,
      // we know how many events we will have going across for that slot.
      if (timeslotLength > 0) {
        // Store the greatest concurrent event count (cevc) for each event.
        for (j = 0; j < timeslotLength; j++) {
          event = events[timeslots[i][j] - 1];

          if (!event.cevc || event.cevc < timeslotLength) {
            event.cevc = timeslotLength;

            // Now is also a good time to coordinate horizontal ordering.
            // If this is our first conflict, start at the current index.
            if (!event.hindex) {
              event.hindex = next_hindex;

              // We also want to boost the index,
              // so that whoever we conflict with doesn't get the same one.
              next_hindex++;
            }
          }
        }
      }
    }

    // Step 4: Calculate event coordinates and dimensions,
    // and generate DOM.
    for (i = 0; i < events.length; i++) {
      event = events[i];

      // Height and y-coordinate are already known.
      event.pxh = event.end - event.start;
      event.pxy = event.start;

      // Width is based on calendar width and the cevc.
      event.pxw = 600 / event.cevc;

      // Height uses the same calendar/cevc figure,
      // multiplied by the horizontal index to prevent overlap.
      event.pxx = event.hindex * event.pxw;

      // Now, the easy part.
      var div = document.createElement("div");
      div.style.width = event.pxw + "px";
      div.style.height = event.pxh + "px";
      div.style.top = event.pxy + "px";
      div.style.left = event.pxx + "px";
      div.style.position = "absolute";
      div.innerHTML = event.title;
      div.style.background =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      // (random colours will make the events easy to tell apart.)

      console.log(document);
      document.getElementById("calander").appendChild(div);
    }
  };

  return {
    layOutDay: layOutDay,
  };
})();

var events = [
  { id: 15, start: 100, end: 720, title: "1" },
  { id: 2, start: 30, end: 150, title: "22" },
  { id: 51, start: 500, end: 600, title: "3333" },
  { id: 400, start: 220, end: 500, title: "4" },
  { id: 60, start: 300, end: 670, title: "555" },
  { id: 0, start: 30, end: 670, title: "66" },
  { id: 710, start: 150, end: 620, title: "7" },
];

// call now
Calendar.layOutDay(events);
