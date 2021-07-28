<template>
  <div v-if="!mapLoaded">
    <highcharts
      :constructorType="'mapChart'"
      :options="chartOptions"
      ref="chart"
    ></highcharts>
  </div>
</template>

<script>
import { Chart } from "highcharts-vue";
import Highcharts from "highcharts";
import HighchartsMapModule from "highcharts/modules/map";

HighchartsMapModule(Highcharts);

export default {
  name: "MapChart",
  props: ["mapData"],
  components: {
    highcharts: Chart,
  },
  data() {
    return {
      mapLoaded: true,
      chartOptions: {
        chart: {
          height: 500,
        },
        title: {
          text: "Highmaps basic demo",
        },
        subtitle: {
          text: 'Source map: <a href="http://code.highcharts.com/mapdata/custom/world.js">World, Miller projection, medium resolution</a>',
        },
        mapNavigation: {
          enabled: true,
          buttonOptions: {
            alignTo: "spacingBox",
          },
        },
        colorAxis: {
          min: 0,
        },
        series: [
          {
            name: "Dan so",
            joinBy: ["hc-key", "key"],
          },
        ],
      },
    };
  },
  methods: {
    setData(mapData) {
      const fakeData = mapData?.features.map((feature, index) => ({
        key: feature.properties["hc-key"],
        value: index,
      }));
      return fakeData;
    },
  },
  created() {
    this.chartOptions.chart.map = this.mapData?.default;
    this.chartOptions.series[0].data = this.setData(this.mapData?.default)
    this.mapLoaded = false;
  },
};
</script>