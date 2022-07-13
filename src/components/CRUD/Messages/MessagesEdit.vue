
<template>
    <Widget>
        <form @submit.prevent="submitHandler">
        <h4 class="h4">Edit Messages</h4>
        
            <b-form-group
                    label="Chat"
                    label-for="idm3393588096"
            >
                <v-select
                    inputId="idm3393588096"
                    v-model="chat"
                    :options="optionsChat"
                    @search="searchChat"
                >
                    <template #option="option">
                        {{ option.label }}
                    </template>
                </v-select>
            </b-form-group>
            
            <b-form-group
                label="Body"
                label-for="body"
            >
                <b-form-textarea
                  :rows="3"
                  id="idm2725167600"
                  label="body"
                  v-model="body"
                />
            </b-form-group>
            
            <b-form-group
                    label="From"
                    label-for="idm3393508464"
            >
                <v-select
                    inputId="idm3393508464"
                    v-model="from"
                    :options="optionsFrom"
                    @search="searchFrom"
                >
                    <template #option="option">
                        {{ option.label }}
                    </template>
                </v-select>
            </b-form-group>
            
            <b-form-group
                    label="To"
                    label-for="idm2724983024"
            >
                <v-select
                    inputId="idm2724983024"
                    v-model="to"
                    :options="optionsTo"
                    @search="searchTo"
                >
                    <template #option="option">
                        {{ option.label }}
                    </template>
                </v-select>
            </b-form-group>
            
            <b-form-group class="abc-checkbox">
                <input
                    type="checkbox"
                    v-model="is_read"
                    id="idm2725326640"
                />
                <label for="idm2725326640">Is Read</label>
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
import dataFormatter from '@/use/dataFormatter.js'
import ImageUploader from '@/components/Uploaders/ImageUploader'
import FileUploader from '@/components/Uploaders/FileUploader'

export default {
    data () {
      return {
        id: null,
        chat: '',
        body: '',
        from: '',
        to: '',
        is_read: false,
        
    }
  },
  computed: {
    ...mapState({
        data: state => state.messagesForm.data,
    
        optionsChat: state => state.messagesForm.searchResultChat,
        
        optionsFrom: state => state.messagesForm.searchResultFrom,
        
        optionsTo: state => state.messagesForm.searchResultTo,
        
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
        getData: 'messagesForm/getData',
        
        searchChat: 'messagesForm/searchChat',
        
        searchFrom: 'messagesForm/searchFrom',
        
        searchTo: 'messagesForm/searchTo',
        
        edit: 'messagesForm/edit'
    }),
    async submitHandler() {
        const data = this.data

        
        data.chat = this.chat
        data.body = this.body
        data.from = this.from
        data.to = this.to
        data.is_read = this.is_read
        data.chat  = this.chat.value
        
        data.from  = this.from.value
        
        data.to  = this.to.value
        

        try {
            await this.edit({id: this.id, data})
            this.$router.push('/admin/messages')
        } catch (e) {
            this._vm.$toasted.show('Error: ' + e, {
                type : 'error'
            })
        }
    },
    
        formatData() {
            
            this.chat = dataFormatter.chatsOneListFormatter(this.data.chat)
            
            this.body = this.data.body
            this.from = dataFormatter.usersOneListFormatter(this.data.from)
            
            this.to = dataFormatter.usersOneListFormatter(this.data.to)
            
        }
     },
    async beforeMount() {
        try {
        
                await this.searchChat()
            
                await this.searchFrom()
            
                await this.searchTo()
            
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
    components: {ImageUploader, FileUploader}
}
</script>

<style scoped>

</style>

