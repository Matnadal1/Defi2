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
    document.querySelector('canvas'),
    config
);