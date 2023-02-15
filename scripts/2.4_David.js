const xhr = new XMLHttpRequest()
xhr.open("get", "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics&q=jean+jaures&facet=annee_universitaire&facet=etablissement_type&facet=etablissement_typologie&facet=etablissement_id_paysage&facet=etablissement_lib&facet=etablissement_compos_id_paysage&facet=etablissement_compos_lib&facet=form_ens_id_paysage&facet=form_ens_lib&facet=etablissement_id_wikidata&facet=etablissement_id_ror&facet=etablissement_id_uai&facet=dn_de_lib&facet=cursus_lmd_lib&facet=diplome_rgp&facet=diplome_lib&facet=typ_diplome_lib&facet=diplom&facet=niveau_lib&facet=disciplines_selection&facet=gd_disciscipline_lib&facet=discipline_lib&facet=sect_disciplinaire_lib&facet=etablissement_code_commune&facet=etablissement_commune&facet=etablissement_id_uucr&facet=etablissement_uucr&facet=etablissement_id_departement&facet=etablissement_departement&facet=etablissement_id_academie&facet=etablissement_academie&facet=etablissement_id_region&facet=etablissement_region&facet=implantation_code_commune&facet=implantation_commune&facet=implantation_id_uucr&facet=implantation_uucr&facet=implantation_id_departement&facet=implantation_departement&facet=implantation_id_academie&facet=implantation_academie&facet=implantation_id_region&facet=implantation_region&facet=etablissement_id_uai_source&facet=etablissement_id_paysage_actuel&facet=etablissement_actuel_lib&refine.etablissement_lib=Université+Toulouse+-+Jean+Jaurès&refine.niveau_lib=2ème+année&refine.sect_disciplinaire_lib=Histoire&exclude.annee_universitaire=2006-07&exclude.annee_universitaire=2007-08&exclude.annee_universitaire=2008-09&exclude.annee_universitaire=2009-10&exclude.annee_universitaire=2010-11&exclude.annee_universitaire=2011-12&exclude.annee_universitaire=2012-13&exclude.annee_universitaire=2013-14&exclude.annee_universitaire=2014-15&exclude.annee_universitaire=2015-16&exclude.annee_universitaire=2016-17&exclude.annee_universitaire=2017-18")
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const reponse = JSON.parse(xhr.responseText);
        const records = reponse.records;

        const girlsHistory = [];
        const boysHistory = [];

        for (let i = 0; i < records.length; i++) {
            const record = records[i];
            const fields = record.fields;
            const girls = fields.femmes;
            const boys = fields.hommes;
            girlsHistory.push({ year: fields.annee_universitaire, value: boys});
            boysHistory.push({ year: fields.annee_universitaire, value: girls});

        }

        boysHistory.sort(function(a, b) {
            if (a.year < b.year) {
              return -1;
            } else if (a.year > b.year) {
              return 1;
            } else {
              return 0;
            }
        });

        girlsHistory.sort(function(a, b) {
            if (a.year < b.year) {
              return -1;
            } else if (a.year > b.year) {
              return 1;
            } else {
              return 0;
            }
        });

        const labels = [
            '2018-19',
            '2019-20',
            '2020-21',
            '2021-22',
        ];

        const data = {
            labels: labels,
            datasets: [{
                    label: "Les hommes inscrits à l'UT2J en L2 MIASHS",
                    backgroundColor: '#00179c',
                    borderColor: '#00179c',
                    data: [37, 37, 85, 90]
                },
                {
                    label: "Les femmes inscrites à l'UT2J en L2 MIASHS",
                    backgroundColor: '#9c0012',
                    borderColor: '#9c0012',
                    data: [40, 32, 49, 58]
                },
                {
                    label: "'Les hommes inscrits à l'UT2J en L2 Histoire'",
                    backgroundColor: '#009c1d',
                    borderColor: '#009c1d',
                    data: boysHistory.map(item => item.value)
                },
                {
                    label: "'Les femmes inscrites à l'UT2J en L2 Histoire'",
                    backgroundColor: '#9c0056',
                    borderColor: '#9c0056',
                    data: girlsHistory.map(item => item.value)
                }
            ],
        }

        const config = {
            type: 'line',
            data: data,
            options: {}
        }

        const myChart = new Chart(
            document.querySelector('.graph'),
            config
        );
    }
}
xhr.send()