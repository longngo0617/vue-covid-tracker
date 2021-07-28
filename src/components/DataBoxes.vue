<template>
  <div class="grid md:grid-cols-3 gap-4">
    <!-- Box 1 -->
    <div class="shadow-md bg-blue-100 p-10 text-center rounded">
      <h3 class="text-2xl text-blue-900 font-bold mb-4">Cases</h3>
      <div class="text-1xl mb-4">
        <span class="font-bold">New:</span>
        {{ numberWithCommas(stats.NewConfirmed) }}
      </div>
      <div class="text-1xl mb-4">
        <span class="font-bold">Total:</span>
        {{ numberWithCommas(stats.TotalConfirmed) }}
      </div>
    </div>

    <!-- Box 2 -->
    <div class="shadow-md bg-green-400 p-10 text-center rounded">
      <h3 class="text-2xl text-green-900 font-bold mb-4">Recovered</h3>
      <div class="text-1xl mb-4">
        <span class="font-bold">New:</span>
        {{ numberWithCommas(stats.NewRecovered) }}
      </div>
      <div class="text-1xl mb-4">
        <span class="font-bold">Total:</span>
        {{ numberWithCommas(stats.TotalRecovered) }}
      </div>
    </div>

    <!-- Box 3 -->
    <div class="shadow-md bg-red-400 p-10 text-center rounded">
      <h3 class="text-2xl text-red-900 font-bold mb-4">Deaths</h3>
      <div class="text-1xl mb-4">
        <span class="font-bold">New:</span>
        {{ numberWithCommas(stats.NewDeaths) }}
      </div>
      <div class="text-1xl mb-4">
        <span class="font-bold">Total:</span>
        {{ numberWithCommas(stats.TotalDeaths) }}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "DataBoxes",
  props: ["stats"],
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    },
  },
};
</script>
