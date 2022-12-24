<template>
  <div style="margin-top: 72px;">
    {{domainList}}
  </div>
</template>

<script>
import { mapGetters} from "vuex";
export default {
  name: "DomainAndIpList",
  computed: {
    ...mapGetters([
      "domainList"
    ]),
  },
}
</script>

<style scoped>

</style>
