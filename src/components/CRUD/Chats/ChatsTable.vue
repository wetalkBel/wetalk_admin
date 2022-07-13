
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
  
    <template #user="props">
      <span>
        {{ dataFormatter.usersOneListFormatter(props.row.user).label }}
      </span>
    </template>
  
    <template #consult="props">
      <span>
        {{ dataFormatter.usersOneListFormatter(props.row.consult).label }}
      </span>
    </template>

    <template #created="props">
      <span>
        {{ dataFormatter.dateTimeFormatter(props.row.createdAt)}}
      </span>
     </template>

    <template #updated="props">
      <span>
        {{ dataFormatter.dateTimeFormatter(props.row.updatedAt)}}
      </span>
    </template>
  
<!--      <template #actions="props">-->
<!--        <div>-->
<!--          <router-link :to="`/admin/chats/${props.row.id}/edit`">-->
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
        'id',
        'name',
        
        'user',
        
        'consult',

        'created',

        'updated'

         // 'actions'
    ],
      options: {
        headings: {
          id: 'id',
          name: 'name',
          user: 'user',
          consult: 'consult',
          created: 'created',
          updated: 'updated'
        }
      },
    }
  },
  computed: {
    ...mapState({
      loading: state => state.chats.loading,
      tableData: state => state.chats.rows,
      modalOpen: state => state.chats.modalOpen,
      deleteId: state => state.chats.deleteId,
    }),
    dataFormatter() {
      return dataFormatter
    }
  },
  methods: {
    ...mapActions({
      getData: 'chats/getData',
      deleteItem: 'chats/deleteItem',
    }),
    ...mapMutations({
      setDeleteId: 'chats/setDeleteId'
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

