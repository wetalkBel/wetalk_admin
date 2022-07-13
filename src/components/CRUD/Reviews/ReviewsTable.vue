
<template>
  <div>
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

        <template #user_mail="props">
          <span>
            {{ dataFormatter.usersOneListFormatter(props.row.user).label }}
          </span>
        </template>

        <template #user="props">
          <span>
           {{props.row.user ? props.row.user.firstName ? props.row.user.firstName : '' + ' ' + props.row.user.lastName ? props.row.user.lastName : '' : ''}}
          </span>
        </template>

        <template #psychologist_mail="props">
          <span>
            {{ dataFormatter.usersOneListFormatter(props.row.psychologist).label }}
          </span>
        </template>

        <template #psychologist="props">
          <span>
           {{props.row.psychologist ? props.row.psychologist.firstName ? props.row.psychologist.firstName : '' + ' ' + props.row.psychologist.lastName ? props.row.psychologist.lastName : '' : ''}}
          </span>
        </template>

<!--        <template #reportGender="props">-->
<!--      <span>-->
<!--        {{ dataFormatter.gendersOneListFormatter(props.row.reportGender).label }}-->
<!--      </span>-->
<!--        </template>-->

<!--        <template #reportProblemCode="props">-->
<!--    <span-->
<!--        v-for="(item, idx) in dataFormatter.problemCodesManyListFormatter(props.row.reportProblemCode)"-->
<!--        :key="idx + props.row.reportProblemCode"-->
<!--        class="d-block"-->
<!--    >-->
<!--      {{ item }}-->
<!--    </span>-->
<!--        </template>-->

<!--        <template #actions="props">-->
<!--          <div>-->
<!--            <router-link :to="`/admin/sessions/${props.row.id}/edit`">-->
<!--              <button class="btn btn-primary btn-xs mx-1">-->
<!--                Edit-->
<!--              </button>-->
<!--            </router-link>-->
<!--            <button @click="setDeleteId(props.row.id)" class="btn btn-danger mx-1 btn-xs" v-b-modal.del>-->
<!--              Delete-->
<!--            </button>-->
<!--          </div>-->
<!--        </template>-->
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
import {mapState, mapActions} from "vuex"
import Loader from '@/components/Loader/Loader'
import dataFormatter from '@/use/dataFormatter.js'

export default {
  data() {
    return {
      columns: [
        'time',

        'user',

        'user_mail',

        'psychologist',

        'psychologist_mail',

        'status',

        'rating',

        'comment',
      ],
      options: {
        headings: {
          time: 'Time',
          user: 'User',
          user_mail: 'User_mail',
          psychologist: 'Psychologist',
          psychologist_mail: 'Psychologist_mail',
          status: 'Status',
          rating: 'Rating',
          comment: 'Comment'
        }
      },
    }
  },
  computed: {
    ...mapState({
      loading: state => state.reviews.loading,
      tableData: state => state.reviews.rows
    }),
    dataFormatter() {
      return dataFormatter
    }
  },
  methods: {
    ...mapActions({
      getData: 'reviews/getData'
    }),
    // ...mapMutations({
    //   setDeleteId: 'reviews/setDeleteId'
    // }),
    // del() {
    //   this.$bvModal.hide('del')
    //   this.deleteItem()
    // }
  },
  beforeMount() {
    this.getData()
  },
  components: { Loader },
}
</script>

<style scoped>
</style>

