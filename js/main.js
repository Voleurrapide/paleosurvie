// =============================================================================
// 1. CONFIGURATION DU SYSTÈME & DIRECTIVES D'URGENCE
// =============================================================================
const TOTAL_ESPECES_ARCHIVES = 75;
const NOMBRE_SPECIMENS_INITIALS = 24;
const HEURE_DEBUT_JOUR = 7, HEURE_FIN_JOUR = 19;
const STATUT_JOUR = 0, STATUT_NUIT = 1;
const INTERVALLE_HORLOGE_MS = 50;

const MESSAGES_STATUT = [
    "Liaison active (Signal nominal)",
    "Mode furtif nocturne (Bande étroite)"
];

const TRANSMISSIONS_URGENCE = [
    "Directive 01 : Mise à jour du front alpin. Les meutes de loups géants et les Smilodons ont franchi les Alpes et le Rhin. Le sud et le centre de l'Europe sont classés «Zones Perdues». Barricadez-vous dans des structures en béton armé au-dessus du troisième étage.",
    "Directive 02 : Alerte hivernale continentale. Ne comptez pas sur le froid pour ralentir la menace. L'hiver européen attire la mégafaune glaciaire. Évitez à tout prix les plaines enneigées : les rhinocéros laineux y ont établi leurs zones de pâturage. Bien qu'ils soient herbivores et ne chassent pas pour se nourrir, ils sont extrêmement territoriaux et chargeront aveuglément toute personne entrant dans leur périmètre.",
    "Directive 03 : Danger urbain et souterrain. Interdiction de pénétrer dans les anciens réseaux métropolitains ou les ruines denses. L'ampleur des expériences illégales des laboratoires Wara et Z-territoire n'a pas encore été totalement découverte. De nombreuses chimères non documentées y ont trouvé refuge. Nous ignorons encore la nature, le comportement et les capacités de toutes les créations secrètes qui ont été relâchées.",
    "Directive 04 : Protocoles d'interaction hybride. Adaptez votre survie aux chimères dont nous avons la preuve : fuyez les ruines pour éviter l'embuscade du Croc-lynx, éloignez-vous des berges chassées par le Molosse des mangroves, et cachez-vous des attaques en piqué de la Harpie-varan ou de la charge du Rhinocéros-frelon. Seule exception : le Hibou-chat des neiges. Inoffensif et calme, il tolérera votre présence si vous ne l'attaquez pas et régulera les rongeurs autour de vos abris."
];

// =============================================================================
// 2. FONCTIONS UTILITAIRES & SATELLITE (CACHE DOM HORLOGE)
// =============================================================================
const pad2 = (v) => (v < 10 ? "0" + v : "" + v);
const pad3 = (ms) => (ms < 10 ? "00" + ms : ms < 100 ? "0" + ms : "" + ms);

/**
 * Met à jour le texte de l'horloge satellite avec l'heure courante (format HH:MM:SS.mmm).
 * @param {HTMLElement} el - Élément DOM affichant l'horloge.
 * @returns {void}
 */
function actualiserHorlogeSatellite(el) {
    if (!el) return;
    const d = new Date();
    el.textContent = `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}.${pad3(d.getMilliseconds())}`;
}

/**
 * Calcule l'heure de référence pour le cycle jour/nuit (URL param ou heure réelle).
 * @returns {number} Heure entière comprise entre 0 et 23.
 */
function obtenirHeureReference() {
    const p = new URLSearchParams(window.location.search);
    if (p.has("heure")) {
        const h = parseInt(p.get("heure"), 10);
        if (!isNaN(h) && h >= 0 && h <= 23) return h;
    }
    return new Date().getHours();
}

const determinerCycleReseau = (h) => (h >= HEURE_DEBUT_JOUR && h < HEURE_FIN_JOUR ? STATUT_JOUR : STATUT_NUIT);
const calculerRatioEspeces = (actuel, total) => `${pad2(actuel)}/${total}`;

/**
 * Initialise l'ensemble des fonctionnalités dynamiques de la page d'accueil (index.html).
 * @returns {void}
 */
function initialiserPageAccueil() {
    const elHorloge = document.getElementById("horloge-satellite");
    if (elHorloge) {
        actualiserHorlogeSatellite(elHorloge);
        setInterval(() => actualiserHorlogeSatellite(elHorloge), INTERVALLE_HORLOGE_MS);
    }
    const elTrans = document.getElementById("transmission-texte");
    if (elTrans) elTrans.textContent = TRANSMISSIONS_URGENCE[Math.floor(Math.random() * TRANSMISSIONS_URGENCE.length)];
    const elStatut = document.getElementById("sync-satellite");
    if (elStatut) elStatut.textContent = MESSAGES_STATUT[determinerCycleReseau(obtenirHeureReference())];
    const elCompteur = document.getElementById("compteur-especes");
    if (elCompteur) elCompteur.textContent = calculerRatioEspeces(NOMBRE_SPECIMENS_INITIALS, TOTAL_ESPECES_ARCHIVES);
}

// =============================================================================
// 3. CATALOGUES DU SURVIVANT & INVENTAIRE
// =============================================================================
const PRENOMS_SURVIVANTS = [
    "Elias", "Sofia", "Matteo", "Yasmine", "Luca", "Elena",
    "Tariq", "Camille", "Kostas", "Giulia", "Amir", "Chloé",
    "Nikos", "Layla", "Enzo", "Daphné"
];
const PROFILS_PREDEFINIS = [
    {
        image: "images/IA/02_wasteland_doctor.webp",
        sexe: "Féminin",
        occPre: "Infirmière aux urgences",
        occPost: "Médecin de fortune",
        taille: 165, poids: 58
    },
    {
        image: "images/IA/03_militia_leader.webp",
        sexe: "Masculin",
        occPre: "Policier municipal",
        occPost: "Chef de milice",
        taille: 182, poids: 88
    },
    {
        image: "images/IA/04_military_deserter.webp",
        sexe: "Masculin",
        occPre: "Militaire",
        occPost: "Militaire déserteur",
        taille: 178, poids: 82
    },
    {
        image: "images/IA/05_boy_refugee.webp",
        sexe: "Masculin",
        occPre: "Étudiant",
        occPost: "Réfugié de la zone zéro",
        taille: 155, poids: 45
    },
    {
        image: "images/IA/06_cartographer.webp",
        sexe: "Masculin",
        occPre: "Développeur web",
        occPost: "Cartographe des zones mortes",
        taille: 175, poids: 72
    },
    {
        image: "images/IA/07_underground_cultivator.webp",
        sexe: "Féminin",
        occPre: "Chercheuse en biologie",
        occPost: "Cultivateur souterrain",
        taille: 168, poids: 62
    },
    {
        image: "images/IA/08_scrap_engineer.webp",
        sexe: "Féminin",
        occPre: "Mécanicienne automobile",
        occPost: "Ingénieur de fortune",
        taille: 170, poids: 65
    },
    {
        image: "images/IA/09_ration_smuggler.webp",
        sexe: "Masculin",
        occPre: "Livreur à vélo",
        occPost: "Pilleur de laboratoires",
        taille: 173, poids: 68
    },
    {
        image: "images/IA/10_mercenary_bodyguard.webp",
        sexe: "Masculin",
        occPre: "Gardien de sécurité",
        occPost: "Garde du corps mercenaire",
        taille: 190, poids: 105
    },
    {
        image: "images/IA/12_sniper.webp",
        sexe: "Féminin",
        occPre: "Étudiante en MMI",
        occPost: "Sniper de couverture",
        taille: 172, poids: 60
    }
];
const OBJETS_INVENTAIRE = [
    { nom: "Pistolet 9mm rouillé", categorie: "arme", image: "images/IA/inventaire/pistolet-9mm.webp" },
    { nom: "Fusil à pompe improvisé", categorie: "arme", image: "images/IA/inventaire/fusil-pompe.webp" },
    { nom: "Machette dentelée", categorie: "arme", image: "images/IA/inventaire/machette.webp" },
    { nom: "Couteau tactique", categorie: "arme", image: "images/IA/inventaire/couteau-tactique.webp" },
    { nom: "Arbalète artisanale", categorie: "arme", image: "images/IA/inventaire/arbalete.webp" },
    { nom: "Munitions (humides)", categorie: "arme", image: "images/IA/inventaire/munitions.webp" },
    { nom: "Grenade à impulsion", categorie: "arme", image: "images/IA/inventaire/grenade.webp" },
    { nom: "Lance-fusées", categorie: "arme", image: "images/IA/inventaire/lance-fusees.webp" },
    { nom: "Ration périmée", categorie: "aliment", image: "images/IA/inventaire/ration.webp" },
    { nom: "Barre protéinée", categorie: "aliment", image: "images/IA/inventaire/barre-proteinee.webp" },
    { nom: "Viande séchée", categorie: "aliment", image: "images/IA/inventaire/viande-sechee.webp" },
    { nom: "Boîte sans étiquette", categorie: "aliment", image: "images/IA/inventaire/boite-conserve.webp" },
    { nom: "Gourde purifiée", categorie: "aliment", image: "images/IA/inventaire/gourde.webp" },
    { nom: "Eau trouble", categorie: "aliment", image: "images/IA/inventaire/eau-trouble.webp" },
    { nom: "Alcool de contrebande", categorie: "aliment", image: "images/IA/inventaire/alcool.webp" },
    { nom: "Baies", categorie: "aliment", image: "images/IA/inventaire/baies.webp" },
    { nom: "Poudre Wara", categorie: "aliment", image: "images/IA/inventaire/poudre-wara.webp" },
    { nom: "Filtre usagé", categorie: "aliment", image: "images/IA/inventaire/filtre-usage.webp" },
    { nom: "Carte froissée", categorie: "document", image: "images/IA/inventaire/carte-froissee.webp" },
    { nom: "Badge Wara", categorie: "document", image: "images/IA/inventaire/badge-wara.webp" },
    { nom: "Journal taché", categorie: "document", image: "images/IA/inventaire/journal-tache.webp" },
    { nom: "Manuel militaire", categorie: "document", image: "images/IA/inventaire/manuel-militaire.webp" },
    { nom: "Codes de sécurité", categorie: "document", image: "images/IA/inventaire/codes-securite.webp" },
    { nom: "Photo délavée", categorie: "document", image: "images/IA/inventaire/photo-delavee.webp" },
    { nom: "Rapport d'autopsie", categorie: "document", image: "images/IA/inventaire/rapport-autopsie.webp" },
    { nom: "Tract d'alerte", categorie: "document", image: "images/IA/inventaire/tract-alerte.webp" },
    { nom: "Plan de Milan", categorie: "document", image: "images/IA/inventaire/plan-milan.webp" },
    { nom: "Note griffonnée", categorie: "document", image: "images/IA/inventaire/note-griffonnee.webp" },
    { nom: "Trousse incomplète", categorie: "soin", image: "images/IA/inventaire/trousse-soins.webp" },
    { nom: "Antibiotiques", categorie: "soin", image: "images/IA/inventaire/antibiotiques.webp" },
    { nom: "Bandages sales", categorie: "soin", image: "images/IA/inventaire/bandages.webp" },
    { nom: "Seringue d'adrénaline", categorie: "soin", image: "images/IA/inventaire/seringue.webp" },
    { nom: "Comprimés de purification", categorie: "soin", image: "images/IA/inventaire/comprimes.webp" },
    { nom: "Pommade", categorie: "soin", image: "images/IA/inventaire/pommade.webp" },
    { nom: "Savon", categorie: "soin", image: "images/IA/inventaire/savon.webp" },
    { nom: "Brosse à dents", categorie: "soin", image: "images/IA/inventaire/brosse-dents.webp" },
    { nom: "Masque à gaz", categorie: "soin", image: "images/IA/inventaire/masque-gaz.webp" },
    { nom: "Antidouleurs", categorie: "soin", image: "images/IA/inventaire/antidouleurs.webp" }
];

const REPUTATIONS = ["Confirmé", "Neutre", "Suspect"];
const tirerAuHasard = (arr) => arr[Math.floor(Math.random() * arr.length)];
const entierAleatoire = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Calcule la couleur HSL d'une jauge selon son pourcentage de remplissage ou de qualité.
 * @param {number} q - Valeur de qualité (0 à 100).
 * @returns {string} Chaîne HSL représentative.
 */
function obtenirCouleurBarre(q) {
    const val = Math.max(0, Math.min(100, q));
    let hue;
    if (val <= 20) hue = (280 + (val / 20) * 80) % 360;
    else if (val <= 40) hue = ((val - 20) / 20) * 30;
    else if (val <= 60) hue = 30 + ((val - 40) / 20) * 25;
    else if (val <= 80) hue = 55 + ((val - 60) / 20) * 40;
    else hue = 95 + ((val - 80) / 20) * 40;
    const l = val > 80 ? Math.round(44 - ((val - 80) / 20) * 16) : 48;
    return `hsl(${Math.round(hue)}, 85%, ${l}%)`;
}

const qualiteTempsReveille = (h) => (h <= 8 ? 100 : Math.max(0, Math.round(((24 - h) / 16) * 100)));

/**
 * Sélectionne aléatoirement un ensemble d'objets uniques dans le catalogue d'inventaire.
 * @param {number} min - Quantité minimale d'objets distincts.
 * @param {number} max - Quantité maximale d'objets distincts.
 * @returns {Array<Object>} Liste des objets tirés au sort.
 */
function tirerInventaireAleatoire(min, max) {
    const pool = OBJETS_INVENTAIRE.slice();
    for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, entierAleatoire(min, max)).map(o => ({
        nom: o.nom, categorie: o.categorie, image: o.image, quantite: entierAleatoire(1, 5)
    }));
}

/**
 * Injecte les données textuelles et l'avatar du survivant dans les éléments de profil.
 * @param {Object} p - Données du profil complet du survivant.
 * @returns {void}
 */
function afficherProfil(p) {
    const map = {
        "profil-prenom": p.prenom, "profil-sexe": p.sexe, "profil-taille": p.taille + " cm",
        "profil-poids": p.poids + " kg", "profil-occ-post": p.occPost, "profil-occ-pre": p.occPre,
        "profil-reputation": p.reputation, "profil-refuge": p.refuge, "profil-groupe": p.groupe
    };
    Object.entries(map).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    });
    const elAv = document.getElementById("avatar-survivant");
    if (elAv) { elAv.src = p.image; elAv.alt = "Avatar de " + p.prenom; }
}

/**
 * Met à jour les jauges de vie, faim, hydratation et sommeil du survivant.
 * @param {Object} b - Données des barres d'état (pv, faim, hydratation, sommeil).
 * @returns {void}
 */
function afficherBarresEtat(b) {
    [
        ["barre-pv", "val-pv", b.pv, "%", b.pv],
        ["barre-faim", "val-faim", b.faim, "%", b.faim],
        ["barre-hydratation", "val-hydratation", b.hydratation, "%", b.hydratation],
        ["barre-sommeil", "val-sommeil", Math.round((b.sommeil / 24) * 100), "h", qualiteTempsReveille(b.sommeil), b.sommeil]
    ].forEach(([bId, vId, largeur, suff, qualite, affichage]) => {
        const elB = document.getElementById(bId), elV = document.getElementById(vId);
        if (elB) { elB.style.width = largeur + "%"; elB.style.backgroundColor = obtenirCouleurBarre(qualite); }
        if (elV) elV.textContent = (affichage !== undefined ? affichage : largeur) + suff;
    });
}

/**
 * Crée un élément de carte d'inventaire sécurisé sans innerHTML (conforme TD3).
 * @param {Object} obj - Objet d'inventaire (nom, categorie, image, quantite).
 * @returns {HTMLElement} Élément div de la carte avec ses composants DOM.
 */
function creerCarteInventaire(obj) {
    const carte = document.createElement("div");
    carte.className = "inv-carte";
    carte.setAttribute("data-categorie", obj.categorie);

    const img = document.createElement("img");
    img.className = "inv-carte-img";
    img.src = obj.image;
    img.alt = obj.nom;
    img.width = 64;
    img.height = 64;

    const nom = document.createElement("span");
    nom.className = "inv-carte-nom";
    nom.textContent = obj.quantite > 1 ? obj.nom + " ×" + obj.quantite : obj.nom;

    const cat = document.createElement("span");
    cat.className = "inv-carte-categorie";
    cat.textContent = obj.categorie;

    carte.appendChild(img);
    carte.appendChild(nom);
    carte.appendChild(cat);
    return carte;
}

/**
 * Affiche l'inventaire complet du survivant dans la grille DOM.
 * @param {Array<Object>} inv - Liste des objets d'inventaire.
 * @returns {void}
 */
function afficherInventaire(inv) {
    const grille = document.getElementById("grille-inventaire");
    if (!grille) return;
    const frag = document.createDocumentFragment();
    inv.forEach(obj => {
        frag.appendChild(creerCarteInventaire(obj));
    });
    grille.replaceChildren(frag);
}

/**
 * Configure les écouteurs d'événements pour le filtrage par catégorie de l'inventaire.
 * @returns {void}
 */
function initialiserFiltres() {
    const btns = document.querySelectorAll(".filtre-btn");
    btns.forEach(btn => {
        btn.addEventListener("click", function () {
            const f = this.getAttribute("data-filtre");
            btns.forEach(b => b.classList.remove("filtre-actif"));
            this.classList.add("filtre-actif");
            document.querySelectorAll(".inv-carte").forEach(c => {
                c.style.display = (f === "tout" || c.getAttribute("data-categorie") === f) ? "" : "none";
            });
        });
    });
}

/**
 * Génère un profil de survivant complet avec identité, statistiques et inventaire aléatoires.
 * @returns {Object} Objet profil consolidé.
 */
function genererProfilComplet() {
    const base = tirerAuHasard(PROFILS_PREDEFINIS);
    return {
        prenom: tirerAuHasard(PRENOMS_SURVIVANTS), sexe: base.sexe, taille: base.taille, poids: base.poids,
        occPre: base.occPre, occPost: base.occPost, image: base.image, reputation: tirerAuHasard(REPUTATIONS),
        refuge: tirerAuHasard(["Oui", "Non", "Parfois"]), groupe: tirerAuHasard(["Oui", "Non"]),
        barres: { pv: entierAleatoire(10, 100), faim: entierAleatoire(5, 100), hydratation: entierAleatoire(30, 100), sommeil: entierAleatoire(1, 24) },
        inventaire: tirerInventaireAleatoire(8, 16)
    };
}

/**
 * Initialise la page profil.html (chargement localStorage, affichage et bouton de réinitialisation).
 * @returns {void}
 */
function initialiserProfil() {
    if (!document.getElementById("avatar-survivant")) return;
    const cle = "paleosurvie-profil-v3";
    let donnees = null;
    const sauvg = localStorage.getItem(cle);
    if (sauvg) {
        try {
            const p = JSON.parse(sauvg);
            if (p && p.taille !== undefined && p.inventaire && p.barres) donnees = p;
        } catch (e) { }
    }
    if (!donnees) {
        donnees = genererProfilComplet();
        localStorage.setItem(cle, JSON.stringify(donnees));
    }
    afficherProfil(donnees);
    afficherBarresEtat(donnees.barres);
    afficherInventaire(donnees.inventaire);
    initialiserFiltres();

    const btnNouveau = document.getElementById("btn-nouveau-survivant");
    if (btnNouveau) {
        btnNouveau.addEventListener("click", () => {
            localStorage.removeItem(cle);
            window.location.reload();
        });
    }
}

// =============================================================================
// 4. CONTRÔLEUR AUDIO D'AMBIANCE & MODALE D'IMMERSION
// =============================================================================
/**
 * Configure le lecteur audio d'ambiance et la bannière d'immersion sonore.
 * @returns {void}
 */
function initialiserAudio() {
    const elAudio = document.getElementById("audio-ambiance");
    const btnAudio = document.getElementById("btn-audio");
    const txtAudio = document.getElementById("btn-audio-texte");
    const banImmersion = document.getElementById("banniere-immersion");

    if (!elAudio || !btnAudio) return;
    elAudio.loop = true;

    function actualiser(actif) {
        btnAudio.classList.toggle("audio-actif", actif);
        if (txtAudio) txtAudio.textContent = actif ? "Audio : ON" : "Audio : OFF";
        btnAudio.setAttribute("aria-pressed", String(actif));
    }

    function basculer() {
        if (elAudio.paused) {
            elAudio.play().then(() => actualiser(true)).catch(() => actualiser(false));
        } else {
            elAudio.pause();
            actualiser(false);
        }
    }

    elAudio.addEventListener("play", () => actualiser(true));
    elAudio.addEventListener("pause", () => actualiser(false));
    btnAudio.addEventListener("click", basculer);

    if (banImmersion) {
        const fermer = (avecAudio) => {
            banImmersion.classList.add("est-fermee");
            if (avecAudio) elAudio.play().then(() => actualiser(true)).catch(() => { });
        };
        const btnActiver = document.getElementById("btn-activer-immersion");
        const btnIgnorer = document.getElementById("btn-ignorer-immersion");
        if (btnActiver) btnActiver.addEventListener("click", (e) => { e.stopPropagation(); fermer(true); });
        if (btnIgnorer) btnIgnorer.addEventListener("click", (e) => { e.stopPropagation(); fermer(false); });
        banImmersion.addEventListener("click", (e) => { if (e.target === banImmersion) fermer(true); });
    }
}

// =============================================================================
// 5. ENCYCLOPÉDIE : DONNÉES (37 CRÉATURES), DÉLÉGATION & MODALE
// =============================================================================
const donneesCreatures = [
    {
        id: "creature-01", categorie: "reanimees", titre: "Smilodon", image: "images/IA/animeaux/A01_smilodon.webp", danger: "Critique",
        adn: "94 % (complété avec de l'ADN de tigre de Sibérie)", direction: "Nord-Ouest (Pont vers l'Italie, zones urbaines en ruines)", comportement: "Prédateur solitaire d'embuscade, très territorial et actif surtout au crépuscule.", attaques: "47 cas confirmés (majoritairement dans le sud de l'Italie)",
        nom: "Smilodon (Smilodon fatalis)", alimentation: "Carnivore (grands mammifères, survivants isolés)", apparition: "~ 2,5 millions d'années av. J.-C.", disparition: "~ 10 000 av. J.-C.",
        reanimation: "2054 (Laboratoire Z-territoire)", conseils: "Ne jamais courir, car cela déclenche son instinct de poursuite. Se déplacer en groupe, utiliser du feu ou des fusées éclairantes pour le repousser et toujours surveiller les toits dans les ruines."
    },
    {
        id: "creature-02", categorie: "reanimees", titre: "Mammouth laineux", image: "images/IA/animeaux/A02_mammouth-laineux.webp", danger: "Élevé (Dégâts structurels)",
        adn: "98 % (ADN intact issu de carcasses congelées de Sibérie)", direction: "Nord-Est (Pont vers la Grèce, zones montagneuses)", comportement: "Grégaire et pacifique s'il n'est pas provoqué, mais dévastateur lors de ses déplacements en troupeau.", attaques: "12 incidents (écrasements accidentels et destruction de barricades)",
        nom: "Mammouth laineux (Mammuthus primigenius)", alimentation: "Herbivore (herbes, arbustes, écorces)", apparition: "~ 400 000 ans av. J.-C.", disparition: "~ 2 500 av. J.-C. (île Wrangel)",
        reanimation: "2052 (Projet initial L'Arche du Passé)", conseils: "Garder une distance minimale de 100 mètres. Éviter les bruits de moteur qui peuvent les effrayer et provoquer une charge. Ne pas s'abriter dans des bâtiments fragiles sur leur trajectoire."
    },
    {
        id: "creature-03", categorie: "reanimees", titre: "Loup sinistre", image: "images/IA/animeaux/A03_loup-sinistre.webp", danger: "Élevé",
        adn: "96 % (complété avec de l'ADN de loup gris)", direction: "Est (Pont vers le Liban et côtes grecques)", comportement: "Chasse en meutes coordonnées de 5 à 10 individus. Très endurant, traque ses proies sur de longues distances.", attaques: "63 cas confirmés (embuscades sur les routes secondaires)",
        nom: "Loup sinistre (Canis dirus)", alimentation: "Carnivore et charognard", apparition: "~ 250 000 ans av. J.-C.", disparition: "~ 10 000 av. J.-C.",
        reanimation: "2055 (Laboratoire Z-territoire)", conseils: "Éviter de voyager seul la nuit et camoufler toute odeur de sang ou de nourriture. En cas d'encerclement, grimper sur un point en hauteur (toit, véhicule) et utiliser des bruits stridents."
    },
    {
        id: "creature-04", categorie: "reanimees", titre: "Rhinocéros laineux", image: "images/IA/animeaux/A04_rhinoceros-laineux.webp", danger: "Élevé",
        adn: "91 % (complété avec de l'ADN de rhinocéros de Sumatra)", direction: "Nord-Ouest (Plaines côtières d'Italie)", comportement: "Solitaire, vue très faible mais odorat développé. Extrêmement irritable, charge tout mouvement brusque.", attaques: "19 cas confirmés (charges contre des convois de réfugiés)",
        nom: "Rhinocéros laineux (Coelodonta antiquitatis)", alimentation: "Herbivore (graminées, plantes basses)", apparition: "~ 350 000 ans av. J.-C.", disparition: "~ 13 000 av. J.-C.",
        reanimation: "2056 (Laboratoire Wara)", conseils: "Rester immobile et silencieux s'il est loin. S'il charge, faire un écart brusque au dernier moment derrière un obstacle solide (mur en béton, gros arbre), car sa masse l'empêche de tourner rapidement."
    },
    {
        id: "creature-05", categorie: "reanimees", titre: "Mégalanie", image: "images/IA/animeaux/A05_megalanie.webp", danger: "Critique",
        adn: "89 % (complété avec de l'ADN de dragon de Komodo)", direction: "Est (Zones côtières chaudes du Liban et îles grecques)", comportement: "Reptile lent sur la durée mais capable de pointes de vitesse fulgurantes. Se cache dans les décombres chauffés par le soleil.", attaques: "28 cas confirmés (taux de mortalité élevé par infection)",
        nom: "Mégalanie (Varanus priscus)", alimentation: "Carnivore (proies vivantes et charognes)", apparition: "~ 1,5 million d'années av. J.-C.", disparition: "~ 40 000 av. J.-C.",
        reanimation: "2058 (Laboratoire Wara)", conseils: "Se déplacer de préférence la nuit ou par temps frais, lorsqu'il est moins actif. Ne jamais s'approcher d'un spécimen qui semble dormir au soleil. En cas de morsure, désinfecter immédiatement et prendre des antibiotiques lourds."
    },
    {
        id: "creature-06", categorie: "reanimees", titre: "Ours à face courte", image: "images/IA/animeaux/A06_ours-a-face-courte.webp", danger: "Critique",
        adn: "93 % (complété avec de l'ADN d'ours à lunettes)", direction: "Nord-Est (Montagnes de Grèce et tunnels routiers)", comportement: "Solitaire, extrêmement agressif et dominant. S'approprie les grottes, les parkings souterrains et les tunnels comme tanières.", attaques: "34 cas confirmés (principalement dans des zones souterraines)",
        nom: "Ours à face courte (Arctodus simus)", alimentation: "Carnivore et charognard (vole souvent les proies d'autres prédateurs)", apparition: "~ 800 000 ans av. J.-C.", disparition: "~ 11 000 av. J.-C.",
        reanimation: "2055 (Laboratoire Z-territoire)", conseils: "Ne jamais entrer dans un tunnel ou un abri souterrain sans vérifier la présence d'odeurs fortes ou de griffures. En cas de rencontre, reculer lentement sans lui tourner le dos ; les armes légères sont inefficaces contre sa masse."
    },
    {
        id: "creature-07", categorie: "reanimees", titre: "Lion des cavernes", image: "images/IA/animeaux/A07_lion-des-cavernes.webp", danger: "Critique",
        adn: "95 % (complété avec de l'ADN de lion d'Afrique)", direction: "Nord-Ouest (Pont vers l'Italie et plaines côtières)", comportement: "Chasseur crépusculaire très rapide, se déplaçant seul ou en petits groupes de 2 à 3 individus. Rôde souvent près des accès aux ponts.", attaques: "51 cas confirmés (embuscades sur des groupes de survivants)",
        nom: "Lion des cavernes (Panthera spelaea)", alimentation: "Carnivore (grands herbivores, humains)", apparition: "~ 370 000 ans av. J.-C.", disparition: "~ 13 000 av. J.-C.",
        reanimation: "2053 (Projet initial L'Arche du Passé)", conseils: "Éviter les zones découvertes à l'aube et au crépuscule. Maintenir des feux de camp actifs la nuit et poster une sentinelle en hauteur. Ne jamais s'isoler du groupe."
    },
    {
        id: "creature-08", categorie: "reanimees", titre: "Thylacoleo", image: "images/IA/animeaux/A08_thylacoleo.webp", danger: "Élevé",
        adn: "88 % (complété avec de l'ADN de wombat et de diable de Tasmanie)", direction: "Est (Zones urbaines denses du Liban et forêts côtières)", comportement: "Grimpeur agile et silencieux. Attaque par surprise en sautant depuis les arbres ou les étages supérieurs des immeubles en ruine.", attaques: "29 cas confirmés (attaques verticales en milieu urbain)",
        nom: "Thylacoleo (Thylacoleo carnifex)", alimentation: "Carnivore (mâchoire tranchante capable de sectionner les os)", apparition: "~ 1,6 million d'années av. J.-C.", disparition: "~ 46 000 av. J.-C.",
        reanimation: "2059 (Laboratoire Wara)", conseils: "Toujours inspecter les balcons, les toits et les branches basses avant de traverser une rue en ruine. Porter une protection au niveau de la nuque et des épaules."
    },
    {
        id: "creature-09", categorie: "reanimees", titre: "Megatherium", image: "images/IA/animeaux/A09_megatherium.webp", danger: "Modéré (Mortel si provoqué)",
        adn: "92 % (complété avec de l'ADN de paresseux didactyle)", direction: "Nord-Est (Vallées boisées de Grèce)", comportement: "Lent et généralement pacifique. Se dresse sur ses pattes arrière pour atteindre la végétation haute ou pour intimider un adversaire.", attaques: "7 cas confirmés (uniquement en légitime défense)",
        nom: "Megatherium (Megatherium americanum)", alimentation: "Herbivore (feuilles, branches, racines)", apparition: "~ 4 millions d'années av. J.-C.", disparition: "~ 8 000 av. J.-C.",
        reanimation: "2057 (Laboratoire Wara)", conseils: "Le contourner calmement en gardant une distance de sécurité d'au moins 30 mètres. Ne jamais l'acculer dans une impasse : un seul coup de ses griffes géantes peut éventrer un véhicule blindé léger."
    },
    {
        id: "creature-10", categorie: "reanimees", titre: "Oiseau-éléphant", image: "images/IA/animeaux/A10_oiseau-elephant.webp", danger: "Modéré",
        adn: "90 % (complété avec de l'ADN de kiwi et d'autruche)", direction: "Est (Côtes sablonneuses et zones rurales du Liban)", comportement: "Oiseau coureur massif, curieux mais farouchement protecteur envers ses œufs. Peut atteindre une vitesse de course surprenante sur terrain plat.", attaques: "14 cas confirmés (fractures graves causées par des coups de patte)",
        nom: "Oiseau-éléphant (Aepyornis maximus)", alimentation: "Herbivore et frugivore (fruits, graines, feuillages)", apparition: "~ 1 million d'années av. J.-C.", disparition: "~ 1000 ap. J.-C. (Madagascar)",
        reanimation: "2056 (Projet initial L'Arche du Passé)", conseils: "Ne jamais s'approcher d'un nid ni tenter de voler un œuf malgré sa valeur nutritive. S'il vous poursuit, chercher refuge dans un bâtiment étroit ou une zone rocheuse escarpée."
    },
    {
        id: "creature-11", categorie: "reanimees", titre: "Cerf géant", image: "images/IA/animeaux/A11_cerf-geant.webp", danger: "Modéré (Élevé en période de rut)",
        adn: "95 % (complété avec de l'ADN de daim européen)", direction: "Nord-Est (Forêts et plaines de Grèce)", comportement: "Herbivore très rapide et nerveux. Ses bois immenses (jusqu'à 3,5 mètres d'envergure) deviennent une arme redoutable lorsqu'il se sent menacé ou en période de reproduction.", attaques: "9 cas confirmés (charges défensives et paniques de troupeaux)",
        nom: "Cerf géant (Megaloceros giganteus)", alimentation: "Herbivore (herbes, jeunes pousses, feuilles)", apparition: "~ 400 000 ans av. J.-C.", disparition: "~ 5 700 av. J.-C. (Sibérie occidentale)",
        reanimation: "2054 (Projet initial L'Arche du Passé)", conseils: "Rester hors de sa ligne de vue et éviter tout geste brusque. Si un mâle gratte le sol avec ses sabots, s'abriter immédiatement dans un bâtiment ou une zone dense en obstacles où ses bois l'empêcheront d'entrer."
    },
    {
        id: "creature-12", categorie: "reanimees", titre: "Thylacine", image: "images/IA/animeaux/A12_thylacine.webp", danger: "Faible à modéré",
        adn: "97 % (ADN préservé issu de spécimens de musées)", direction: "Nord-Ouest (Périphéries urbaines d'Italie)", comportement: "Nocturne, discret et opportuniste. Évite généralement l'affrontement direct avec les humains, mais rôde autour des campements pour voler de la nourriture.", attaques: "6 cas confirmés (morsures défensives lorsqu'il est surpris dans un abri)",
        nom: "Thylacine (Thylacinus cynocephalus)", alimentation: "Carnivore et charognard (petits mammifères, restes)", apparition: "~ 4 millions d'années av. J.-C.", disparition: "1936 (Tasmanie)",
        reanimation: "2051 (Premier succès majeur de Z-territoire)", conseils: "Suspendre ou enfermer hermétiquement les rations alimentaires la nuit. En cas de rencontre, faire du bruit ou projeter une lumière vive suffit généralement à le faire fuir."
    },
    {
        id: "creature-13", categorie: "reanimees", titre: "Glyptodonte", image: "images/IA/animeaux/A13_glyptodonte.webp", danger: "Modéré (Dégâts matériels importants)",
        adn: "91 % (complété avec de l'ADN de tatou géant)", direction: "Est (Zones rocailleuses du Liban)", comportement: "Lent, placide et presque insensible aux attaques grâce à sa carapace osseuse. Utilise sa queue massive en forme de massue pour repousser les prédateurs ou défoncer des obstacles.", attaques: "11 incidents (destructions de barricades et blessures par coup de queue)",
        nom: "Glyptodonte (Glyptodon)", alimentation: "Herbivore (graminées, racines, plantes basses)", apparition: "~ 3 millions d'années av. J.-C.", disparition: "~ 10 000 av. J.-C.",
        reanimation: "2057 (Laboratoire Wara)", conseils: "Ne jamais gaspiller de munitions légères sur sa carapace. Le contourner lentement en évitant de passer derrière lui, dans le rayon d'action de sa queue."
    },
    {
        id: "creature-14", categorie: "reanimees", titre: "Aurochs", image: "images/IA/animeaux/A14_aurochs.webp", danger: "Élevé",
        adn: "99 % (ADN quasi intact issu de vestiges européens)", direction: "Nord-Ouest (Plaines agricoles abandonnées d'Italie)", comportement: "Grégaire, imprévisible et beaucoup plus agressif que les bovins domestiques. Défend férocement son territoire et ses petits en chargeant en groupe.", attaques: "23 cas confirmés (charges sur des groupes de récupérateurs)",
        nom: "Aurochs (Bos primigenius)", alimentation: "Herbivore (herbes, feuillages, écorces)", apparition: "~ 2 millions d'années av. J.-C.", disparition: "1627 (Pologne)",
        reanimation: "2052 (Projet initial L'Arche du Passé)", conseils: "Contourner largement tout troupeau repéré. Ne jamais s'interposer entre une femelle et son veau. En cas de charge, grimper sur un mur, un toit ou un véhicule lourd."
    },
    {
        id: "creature-15", categorie: "reanimees", titre: "Aigle de Haast", image: "images/IA/animeaux/A15_aigle-de-haast.webp", danger: "Critique (En zone dégagée)",
        adn: "92 % (complété avec de l'ADN d'aigle nain d'Australie)", direction: "Nord-Est et Nord-Ouest (Falaises côtières de Grèce et ponts vers l'Italie)", comportement: "Prédateur aérien solitaire et silencieux. Repère ses proies à très haute altitude avant de plonger en piqué à plus de 80 km/h.", attaques: "31 cas confirmés (attaques mortelles sur des survivants isolés sur les ponts)",
        nom: "Aigle de Haast (Hieraaetus moorei)", alimentation: "Carnivore (grands oiseaux, mammifères moyens, humains isolés)", apparition: "~ 1,8 million d'années av. J.-C.", disparition: "~ 1400 ap. J.-C. (Nouvelle-Zélande)",
        reanimation: "2058 (Laboratoire Z-territoire)", conseils: "Éviter de traverser des zones totalement dégagées en plein jour. Se déplacer sous des couverts (arbres, arcades, véhicules) et surveiller régulièrement le ciel et les ombres au sol."
    },
    {
        id: "creature-16", categorie: "reanimees", titre: "Rhinocéros blanc du Nord", image: "images/IA/animeaux/A16_rhinoceros-blanc-du-nord.webp", danger: "Élevé (Dégâts matériels)",
        adn: "100 % (Clonage à partir d'échantillons cryogénisés)", direction: "Est (Plaines côtières du Liban)", comportement: "Généralement calme et grégaire, mais imprévisible lorsqu'il est stressé par le bruit ou la présence de prédateurs.", attaques: "8 incidents (charges défensives contre des véhicules)",
        nom: "Rhinocéros blanc du Nord (Ceratotherium simum cottoni)", alimentation: "Herbivore (herbes rases)", apparition: "~ 7 millions d'années av. J.-C.", disparition: "Fonctionnellement éteint à l'état sauvage (2018)",
        reanimation: "2051 (Programme de préservation initial)", conseils: "Rester à distance et ne pas bloquer sa trajectoire. Ne pas utiliser de klaxon ou de sirène à proximité."
    },
    {
        id: "creature-17", categorie: "reanimees", titre: "Rhinocéros noir de l'Ouest", image: "images/IA/animeaux/A17_rhinoceros-noir-de-l-ouest.webp", danger: "Très élevé",
        adn: "98 % (Complété avec de l'ADN de rhinocéros noir de l'Est)", direction: "Nord-Ouest (Zones broussailleuses d'Italie)", comportement: "Solitaire, nerveux et beaucoup plus agressif que le rhinocéros blanc. Charge presque systématiquement toute odeur ou silhouette inconnue.", attaques: "24 cas confirmés (charges frontales sans avertissement)",
        nom: "Rhinocéros noir de l'Ouest (Diceros bicornis longipes)", alimentation: "Herbivore (arbustes, branches, feuilles)", apparition: "~ 5 millions d'années av. J.-C.", disparition: "2011 (Déclaré officiellement éteint)",
        reanimation: "2053 (Laboratoire Wara)", conseils: "Se placer face au vent pour qu'il ne détecte pas votre odeur. En cas de charge, grimper immédiatement sur un obstacle élevé ou se réfugier derrière un mur en béton armé."
    },
    {
        id: "creature-18", categorie: "reanimees", titre: "Lion", image: "images/IA/animeaux/A18_lion.webp", danger: "Critique",
        adn: "100 % (Souche africaine clonée et renforcée)", direction: "Est et Nord-Est (Zones sèches de Grèce et du Liban)", comportement: "Chasse en troupeau organisé, surtout la nuit. Les individus échappés du parc ont perdu toute crainte de l'homme.", attaques: "41 cas confirmés (attaques nocturnes sur des campements)",
        nom: "Lion (Panthera leo)", alimentation: "Carnivore (mammifères moyens et grands, humains)", apparition: "~ 1 million d'années av. J.-C.", disparition: "2040 (Extinction définitive à l'état sauvage)",
        reanimation: "2060 (Programme de réanimation Z-territoire)", conseils: "Ne jamais dormir à la belle étoile sans feu ni tour de garde. Face à un lion, rester debout, faire du bruit et reculer lentement en groupe."
    },
    {
        id: "creature-19", categorie: "reanimees", titre: "Panthère nébuleuse", image: "images/IA/animeaux/A19_panthere-nebuleuse.webp", danger: "Élevé",
        adn: "100 % (Clonage de conservation)", direction: "Nord-Est (Forêts denses et ruines végétalisées de Grèce)", comportement: "Félin arboricole extrêmement agile et discret. Possède les plus longues canines proportionnellement à sa taille chez les félins modernes.", attaques: "15 cas confirmés (embuscades depuis les arbres)",
        nom: "Panthère nébuleuse (Neofelis nebulosa)", alimentation: "Carnivore (petits et moyens mammifères, oiseaux)", apparition: "~ 6 millions d'années av. J.-C.", disparition: "Espèce menacée (quasi éteinte à l'état sauvage en 2045)",
        reanimation: "2054 (Laboratoire Z-territoire)", conseils: "Surveiller les branches hautes en zone boisée et éviter de se déplacer seul au crépuscule. Une lampe torche puissante braquée dans ses yeux suffit souvent à interrompre son attaque."
    },
    {
        id: "creature-20", categorie: "reanimees", titre: "Pangolin de Temminck", image: "images/IA/animeaux/A20_pangolin-de-temminck.webp", danger: "Faible",
        adn: "100 % (Clonage de conservation)", direction: "Est (Zones sablonneuses et ruines sèches du Liban)", comportement: "Nocturne, timide et inoffensif. S'enroule en boule blindée au moindre danger. Ses écailles tranchantes peuvent toutefois couper si on tente de le manipuler.", attaques: "2 cas confirmés (coupures superficielles lors de captures)",
        nom: "Pangolin de Temminck (Smutsia temminckii)", alimentation: "Insectivore (fourmis, termites)", apparition: "~ 10 millions d'années av. J.-C.", disparition: "En danger critique (braconnage massif avant 2049)",
        reanimation: "2052 (Laboratoire Wara)", conseils: "Le laisser tranquille. Il ne représente aucune menace et aide à contrôler les colonies d'insectes autour des abris."
    },
    {
        id: "creature-21", categorie: "reanimees", titre: "Dodo", image: "images/IA/animeaux/A21_dodo.webp", danger: "Nul",
        adn: "93 % (Complété avec de l'ADN de pigeon de Nicobar)", direction: "Nord-Est (Petites îles et côtes calmes de Grèce)", comportement: "Oiseau incapable de voler, curieux, lent et totalement dépourvu de méfiance envers les humains et les prédateurs.", attaques: "0 cas",
        nom: "Dodo (Raphus cucullatus)", alimentation: "Frugivore et granivore (fruits, graines, racines)", apparition: "~ 4 millions d'années av. J.-C.", disparition: "2040 (Disparition complète des clones résiduels)",
        reanimation: "2060 (Réanimation génétique stabilisée)", conseils: "Aucun danger. Sa présence indique généralement une zone temporairement dépourvue de grands prédateurs terrestres."
    },
    {
        id: "creature-22", categorie: "reanimees", titre: "Oiseau-terreur", image: "images/IA/animeaux/A22_oiseau-terreur.webp", danger: "Critique",
        adn: "87 % (Complété avec de l'ADN de cariama huppé)", direction: "Est (Plaines ouvertes et routes désertiques du Liban)", comportement: "Prédateur coureur géant (jusqu'à 2,5 m de haut), capable de courir à plus de 50 km/h. Utilise son bec crochu massif comme une hache pour assommer ses proies.", attaques: "36 cas confirmés (poursuites sur routes dégagées)",
        nom: "Oiseau-terreur (Phorusrhacos longissimus)", alimentation: "Carnivore (mammifères moyens, survivants isolés)", apparition: "~ 20 millions d'années av. J.-C.", disparition: "~ 13 millions d'années av. J.-C. (Amérique du Sud)",
        reanimation: "2059 (Laboratoire Wara)", conseils: "Ne jamais tenter de le distancer à la course sur terrain plat. Chercher immédiatement un bâtiment fermé ou un terrain accidenté et encombré de débris où il perd son avantage de vitesse."
    },
    {
        id: "creature-23", categorie: "reanimees", titre: "Diable de Tasmanie", image: "images/IA/animeaux/A23_diable-de-tasmanie.webp", danger: "Modéré",
        adn: "100 % (Souche saine clonée sans tumeur faciale)", direction: "Nord-Ouest (Décharges et ruines périphériques d'Italie)", comportement: "Nocturne, très bruyant (cris stridents) et extrêmement agressif lorsqu'il défend une carcasse. Possède l'une des morsures les plus puissantes proportionnellement à sa taille.", attaques: "18 cas confirmés (morsures aux chevilles et aux mains)",
        nom: "Diable de Tasmanie (Sarcophilus harrisii)", alimentation: "Carnivore et charognard (broie même les os)", apparition: "~ 2 millions d'années av. J.-C.", disparition: "En danger (sauvé de l'extinction par le clonage)",
        reanimation: "2053 (Projet L'Arche du Passé)", conseils: "Porter des bottes renforcées dans les zones sombres et ne jamais tenter de lui retirer une source de nourriture. Ses cris nocturnes peuvent indiquer la présence d'une carcasse à proximité."
    },
    {
        id: "creature-24", categorie: "reanimees", titre: "Mégalodon", image: "images/IA/animeaux/A23_megalodon.webp", danger: "Extrême (En haute mer et eaux profondes)",
        adn: "84 % (Complété avec de l'ADN de grand requin blanc et de requin mako)", direction: "Mer Méditerranée (Autour de l'île centrale et détroits profonds)", comportement: "Super-prédateur marin de plus de 15 mètres. Patrouille les eaux profondes autour de l'île et attaque les embarcations de fortune qu'il confond avec des cétacés.", attaques: "11 incidents (naufrages de bateaux de réfugiés)",
        nom: "Mégalodon (Otodus megalodon)", alimentation: "Carnivore (grands mammifères marins, poissons géants)", apparition: "~ 23 millions d'années av. J.-C.", disparition: "~ 3,6 millions d'années av. J.-C.",
        reanimation: "2060 (Bassin océanique confiné de Z-territoire)", conseils: "Éviter toute traversée maritime en petite embarcation entre l'île et les côtes. Privilégier les ponts terrestres ou rester dans les eaux très peu profondes près du rivage."
    },
    {
        id: "creature-25", categorie: "reanimees", titre: "Vache de mer de Steller", image: "images/IA/animeaux/A24_vache-de-mer-de-steller.webp", danger: "Faible (Risque de collision en mer)",
        adn: "95 % (Complété avec de l'ADN de dugong)", direction: "Côtes peu profondes (Littoraux calmes de Grèce et d'Italie)", comportement: "Mammifère marin herbivore gigantesque (jusqu'à 8 mètres), lent et totalement pacifique. Se déplace en petits groupes près de la surface pour brouter les algues.", attaques: "0 attaque volontaire (3 chavirements accidentels de barques)",
        nom: "Vache de mer de Steller (Hydrodamalis gigas)", alimentation: "Herbivore marin (algues, varech)", apparition: "~ 2 millions d'années av. J.-C.", disparition: "1768 (Mer de Béring)",
        reanimation: "2055 (Projet L'Arche du Passé)", conseils: "Garder une distance de sécurité avec les embarcations légères pour éviter les collisions involontaires. Sa présence dans une baie indique généralement l'absence immédiate du Mégalodon."
    },
    {
        id: "creature-26", categorie: "chimeres", titre: "Croc-lynx des ruines", image: "images/IA/animeaux/B01_croc-lynx-des-ruines.webp", danger: "Élevé",
        adn: "45 % Crocodile / 40 % Lynx / 15 % Guêpe maçonne (Hybride artificiel)", direction: "Nord-Ouest (Zones urbaines effondrées d'Italie)", comportement: "Territorial et adepte de l'embuscade. Attaque dès qu'un humain pénètre dans son rayon de nidification. Très rapide sur de courtes distances.", attaques: "38 cas confirmés (morsures profondes et piqûres urticantes)",
        nom: "Croc-lynx des ruines (Crocodylus lynxus)", alimentation: "Carnivore (rongeurs géants, petits mammifères, survivants isolés)", apparition: "2062 (Création en laboratoire)", disparition: "Aucune (Espèce active)",
        reanimation: "2062 (Projet clandestin Z-territoire)", conseils: "Éviter les bruits métalliques et ne pas transporter de nourriture mal emballée dans les ruines. Si vous repérez des nids de boue séchée contre les murs, quittez immédiatement la zone."
    },
    {
        id: "creature-27", categorie: "chimeres", titre: "Harpie-varan", image: "images/IA/animeaux/B02_harpie-varan.webp", danger: "Moyen à élevé",
        adn: "40 % Vautour / 35 % Varan / 25 % Chauve-souris (Hybride artificiel)", direction: "Nord-Est (Falaises et immeubles hauts de Grèce)", comportement: "Défend son aire de nidification en attaquant en piqué et en groupe. Peut traquer une cible sur plusieurs centaines de mètres.", attaques: "27 cas confirmés (griffures multiples et infections bactériennes)",
        nom: "Harpie-varan (Varanus harpia)", alimentation: "Carnivore et charognard", apparition: "2063 (Création en laboratoire)", disparition: "Aucune (Espèce active)",
        reanimation: "2063 (Laboratoire Wara)", conseils: "Masquer tout objet métallique ou miroir pouvant créer des reflets lumineux. Éviter de crier dans les zones élevées et se réfugier sous un toit solide en cas de repérage."
    },
    {
        id: "creature-28", categorie: "chimeres", titre: "Molosse des mangroves", image: "images/IA/animeaux/B03_molosse-des-mangroves.webp", danger: "Très élevé (En milieu aquatique)",
        adn: "45 % Chien sauvage / 35 % Requin-bouledogue / 20 % Anguille électrique (Hybride artificiel)", direction: "Est et Nord-Est (Ports inondés de Grèce et côtes du Liban)", comportement: "Prédateur opportuniste chassant en meute dans les eaux troubles et sur les berges. Capable d'étourdir ses proies avec de légères décharges électriques.", attaques: "42 cas confirmés (majoritairement près des quais submergés)",
        nom: "Molosse des mangroves (Canis carcharhinus)", alimentation: "Carnivore (poissons, mammifères côtiers, humains)", apparition: "2064 (Création en laboratoire)", disparition: "Aucune (Espèce active)",
        reanimation: "2064 (Laboratoire Z-territoire)", conseils: "Ne jamais entrer dans une eau trouble, surtout avec une plaie ouverte. Éviter les éclaboussures et les mouvements lents près des berges ; privilégier les déplacements en hauteur."
    },
    {
        id: "creature-29", categorie: "chimeres", titre: "Rhinocéros-frelon", image: "images/IA/animeaux/B04_rhinoceros-frelon.webp", danger: "Très élevé",
        adn: "50 % Rhinocéros / 30 % Tatou / 20 % Frelon géant (Hybride artificiel)", direction: "Nord-Ouest (Axes routiers et ponts vers l'Italie)", comportement: "Défend agressivement des couloirs de passage précis par des charges frontales. Sa cuirasse abrite un essaim défensif qu'il libère lorsqu'il est menacé.", attaques: "16 cas confirmés (destructions de véhicules et piqûres massives)",
        nom: "Rhinocéros-frelon (Ceratotherium vespa)", alimentation: "Herbivore et insectivore", apparition: "2065 (Création en laboratoire)", disparition: "Aucune (Espèce active)",
        reanimation: "2065 (Laboratoire Wara)", conseils: "Couper les moteurs à son approche et éviter les parfums ou odeurs chimiques fortes. Ne jamais faire de mouvements brusques et utiliser de la fumée épaisse pour disperser l'essaim."
    },
    {
        id: "creature-30", categorie: "chimeres", titre: "Hibou-chat des neiges", image: "images/IA/animeaux/B05_hibou-chat-des-neiges.webp", danger: "Faible",
        adn: "45 % Harfang des neiges / 40 % Chat sauvage / 15 % Raie manta (Hybride artificiel)", direction: "Nord-Est (Zones montagneuses et ruines calmes de Grèce)", comportement: "Silencieux, calme et planeur. Très territorial vis-à-vis de son nid, mais tolérant envers les humains s'ils restent calmes. Utile car il régule les populations de rongeurs.", attaques: "3 cas confirmés (griffures légères lors de tentatives de capture)",
        nom: "Hibou-chat des neiges (Bubo felix)", alimentation: "Carnivore (rongeurs, petits reptiles, insectes)", apparition: "2061 (Expérience de stabilisation génétique)", disparition: "Aucune (Espèce active)",
        reanimation: "2061 (Projet conjoint Z-territoire / Wara)", conseils: "Ne pas tenter de le capturer ni de s'approcher de son nid. Sa présence près d'un campement est généralement un bon signe : il éloigne les nuisibles et alerte en silence en cas d'approche d'un gros prédateur."
    },
    {
        id: "creature-31", categorie: "chimeres", titre: "Le Titan Wara", image: "images/IA/animeaux/B06_le-titan-wara.webp", danger: "Élevé (Dégâts structurels)",
        adn: "40 % Glyptodonte / 35 % Rhinocéros laineux / 25 % Pangolin de Temminck (Hybride artificiel)", direction: "Est (Ponts et tunnels reliant l'île au Liban)", comportement: "Aveugle, nerveux et massif. Recouvert d'écailles de kératine ultra-denses et de laine thermorégulatrice. S'effraie facilement et déclenche des ruées capables d'effondrer des infrastructures.", attaques: "14 incidents (effondrements de tunnels et de sections de ponts)",
        nom: "Le Titan Wara (Glyptoceros wara)", alimentation: "Herbivore (végétation dense, racines)", apparition: "2063 (Création en laboratoire)", disparition: "Aucune (Espèce active)",
        reanimation: "2063 (Laboratoire bolivien Wara)", conseils: "Éviter toute vibration forte, explosion ou lumière soudaine à proximité. Ne jamais rester dans un tunnel ou sur un pont fragilisé si vous entendez ses pas lourds."
    },
    {
        id: "creature-32", categorie: "chimeres", titre: "Le Léviathan de l'Égée", image: "images/IA/animeaux/B07_le-leviathan-de-l-egee.webp", danger: "Critique (En zones inondées)",
        adn: "55 % Anguille européenne / 45 % Poisson-guitare (+ Gigantisme induit)", direction: "Nord-Est (Côtes inondées et ports de Grèce)", comportement: "Muté par l'énergie statique du volcan inactif de l'île. Mesure plus de 6 mètres, se cache sous les décombres submergés et émet des décharges bioélectriques mortelles.", attaques: "33 cas confirmés (électrocutions fatales dans les zones côtières)",
        nom: "Le Léviathan de l'Égée (Electrophorus quimericus)", alimentation: "Carnivore (poissons, grands mammifères aquatiques, humains)", apparition: "2065 (Mutation accidentelle en bassin de refroidissement)", disparition: "Aucune (Espèce active)",
        reanimation: "2065 (Installation centrale de l'île)", conseils: "Éteindre tout appareil électronique ou batterie près de l'eau, car les champs électromagnétiques l'attirent. Ne jamais marcher dans l'eau stagnante des zones portuaires inondées."
    },
    {
        id: "creature-33", categorie: "chimeres", titre: "Essaim de Haast", image: "images/IA/animeaux/B08_essaim-de-haast.webp", danger: "Modéré à mortel (En groupe)",
        adn: "50 % Aigle de Haast / 50 % Faucon sacre (+ Modification de comportement de meute)", direction: "Nord-Ouest (Ponts exposés vers l'Italie)", comportement: "Chassent de manière coordonnée par groupes de 3 à 5 individus. Combinent la puissance de l'aigle de Haast et la vitesse en piqué du faucon sacre.", attaques: "45 cas confirmés (embuscades aériennes sur les convois traversant les ponts)",
        nom: "Essaim de Haast (Harpagornis sacre)", alimentation: "Carnivore (proies en zone dégagée)", apparition: "2064 (Création en laboratoire)", disparition: "Aucune (Espèce active)",
        reanimation: "2064 (Laboratoire Z-territoire)", conseils: "Ne jamais traverser les ponts à découvert en plein jour. Se déplacer sous des véhicules, des bâches épaisses ou de nuit, et utiliser des fumigènes pour brouiller leur vision."
    },
    {
        id: "creature-34", categorie: "chimeres", titre: "Ombre de Z-Territoire", image: "images/IA/animeaux/B09_ombre-de-z-territoire.webp", danger: "Extrême",
        adn: "45 % Smilodon / 35 % Panthère nébuleuse / 20 % Gibbon cao-vit (Hybride artificiel)", direction: "Nord-Ouest (Centres urbains en ruines d'Italie)", comportement: "Prototype d'infiltration furtif. Se camoufle parfaitement dans le béton et la fumée, et bondit d'immeuble en immeuble avec une agilité de primate.", attaques: "52 cas confirmés (attaques silencieuses nocturnes)",
        nom: "Ombre de Z-Territoire (Smilodon nebulosus)", alimentation: "Carnivore (prédateur apex urbain)", apparition: "2066 (Programme militaire clandestin)", disparition: "Aucune (Espèce active)",
        reanimation: "2066 (Laboratoire Z-territoire)", conseils: "Éviter absolument les déplacements nocturnes dans les zones urbaines denses. Utiliser des détecteurs de mouvement ou des fils-pièges sonores autour des refuges."
    },
    {
        id: "creature-35", categorie: "chimeres", titre: "Vipère-Tarentule des tunnels", image: "images/IA/animeaux/B10_vipere-tarentule-des-tunnels.webp", danger: "Élevé (En espaces clos)",
        adn: "55 % Vipère fer-de-lance / 45 % Tarentule arc-en-ciel indienne (Hybride artificiel)", direction: "Est et Nord-Est (Métros, caves et bunkers de Grèce et du Liban)", comportement: "Se déplace silencieusement sur les murs et les plafonds dans l'obscurité totale. Repère ses proies à la chaleur corporelle et injecte un venin paralysant.", attaques: "21 cas confirmés (morsures dans des abris souterrains)",
        nom: "Vipère-Tarentule des tunnels (Bothrops poecilotheria)", alimentation: "Carnivore (rongeurs, petits animaux, humains endormis)", apparition: "2064 (Création en laboratoire)", disparition: "Aucune (Espèce active)",
        reanimation: "2064 (Laboratoire Wara)", conseils: "Toujours éclairer les plafonds et les coins sombres avant d'entrer dans un sous-sol. Dormir sous une moustiquaire épaisse ou dans un sac fermé hermétiquement."
    },
    {
        id: "creature-36", categorie: "chimeres", titre: "Colosse des ruines", image: "images/IA/animeaux/B11_colosse-des-ruines.webp", danger: "Extrême",
        adn: "50 % Gigantopithèque / 50 % Ours des cavernes (Hybride artificiel)", direction: "Nord-Est (Zones industrielles et montagnes de Grèce)", comportement: "Force brute colossale, capable d'arracher des portes métalliques et de détruire les barricades des refuges. Très territorial autour de ses zones de repos.", attaques: "18 cas confirmés (destructions totales de campements fortifiés)",
        nom: "Colosse des ruines (Gigantursus spelaeus)", alimentation: "Omnivore (végétation, carcasses, grandes proies)", apparition: "2065 (Création en laboratoire)", disparition: "Aucune (Espèce active)",
        reanimation: "2065 (Projet conjoint Z-territoire / Wara)", conseils: "Éviter tout bruit constant de générateur ou de machinerie dans sa zone. Ne jamais tenter de l'affronter de face : fuir par des passages étroits où sa carrure ne peut pas passer."
    },
    {
        id: "creature-37", categorie: "chimeres", titre: "Chacal d'os", image: "images/IA/animeaux/B12_chacal-d-os.webp", danger: "Élevé",
        adn: "50 % Loup sinistre / 50 % Hyène tachetée des cavernes (Hybride artificiel)", direction: "Est (Routes désertiques et côtières du Liban)", comportement: "Mâchoire capable de broyer les os et le métal léger. Chasse en meute et traque les groupes de survivants sur des kilomètres en attendant leur épuisement.", attaques: "49 cas confirmés (attaques nocturnes sur des groupes affaiblis)",
        nom: "Chacal d'os (Canis crocuta)", alimentation: "Carnivore et charognard (ne laisse aucun reste)", apparition: "2063 (Création en laboratoire)", disparition: "Aucune (Espèce active)",
        reanimation: "2063 (Laboratoire Z-territoire)", conseils: "Soigner et bander immédiatement toute plaie ouverte pour masquer l'odeur du sang. Éviter les feux de camp visibles de loin la nuit et ne jamais abandonner un blessé derrière le groupe."
    },
    {
        id: "creature-38", categorie: "chimeres", titre: "Loup-Chimère Ailé", image: "images/IA/animeaux/B13_chimere-loup-aile.webp", danger: "Critique",
        adn: "40 % Loup sinistre / 35 % Aigle de Haast / 25 % Mégalanie (Hybridation apex aérienne)", direction: "Nord-Ouest (Cols alpins, viaducs et grues industrielles en haute altitude)", comportement: "Prédateur aérien d'une intelligence redoutable. Perche silencieusement sur les structures métalliques abandonnées pour repérer les convois à plus de 5 km. Plonge en piqué à plus de 180 km/h, combinant la morsure destructrice du loup aux serres broyeuses de rapace géant.", attaques: "34 cas confirmés (attaques verticales foudroyantes sur convois et toitures)",
        nom: "Loup-Chimère Ailé (Canis harpia)", alimentation: "Carnivore strict (bétail, grands mammifères, survivants isolés)", apparition: "2066 (Complexe de biotechnologie Z-territoire)", disparition: "Aucune (Espèce active et dominante sur les cimes)",
        reanimation: "2066 (Projet d'interception haute altitude Z-territoire)", conseils: "Ne jamais s'exposer sur des toits, ponts ou terrasses dégagées. En cas d'ombre portée ou de battement d'ailes lourd, s'abriter immédiatement sous une structure en béton armé. Les projecteurs stroboscopiques et fumigènes perturbent son ciblage aérien."
    },
];

/**
 * Détermine la classe CSS de badge associée à un libellé textuel de danger.
 * @param {string} d - Libellé de danger (ex: Critique, Élevé, Moyen, Faible).
 * @returns {string} Nom de classe CSS.
 */
function obtenirClasseDanger(d) {
    const t = (d || "").toLowerCase();
    if (t.includes("critique") || t.includes("extrême") || t.includes("extreme")) return "danger-critique";
    if (t.includes("élevé") || t.includes("eleve") || t.includes("mortel")) return "danger-eleve";
    if (t.includes("faible") || t.includes("nul")) return "danger-faible";
    return "danger-moyen";
}

/**
 * Construit un élément de carte créature sécurisé sans innerHTML (conforme TD3).
 * @param {Object} c - Données de la créature (id, titre, nom, image, danger).
 * @returns {HTMLElement} Élément article représentant la carte dans la grille.
 */
function creerCarteCreature(c) {
    const art = document.createElement("article");
    art.className = "carte-creature";
    art.setAttribute("data-id", c.id);
    art.setAttribute("tabindex", "0");
    art.setAttribute("role", "button");
    art.setAttribute("aria-haspopup", "dialog");
    art.setAttribute("aria-label", "Consulter : " + c.titre);

    const fig = document.createElement("figure");
    fig.className = "carte-creature-figure";

    const img = document.createElement("img");
    img.src = c.image;
    img.alt = c.titre;
    img.className = "carte-creature-img";
    img.loading = "lazy";
    img.width = 300;
    img.height = 210;

    const badge = document.createElement("span");
    badge.className = "carte-creature-badge " + obtenirClasseDanger(c.danger);
    badge.textContent = c.danger;

    const figcap = document.createElement("figcaption");
    figcap.className = "carte-creature-caption";

    const h3 = document.createElement("h3");
    h3.className = "carte-creature-titre";
    h3.textContent = c.titre;

    const p = document.createElement("p");
    p.className = "carte-creature-nom-sci";
    p.textContent = c.nom;

    figcap.appendChild(h3);
    figcap.appendChild(p);

    fig.appendChild(img);
    fig.appendChild(badge);
    fig.appendChild(figcap);

    art.appendChild(fig);
    return art;
}

let DOM_MODALE = null;
/**
 * Récupère ou met en cache l'ensemble des références DOM de la modale créature.
 * @returns {Object} Dictionnaire des éléments DOM de la boîte modale.
 */
function getDomModale() {
    if (!DOM_MODALE) {
        DOM_MODALE = {
            modale: document.getElementById("modale-creature"),
            photo: document.getElementById("modale-photo"),
            danger: document.getElementById("modale-danger"),
            adn: document.getElementById("modale-adn"),
            dir: document.getElementById("modale-direction"),
            comp: document.getElementById("modale-comportement"),
            att: document.getElementById("modale-attaques"),
            nom: document.getElementById("modale-nom"),
            alim: document.getElementById("modale-alimentation"),
            app: document.getElementById("modale-apparition"),
            disp: document.getElementById("modale-disparition"),
            rean: document.getElementById("modale-reanimation"),
            cons: document.getElementById("modale-conseils"),
            champ: document.getElementById("champ-info-survivant"),
            btnEnv: document.getElementById("btn-envoyer-info"),
            msg: document.getElementById("msg-info"),
            btnFermer: document.getElementById("btn-fermer-modale"),
            overlay: document.getElementById("modale-overlay")
        };
    }
    return DOM_MODALE;
}

/**
 * Ouvre la modale pop-up et renseigne les informations détaillées de la créature sélectionnée.
 * @param {string} id - Identifiant unique de la créature (ex: "creature-01").
 * @returns {void}
 */
function ouvrirModaleCreature(id) {
    const c = donneesCreatures.find(item => item.id === id);
    const m = getDomModale();
    if (!c || !m.modale) return;

    if (m.photo) { m.photo.src = c.image; m.photo.alt = c.titre; }
    if (m.danger) {
        m.danger.textContent = "Danger : " + c.danger;
        m.danger.className = "modale-badge-danger " + obtenirClasseDanger(c.danger);
    }
    const champs = {
        adn: c.adn, dir: c.direction, comp: c.comportement, att: c.attaques,
        nom: c.nom, alim: c.alimentation, app: c.apparition, disp: c.disparition,
        rean: c.reanimation, cons: c.conseils
    };
    Object.entries(champs).forEach(([k, val]) => { if (m[k]) m[k].textContent = val; });

    if (m.champ) { m.champ.value = ""; m.champ.classList.remove("cache"); }
    if (m.btnEnv) m.btnEnv.classList.remove("cache");
    if (m.msg) m.msg.classList.add("cache");

    m.modale.classList.remove("modale-cachee");
    m.modale.setAttribute("aria-hidden", "false");
    document.body.classList.add("modale-ouverte");
}

/**
 * Referme la modale pop-up et réactive le défilement de la page.
 * @returns {void}
 */
function fermerModaleCreature() {
    const m = getDomModale();
    if (m && m.modale) {
        m.modale.classList.add("modale-cachee");
        m.modale.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modale-ouverte");
    }
}

/**
 * Initialise la grille encyclopédique, instancie les cartes et configure la délégation d'événements.
 * @returns {void}
 */
function initialiserEncyclopedie() {
    const gReanimees = document.getElementById("grille-reanimees");
    const gChimeres = document.getElementById("grille-chimeres");
    if (!gReanimees || !gChimeres) return;

    const compteur = document.getElementById("compteur-especes");
    if (compteur) compteur.textContent = `${donneesCreatures.length} / ${TOTAL_ESPECES_ARCHIVES}`;

    const fragR = document.createDocumentFragment();
    const fragC = document.createDocumentFragment();
    donneesCreatures.forEach(c => {
        (c.categorie === "reanimees" ? fragR : fragC).appendChild(creerCarteCreature(c));
    });
    gReanimees.replaceChildren(fragR);
    gChimeres.replaceChildren(fragC);

    // DÉLÉGATION D'ÉVÉNEMENTS (2 écouteurs au total au lieu de 74)
    function gererInteraction(e) {
        const carte = e.target.closest(".carte-creature");
        if (!carte) return;
        if (e.type === "click" || e.key === "Enter" || e.key === " ") {
            if (e.type === "keydown") e.preventDefault();
            ouvrirModaleCreature(carte.getAttribute("data-id"));
        }
    }

    [gReanimees, gChimeres].forEach(g => {
        g.addEventListener("click", gererInteraction);
        g.addEventListener("keydown", gererInteraction);
    });

    const m = getDomModale();
    if (m.btnFermer) m.btnFermer.addEventListener("click", fermerModaleCreature);
    if (m.overlay) m.overlay.addEventListener("click", fermerModaleCreature);
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") fermerModaleCreature(); });

    if (m.btnEnv && m.champ && m.msg) {
        m.btnEnv.addEventListener("click", () => {
            if (!m.champ.value.trim()) {
                m.champ.focus();
                m.champ.placeholder = "Veuillez saisir votre observation...";
                return;
            }
            m.champ.classList.add("cache");
            m.btnEnv.classList.add("cache");
            m.msg.classList.remove("cache");
        });
    }
}

// =============================================================================
// 6. CARROUSEL D'ARCHIVES
// =============================================================================
/**
 * Initialise le carrousel multimédia d'archives avec défilement automatique, boutons et tactile.
 * @returns {void}
 */
function initialiserCarrousel() {
    const conteneur = document.querySelector(".carousel-container");
    const track = document.querySelector(".carousel-track");
    if (!conteneur || !track) return;

    const slides = track.querySelectorAll(".carousel-slide");
    if (slides.length <= 1) return;

    let index = 0;
    const total = slides.length;
    let timer = null;

    const btnPrev = conteneur.querySelector(".carousel-btn-prev");
    const btnNext = conteneur.querySelector(".carousel-btn-next");
    const dots = conteneur.querySelectorAll(".carousel-dot");

    function actualiser(nouvelIndex) {
        index = (nouvelIndex + total) % total;
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((d, i) => {
            const actif = i === index;
            d.classList.toggle("actif", actif);
            d.setAttribute("aria-current", actif ? "true" : "false");
        });
    }

    function demarrerAuto() {
        arreterAuto();
        timer = setInterval(() => actualiser(index + 1), 4500);
    }

    function arreterAuto() {
        if (timer) { clearInterval(timer); timer = null; }
    }

    if (btnPrev) btnPrev.addEventListener("click", () => { actualiser(index - 1); demarrerAuto(); });
    if (btnNext) btnNext.addEventListener("click", () => { actualiser(index + 1); demarrerAuto(); });

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => { actualiser(i); demarrerAuto(); });
    });

    conteneur.addEventListener("mouseenter", arreterAuto);
    conteneur.addEventListener("mouseleave", demarrerAuto);
    conteneur.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") { actualiser(index - 1); demarrerAuto(); }
        else if (e.key === "ArrowRight") { actualiser(index + 1); demarrerAuto(); }
    });

    demarrerAuto();
}

// =============================================================================
// 7. PROTOCOLES D'URGENCE : ACCORDÉON & CHECKLIST (SURVIE.HTML)
// =============================================================================
/**
 * Initialise l'accordéon accessible à 3 colonnes et la checklist avec persistance localStorage.
 * @returns {void}
 */
function initialiserSurvie() {
    const accordeonHeaders = document.querySelectorAll(".accordeon-header");
    const checkboxes = document.querySelectorAll(".checklist-input");
    if (!accordeonHeaders.length && !checkboxes.length) return;

    // A. Accordéon interactif
    accordeonHeaders.forEach((btn) => {
        btn.addEventListener("click", () => {
            const bloc = btn.closest(".accordeon-bloc, .accordeon-item") || btn.parentElement;
            const contenu = bloc ? bloc.querySelector(".accordeon-contenu") : btn.nextElementSibling;
            if (!contenu) return;
            const estActif = contenu.classList.toggle("actif");
            btn.classList.toggle("actif", estActif);
            if (bloc) bloc.classList.toggle("actif", estActif);
            btn.setAttribute("aria-expanded", String(estActif));
        });
    });

    // B. Checklist avec sauvegarde localStorage
    if (checkboxes.length) {
        const CLE_STORAGE = "paleosurvie_checklist";

        // Charger l'état sauvegardé
        try {
            const sauvegardes = JSON.parse(localStorage.getItem(CLE_STORAGE)) || [];
            checkboxes.forEach((cb, idx) => {
                if (sauvegardes.includes(idx)) {
                    cb.checked = true;
                    const parent = cb.closest(".checklist-item");
                    if (parent) parent.classList.add("coché");
                }
            });
        } catch (e) {
            // Ignorer si localStorage est inaccessible
        }

        // Sauvegarder à chaque changement
        checkboxes.forEach((cb, idx) => {
            cb.addEventListener("change", () => {
                const parent = cb.closest(".checklist-item");
                if (parent) parent.classList.toggle("coché", cb.checked);

                const indexesCoches = [];
                checkboxes.forEach((c, i) => {
                    if (c.checked) indexesCoches.push(i);
                });
                try {
                    localStorage.setItem(CLE_STORAGE, JSON.stringify(indexesCoches));
                } catch (e) {
                    // Ignorer quota dépassé ou restrictions
                }
            });
        });
    }
}

/**
 * Sécurise l'ensemble des formulaires du site contre le rechargement intempestif de page.
 * @returns {void}
 */
function initialiserFormulaires() {
    document.querySelectorAll("form").forEach((form) => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
        });
    });
}

// =============================================================================
// 8. INITIALISATION GLOBALE (Robuste DOMContentLoaded + defer)
// =============================================================================
/**
 * Point d'entrée principal orchestrant l'initialisation modulaire selon les composants présents.
 * @returns {void}
 */
function lancerInitialisation() {
    initialiserFormulaires();
    initialiserPageAccueil();
    initialiserProfil();
    initialiserAudio();
    initialiserEncyclopedie();
    initialiserCarrousel();
    initialiserSurvie();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", lancerInitialisation);
} else {
    lancerInitialisation();
}
