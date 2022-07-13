
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
  
    <template #page="props">
      <span>
        {{ dataFormatter.pagesOneListFormatter(props.row.page).label }}
      </span>
    </template>
  
    <template #module_type="props">
      <span>
        {{ dataFormatter.module_typesOneListFormatter(props.row.module_type).label }}
      </span>
    </template>
  
      <template #actions="props">
        <div>
          <router-link :to="`/admin/modules/${props.row.id}/edit`">
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
        
        'page',
        
        'module_type',
        
        'order',
         'actions' ],
      options: {
        headings: {
          name: 'Name',
          page: 'Page',
          module_type: 'Module type',
          order: 'Order',
          
        }
      },
    }
  },
  computed: {
    ...mapState({
      loading: state => state.modules.loading,
      tableData: state => state.modules.rows,
      modalOpen: state => state.modules.modalOpen,
      deleteId: state => state.modules.deleteId,
    }),
    dataFormatter() {
      return dataFormatter
    }
  },
  methods: {
    ...mapActions({
      getData: 'modules/getData',
      deleteItem: 'modules/deleteItem',
    }),
    ...mapMutations({
      setDeleteId: 'modules/setDeleteId'
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

