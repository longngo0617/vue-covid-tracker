<template>
    <highcharts :options="chartOptions" ref="chart" />
</template>

<script>
import { Chart } from "highcharts-vue";
import moment from "moment";

export default {
  name: "LineChart",
  props: ["data"],
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          height: 500,
        },
        title: {
          text: "Tổng ca nhiễm",
        },
        xAxis: {
          categories: this.data.map((item) =>
            moment(item.Date).format("DD/MM/YYYY")
          ),
          crosshair: true,
        },
        yAxis: {
          min: 0,
          title: {
            text: null,
          },
          labels: {
            align: "right",
          },
        },
        tooltip: {
          headerFormat:
            '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat:
            '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
          footerFormat: "</table>",
          shared: true,
          useHTML: true,
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
        colors: ["#F3585B"],
        series: [
          {
            name: "Tổng ca nhiễm",
            data: this.data.map((item) => item.Confirmed),
          },
        ],
      },
    };
  },
};
</script>