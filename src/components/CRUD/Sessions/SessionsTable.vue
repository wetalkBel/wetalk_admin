
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
  
    <template #time="props">
      <span>
        {{ dataFormatter.dateTimeFormatter(props.row.time) }}
      </span>
    </template>
  
    <template #userMail="props">
      <span>
        {{ dataFormatter.usersOneListFormatter(props.row.user).label }}
      </span>
    </template>

    <template #user="props">
      <span>
        {{ props.row.user ? props.row.user.firstName ? props.row.user.firstName : '' + ' ' + props.row.user.lastName ? props.row.user.lastName : '' : ''}}
      </span>
    </template>

    <template #psychologist="props">
      <span>
        {{ props.row.psychologist ? props.row.psychologist.firstName ? props.row.psychologist.firstName: '' + ' ' + props.row.user.lastName ? props.row.user.lastName : '' : ''}}
      </span>
    </template>
  
    <template #psychologistMail="props">
      <span>
        {{ dataFormatter.usersOneListFormatter(props.row.psychologist).label }}
      </span>
    </template>
  
    <template #reportGender="props">
      <span>
        {{ dataFormatter.gendersOneListFormatter(props.row.reportGender).label }}
      </span>
    </template>
  
    <template #reportCommunicationType="props">
      {{dataFormatter.problemCodesManyListFormatter(props.row.reportProblemCode).CommunicationTypes ? dataFormatter.problemCodesManyListFormatter(props.row.reportProblemCode).CommunicationTypes : '' }}
    </template>

    <template #reportAppeal="props">
       {{dataFormatter.problemCodesManyListFormatter(props.row.reportProblemCode).Appeal ? dataFormatter.problemCodesManyListFormatter(props.row.reportProblemCode).Appeal : '' }}
    </template>

    <template #reportProblemCodes="props">
       {{dataFormatter.problemCodesManyListFormatter(props.row.reportProblemCode).ProblemCodes ? dataFormatter.problemCodesManyListFormatter(props.row.reportProblemCode).ProblemCodes : '' }}
    </template>

    <template #reportHelpTypes="props">
       {{dataFormatter.problemCodesManyListFormatter(props.row.reportProblemCode).HelpTypes ? dataFormatter.problemCodesManyListFormatter(props.row.reportProblemCode).HelpTypes : '' }}
    </template>

    <template #reportMethods="props">
       {{dataFormatter.problemCodesManyListFormatter(props.row.reportProblemCode).Methods ? dataFormatter.problemCodesManyListFormatter(props.row.reportProblemCode).Methods : '' }}
    </template>

    <template #reportAddress="props">
          {{dataFormatter.problemCodesManyListFormatter(props.row.reportProblemCode).Address ? dataFormatter.problemCodesManyListFormatter(props.row.reportProblemCode).Address : '' }}
    </template>

    <template #actions="props">
        <div>
          <router-link :to="`/admin/sessions/${props.row.id}/edit`">
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
        'time',
        
        'user',

        'userMail',
        
        'psychologist',

        'psychologistMail',
        
        'status',
        
        'rating',
        
        'reportGender',
        
        'reportAge',
        
        'reportCommunicationType',

        'reportAppeal',

        'reportHelpTypes',

        'reportMethods',

        'reportAddress',

        'reportProblemCodes',
        
        'reportAdvanced',
        
        'reportHours',
        
        'reportMinutes',
         'actions' ],
    options: {
        headings: {
          time: 'Time',
          user: 'User',
          userMail: 'User mail',
          psychologist: 'Psychologist',
          psychologistMail: 'Psychologist mail',
          status: 'Status',
          rating: 'Rating',
          reportGender: 'Gender',
          reportAge: 'Age',
          reportCommunicationType: 'Report Communication Types',
          reportAppeal: 'Report Appeal',
          reportHelpTypes: 'Report Help Types',
          reportMethods: 'Report Methods',
          reportAddress: 'Report Address',
          reportProblemCodes: 'Report Problem Codes',
          reportAdvanced: 'Advanced',
          reportHours: 'Hours',
          reportMinutes: 'Minutes',
        }
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.sessions.loading,
      tableData: state => state.sessions.rows,
      modalOpen: state => state.sessions.modalOpen,
      deleteId: state => state.sessions.deleteId,
    }),
    dataFormatter() {
      return dataFormatter
    }
  },
  methods: {
    ...mapActions({
      getData: 'sessions/getData',
      deleteItem: 'sessions/deleteItem',
    }),
    ...mapMutations({
      setDeleteId: 'sessions/setDeleteId'
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

