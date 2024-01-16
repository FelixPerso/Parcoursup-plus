const chars = {
    ' ' : '+',
    '+' : '%2B',
    ',' : '%2C',
    '&' : '%26'
}
function getEncodedName(name) {
    return name.replace(/[ +,&]/g,m => chars[m])
}

export async function fetchFiliere() {
    //Clé pour le cache
    const cacheKey = 'filiereCache';
    const cacheValue = localStorage.getItem(cacheKey);
    let data = null
    if (cacheValue) {
        data = JSON.parse(cacheValue);
    } else {
        let URL = `https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=0&facet=fili`
        let response = await fetch(URL)
        data = await response.json()
        //Mise en cache
        if(response.status == 200)
            localStorage.setItem(cacheKey, JSON.stringify(data));
    }
    return data.facet_groups[0].facets
}

export async function fetchAllFormations() {
    //Clé pour le cache
    const cacheKey = 'allFormations';
    const cacheValue = localStorage.getItem(cacheKey);
    let data = null
    if (cacheValue) {
        data = JSON.parse(cacheValue);
    } else {
        let URL = `https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=0&facet=fil_lib_voe_acc`
        let response = await fetch(URL)
        data = await response.json()
        //Mise en cache
        if(response.status == 200)
            localStorage.setItem(cacheKey, JSON.stringify(data));
    }
    return data.facet_groups[0].facets
}

export async function fetchFiliereDetail(filiere) {
    const cacheKey = 'filiereDetailCache';
    const cacheValue = localStorage.getItem(cacheKey);
    filiere = getEncodedName(filiere)
    let data = null
    if (cacheValue) {
        let cache = JSON.parse(cacheValue)
        if(cache.key === filiere) 
            data = cache.data
    }

    if(!data) {
        let URL = `https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=0&facet=form_lib_voe_acc&refine.fili=${filiere}`
        let response = await fetch(URL)
        data = await response.json()
        //Mise en cache
        if(response.status == 200)
            localStorage.setItem(cacheKey, JSON.stringify({key : filiere, 'data' : data}));
    }

    return data.facet_groups[0].facets
}

export async function fetchFiliereTDetail(filiere, filiere_detail) {
    const cacheKey = 'filiereTresDetailCache';
    const cacheValue = localStorage.getItem(cacheKey);
    let data = null;
    filiere = getEncodedName(filiere)
    filiere_detail = getEncodedName(filiere_detail)

    if(cacheValue){
        let cache = JSON.parse(cacheValue)
        if(cache.key === `${filiere}_${filiere_detail}`)
            data = cache.data    
    }
    if(!data) {
        let URL = `https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=0&facet=fil_lib_voe_acc&refine.fili=${filiere}&refine.form_lib_voe_acc=${filiere_detail}`
        let response = await fetch(URL)
        data = await response.json()
        //Mise en cache
        if(response.status == 200)
            localStorage.setItem(cacheKey, JSON.stringify({key : `${filiere}_${filiere_detail}`, 'data' : data}));
    }
    return data.facet_groups[0].facets
}

export async function fetchInfosFormation(filiere, filiere_detail, filiere_t_detail, count) {
    filiere = getEncodedName(filiere)
    filiere_detail = getEncodedName(filiere_detail)
    filiere_t_detail = getEncodedName(filiere_t_detail)
    const facets = "facet=pct_sansmention&facet=pct_ab&facet=pct_b&facet=pct_tb&facet=pct_tbf&facet=capa_fin&facet=taux_acces_ens&facet=pct_f&facet=pct_bg&facet=pct_bt&facet=pct_bp" 
    const refine = `refine.fili=${filiere}&refine.form_lib_voe_acc=${filiere_detail}&refine.fil_lib_voe_acc=${filiere_t_detail}`
    const URL = `https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=${count}&${facets}&${refine}`
    let response = await fetch(URL)
    data = await response.json()

    return data
}

export async function fetchDoublettes() {
    //Clé pour le cache
    const cacheKey = 'filiereDoublette';
    const cacheValue = localStorage.getItem(cacheKey);
    let data = null
    if (cacheValue) {
        data = JSON.parse(cacheValue);
    } else {
        let response = await fetch("https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-parcoursup-enseignements-de-specialite-bacheliers-generaux&q=&facet=doublette&refine.formation=${filiereDetail}")
        data = (await response.json())
        
        data = data.records.map(record => record.fields)
        if(response.status == 200)
            localStorage.setItem(cacheKey, JSON.stringify(data));
    }
    return data
} 

/**
 * (voir https://adresse.data.gouv.fr/api-doc/adresse)
 * Cherche des adresses proches de celle donnée en argument
 * @param {String} address l'adresse approximative
 * @returns un tableau d'adresse ordonné par pertinence du résultat
 */
export async function fetchAddress(address) {
    let response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${address}&limit=3`)
    let data = await response.json()
    return data
}

/**
 * (voir https://adresse.data.gouv.fr/api-doc/adresse)
 * Cherche une seule adresse 
 * @param {String} address l'adresse
 * @param {Integer} postcode le code postal
 * @returns les informations sur l'adresse
 */
export async function findAddress(address, postcode) {
    if(!address)
        return -1
    let response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${address}&postcode=${postcode}&autocomplete=0&limit=1`)
    let data = await response.json()
    return data
}