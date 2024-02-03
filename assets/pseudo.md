# Functions

## Display event info (event)
- Set currentEvent as input val || currentEvent
- Fetch api data based on currentEvent (ask for artist name and possibly date of event)
    - Event data: Retrieve location, date & time. Possibly artist image?
        - Set variables to store this information.
    - Weather data: Retrieve weather code and use icon.
        - Set variables to store this information

    - Create card and card elements.
    - Set the values of all tags/elements tobe the stored variable info from both api's.

## Render buttons for any history from localStorage (event)
- use '[variableName].empty()'. This is to stop any duplicate buttons.
- use 'localStorage.getItem' to retireve data from your local storage.
- parse this data and set as a new variable.
- for loop to create a button for each iteration of the parsed variable.
    - create new button, add class (also a class to target on click event), add data tag, add text. 
    - Append to div with an id.

<hr>
<br>
<br>

# Click Events
## Submit, click event
- On click call display event function
<br>
<br>

## Submit, click event (to store in localStorage)
- On click, event.preventDefault()
- set variable to retrieve input value
- push to existing variable with an empty array
- stringify array into a new vaiable
- empty input field
- localStorage.setItem("keyName", stringifiedVariable)
- call render buttons function.
<br>
<br>

## On click on buttons with a history class. (event)
- currentEvent = data/ text value
- call display event function
<br>
<br>

## Possible delete function
- Clear all or individual

Call render buttons function at the end of all code to render any existing history.