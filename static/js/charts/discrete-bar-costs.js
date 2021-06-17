(function(){
    historicalBarChart = [
        {
            key: "Cumulative Return",
            values: [
                {
                    "label" : "ENERO" ,
                    "value" : 0
                } ,
                {
                    "label" : "FEBRERO" ,
                    "value" : 0
                } ,
                {
                    "label" : "MARZO" ,
                    "value" : 0
                } ,
                {
                    "label" : "ABRIL" ,
                    "value" : 0
                } ,
                {
                    "label" : "MAYO" ,
                    "value" : 0
                } ,
                {
                    "label" : "JUNIO" ,
                    "value" : 3029000
                } ,
                {
                    "label" : "JULIO" ,
                    "value" : 4819000
                } ,
                {
                    "label" : "AGOSTO" ,
                    "value" : 0
                },
                {
                    "label" : "SEPTIEMBRE" ,
                    "value" : 0
                },
                {
                    "label" : "OCTUBRE" ,
                    "value" : 0
                },
                {
                    "label" : "NOVIEMBRE" ,
                    "value" : 0
                },
                {
                    "label" : "DICIEMBRE" ,
                    "value" : 0
                }
            ]
        }
    ];

    nv.addGraph(function() {
        var chart = nv.models.discreteBarChart()
            .x(function(d) { return d.label })
            .y(function(d) { return d.value })
            .staggerLabels(true)
            //.staggerLabels(historicalBarChart[0].values.length > 8)
            .showValues(true)
            .duration(250)
            ;

        d3.select('#chart1 svg')
            .datum(historicalBarChart)
            .call(chart);

        nv.utils.windowResize(chart.update);
        return chart;
    });
}())
