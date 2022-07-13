
<template>
  <div>
<!--  <router-link :to="$route.fullPath + '/new'">-->
<!--    <button class="btn btn-primary">-->
<!--      New-->
<!--    </button>-->
<!--  </router-link>-->
    <div v-if="loading"><Loader /></div>
    <div v-else>
      <v-client-table
        :data="tableData"
        :columns="columns"
        :options="options"
        class="mt-3"
    >
  
    <template #to="props">
      <span>
        {{ dataFormatter.usersOneListFormatter(props.row.to).label }}
      </span>
    </template>

    <template #created="props">
      <span>
        {{ dataFormatter.dateTimeFormatter(props.row.createdAt)}}
      </span>
    </template>
  
<!--    <template #is_read="props">-->
<!--      <span>-->
<!--        {{ dataFormatter.booleanFormatter(props.row.is_read) }}-->
<!--      </span>-->
<!--    </template>-->
  
<!--      <template #actions="props">-->
<!--        <div>-->
<!--          <router-link :to="`/admin/notification/${props.row.id}/edit`">-->
<!--          <button class="btn btn-primary btn-xs mx-1">-->
<!--            Edit-->
<!--          </button>-->
<!--        </router-link>-->
<!--          <button @click="setDeleteId(props.row.id)" class="btn btn-danger mx-1 btn-xs" v-b-modal.del>-->
<!--            Delete-->
<!--          </button>-->
<!--        </div>-->
<!--      </template>-->
    </v-client-table>
    </div>

<!--    <b-modal id="del" title="Confirm delete" body-class="bg-white" cancel-variant="default">-->
<!--      Are you sure you want to delete this item?-->

<!--      <template #modal-footer="props">-->
<!--        <button class="btn btn-secondary" @click="$bvModal.hide('del')">-->
<!--          Cancel-->
<!--        </button>-->
<!--        <button class="btn btn-primary" @click="del">-->
<!--          Delete-->
<!--        </button>-->
<!--      </template>-->
<!--    </b-modal>-->
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
        
        'to',
        
        'body',

        'created'
    ],
      options: {
        headings: {
          name: 'Name',
          to: 'To',
          body: 'Body',
          created: 'Created'
        }
      },
    }
  },
  computed: {
    ...mapState({
      loading: state => state.notification.loading,
      tableData: state => state.notification.rows,
      modalOpen: state => state.notification.modalOpen,
      deleteId: state => state.notification.deleteId,
    }),
    dataFormatter() {
      return dataFormatter
    }
  },
  methods: {
    ...mapActions({
      getData: 'notification/getData',
      deleteItem: 'notification/deleteItem',
    }),
    ...mapMutations({
      setDeleteId: 'notification/setDeleteId'
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

