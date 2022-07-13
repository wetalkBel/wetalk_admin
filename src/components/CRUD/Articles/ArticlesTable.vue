<template>
  <div>
    <router-link :to="$route.fullPath + '/new'">
      <button class="btn btn-primary">
        New
      </button>
    </router-link>
    <div v-if="loading">
      <Loader/>
    </div>
    <div v-else>
      <v-client-table
          :data="tableData"
          :columns="columns"
          :options="options"
          class="mt-3"
      >

        <template #preview="props">
          <div
              :style="{background: `url(${dataFormatter.oneImageFormatter(props.row.preview)}) center center / cover`}"
              class="table-img"
          ></div>
        </template>

        <template #author_mail="props">
          <span>
            {{ dataFormatter.usersOneListFormatter(props.row.author).label }}
          </span>
        </template>

        <template #author="props">
          <span>
            {{ dataFormatter.usersNameFormatter(props.row.author).label}}
          </span>
        </template>

        <template #tags="props">
          <span
              v-for="(item, idx) in dataFormatter.tagsManyListFormatter(props.row.tags)"
              :key="idx + props.row.tags"
              class="d-block"
          >
            {{ item }}
          </span>
        </template>

        <template #approved="props">
          <span>
            {{ props.row.approved ? 'Опубликован' : 'Черновик' }}
          </span>
        </template>

        <template #actions="props">
          <div>
            <router-link :to="`/admin/articles/${props.row.id}/edit`">
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
        'preview',

        'name',

        'author_mail',

        'author',

        'tags',

        'approved',

        'actions'
      ],
      options: {
        headings: {
          preview: 'Preview',
          name: 'Name',
          author_mail: 'Author_mail',
          approved: 'Approved',
          tags: 'Tags',
        }
      },
    }
  },
  computed: {
    ...mapState({
      loading: state => state.posts.loading,
      tableData: state => state.posts.rows,
      modalOpen: state => state.posts.modalOpen,
      deleteId: state => state.posts.deleteId,
    }),
    dataFormatter() {
      return dataFormatter
    }
  },
  methods: {
    ...mapActions({
      getData: 'posts/getData',
      deleteItem: 'posts/deleteItem',
    }),
    ...mapMutations({
      setDeleteId: 'posts/setDeleteId'
    }),
    del() {
      this.$bvModal.hide('del')
      this.deleteItem()
    }
  },
  beforeMount() {
    this.getData()
  },
  components: {Loader},
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

