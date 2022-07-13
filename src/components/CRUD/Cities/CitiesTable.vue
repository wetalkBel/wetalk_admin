
<template>
  <div>
  <router-link :to="$route.fullPath + '/new'">
    <button class="btn btn-primary">
      New
    </button>
  </router-link>
    <div v-if="loading"><Loader /></div>
    <v-client-table
        v-else
        :data="tableData"
        :columns="columns"
        :options="options"
        class="mt-3"
    >
  
      <template #actions="props">
        <div>
          <router-link :to="`/admin/cities/${props.row.id}/edit`">
          <button class="btn btn-primary btn-xs mx-1">
            Edit
          </button>
        </router-link>
          <button @click="setDeleteId(props.row.id)" class="btn btn-danger mx-1 btn-xs" v-b-modal.del>
            Delete
          </button>
        </div>
      </template>
    </v-client-table>

    <b-modal id="del" title="Confirm delete" body-class="bg-white" cancel-variant="default">
      Are you sure you want to delete this item?

      <template #modal-footer="props">
        <button class="btn btn-secondary" @click="$bvModal.hide('del')">
          Cancel
        </button>
        <button class="btn btn-primary" @click="del">
          Delete
        </button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import {mapState, mapActions, mapMutations} from "vuex"
import Loader from '@/components/Loader/Loader'
import dataFormatter from '@/use/dataFormatter.js'

export default {
  data() {
    return {
    columns: [
        'name',
         'actions' ],
      options: {
        headings: {
          name: 'Name',
          
        }
      },
    }
  },
  computed: {
    ...mapState({
      loading: state => state.cities.loading,
      tableData: state => state.cities.rows,
      modalOpen: state => state.cities.modalOpen,
      deleteId: state => state.cities.deleteId,
    }),
    dataFormatter() {
      return dataFormatter
    }
  },
  methods: {
    ...mapActions({
      getData: 'cities/getData',
      deleteItem: 'cities/deleteItem',
    }),
    ...mapMutations({
      setDeleteId: 'cities/setDeleteId'
    }),
    del() {
      this.$bvModal.hide('del')
      this.deleteItem()
    }
  },
  beforeMount() {
    this.getData()
  },
  components: { Loader },
}
</script>

<style scoped>
.image-preview {
  width: 191px;
  height: 141px;
  background-size: cover;
  background-position: 50% center;
}
.table-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.file {
  display: block;
  white-space: nowrap;
}
</style>

