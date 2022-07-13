
        <template>
            <Widget>
                <form @submit.prevent="submitHandler">
                <h4 class="h4">New Messages</h4>
                
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
            
                    searchChat: 'messagesForm/searchChat',
                
                    searchFrom: 'messagesForm/searchFrom',
                
                    searchTo: 'messagesForm/searchTo',
                
            newHandler: 'messagesForm/newHandler'
        }),
    async submitHandler() {
        const data = {
        chat: this.chat,
        body: this.body,
        from: this.from,
        to: this.to,
        is_read: this.is_read,
        
        }
        
                data.chat  = this.chat.value
            
                data.from  = this.from.value
            
                data.to  = this.to.value
            
            try {
                await this.newHandler({data})
                this.$router.push('/admin/messages')
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e, {
                    type : 'error'
                })
            }
    },
    
        resetData() {
            
                this.chat = ''
            
                this.body = ''
            
                this.from = ''
            
                this.to = ''
            
                this.is_read = false
            
        },
    },
    async beforeMount() {
    
            await this.searchChat()
        
            await this.searchFrom()
        
            await this.searchTo()
        
    },
    components: {ImageUploader, FileUploader}
}
</script>

<style scoped>

</style>

