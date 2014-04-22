function parseReport() {
  var report = document.getElementById("reportInput").value;

  // Overall credits
  var regCredTotalEarned = /EARNED:? {0,2}?(\d{1,3}\.\d{2}) CREDITS/;
  var regCredInProg      = /IN-PROGRESS:? {0,2}?(\d{1,3}\.\d{2}) CREDITS/;
  var regCredNeeded      = /NEEDS:? *(\d{1,3}\.\d{2}) CREDITS/;

  // Upper division credits
  var regUpCredEarned = /\( *(\d{1,3}\.\d{2}) HOURS TAKEN *\)/; // the first one
  var regUpCredInProg = /In-Prog-> *(\d{1,3}.\d{2}) CREDITS/; // The first one

  var mainRequirements = []
  var subRequirements  = []
  mainRequirements     = report.match(/(NO  |OK  |IP  )(?!=)(.*)/g);
  subRequirements      = report.match(/(\+|\-) *\d{1,2}\)(.*)/g);

  // Credit and GPA matches
  var credTotalEarned = regCredTotalEarned.exec(report);
  var credInProg      = regCredInProg.exec(report);
  if(credInProg == null) { credInProg = ['0.00', '0.00'] }
  var upCredEarned    = regUpCredEarned.exec(report);
  var upCredInProg    = regUpCredInProg.exec(report);
  if(upCredInProg == null) { upCredInProg = ['0.00', '0.00'] }

  // Needed credits section - we have to do this because of DARS formatting
  var neededCreditArray = [];
  neededCreditArray = report.match(/NEEDS:? *(\d{1,3}\.\d{2}) CREDITS/g);
  if(neededCreditArray == null) { neededCreditArray = ['0.00', '0.00'] }
  var credNeeded    = neededCreditArray[0].match(/\d{1,3}\.\d{2}/);
  var upCredNeeded  = neededCreditArray[1].match(/\d{1,3}\.\d{2}/);

  // GPA section - we have to do this for the same reason as above
  var gpaArray = [];
  gpaArray    = report.match(/(\d\.\d{2}) GPA/g);
  var cumuGPA = gpaArray[0].match(/\d\.\d{1,2}/);
  var majGPA  = gpaArray[1].match(/\d\.\d{1,2}/);


  //  Visualize the credit column data
  document.getElementById('credTotalEarnedCell').innerHTML= '<b>' + credTotalEarned[1] + '<b>';
  document.getElementById('credTotalInProgCell').innerHTML= '<b>' + credInProg[1] + '<b>';
  document.getElementById('credTotalNeededCell').innerHTML= '<b>' + credNeeded + '<b>';
  document.getElementById('credUpEarnedCell').innerHTML= '<b>' + upCredEarned[1] + '<b>';
  document.getElementById('credUpInProgCell').innerHTML= '<b>' + upCredInProg[1] + '<b>';
  document.getElementById('credUpNeededCell').innerHTML= '<b>' + upCredNeeded + '<b>';
  document.getElementById('cumuGpaCell').innerHTML= '<b>' + cumuGPA + '<b>';
  document.getElementById('majorGpaCell').innerHTML= '<b>' + majGPA + '<b>';

  // Visualize the main requirements column
  var genReqCol = document.getElementById('genReqColumn');
  var subReqCol = document.getElementById('subReqColumn');

  mainRequirements.forEach(function(entry){
    if(entry.substring(0,2) == 'OK') {
      var rectClasses = 'dataRect alert alert-success';
    } else if(entry.substring(0,2) == 'IP') {
      var rectClasses = 'dataRect alert alert-warning';
    } else {
      var rectClasses = 'dataRect alert alert-danger';
    }
    genReqCol.insertAdjacentHTML('beforeend', '<div class="' + rectClasses + '">' + entry.substring(2) + '</div>');
  });

// Visualize the sub requirements column
   subRequirements.forEach(function(entry){
     if(entry.substring(0,1) == '+') {
       var rectClasses = 'dataRect alert alert-success';
     } else {
       var rectClasses = 'dataRect alert alert-danger';
     }
     subReqCol.insertAdjacentHTML('beforeend', '<div class="' + rectClasses + '">' + entry.substring(5) + '</div>');
   });
}
