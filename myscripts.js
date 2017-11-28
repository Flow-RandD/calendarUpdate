/* MODAL */
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, Update 
btn.onclick = function() {
    sorUpdate();
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
    modal.style.display = "none";
    }
}


function emailAdds(){
    //$('.modal-header').text('Select email recipients');
    $('.modal-body').text('Now, please select email recipients...');
    $('.modal-footer').empty();
    $('#contentModal').empty();
    $('#div2').show();
    document.getElementById("myBtn").onclick = myFunction;
}

function myFunction(){ 
    var idArry = [];
    var labArry = [];
    for(var i = 0; i<=4; i++){
    var id = document.getElementById(i).checked;
    
    idArry[i] = id;
    if(id == true){
        var label = document.getElementById(i).name;
        labArry.push(label);
    }
    }
    var statusSelect = document.getElementById("status");
    var status = statusSelect.options[statusSelect.selectedIndex].text;
    //GAS Fulfillment here
    calendarUpdateFunction(labArry, status);
}

function sorUpdate(){
    sorUpdateFunction();
}

function uncheckAll(){
$('input[type="checkbox"]:checked').prop('checked',false);
$('input[type="text"], textarea').val('');
$('#contentMain').html('');
$('#image2').empty();
$('#div2').hide();
document.getElementById("myBtn").onclick = sorUpdate;
window.location.replace(window.location.pathname + window.location.search + window.location.hash);
}

    
/* GOOGLE QUICKSTART CODE */
    // Client ID and API key from the Developer Console
    var CLIENT_ID = '1067528895621-gkhph4tkviknsrfqilf0qgksphvmg699.apps.googleusercontent.com';
    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ["https://script.googleapis.com/$discovery/rest?version=v1"];
    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    var SCOPES = 'https://www.googleapis.com/auth/spreadsheets https://www.google.com/calendar/feeds';
    var authorizeButton = document.getElementById('authorize-button');
    var signoutButton = document.getElementById('signout-button');
    /**
     *  On load, called to load the auth2 library and API client library.
     */
    function handleClientLoad() {
    gapi.load('client:auth2', initClient);
    }
    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
    }
    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        //callScriptFunction();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
    }
    /**
     *  Sign in the user upon button click.
     */
    function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
    }
    /**
     *  Sign out the user upon button click.
     */
    function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
    }
    /**
     * Append a pre element to the body containing the given message
     * as its text node. Used to display the results of the API call.
     *
     * @param {string} message Text to be placed in pre element.
     */
    function appendPre(message) {
    var pre = document.getElementById('contentModal');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
    }
    /**
     *Timout function positioned here for variable definition before callScriptFunction
    */
    function timeOut(){
    var preState = document.getElementById('contentMain').innerHTML
    myTimeout = setTimeout(function(){
        if (preState==='Loading...'){
            alert("It seems you may not have permission to view this information, or you haven't authorised this app.");
            $('#contentMain').html('Get outta here, ya filthy animal!');
            $('#image2').html('<img src="https://media.giphy.com/media/10K7FlHoiA8Cpq/giphy.gif" alt="Loading" />');
        }else{
        }
        },6500);
    }
    
    
    /**
     * Load the API and make an API call.  Display the results on the screen. Used to be callScriptFunction()
     */
    function calendarUpdateFunction(labArry, status) {
    var scriptId = "1E6F27vZSW9_1l4x1_PgCaCGvGUPlUmSbsjQjrzwOiuITXezVlDjOtdq7";
    
    //Get SOR from HTML
    var SOR = document.getElementById("SOR").value;
    
    //Clear checkboxes & set pre ready for response
    $('#contentMain').html('Loading...');
    $('#div2').hide();
    //Call timeOut function
    timeOut();
    
    // Call the Execution API run method
    //   'scriptId' is the URL parameter that states what script to run
    //   'resource' describes the run request body (with the function name
    //              to execute)
    gapi.client.scripts.run({
        'scriptId': scriptId,
        'resource': {
        'function': 'calendarUpdate',
            'parameters': 
            [
            SOR,
            labArry,
            status
            ]
        }
    }).then(function(resp) {
        var result = resp.result;
        if (result.error && result.error.status) {
        // The API encountered a problem before the script
        // started executing.
        appendPre('Error calling API:');
        appendPre(JSON.stringify(result, null, 2));
        } else if (result.error) {
        // The API executed, but the script returned an error.
        // Extract the first (and only) set of error details.
        // The values of this object are the script's 'errorMessage' and
        // 'errorType', and an array of stack trace elements.
        var error = result.error.details[0];
        appendPre('Script error message: ' + error.errorMessage);
        if (error.scriptStackTraceElements) {
            // There may not be a stacktrace if the script didn't start
            // executing.
            appendPre('Script error stacktrace:');
            for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
            var trace = error.scriptStackTraceElements[i];
            appendPre('\t' + trace.function + ':' + trace.lineNumber);
            }
        }
        } else {
        // The structure of the result will depend upon what the Apps
        // Script function returns. Here, the function returns an Apps
        // Script Object with String keys and values, and so the result
        // is treated as a JavaScript object (folderSet).
        clearTimeout(myTimeout);
        //var calendarResponse = result.response.result;
        var calendarResponse = "The Calendar Event has been updated, would you like to continue and send email notifications"
        $('#contentMain').html('');
        var r = confirm(calendarResponse);
        if (r == true){
            gapi.client.script.scripts.run({
            'scriptId': scriptId,
            'resource': {
            'function': 'emailer',
            'parameters': 
            [
            //emailSubject
            labArry
            ]
            }
            }).then(function(resp) {
            var result = resp.result;
            var emailSet = result.response.result;
            alert(emailSet);
            });
        }else {
            alert("No emails for you!");
        }
            //appendPre(sorSet);
        }
    });
    }
    
    //Called for SOR Update into Modal
    function sorUpdateFunction() {
    var scriptId = "1E6F27vZSW9_1l4x1_PgCaCGvGUPlUmSbsjQjrzwOiuITXezVlDjOtdq7";
    
    //Get SOR from HTML
    var SOR = document.getElementById("SOR").value;
    //Clear checkboxes & set pre ready for response
    //document.getElementById('content').style.display = 'none';
    $('#contentMain').html('Loading...');
    //Call timeOut function
    timeOut();
    
    // Call the Execution API run method
    //   'scriptId' is the URL parameter that states what script to run
    //   'resource' describes the run request body (with the function name
    //              to execute)
    gapi.client.script.scripts.run({
        'scriptId': scriptId,
        'resource': {
        'function': 'sorUpdate',
            'parameters': 
            [
            SOR
            ]
        }
    }).then(function(resp) {
        var result = resp.result;
        if (result.error && result.error.status) {
        // The API encountered a problem before the script
        // started executing.
        appendPre('Error calling API:');
        appendPre(JSON.stringify(result, null, 2));
        } else if (result.error) {
        // The API executed, but the script returned an error.
        // Extract the first (and only) set of error details.
        // The values of this object are the script's 'errorMessage' and
        // 'errorType', and an array of stack trace elements.
        var error = result.error.details[0];
        appendPre('Script error message: ' + error.errorMessage);
        if (error.scriptStackTraceElements) {
            // There may not be a stacktrace if the script didn't start
            // executing.
            appendPre('Script error stacktrace:');
            for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
            var trace = error.scriptStackTraceElements[i];
            appendPre('\t' + trace.function + ':' + trace.lineNumber);
            }
        }
        } else {
        // The structure of the result will depend upon what the Apps
        // Script function returns. Here, the function returns an Apps
        // Script Object with String keys and values, and so the result
        // is treated as a JavaScript object (folderSet).
        clearTimeout(myTimeout);
        var sorSet = result.response.result;
        $('#contentMain').html('');
        appendPre(sorSet);
        }
    //$('.modal-body').html(sorSet);
    $('#myModal').show()
    });
    }

    onload="this.onload=function(){};handleClientLoad()"
    onreadystatechange="if (this.readyState === 'complete') this.onload()"
