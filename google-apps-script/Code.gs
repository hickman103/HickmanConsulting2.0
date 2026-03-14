function doOptions() {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.openById("1gGmpNIbQDApMLn1nsOuL-Oj9YFi6qLAhqmlhHXx_uq0")
      .getSheetByName("Sheet1");

    var name = e.parameter.name || "";
    var organization = e.parameter.organization || "";
    var email = e.parameter.email || "";
    var role = e.parameter.role || "";
    var interest = e.parameter.interest || "";
    var message = e.parameter.message || "";
    var pageUri = e.parameter.pageUri || "";
    var pageName = e.parameter.pageName || "";

    sheet.appendRow([
      new Date(),
      name,
      organization,
      email,
      role,
      interest,
      message,
      pageUri,
      pageName,
    ]);

    MailApp.sendEmail({
      to: "hunter.hickman@hickmanconsultingai.com",
      subject: "New Hickman Consulting inquiry",
      body:
        "A new inquiry was submitted.\n\n" +
        "Name: " + name + "\n" +
        "Organization: " + organization + "\n" +
        "Email: " + email + "\n" +
        "Role: " + role + "\n" +
        "Interest: " + interest + "\n\n" +
        "Message:\n" + message + "\n\n" +
        "Page: " + pageName + "\n" +
        "URL: " + pageUri
    });

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        ok: false,
        error: error.toString(),
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
