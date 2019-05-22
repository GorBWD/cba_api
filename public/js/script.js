function updateRates(e) {
    e.preventDefault();
    // display none h2 teg
    document.getElementsByClassName("title")[0].style.display = "none";

    const start = e.target.start.value;
    const end = e.target.end.value;
    const codes = e.target.codes.value;

    $.getJSON(
        `http://localhost:3000/rates?start=${start}&end=${end}&codes=${codes}`,
        function (data) {
            // console.log(data);
            data = data.map(item => {
                return item.map((element, i) => {
                    if (i !== 0) {
                        return parseFloat(element);
                    }

                    return element;
                });
            });

            Highcharts.chart('container', {
                title: {
                    text: 'CBA Api'
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Exchange rate'
                    }
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, Highcharts.getOptions().colors[0]],
                                [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },
                series: [{
                    type: 'area',
                    name: codes,
                    data: data
                }]
            });
        }
    );
}