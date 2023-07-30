var Calendar = (function () {
  var layOutDay = function (events) {
    var eventsLength = events.length;
    var timeslots = [];
    var event, i, j;

    // Step 0: Sort events by id.
    events = events.sort(function (a, b) {
      return a.id - b.id;
    });

    // Step 1: Initialize timeslots.
    for (i = 0; i < 720; i++) {
      timeslots[i] = [];
    }

    // Step 2: Arrange the events by timeslot and horizontal index.
    for (i = 0; i < eventsLength; i++) {
      event = events[i];

      // Safety first.
      if (event.start > event.end) {
        var temp = event.start;
        event.start = event.end;
        event.end = temp;
      }

      for (j = event.start; j < event.end; j++) {
        var index = 0;
        while (timeslots[j][index]) {
          index++;
        }
        timeslots[j][index] = event;
        event.hindex = index; // Store the horizontal index.
      }
    }

    // Step 3: Get each event its horizontal position and zIndex,
    // and figure out the max number of conflicts it has.
    for (i = 0; i < 720; i++) {
      var next_hindex = 0;
      var timeslotLength = timeslots[i].length;

      // If there's at least one event in the timeslot,
      // we know how many events we will have going across for that slot.
      if (timeslotLength > 0) {
        // Sort the events by end time in descending order.
        timeslots[i].sort(function (a, b) {
          return b.end - a.end;
        });

        // Store the greatest concurrent event count (cevc) for each event.
        for (j = 0; j < timeslotLength; j++) {
          event = timeslots[i][j];

          if (!event.cevc || event.cevc < timeslotLength) {
            event.cevc = timeslotLength;

            // Now is also a good time to coordinate horizontal ordering.
            // If this is our first conflict, start at the current index.
            if (!event.hindex) {
              var hindex_found = false;
              while (!hindex_found) {
                hindex_found = true;
                for (var k = 0; k < timeslots[i].length; k++) {
                  var other_event = timeslots[i][k];
                  if (
                    other_event.hindex === next_hindex &&
                    other_event != event
                  ) {
                    hindex_found = false;
                    next_hindex++;
                    break;
                  }
                }
              }
              event.hindex = next_hindex;

              // We also want to boost the index,
              // so that whoever we conflict with doesn't get the same one.
              next_hindex++;
            }
          }
        }

        // Find the maximum height zIndex of the overlapping events.
        var maxZIndex = 1;
        for (j = 0; j < timeslotLength; j++) {
          event = timeslots[i][j];
          if (event.cevc > 1) {
            var overlappingEvents = timeslots[i].filter(function (e) {
              return (
                e != event &&
                e.start < event.end &&
                e.end > event.start &&
                e.cevc > 1
              );
            });
            var overlappingZIndex =
              overlappingEvents.reduce(function (max, e) {
                return Math.max(max, e.pxy);
              }, 1) + 1;
            if (overlappingZIndex > maxZIndex) {
              maxZIndex = overlappingZIndex;
            }
          }
        }

        // Set the zIndex and pxy of each event in the timeslot.
        for (j = 0; j < timeslotLength; j++) {
          event = timeslots[i][j];
          event.pxy = event.start;
          event.pxh = event.end - event.start;
          event.pxw = 600 / event.cevc;
          event.pxx = event.hindex * event.pxw;
          event.zIndex =
            event.cevc > 1 && event.id !== 6 ? maxZIndex + 1 : maxZIndex;
          var div = document.createElement("div");
          div.style.width = event.pxw + "px";
          div.style.height = event.pxh + "px";
          div.style.top = event.pxy + "px";
          div.style.left = event.pxx + "px";
          div.style.position = "absolute";
          div.innerHTML = event.title;
          div.style.zIndex = event.zIndex;
          div.style.border = "1px solid";
          div.style.background =
            "#" + Math.floor(Math.random() * 16777215).toString(16);
          document.getElementById("calendar").appendChild(div);
        }
      }
    }
  };

  return {
    layOutDay: layOutDay,
  };
})();

var events = [
  { id: 1, start: 10, end: 150, title: "1st" },
  { id: 2, start: 100, end: 160, title: "nd" },
  { id: 3, start: 540, end: 600, title: "3rd" },
  { id: 4, start: 560, end: 620, title: "4th" },
  { id: 5, start: 610, end: 670, title: "5th" },
  { id: 6, start: 20, end: 400, title: "6th" },
];

Calendar.layOutDay(events);
