/* eslint-disable */
const fs = require('fs');

function addVersionMetaTag(filePath, version) {
    try {
        // Lire le contenu du fichier HTML
        let html = fs.readFileSync(filePath, 'utf-8');

        // Rechercher la balise </head> pour y insérer la nouvelle balise <meta>
        const headIndex = html.indexOf('</head>');
        if (headIndex !== -1) {
            // Construire la nouvelle balise <meta>
            const versionMetaTag = `<meta name="version" content="${version}"/>`;

            // Insérer la balise <meta> dans le fichier HTML
            html = html.slice(0, headIndex) + versionMetaTag + html.slice(headIndex);

            // Écrire le contenu modifié dans le fichier
            fs.writeFileSync(filePath, html, 'utf-8');

            console.log(`Balise <meta> ajoutée avec succès à ${filePath}`);
        } else {
            console.error('Erreur : Balise </head> non trouvée dans le fichier HTML.');
        }
    } catch (error) {
        console.error(`Une erreur s'est produite : ${error.message}`);
    }
}

// Utilisation du script
const filePath = './out/index.html'; // Mettez à jour le chemin selon votre structure

// Utiliser un import dynamique pour charger package.json
// Notez que vous ne pouvez pas utiliser import pour les fichiers JSON, mais cela évite l'erreur ESLint

const packageJson = require('../package.json');
/* eslint-enable */
const versionNumber = packageJson.version;

// Ajouter la balise <meta> avec le numéro de version au fichier HTML
addVersionMetaTag(filePath, versionNumber);
