
<template>
  <div>
<!--    <router-link :to="$route.fullPath + '/new'">-->
<!--      <button class="btn btn-primary">-->
<!--        New-->
<!--      </button>-->
<!--    </router-link>-->
    <div v-if="loading"><Loader /></div>
    <div v-else>
      <v-client-table
          :data="tableData"
          :columns="columns"
          :options="options"
          class="mt-3"
      >
        <template #created="props">
          <span>
            {{ dataFormatter.dateTimeFormatter(props.row.createdAt)}}
          </span>
        </template>

        <template #time_processing="props">
          <span>
            {{ dataFormatter.dateTimeFormatter(props.row.timeProcessing)}}
          </span>
        </template>

        <template #processed="props">
          <span>
            {{props.row.isProcessed ? 'Processed' : 'No'}}
          </span>
        </template>

        <template #psy="props">
          <span>

           {{ props.row.psy ? (props.row.psy.firstName ? props.row.psy.firstName : '') + ' ' + (props.row.psy.lastName ? props.row.psy.lastName : '') : ''}}
<!--            {{ dataFormatter.usersOneListFormatter(props.row.psyId)}}-->
          </span>
        </template>

        <template #psy_mail="props">
          <span>
             {{ dataFormatter.usersOneListFormatter(props.row.psy).label}}
          </span>
        </template>

        <template #actions="props">
          <div>
            <router-link :to="`/admin/calls/${props.row.id}/edit`">
              <button class="btn btn-primary btn-xs mx-1">
                Edit
              </button>
            </router-link>
  <!--          <button @click="setDeleteId(props.row.id)" class="btn btn-danger mx-1 btn-xs" v-b-modal.del>-->
  <!--            Delete-->
  <!--          </button>-->
          </div>
        </template>
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
      columns: ['phoneNumber', 'created', 'processed', 'time_processing','psy', 'psy_mail', 'actions'],
      options: {
        headings: {
          phoneNumber: 'Phone Number',
          created: 'created',
          processed: 'isProcessed',
          psy: 'psy',
          psy_mail: 'psy_mail',
          time_processing: 'time_processing'
        }
      },
    }
  },
  computed: {
    ...mapState({
      loading: state => state.calls.loading,
      tableData: state => state.calls.rows,
      modalOpen: state => state.calls.modalOpen,
      deleteId: state => state.calls.deleteId,
    }),
    dataFormatter() {
      return dataFormatter
    }
  },
  methods: {
    ...mapActions({
      getData: 'calls/getData',
      deleteItem: 'calls/deleteItem',
    }),
    ...mapMutations({
      setDeleteId: 'calls/setDeleteId'
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

