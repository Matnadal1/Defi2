const xhr = new XMLHttpRequest();

// Requête pour les inscrits à l'UT2J en L2 MIASHS
xhr.open("GET", "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics&q=&rows=26&facet=annee_universitaire&facet=diplom&refine.niveau_lib=2%C3%A8me+ann%C3%A9e&refine.etablissement_lib=Universit%C3%A9+Toulouse+-+Jean+Jaur%C3%A8s&refine.diplome_rgp=Licence&refine.diplom=2300031");

// Requête pour les inscrits à l'UT3 en Licence Informatique
const xhr2 = new XMLHttpRequest();
xhr2.open("GET", "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics&q=&rows=200&facet=annee_universitaire&facet=etablissement_lib&facet=diplome_lib&refine.libelle_intitule_1=INFORMATIQUE&refine.niveau_lib=2%C3%A8me+ann%C3%A9e&refine.etablissement_lib=Universit%C3%A9+Toulouse+III+-+Paul+Sabatier&refine.diplome_rgp=Licence&refine.diplome_lib=Autres+licences&exclude.annee_universitaire=2014-15&exclude.annee_universitaire=2015-16&exclude.annee_universitaire=2016-17&exclude.annee_universitaire=2017-18&exclude.annee_universitaire=2013-14&exclude.annee_universitaire=2012-13&exclude.annee_universitaire=2011-12&exclude.annee_universitaire=2010-11&exclude.annee_universitaire=2009-10&exclude.annee_universitaire=2008-09&exclude.annee_universitaire=2007-08&exclude.annee_universitaire=2006-07&exclude.annee_universitaire=2005-06");


xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    const records = data.records;
    const years = ["2018-19", "2019-20", "2020-21", "2021-22"];
    const results1 = [];
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      const fields = record.fields;
      if (years.includes(fields.annee_universitaire)) {
        const value = fields.effectif_total_sans_cpge;
        results1.push({ year: fields.annee_universitaire, value: value });
      }
    }
    console.log(results1)
    results1.sort(function(a, b) {
      if (a.year < b.year) {
        return -1;
      } else if (a.year > b.year) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log(results1)
    xhr2.onreadystatechange = function () {
      if (xhr2.readyState === 4 && xhr2.status === 200) {
        const data2 = JSON.parse(xhr2.responseText);
        console.log(data2)
        const records2 = data2.records;
        const years2 = ["2018-19", "2019-20", "2020-21", "2021-22"];
        const results2 = [];
        for (let i = 0; i < records2.length; i++) {
          const record2 = records2[i];
          const fields2 = record2.fields;

          if (years2.includes(fields2.annee_universitaire)) {
            const value2 = fields2.effectif_total_sans_cpge;
            console.log(value2)
            results2.push({ year: fields2.annee_universitaire, value: value2 });
          }
        }
        console.log(results2)
        results2.sort(function(a, b) {
          if (a.year < b.year) {
            return -1;
          } else if (a.year > b.year) {
            return 1;
          } else {
            return 0;
          }
        });
        console.log(results2)
        const labels = [
          '2018-19',
          '2019-20',
          '2020-21',
          '2021-22',
        ];

        const data1 = {
            labels : labels,
            datasets : [{
                type: 'line',
                label: "les inscrits en L2 MIASHS à l'UT2J",
                backgroundColor: 'rgb(255, 000, 000)',
                borderColor: 'rgb(255, 000, 000)',
                data: results1.map(item => item.value),
            },
            {
                type: 'line',
                label: "Les inscrits en L2 informatique à l'UT3",
                backgroundColor: 'rgb(000, 000, 255)',
                borderColor: 'rgb(000, 000, 255)',
                data: results2.map(item => item.value),  
            }]
        };

        const config = {
            type: 'line',
            data: data1, 
            options : {}
        };

        const myChart = new Chart(
            document.querySelector('#graph'),
            config
        );
    }}}
};

xhr.send();
xhr2.send();