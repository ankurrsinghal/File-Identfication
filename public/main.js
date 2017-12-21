$(function() {
  const SOURCE_URL = "/info/";
  
  var form1 = $("#myForm1");
  var form2 = $("#myForm2");
  var input1 = $("#fileInput1");
  var input2 = $("#fileInput2");
  var result1 = $("#result1");
  var result2 = $("#result2");
  var time1 = $("#time1");
  var time2 = $("#time2");
  
  var currentTime;
  
  form1.submit(function(e){
    e.preventDefault();
    evaluateForm(1, form1, input1, result1, time1);
  });
  
  form2.submit(function(e){
    e.preventDefault();
    evaluateForm(2, form2, input2, result2, time2);
  });
  
  function evaluateForm(method, form, input, result, time) {
      var fileName = input.val().trim();
      
      if (!fileName) {
        return;
      }
      
      var regex = /\.[a-zA-Z]+/;
      
      if (regex.test(fileName)) {
        fileName = fileName.substring(1);
      }
      
      result.html('Loading...');
      time.html('');
      currentTime = new Date().getTime();
      getInfo(method, fileName, result, time);
      
      input.val('');
  }
  
  
  
  
  function getInfo(method, fileName, result, time) {
    if (!fileName) {
      return;
    }
    
    var xhr = $.get(SOURCE_URL + method + "/" + fileName, function(data) {
      var elapsedTime = Math.round((new Date().getTime() - currentTime) / 1000);
      result.html(data.type);
      
      var secondsString = elapsedTime == 1 ? "second" : "seconds";
      
      time.html("Time Elapsed: " + elapsedTime + " " + secondsString);
    })
  }
  
});