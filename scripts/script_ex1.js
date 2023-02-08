const labels = [
    '2018-19',
    '2019-20',
    '2020-21',
    '2021-22',
];

const data = {
    labels: labels,
    datasets: [{
        label: 'Les inscrits à l’UT2J en L2 MIASHS',
        backgroundColor: 'rgb(0, 199, 193)',
        borderColor: 'rgb(0, 199, 193)',
        data: [79, 70, 134, 149],
    }]
};

const config = {
    type: 'line',
    data: data,
    options: {}
};

const myChart = new Chart(
    document.querySelector('.chart1'),
    config
);

const labels2 = [
    '2018-19',
    '2019-20',
    '2020-21',
    '2021-22',
];

const data2 = {
    labels: labels2,
    datasets: [{
        label: 'Nombre d\'inscrits homme',
        backgroundColor: 'rgb(0, 199, 193)',
        borderColor: 'rgb(0, 199, 193)',
        data: [37, 37, 85, 90],
    },{
        label: 'Nombre d\'inscrits femme',
        backgroundColor: 'rgb(199, 0, 193)',
        borderColor: 'rgb(199, 0, 193)',
        data: [40, 32, 49, 58],
    }]
};


const config2 = {
    type: 'line',
    data: data2,
    options: {}
};

const myChart2 = new Chart(
    document.querySelector('.chart2'),
    config2
);


