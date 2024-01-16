Avoir toutes les filières :
```
/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=0&facet=fili
```
Avoir tous les formations détaillées :
```
/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=0&facet=form_lib_voe_acc&refine.fili={FILIERE}
```
Avoir tous les formations très détaillées :
```
/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=0&facet=fil_lib_voe_acc&refine.fili={FILIERE}&refine.form_lib_voe_acc={FILIERE-DETAILLEE}
```

Pour avoir les écoles :
```
/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows={COUNT}&refine.fili={FILIERE}&refine.form_lib_voe_acc={FILIERE-DETAILLEE}&refine.fil_lib_voe_acc={FILIERE-TRES-DETAILLEE}
```

URL : https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=...

Pour la France :

Moyenne des admis : 
```
moyenne des moyennes des mentions au bac (11,13,15,17,19 : SM, AB, B, TB, TBF)
``` 
(ajouter dans les facettes de la requete facet=acc_tot&facet=voe_tot&facet=capa_fin)

Nombres d'établissements : 
```
count
```

Capacité : 
```
somme des capa_fin / nb_etablissement
```

Selectivité : 
```
Taux_acces_ens
```

Répartition (sous forme graphique) par genre, bac d'origine, mention au bac :

Pour un établissement :

- Titre : ```g_ea_lib_vx```
- Ville : ```ville_etab```
- Département : ```dep_lib```
- Academie : ```acad_mies```
- Privacité : ```contrat_etab```
- Capacité : ```capa_fin```
- Nombre de voeux : ```voe_tot```
- Rang dernier admis
	* sauf technologiques : ```ran_grp1```
	* technologiques toutes séries : ```ran_grp2Rang ```
- Admis hors académie : ```100 - pct_aca_orig```	

- Vitesse de remplissage
		Ouverture : ```pct_acc_debutpp```
		Milieu : ```pct_acc_datebac```
		Fin : ```pct_acc_finpp```

- Répartition par genre
	* F : ```pct_f```
	* H : ```100 - F ```

- Répartition par bac	
	* Général : ```pct_bg```
	* Tech	: ```pct_bt```
	* Pro	: ```pct_bp```
	* Autre	: ```100 - 3 au dessus```

- Répartition par mention au bac
	* SM : ```pct_sansmention```
	* AB : ```pct_ab```
	* B  : ```pct_b```
	* TB : ```pct_tb```
	* TBF: ```pct_tbf```
	
