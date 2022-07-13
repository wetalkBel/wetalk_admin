
<template>
  <div>
  <router-link :to="$route.fullPath + '/new'">
    <button class="btn btn-primary">
      New
    </button>
  </router-link>
    <div v-if="loading"><Loader /></div>
    <div v-else>
      <v-client-table
          :data="tableData"
          :columns="columns"
          :options="options"
          class="mt-3"
      >

<!--        <template #isOnline="props">-->
<!--          <span>-->
<!--            {{ dataFormatter.booleanFormatter(props.row.isOnline) }}-->
<!--          </span>-->
<!--        </template>-->

        <template #disabled="props">
          <span>
            {{ dataFormatter.booleanFormatter(props.row.disabled) }}
          </span>
        </template>

        <template #avatar="props">
          <div
              :style="{background: `url(${dataFormatter.oneImageFormatter(props.row.avatar)}) center center / cover`}"
              class="table-img"
          ></div>
        </template>

        <template #city="props">
          <span>
            {{ dataFormatter.citiesOneListFormatter(props.row.city).label }}
          </span>
        </template>

        <template #gender="props">
          <span>
            {{ dataFormatter.gendersOneListFormatter(props.row.gender).label }}
          </span>
        </template>

        <template #method="props">
          <span
              v-for="(item, idx) in dataFormatter.methodsManyListFormatter(props.row.method)"
              :key="idx + props.row.method"
              class="d-block"
          >
            {{ item + ', '}}
          </span>
        </template>

        <template #role="props">
          <span>
            {{props.row.role && props.row.role.join(', ')}}
          </span>
        </template>

        <template #equal_consultants="props">
          <span
              v-for="(item, idx) in dataFormatter.targetsManyListFormatter(props.row.targets)"
              :key="idx + props.row.targets"
              class="d-block"
          >
            {{ item }}
          </span>
        </template>

        <template #actions="props">
          <div>
            <router-link :to="`/admin/users/${props.row.id}/edit`">
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

        'firstName',
        
        'lastName',
        
        'age',
        
        'phoneNumber',
        
        'email',
        
        'role',

        'equal_consultants',
        
        'disabled',
        
        'avatar',
        
        'city',
        
        'gender',
        
        'method',

         'actions' ],
      options: {
        headings: {
          isOnline: 'isOnline',
          firstName: 'First Name',
          lastName: 'Last Name',
          age: 'age',
          phoneNumber: 'Phone Number',
          email: 'E-mail',
          role: 'Role',
          equal_consultants: 'Equal consultants',
          disabled: 'Disabled',
          avatar: 'Avatar',
          city: 'City',
          gender: 'Gender',
          method: 'Method',
          
        }
      },
    }
  },
  computed: {
    ...mapState({
      loading: state => state.users.loading,
      tableData: state => state.users.rows,
      modalOpen: state => state.users.modalOpen,
      deleteId: state => state.users.deleteId,
    }),
    dataFormatter() {
      return dataFormatter
    }
  },
  methods: {
    ...mapActions({
      getData: 'users/getData',
      deleteItem: 'users/deleteItem',
    }),
    ...mapMutations({
      setDeleteId: 'users/setDeleteId'
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

