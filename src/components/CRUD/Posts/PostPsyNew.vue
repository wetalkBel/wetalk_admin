<template>
  <Widget>
    <form @submit.prevent="submitHandler">
      <h4 class="h4">New Post</h4>

      <ImageUploader
          label="Preview"
          id="idm3657410656"
          url="posts/preview"
          :images="preview"
          @change="previewAdd"
          @del="previewDel"
      />

      <b-form-group
          label="Name"
          label-for="idm3657144720"
      >
        <b-form-input
            v-model="name"
            type="text"
            id="idm3657144720"
        ></b-form-input>
      </b-form-group>

      <vue-editor
          v-model="body"
      />

      <!--                <b-form-group-->
      <!--                    label="Body"-->
      <!--                    label-for="body"-->
      <!--                >-->
      <!--                <b-form-textarea-->
      <!--                    :rows="3"-->
      <!--                    id="idm3657255920"-->
      <!--                    label="body"-->
      <!--                    v-model="body"-->
      <!--                />-->
      <!--            </b-form-group>-->

      <b-form-group
          label="Author"
          label-for="idm3657414144"
      >
        <v-select
            inputId="idm3657414144"
            v-model="author"
            :options="optionsAuthor"
            @search="searchAuthor"
        >
          <template #option="option">
            {{ option.label }}
          </template>
        </v-select>
      </b-form-group>

      <b-form-group
          label="Approved"
          label-for="idm3657414174"
      >
        <v-select
            inputId="idm3657414174"
            v-model="approved"
            :options="optionsApprove"
        >
          <template #option="option">
            {{ option.label }}
          </template>
        </v-select>
      </b-form-group>

      <!--    <b-form-group-->
      <!--        label="Tags"-->
      <!--        label-for="idm3657346144"-->
      <!--    >-->
      <!--        <v-select-->
      <!--            inputId="idm3657346144"-->
      <!--            :options="optionsTags"-->
      <!--            v-model="tags"-->
      <!--            @search="searchTags"-->
      <!--            multiple-->
      <!--        >-->
      <!--            <template #option="option">-->
      <!--            {{ option.label }}-->
      <!--            </template>-->
      <!--        </v-select>-->
      <!--    </b-form-group>-->

      <b-row>
        <b-col>
          <button type="submit" class="btn btn-primary">
            Save
          </button>
          <button @click="resetData" type="button" class="btn btn-light ml-2">
            Reset
          </button>
          <router-link :to="cancelUrl">
            <button type="button" class="btn btn-light ml-2">
              Cancel
            </button>
          </router-link>
        </b-col>
      </b-row>
    </form>
  </Widget>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import dataFormatter from '@/use/dataFormatter.js';
import ImageUploader from '@/components/Uploaders/ImageUploader';
import FileUploader from '@/components/Uploaders/FileUploader';
import {VueEditor} from "vue2-editor";

export default {
  data() {
    return {
      id: null,
      preview: [],
      name: '',
      body: '',
      author: '',
      tags: [],
      approved: '',
      optionsApprove: [
        {value: true, label: 'Опубликовать'},
        {value: false, label: 'Черновик'}
      ]

    }
  },
  computed: {
    ...mapState({
      data: state => state.articlesForm.data,

      optionsAuthor: state => state.articlesForm.searchResultAuthor,

      //optionsTags: state => state.articlesForm.searchResultTags,

    }),
    cancelUrl() {
      return '/' + this.$route.fullPath
          .split('/')
          .slice(1)
          .splice(0, 2)
          .join('/')
    },
    dataFormatter() {
      return dataFormatter
    }
  },
  methods: {
    ...mapActions({

      searchAuthor: 'articlesForm/searchAuthor',

      //searchTags: 'articlesForm/searchTags',

      newHandler: 'articlesForm/newHandler'
    }),
    async submitHandler() {
      const data = {
        preview: this.preview,
        name: this.name,
        body: this.body,
        author: this.author,
        approved: true,
        isPsy: this.approved.value
        //tags: this.tags,

      }

      data.author = this.author.value

      //data.tags = this.tags.map(item => item.id)

      try {
        await this.newHandler({data})
        this.$router.push('/admin/posts')
      } catch (e) {
        this._vm.$toasted.show('Error: ' + e, {
          type: 'error'
        })
      }
    },
    previewAdd(val) {
      this.preview.push(val)
    },
    previewDel(id) {
      this.preview = this.preview.filter(img => img.id !== id)
    },

    resetData() {

      this.preview = []

      this.name = ''

      this.body = ''

      this.author = ''

      this.approved = ''

      // this.tags = []

    },
  },
  async beforeMount() {

    await this.searchAuthor()
    //
    // await this.searchTags()

  },
  components: {ImageUploader, FileUploader, VueEditor}
}
</script>

<style scoped>

.image-preview {
  width: 191px;
  height: 141px;
  background-size: cover;
  background-position: 50% center;
}

</style>

