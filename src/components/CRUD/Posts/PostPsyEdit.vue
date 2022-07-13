
<template>
    <Widget>
        <form @submit.prevent="submitHandler">
        <h4 class="h4">Edit Post</h4>
        
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

<!--            <b-form-group-->
<!--                label="Body"-->
<!--                label-for="body"-->
<!--            >-->
<!--                <b-form-textarea-->
<!--                  :rows="3"-->
<!--                  id="idm3657255920"-->
<!--                  label="body"-->
<!--                  v-model="body"-->
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
            
<!--            <b-form-group-->
<!--                label="Tags"-->
<!--                label-for="idm3657346144"-->
<!--            >-->
<!--                <v-select-->
<!--                    inputId="idm3657346144"-->
<!--                    :options="optionsTags"-->
<!--                    v-model="tags"-->
<!--                    @search="searchTags"-->
<!--                    multiple-->
<!--                >-->
<!--                    <template #option="option">-->
<!--                    {{ option.label }}-->
<!--                    </template>-->
<!--                </v-select>-->
<!--        </b-form-group>-->

        <b-form-group
              label="Approved"
              label-for="idm3657414167"
          >
            <v-select
                inputId="idm3657414167"
                v-model="approved"
                :options="optionsApprove"
            >
              <template #option="option">
                {{ option.label }}
              </template>
            </v-select>
        </b-form-group>
        
        <b-row>
            <b-col>
                <button type="submit" class="btn btn-primary">
                    Save
                </button>
                <button @click="formatData" type="button" class="btn btn-light ml-2">
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
import { mapState, mapActions } from 'vuex'
import { VueEditor } from "vue2-editor";
import dataFormatter from '@/use/dataFormatter.js'
import ImageUploader from '@/components/Uploaders/ImageUploader'
import FileUploader from '@/components/Uploaders/FileUploader'

export default {
    data () {
      return {
        id: null,
        preview: [],
        name: '',
        body: '',
        author: '',
        approved: '',
        optionsApprove: [
          {value: true, label: 'Опубликовать'},
          {value: false, label: 'Черновик'}
        ]
        // tags:[],
    }
  },
  computed: {
    ...mapState({
        data: state => state.articlesForm.data,
    
        optionsAuthor: state => state.articlesForm.searchResultAuthor,
        
        // optionsTags: state => state.articlesForm.searchResultTags,
        
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
        getData: 'articlesForm/getData',
        
        searchAuthor: 'articlesForm/searchAuthor',
        
        // searchTags: 'articlesForm/searchTags',
        
        edit: 'articlesForm/edit'
    }),
    async submitHandler() {
        const data = this.data

        data.preview = this.preview
        data.name = this.name
        data.body = this.body
        data.author = this.author
        data.tags = this.tags
        data.author  = this.author.value
        data.approved = this.approved.value
        data.isPsy = true

        //data.tags = this.tags.map(item => item.id)
        

        try {
            await this.edit({id: this.id, data})
            this.$router.push('/admin/posts')
        } catch (e) {
            this._vm.$toasted.show('Error: ' + e, {
                type : 'error'
            })
        }
    },
    previewAdd(val) {
            this.preview.push(val)
        },
        previewDel(id) {
            this.preview = this.preview.filter(img => img.id !== id)
        },
        
        formatData() {
            
            this.preview = this.data.preview
            this.name = this.data.name
            this.body = this.data.body
            this.author = dataFormatter.usersNameOptionsListFormatter(this.data.author)
            this.approved = this.data.approved ? 'Опубликован' : ' Черновик'
            //this.tags = dataFormatter.tagsManyListFormatterEdit(this.data.tags)
            
        }
     },
    async beforeMount() {
        try {
        
                await this.searchAuthor()
            
                //await this.searchTags()
            
            const pathArray = this.$route.fullPath.split('/')
            const id = pathArray[pathArray.length - 2]
            this.id = id
            await this.getData(id)

            this.formatData()
        } catch (e) {
            this._vm.$toasted.show('Error ' + e, {
                type : 'error'
            })
        }
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

