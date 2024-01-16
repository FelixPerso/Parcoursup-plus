# Mini-Projet RiotJS

## Sujet

Écrire une application web en javascript qui permet de consulter les données de parcoursup (vœux de poursuite d'études et de réorientation dans l'enseignement supérieur et réponses des établissements) afin d'aider un(e) lycéén(e) à faire ses choix.

La partie cliente devra être réaliser au moyen du framework riotjs.
Les données seront consommées au moyen de l'api opendata.

## Fontionnalités

- Recherche d'un nom dans la liste des filières, formations, écoles, etc;
- Géolocalisation (voir [api](https://adresse.data.gouv.fr/api-doc/adresse));
- Localisation des écoles sur une carte;
- Filtrage des écoles par nom, ville, moyenne, etc;
- Mode lumineux/sombre (expérimental);
- Responsif.

## API

**Important** : Le nombre de requêtes journalières est de 5 000. 
Un cache local est mis en place mais seulement pour 3 requêtes, une par niveau (Filière, filière détaillée, filière très détaillée).
Ce choix est du à la consommation importante en mémoire du stockage de beaucoup de requête : jusqu'à 1575.84Ko par requête.
La limite du local storage est donc très vite atteinte. Mettre en place une suppression des valeurs lorsque cela se produit serait simple cependant nous avons fait au plus simple.

#### URL de L'API

[https://data.enseignementsup-recherche.gouv.fr](https://data.enseignementsup-recherche.gouv.fr)

#### Avoir toutes les filières

```http
  GET /api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=0&facet=fili
```

#### Avoir tous les formations détaillées 

```http
  GET /api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=0&facet=form_lib_voe_acc&refine.fili={FILIERE}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `FILIERE`      | `string` | **Requis**. nom de la filière |

#### Avoir tous les formations très détaillées 

```http
  GET /api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows=0&facet=fil_lib_voe_acc&refine.fili={FILIERE}&refine.form_lib_voe_acc={FILIERE-DETAILLEE}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `FILIERE`      | `string` | **Recommandé**. nom de la filière |
| `FILIERE-DETAILLEE`      | `string` | **Requis**. nom de la filière détaillé |

#### Avoir les écoles 

```http
  GET /api/records/1.0/search/?dataset=fr-esr-parcoursup&q=&rows={COUNT}&refine.fili={FILIERE}&refine.form_lib_voe_acc={FILIERE-DETAILLEE}&refine.fil_lib_voe_acc={FILIERE-TRES-DETAILLEE}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `COUNT`      | `int` | **Recommandé**. nombre de résultats voulu |
| `FILIERE`      | `string` | **Recommandé**. nom de la filière |
| `FILIERE-DETAILLEE`      | `string` | **Recommandé**. nom de la filière détaillée|
| `FILIERE-TRES-DETAILLEE`      | `string` | **Requis**. nom de la filière très détaillées |

#### Informations supplémentaires non-ordonnées :

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
taux_acces_ens
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

## Lancer localement

Cloner le projet

```bash
  git clone https://dwarves.iut-fbleau.fr/gitiut/justine/S4WEB.git
```

Allez dans le dossier

```bash
  cd S4WEB
```

Installer les dependances

```bash
  npm install riot-cli -g
```

Compiler les sources

```bash
  riot components/app.js -o js/app.js
```

Ouvrir un serveur de votre choix


## Auteurs

- [Lucas JUSTINE](https://dwarves.iut-fbleau.fr/gitiut/justine)
- [Yannis JUSTINE](https://dwarves.iut-fbleau.fr/gitiut/justiney)
