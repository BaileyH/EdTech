// code from Learn Google Spreadsheets - https://www.youtube.com/watch?v=548dD3iXetg
function onEdit(e) {
  var row = e.range.getRow();
  var col = e.range.getColumn();
  var sheet = e.source.getActiveSheet();
  
  if(col === 6 && sheet.getSheetId() === 0) {
    sheet.getRange(row,7).setValue(new Date());
  }
}

// code by Bailey Hulsey (some from Google Apps Script Documentation)
function changePermissions() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = sheet.getRange('A:Z');
  
  for (var i = 1; i < data.getNumRows(); i++) { 
    var range = data.offset(i, 0, 1, 26); // only gives edit rights for cols A-Z
    var name = range.getValues()[0][0];
    var email = range.getValues()[0][3]; 
    var protection = range.protect().setDescription(name);
    
    // Maintains current user as editor
    var me = Session.getEffectiveUser();
    protection.addEditor(me);
    protection.removeEditors(protection.getEditors());
    if (protection.canDomainEdit()) {
      protection.setDomainEdit(false);
    }
    
    // Adds user whose email is in column D
    protection.addEditor(email);
    ss.addEditor(email);
  }
}
