const xhr = new XMLHttpRequest();

// Requête pour les inscrits à l'UT2J en L2 MIASHS
xhr.open("GET", "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics&q=&rows=26&facet=annee_universitaire&facet=diplom&refine.niveau_lib=2%C3%A8me+ann%C3%A9e&refine.etablissement_lib=Universit%C3%A9+Toulouse+-+Jean+Jaur%C3%A8s&refine.diplome_rgp=Licence&refine.diplom=2300031");

// Requête pour les inscrits à l'UT3 en Licence Informatique
const xhr2 = new XMLHttpRequest();
xhr2.open("GET", "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics&q=&rows=26&facet=annee_universitaire&facet=etablissement_type&facet=etablissement_typologie&facet=etablissement_id_paysage&facet=etablissement_lib&facet=etablissement_compos_id_paysage&facet=etablissement_compos_lib&facet=form_ens_id_paysage&facet=form_ens_lib&facet=etablissement_id_wikidata&facet=etablissement_id_ror&facet=etablissement_id_uai&facet=dn_de_lib&facet=cursus_lmd_lib&facet=diplome_rgp&facet=diplome_lib&facet=typ_diplome_lib&facet=diplom&facet=niveau_lib&facet=disciplines_selection&facet=gd_disciscipline_lib&facet=discipline_lib&facet=sect_disciplinaire_lib&facet=etablissement_code_commune&facet=etablissement_commune&facet=etablissement_id_uucr&facet=etablissement_uucr&facet=etablissement_id_departement&facet=etablissement_departement&facet=etablissement_id_academie&facet=etablissement_academie&facet=etablissement_id_region&facet=etablissement_region&facet=implantation_code_commune&facet=implantation_commune&facet=implantation_id_uucr&facet=implantation_uucr&facet=implantation_id_departement&facet=implantation_departement&facet=implantation_id_academie&facet=implantation_academie&facet=implantation_id_region&facet=implantation_region&facet=etablissement_id_uai_source&facet=etablissement_id_paysage_actuel&facet=etablissement_actuel_lib&refine.etablissement_actuel_lib=Universit%C3%A9+Toulouse+III+-+Paul+Sabatier&refine.sect_disciplinaire_lib=Informatique&refine.niveau_lib=2%C3%A8me+ann%C3%A9e");


xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    const records = data.records;
    const years = ["2017-18", "2018-19", "2019-20", "2020-21", "2021-22"];
    const results1 = [];
    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      const fields = record.fields;
      if (years.includes(fields.annee_universitaire)) {
        const value = fields.effectif_total_sans_cpge;
        results1.push({ year: fields.annee_universitaire, value: value });
      }
    }
    results1.sort(function(a, b) {
      if (a.year < b.year) {
        return -1;
      } else if (a.year > b.year) {
        return 1;
      } else {
        return 0;
      }
    });

    xhr2.onreadystatechange = function () {
      if (xhr2.readyState === 4 && xhr2.status === 200) {
        const data = JSON.parse(xhr2.responseText);
        console.log(data)
        const records = data.records;
        const years = ["2017-18", "2018-19", "2019-20", "2020-21", "2021-22"];
        const results2 = [];
        for (let i = 0; i < records.length; i++) {
          const record = records[i];
          const fields = record.fields;
          if (years.includes(fields.annee_universitaire)) {
            const value = fields.effectif_total_sans_cpge;
            results2.push({ year: fields.annee_universitaire, value: value });
          }
        }
        results2.sort(function(a, b) {
          if (a.year < b.year) {
            return -1;
          } else if (a.year > b.year) {
            return 1;
          } else {
            return 0;
          }
        });

        const labels = [
          '2017-18',
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