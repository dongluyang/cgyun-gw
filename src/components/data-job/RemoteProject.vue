<template>
  <div class="container">
      <div class="card" aria-id="contentIdForA11y3" :key="index" v-for="(project, index) in projectList" >
        <div
          class="card-header"
          role="button"
          aria-controls="contentIdForA11y3">
          <p class="card-header-title">
            <template v-if="!loading">{{project.title}}</template>
            <b-skeleton size="is-large" :active="loading"></b-skeleton>
          </p>
        </div>
        <div class="card-content">
          <div class="content">
            <template v-if="!loading">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
              <a>#buefy</a>.
            </template>
            <b-skeleton size="is-large" :active="loading" :count="2"></b-skeleton>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item">
            <template v-if="!loading">选择</template>
            <b-skeleton size="is-large" :active="loading"></b-skeleton>
          </a>
        </footer>
      </div>
    </div>
</template>

<script>
export default {
name: "RemoteProject",
data(){
  return {
    loading: false,
    projectList:[{
      title: 'Title 1',
      text: 'Text 1'
    },
      {
        title: 'Title 2',
        text: 'Text 2'
      },
      {
        title: 'Title 3',
        text: 'Text 3'
      }]
  }
}
}
</script>

<style scoped>

</style>
