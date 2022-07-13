
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
    <template #chat="props">
      <span>
        {{ dataFormatter.chatsOneListFormatter(props.row.chat).label }}
      </span>
    </template>

    <template #chatId="props">
      <span>
        {{props.row.chatId}}
      </span>
    </template>

    <template #body="props">
      <span class="text-break">
        {{props.row.body}}
      </span>
    </template>
  
    <template #from="props">
      <span>
        {{ dataFormatter.usersOneListFormatter(props.row.from).label }}
      </span>
    </template>
  
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
<!--          <router-link :to="`/admin/messages/${props.row.id}/edit`">-->
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
        'chat',

        'chatId',
        
        'body',
        
        'from',
        
        'to',

        'created'
    ],
      options: {
        headings: {
          chat: 'Chat',
          chatId: 'chatId',
          body: 'Body',
          from: 'From',
          to: 'To',
          created: 'created'
        }
      },
    }
  },
  computed: {
    ...mapState({
      loading: state => state.messages.loading,
      tableData: state => state.messages.rows,
      modalOpen: state => state.messages.modalOpen,
      deleteId: state => state.messages.deleteId,
    }),
    dataFormatter() {
      return dataFormatter
    }
  },
  methods: {
    ...mapActions({
      getData: 'messages/getData',
      deleteItem: 'messages/deleteItem',
    }),
    ...mapMutations({
      setDeleteId: 'messages/setDeleteId'
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

