<template>
  <main v-if="!loading">
    <DataTitle :text="title" :dataDate="dataDate" />

    <DataBoxes :stats="stats" />
    <CountrySelect
      :countries="countries"
      :countryID="countryID"
      @get-country="getCountryData"
      @fetch-report="fetchReportByCountry"
    />

    <button
      @click="clearCountryData"
      v-if="stats.Country"
      class="
        bg-green-700
        text-white
        rounded
        p-3
        mt-10
        focus:outline-none
        hover:bg-green-600
      "
    >
      Clear Country
    </button>
    <div class="grid md:grid-cols-2 gap-4" v-if="dataReport.length">
      <LineChart :data="dataReport"  />
      <MapChart :mapData="mapData" />
    </div>
  </main>
  <main class="flex flex-col align-center justify-center text-center" v-else>
    <div class="text-gray-500 text-3xl mt-10 mb-6">Fetching Data</div>
    <img :src="loadingImage" class="w-24 m-auto" alt="" />
  </main>
</template>

<script>
import DataTitle from "@/components/DataTitle";
import DataBoxes from "@/components/DataBoxes";
import CountrySelect from "@/components/CountrySelect";
import LineChart from "@/components/LineChart";
import MapChart from "@/components/MapChart";
import moment from "moment";

export default {
  name: "Home",
  components: {
    DataTitle,
    DataBoxes,
    CountrySelect,
    LineChart,
    MapChart,
  },
  data() {
    return {
      loading: true,
      title: "Global",
      dataDate: "",
      stats: "",
      countries: [],
      loadingImage: require("../assets/hourglass.gif"),
      dataReport: [],
      countryID: 0,
      mapData: null,
    };
  },
  methods: {
    async fetchCovidData() {
      const res = await fetch("https://api.covid19api.com/summary");
      const data = await res.json();
      return data;
    },
    getCountryData(country) {
      this.stats = country;
      this.title = country.Country;
    },
    async clearCountryData() {
      this.loading = true;
      const data = await this.fetchCovidData();
      this.title = "Global";
      this.stats = data.Global;
      this.loading = false;
      this.dataReport = [];
      this.countryID = 0;
    },
    async fetchReportByCountry(country) {
      this.loading = true;
      const res = await fetch(
        `https://api.covid19api.com/dayone/country/${
          country.Slug
        }?from=2021-01-01T00:00:00&to=${moment().utc(0).format()}`
      );
      const data = await res.json();
      this.dataReport = data;
      this.countryID = country.ID;

      this.mapData = await import(
        `@highcharts/map-collection/countries/${country.CountryCode.toLowerCase()}/${country.CountryCode.toLowerCase()}-all.geo.json`
      );
      this.loading = false;
    },
  },
  async created() {
    const data = await this.fetchCovidData();
    this.dataDate = data.Date;
    this.stats = data.Global;
    this.countries = data.Countries;
    this.loading = false;
  },
};
</script>
