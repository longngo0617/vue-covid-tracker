<template>
  <select
    @change="onChange()"
    v-model="selected"
    class="form-select mt-10 block w-full border p-3 rounded"
  >
    <option value="0">Select Country</option>
    <option v-for="country in countries" :value="country.ID" v-bind:key="country.ID">
      {{ country.Country }}
    </option>
  </select>
</template>

<script>
export default {
  name: "CountrySelect",
  props: ["countries","countryID"],
  data() {
    return {
      selected: this.countryID,
    };
  },
  methods: {
      onChange() {
          const country = this.countries.find((item) => item.ID === this.selected)

          this.$emit('fetch-report',country)
          this.$emit('get-country',country)
      }
  }
};
</script>