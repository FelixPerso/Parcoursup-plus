
Math.toRadians = function(degrees){
    if (degrees < 0) {
      degrees += 360;/*from w  w  w .  java2 s.c o m*/
    }
    return degrees / 180 * Math.PI;
};
/**
 * Formate les données des facettes d'une formation demandées dans l'ordre suivant :
 *  - 1 : pct_sansmention
 *  - 2 : pct_ab
 * @param {*} facet_group 
 */
export function formationSummary(facet_group, count_etablissement) {
    let newRecap = {}
    //Les données dans le tableau sont rangées dans l'ordre des facettes dans la requête : 1 = pct_sansmention, 2 = pct_ab, ...
    let pct_sansmention = facet_group[0].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0)/count_etablissement
    let pct_ab = facet_group[1].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0)/count_etablissement
    let pct_b = facet_group[2].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0)/count_etablissement
    let pct_tb = facet_group[3].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0)/count_etablissement
    let pct_tbf = facet_group[4].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0)/count_etablissement

    let moyenne_admis = ((11 * pct_sansmention + 13 * pct_ab + 15 * pct_b + 17 * pct_tb + 19 * pct_tbf)/100).toFixed(1)

    let capac_fin = Math.floor(facet_group[5].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0)/count_etablissement)

    let taux_acces_ens = Math.floor(facet_group[6].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0)/count_etablissement)

    let pct_f = Math.round(facet_group[7].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0)/count_etablissement)

    let pct_bg = Math.round(facet_group[8].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0)/count_etablissement)
    let pct_bt = Math.round(facet_group[9].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0)/count_etablissement)
    let pct_bp = Math.round(facet_group[10].facets.reduce((accumulateur, value) => accumulateur + parseInt(value.name) * value.count, 0)/count_etablissement)


    newRecap.moyenne = moyenne_admis
    newRecap.nb_form = count_etablissement
    newRecap.capac = capac_fin
    newRecap.select = taux_acces_ens
    newRecap.genre = {
        label : "Répartition par genre",
        elements : [
            {percentage : pct_f, color : "#003f5c", name : "F", title : "Femme"},
            {percentage : 100 - pct_f, color : "#f95d6a", name : "H", title : "Homme"}

        ]
    },
    newRecap.bac = {
        label : "Répartition par bac",
        elements : [
            {percentage : pct_bg, color : "#003f5c", name : "Gen", title : "Général"},
            {percentage : pct_bt, color : "#2f4b7c", name : "Tech", title : "Technologique"},
            {percentage : pct_bp, color : "#665191", name : "Pro", title : "Professionnel"},
            {percentage : 100 - pct_bg - pct_bt - pct_bp , color : "#a05195", name : "Aut", title : "Autre"}
        ]
    },
    newRecap.mention = {
        label : "Répartition par mention au bac",
        elements : [
            {percentage : Math.round(pct_sansmention), color : "#003f5c", name : "P", title : "Passable"},
            {percentage : Math.round(pct_ab), color : "#2f4b7c", name : "AB", title : "Assez Bien"},
            {percentage : Math.round(pct_b), color : "#665191", name : "B", title : "Bien"},
            {percentage : Math.round(pct_tb), color : "#a05195", name : "TB", title : "Très Bien"},
            {percentage : Math.round(pct_tbf), color : "#f95d6a", name : "TBF", title : "Très Bien avec Félicitation du jury"}
        ]
    }

    return newRecap
}

export function moyenne(record) {
    let total = record.acc_tot - record.acc_at;
    let note = 0;
    note += 11 * record.acc_sansmention
    note += 13 * record.acc_ab
    note += 15 * record.acc_b
    note += 17 * record.acc_tb
    note += 19 * record.acc_tbf
    return parseFloat((note / total).toFixed(1));
}

export function filterForModal(data) { 
    return {
        title : data.lib_comp_voe_ins,
        selectivite : data.select_form,
        genre : {
            label : "Répartition par genre",
            elements : [
                {percentage : data.pct_f, color : "#003f5c", name : "F", title : "Femme"},
                {percentage : 100 - data.pct_f, color : "#f95d6a", name : "H", title : "Homme"}

            ]},
        bac : {
            label : "Répartition par bac",
            elements : [
                {percentage : data.pct_bg, color : "#003f5c", name : "Gen", title : "Général"},
                {percentage : data.pct_bt, color : "#2f4b7c", name : "Tech", title : "Technologique"},
                {percentage : data.pct_bp, color : "#665191", name : "Pro", title : "Professionnel"},
                {percentage : 100 - data.pct_bg - data.pct_bt - data.pct_bp , color : "#a05195", name : "Aut", title : "Autre"}
            ]
        },
        mention : {
            label : "Répartition par mention au bac",
            elements : [
                {percentage : data.pct_sansmention, color : "#003f5c", name : "P", title : "Passable"},
                {percentage : data.pct_ab, color : "#2f4b7c", name : "AB", title : "Assez Bien"},
                {percentage : data.pct_b, color : "#665191", name : "B", title : "Bien"},
                {percentage : data.pct_tb, color : "#a05195", name : "TB", title : "Très Bien"},
                {percentage : data.pct_tbf, color : "#f95d6a", name : "TBF", title : "Très Bien avec Félicitation du jury"}
            ]
        },
        dates : [
            {text : "ouverture 27 mai",percentage : data.pct_acc_debutpp},
            {text : "17 juin", percentage : data.pct_acc_datebac},
            {text : "16 juillet", percentage : data.pct_acc_finpp},
        ],
        text : [
            {text : data.ville_etab ,title : "Ville"}, 
            {text : data.dep_lib ,title : "Département"},
            {text : data.acad_mies ,title : "Académie"},
            {text : data.contrat_etab, title : "Contrat établissement"},
            {text : data.capa_fin ,title : "Capacité"},
            {text : data.voe_tot,title : "Nombres de voeux"},
            {text : `${100 - data.pct_aca_orig}%` ,title : "Admis hors académie"}
        ], 
        list : {
            title : "Rang du dernier admis :",
            data : [
                {title : "Tous sauf les Bac technologiques", text : data.ran_grp1},
                {title : "Bac technologiques toutes séries", text : data.ran_grp2}
            ]
        },
        url : data.lien_form_psup
    }
}

export function filterCoordinates(data, position, radius) {
    return data.filter((element) => {
        var R = 6371; // kM
        var phi1 = Math.toRadians(position[1]);
        var phi2 = Math.toRadians(element.g_olocalisation_des_formations[0]);
        var deltaPhi = Math.toRadians(element.g_olocalisation_des_formations[0] - position[1]);
        var deltaLambda = Math.toRadians(element.g_olocalisation_des_formations[1] - position[0]);
    
        var a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
                Math.cos(phi1) * Math.cos(phi2) *
                Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return (R * c) <= radius})
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds.
export function debounce(fn, wait) {
	let timeout
	return (...args) => {
		clearTimeout(timeout)
		timeout = setTimeout(() => fn(...args), wait)
	}
}

export function compare(oldProps, newProps) {
    if(oldProps.length != newProps.length)
        return false
    for(i = 0; i < newProps.length; i++) {
        if(newProps[i].key != oldProps[i].key)
            return false
    }
    return true
}

export function toggleLight() {
    let themes = document.querySelectorAll('link[data-theme]');
    let activeTheme = document.querySelector('link[data-theme][rel="stylesheet"]:not([disabled])');
    // Trouver l'élément qui a le thème suivant
    let nextTheme = activeTheme == themes[0] ? themes[1] : themes[0];
    document.documentElement.classList.add('theme-transition');
    nextTheme.disabled = false;
    activeTheme.disabled = true;
    localStorage.setItem("theme", nextTheme.dataset.theme)
    // Supprimer la classe pour l'animation
    setTimeout(() => {
        document.documentElement.classList.remove('theme-transition');
    }, 1000);
}