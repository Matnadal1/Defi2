// Récupération de l'élément canvas
const ctx = document.getElementById('chart2').getContext('2d');



// Récupération des données depuis l'API XML
var xhr = new XMLHttpRequest();
xhr.open("GET", "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics&q=&rows=200&facet=annee_universitaire&facet=etablissement_lib&facet=diplome_lib&refine.libelle_intitule_1=MATHEMATIQUES+ET+INFORMATIQUE+APPLIQUEES+AUX+SCIENCES+HUMAINES+ET+SOCIALES&refine.niveau_lib=2%C3%A8me+ann%C3%A9e&exclude.annee_universitaire=2014-15&exclude.annee_universitaire=2015-16&exclude.annee_universitaire=2016-17&exclude.annee_universitaire=2017-18");

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var données = JSON.parse(xhr.responseText).records;

    // Création de la structure de données pour le graphique en courbes
    const labels = [
        '2018-19',
        '2019-20',
        '2020-21',
        '2021-22',
    ]

    console.log(données.length)


    const effectifs_univ_par_date = {};
    for (let i = 0; i < données.length; i++) {
        let record = données[i];
        let univ = record.fields.etablissement_lib;
        let annee = record.fields.annee_universitaire;
        let effectif = record.fields.effectif_total_sans_cpge;
        if (!effectifs_univ_par_date[univ]) {
            effectifs_univ_par_date[univ] = {};
        }
        if (!effectifs_univ_par_date[univ][annee]) {
            effectifs_univ_par_date[univ][annee] = 0;
        }
        effectifs_univ_par_date[univ][annee] += effectif;
        
    }
    for (let univ in effectifs_univ_par_date) {
        for (let annee in effectifs_univ_par_date[univ]) {
            let sortedYears = Object.keys(effectifs_univ_par_date[univ]).sort();
            let sortedObj = Object.fromEntries(sortedYears.map(year => [year, effectifs_univ_par_date[univ][year]]));
            effectifs_univ_par_date[univ] = sortedObj;
        }
    }
    console.log(effectifs_univ_par_date)
    
    

    // Tableau des noms d'universités
    let universites = Object.keys(effectifs_univ_par_date);

    // Tableau des couleurs aléatoires pour chaque université
    let couleurs = universites.map(function(univ) {
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        return "rgb(" + r + "," + g + "," + b + ")";
    });

    // Tableau des labels des années
    let annees = Object.keys(effectifs_univ_par_date[universites[0]]).sort();

    // Tableau des données
    const datasets = universites.map(function(univ) {
        let effectifs = annees.map(function(annee) {
            return effectifs_univ_par_date[univ][annee];
        });
        return {
            label: univ,
            data: effectifs,
            backgroundColor: couleurs,
            borderColor: couleurs,
            fill: false
        };
    });




    /* [    {        "univ": "Nom de l'université 1",        "effectifs": {            "date1": effectif1,            "date2": effectif2,            ...        }    },    {        "univ": "Nom de l'université 2",        "effectifs": {            "date1": effectif1,            "date2": effectif2,            ...        }    },    ...]*/
    const data = { 
        labels: labels,
        datasets: datasets,
    }

    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            plugins: {
              title: {
                display: true,
                text: 'Nombre d\'étudiants par année',
              },
              legend: {
                display: true,
                position: 'bottom',
                onClick: (event, legendItem) => {
                  const chart = Chart.getChart(ctx);
                  const index = legendItem.datasetIndex;
                  const meta = chart.getDatasetMeta(index);
                  meta.hidden = meta.hidden === null ? !chart.data.datasets[index].hidden : null;
                  chart.update();
                },
              },
            },
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: 'Année'
                }
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: 'Nombre d\'étudiants'
                }
              }
            }
          }

    }

    // Création de l'objet Chart pour le graphique en courbes
    var chart = new Chart(ctx, config);
  }
};
xhr.send();


