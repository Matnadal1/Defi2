const xhr = new XMLHttpRequest()
xhr.open("get", "https://data.enseignementsup-recherche.gouv.fr/api/records/1.0/search/?dataset=fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics&q=&rows=26&facet=annee_universitaire&facet=etablissement_type&facet=etablissement_typologie&facet=etablissement_id_paysage&facet=etablissement_lib&facet=etablissement_compos_id_paysage&facet=etablissement_compos_lib&facet=form_ens_id_paysage&facet=form_ens_lib&facet=etablissement_id_wikidata&facet=etablissement_id_ror&facet=etablissement_id_uai&facet=dn_de_lib&facet=cursus_lmd_lib&facet=diplome_rgp&facet=diplome_lib&facet=typ_diplome_lib&facet=diplom&facet=niveau_lib&facet=disciplines_selection&facet=gd_disciscipline_lib&facet=discipline_lib&facet=sect_disciplinaire_lib&facet=etablissement_code_commune&facet=etablissement_commune&facet=etablissement_id_uucr&facet=etablissement_uucr&facet=etablissement_id_departement&facet=etablissement_departement&facet=etablissement_id_academie&facet=etablissement_academie&facet=etablissement_id_region&facet=etablissement_region&facet=implantation_code_commune&facet=implantation_commune&facet=implantation_id_uucr&facet=implantation_uucr&facet=implantation_id_departement&facet=implantation_departement&facet=implantation_id_academie&facet=implantation_academie&facet=implantation_id_region&facet=implantation_region&facet=etablissement_id_uai_source&facet=etablissement_id_paysage_actuel&facet=etablissement_actuel_lib&refine.niveau_lib=2%C3%A8me+ann%C3%A9e&refine.diplome_rgp=Licence&refine.implantation_uucr=Toulouse&refine.etablissement_lib=Universit%C3%A9+Toulouse+-+Jean+Jaur%C3%A8s&refine.sect_disciplinaire_lib=Sociologie%2C+d%C3%A9mographie&refine.diplom=2300013&exclude.annee_universitaire=2016-17&exclude.annee_universitaire=2015-16&exclude.annee_universitaire=2014-15&exclude.annee_universitaire=2017-18")
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const reponse = JSON.parse(xhr.responseText) ;
        const records = reponse.records ;

        const hommesSoc = [] ;
        const femmesSoc = [] ;

        for (let i = 0; i < records.length; i++) {
            const record = records[i] ;
            const fields = record.fields ;
            const femmes = fields.femmes ;
            const hommes = fields.hommes ;
            hommesSoc.push({ year: fields.annee_universitaire, value: hommes}) ;
            femmesSoc.push({ year: fields.annee_universitaire, value: femmes}) ;
        }
        
        hommesSoc.sort(function(a, b) {
            if (a.year < b.year) {
              return -1;
            } else if (a.year > b.year) {
              return 1;
            } else {
              return 0;
            }
        });

        femmesSoc.sort(function(a, b) {
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
                label: 'Les hommes inscrits à l’UT2J en L2 MIASHS',
                backgroundColor: '#264653',
                borderColor: '#264653',
                data: [37, 37, 85, 90]
            },
            {
                label: 'Les femmes inscrites à l’UT2J en L2 MIASHS',
                backgroundColor: '#2a9d8f',
                borderColor: '#2a9d8f',
                data: [40, 32, 49, 58]
            },
            {
                label: 'Les hommes inscrits à l’UT2J en L2 Sociologie',
                backgroundColor: '#f4a261',
                borderColor: '#f4a261',
                data: hommesSoc.map(item => item.value)
            },
            {
                label: 'Les femmes inscrites à l’UT2J en L2 Sociologie',
                backgroundColor: '#e76f51',
                borderColor: '#e76f51',
                data: femmesSoc.map(item => item.value)
            }],
        }
        
        const config = {
            type: 'line',
            data: data,
            options: {}
        }
        
        const myChart = new Chart(
            document.querySelector('#canvas'),
            config
        );
    }   
}
xhr.send()