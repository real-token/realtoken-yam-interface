/* eslint-disable */
const fs = require('fs');

// Lire le contenu du fichier HTML
const filePath = './out/index.html';
let htmlContent = fs.readFileSync(filePath, 'utf-8');

// Ajouter la balise meta au contenu HTML
const newMetaTag = '<meta http-equiv="Cache-Control" content="no-store, must-revalidate">';
const modifiedHtmlContent = htmlContent.replace('</head>', `${newMetaTag}\n</head>`);

// Écrire le contenu modifié dans le fichier HTML
fs.writeFileSync(filePath, modifiedHtmlContent, 'utf-8');

console.log('La balise meta a été ajoutée avec succès.');
