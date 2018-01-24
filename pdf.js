var PDFDocument, doc;
var fs = require('fs');
PDFDocument = require('pdfkit');
var dateFormat = require('dateFormat');
var codedate = require("./configs/dates");
var myDate = new Date();


var madate = dateFormat(myDate, "dd/mm/yyyy");
var jour = madate.substring(0, 2);
var annee = madate.substring(6, 10);
var mois = madate.substring(3, 5);
var date = "18/12/17";
var demandeur = "YAYA toure";
var titre ="Commissaire de Police Principal ";
var grade = "Chef de la Division Régionale de la Police Judiciaire du centre";
var numero = "662442204";

generateLettre(jour, annee, mois, demandeur, titre, date, numero, grade);

generateLettreInfructueux(jour, annee, mois, demandeur, titre, date, numero, grade);



function generateLettre(jour, annee, mois, demandeur, titre, date, numero, grade){

   doc = new PDFDocument;
   doc.pipe(fs.createWriteStream('pdfresult/' +numero +'_lettre' + '.pdf'));
   // PDF Creation logic goes here
   // Set a title and pass the X and Y coordinates
   
   doc.image('image/logo.png', 50, 30, {width: 200, height: 100});

   doc.font('Times-Roman').text('Douala le ' +  jour + ' '+ codedate[mois] + ' ' +annee , 400, 150);
   // Set the paragraph width and align direction
   /*doc.text('Wally Gator is a swinging alligator in the swamp. He\'s the greatest percolator when he really starts to romp. There has never been a greater operator in the swamp. See ya later, Wally Gator.', {
       width: 200,
       align: 'center'
   });*/
   doc.moveDown()
   
   doc.text('N°______C/VIETTEL/DG/DGA/DAJ/KTFS', 50, 200);
   doc.moveDown()
   doc.text('A MONSIEUR '+ demandeur, 360, 230);
   doc.moveDown()
   doc.text(titre, 350, 260);
   doc.text(grade, 330, 280);
   doc.moveDown()
   /* doc.text('Régionale de la Police Judiciaire du centre', 270, 280);
   doc.moveDown()*/
   doc.font('Times-Roman').fontSize(15).text('REF :', 50, 320,{
      underline: true,
   });
   doc.font('Times-Roman').fontSize(13).text('Votre réquisition du ' + date, 93, 320);
   doc.moveDown()    
   doc.font('Times-Roman').fontSize(15).text('Objet :', 50, 340,{
      underline: true,
   }); 
   doc.font('Times-Roman').fontSize(13).text('informations complémentaires ', 93, 340); 
   doc.moveDown()
   doc.font('Times-Roman').fontSize(13).text('Monsieur,', 100, 390);
   doc.moveDown()
   doc.font('Times-Roman').fontSize(13).text('.    Faisant Suite à votre réquisition par procès-verbal ci-dessus référencé relatif à l\'onjet repris en marge nous venons vous communiquer en annexe les différentes informations fournies par notre Département Technique au sujet des numéros ' + numero + '.', 50, 430,{
      align: 'justify'
   });
   doc.moveDown()
   doc.font('Times-Roman').fontSize(13).text('.    Tout en vous souhaitant bonne réception, recevez Monsieur le ' + titre + ' nos salutations distinguées.', 50, 490,{
      align: 'justify'
   });
   doc.moveDown()
   doc.font('Times-Roman', 'bold').text('LE DIRECTEUR GENERAL ADJOINT', 280, 570, {
      underline: true,
   });

   doc.image('image/pied-page.png', 20, 730, {width: 569, height: 40});
   doc.end();
}



function generateLettreInfructueux(jour, annee, mois, demandeur, titre, date, numero){

   doc = new PDFDocument;
   doc.pipe(fs.createWriteStream('pdfresult/' +numero +'_lettreInfructueuse' + '.pdf'));
   // PDF Creation logic goes here
   // Set a title and pass the X and Y coordinates
   
   doc.image('image/logo.png', 50, 30, {width: 200, height: 100});

   doc.font('Times-Roman').text('Douala le ' +  jour + ' '+ codedate[mois] + ' ' +annee , 400, 150);
   // Set the paragraph width and align direction
   /*doc.text('Wally Gator is a swinging alligator in the swamp. He\'s the greatest percolator when he really starts to romp. There has never been a greater operator in the swamp. See ya later, Wally Gator.', {
       width: 200,
       align: 'center'
   });*/
   doc.moveDown()
   
   doc.text('N°______C/VIETTEL/DG/DGA/DAJ/KTFS', 50, 200);
   doc.moveDown()
   doc.text('A MONSIEUR '+ demandeur, 360, 230);
   doc.moveDown()
   doc.text(titre, 350, 260);
   doc.text(grade, 330, 280);
   doc.moveDown()
   /* doc.text('Régionale de la Police Judiciaire du centre', 270, 280);
   doc.moveDown()*/
   doc.font('Times-Roman').fontSize(15).text('REF :', 50, 320,{
      underline: true,
   });
   doc.font('Times-Roman').fontSize(13).text('Votre réquisition du ' + date, 93, 320);
   doc.moveDown()    
   doc.font('Times-Roman').fontSize(15).text('Objet :', 50, 340,{
      underline: true,
   }); 
   doc.font('Times-Roman').fontSize(13).text('informations complémentaires ', 93, 340); 
   doc.moveDown()
   doc.font('Times-Roman').fontSize(13).text('Monsieur,', 100, 390);
   doc.moveTo(60,430)
   doc.font('Times-Roman').fontSize(13).text('.    Faisant Suite à votre réquisition par procès-verbal ci-dessus référencé relatif à l\'onjet repris en marge nous venons vous communiquer en annexe les différentes informations fournies par notre Département Technique .', 50, 430,{
      align: 'justify'
   });
   doc.moveDown()
   doc.font('Times-Roman').fontSize(13).text('.    En effet, la recherche sur le numéro de téléphone correspondant à l\'imei ' + numero +' s\'est avérée infructueuse. Aucune informations y relative ne figurant dans notre base de données, Nous ne pouvons par conséquent donner une suite favorable à votre requête .', 50, 490,{
      align: 'justify'
   });
   doc.moveDown()
   doc.font('Times-Roman').fontSize(13).text('.    Tout en vous souhaitant bonne réception, recevez Monsieur le ' + titre + ' nos salutations distinguées.', 50, 550,{
      align: 'justify'
   });
   doc.moveDown()
   doc.font('Times-Roman', 'bold').text('LE DIRECTEUR GENERAL ADJOINT', 280, 590, {
      underline: true,
   });

   doc.image('image/pied-page.png', 20, 730, {width: 569, height: 40});
   doc.end();
}



var array = [2,5,9,8];

console.log(array.length);

var zo = array[0];
array.splice(0,1);

console.log(array.length);

console.log(zo);