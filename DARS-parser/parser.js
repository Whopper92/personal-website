function getCSData() {
  var report = document.getElementById("reportInput").value;

  // Create regular expressions to parse the text
  // Overall credits
  var regCredOverall     = /(NO|OK|IP).*Student must complete a minimum of \d*/;
  var regCredTotalEarned = /EARNED:? {0,2}?(\d{1,3}\.\d{2}) CREDITS/;
  var regCredInProg      = /IN-PROGRESS:? {0,2}?(\d{1,3}\.\d{2}) CREDITS/;
  var regCredNeeded      = /NEEDS:? *(\d{1,3}\.\d{2}) CREDITS/;

  // Upper division credits
  var regUpCredEarned = /\( *(\d{1,3}\.\d{2}) HOURS TAKEN *\)/; // the first one
  var regUpCredInProg = /In-Prog-> *(\d{1,3}.\d{2}) CREDITS/; // The first one

  // PSU Residence Credit Requirements / Pass No Pass Limits
  var regResStatus  = /(NO|OK|IP) *(PSU RESIDENCE CREDIT REQUIREMENTS)/;
  var regLastCreds  = /(.) *1\) (45 of last 60 credits must be taken at PSU)/;
  var regPassNoPass = /(.) *2\) (25 of the last 45 credits must be for grade)/;

  // University writing requirements
  var regWrStatus = /(NO|OK|IP) *(Writing Requirement)/;
  var regLowerWr  = /(.) *1\) (One lower division Writing course)/;
  var regAddWr    = /(.) *2\) (Additional Writing Course)/;

  // Bachelor of Science Requirements
  var regBsStatus = /(NO|OK|IP) *(Bachelor of Science Requirements)/;

  // UNST Requirements
  var regFrInq = /(.)  7\) Complete (COMM 220 or Freshman Inquiry)/;
  var regSopInq   = /(NO|OK|IP) *UNIVERSITY STUDIES - (Sophomore Inquiry)/;
  var regJunClus  = /(NO|OK|IP) *UNIVERSITY STUDIES - (Upper Division Cluster)/;

  // Computer Science major requirements
  var regCsStatus    = /(NO|OK|IP) *(COMPUTER SCIENCE MAJOR REQUIREMENTS)/;
  var regCsSciElec   = /(.) *1\) (Science electives) complete --/;
  var regCsWr227     = /(.) *3\) (Complete WR 227)--/;
  var regCsReqMth    = /(.) *5\) Complete the following (MTH\/STAT courses) --/;
  var regCsMthElec   = /(.) *6\) Choose 7 credits of (approved MTH electives) from the/;
  var regCsReqLower  = /(.) *8\) Complete the following (required lower division)/;
  var regCsReqUpper  = /(.) *9\) Complete the following (required upper division)/;
  var regCs305       = /(.) *10\) Complete (CS 305) Social, Ethical, and Legal/;
  var regCsUpperElec = /(.) *11\) Complete 12 credits of (upper division CS electives)/;
  var regCsECE341    = /(.) *13\) Complete (ECE 341) --/;

  // Performing matches
  var credOverall     = regCredOverall.exec(report);
  var credTotalEarned = regCredTotalEarned.exec(report);
  var credInProg      = regCredInProg.exec(report);
  var upCredEarned    = regUpCredEarned.exec(report);
  var upCredInProg    = regUpCredInProg.exec(report);
  var resStatus       = regResStatus.exec(report);
  var lastCreds       = regLastCreds.exec(report);
  var passNoPass      = regPassNoPass.exec(report);
  var wrStatus        = regWrStatus.exec(report);
  var lowerWr         = regLowerWr.exec(report);
  var addWr           = regAddWr.exec(report);
  var bsStatus        = regBsStatus.exec(report);
  var frInq           = regFrInq.exec(report);
  var sopInq          = regSopInq.exec(report);
  var junClus         = regJunClus.exec(report);
  var csStatus        = regCsStatus.exec(report);
  var csSciElec       = regCsSciElec.exec(report);
  var csWr227         = regCsWr227.exec(report);
  var csReqMth        = regCsReqMth.exec(report);
  var csMthElec       = regCsMthElec.exec(report);
  var csReqLower      = regCsReqLower.exec(report);
  var csReqUpper      = regCsReqUpper.exec(report);
  var cs305           = regCs305.exec(report);
  var csUpperElec     = regCsUpperElec.exec(report);
  var csECE341        = regCsECE341.exec(report);


  // Needed credits section - we have to do this because of DARS formatting
  var neededCreditArray = [];
  neededCreditArray = report.match(/NEEDS:? *(\d{1,3}\.\d{2}) CREDITS/g);
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

  // Visualize the general education column
  var genEdCol = document.getElementById('genEdColumn');
  var genEdArray = [resStatus, lastCreds, passNoPass, wrStatus, lowerWr, addWr, bsStatus, frInq, sopInq, junClus]

  genEdArray.forEach(function(entry){
    if(entry[1] != 'OK' && entry[1] != '+') {
      var rectClasses = 'dataRect incomplete';
    } else {
      var rectClasses = 'dataRect complete';
    }

    genEdCol.insertAdjacentHTML('beforeend', '<div class="' + rectClasses + '">' + entry[2] + '</div>');
  });

  // Visualize the major requirements column
  var majorCol = document.getElementById('majorColumn');
  var majorReqArray = [csStatus, csSciElec, csWr227,csReqMth, csMthElec, csReqLower, csReqUpper, cs305, csUpperElec, csECE341];

  majorReqArray.forEach(function(entry){
    if(entry[1] != 'OK' && entry[1] != '+') {
      var rectClasses = 'dataRect incomplete';
    } else {
      var rectClasses = 'dataRect complete';
    }

    majorCol.insertAdjacentHTML('beforeend', '<div class="' + rectClasses + '">' + entry[2] + '</div>');
  });

}
