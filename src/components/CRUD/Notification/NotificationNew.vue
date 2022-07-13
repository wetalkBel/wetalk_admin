
        <template>
            <Widget>
                <form @submit.prevent="submitHandler">
                <h4 class="h4">New Notification</h4>
                
                        <b-form-group
                            label="Name"
                            label-for="idm3759664704"
                        >
                        <b-form-input
                            v-model="name"
                            type="text"
                            id="idm3759664704"
                        ></b-form-input>
                </b-form-group>
            
    <b-form-group
        label="To"
        label-for="idm3759551856"
    >
    <v-select
        inputId="idm3759551856"
        v-model="to"
        :options="optionsTo"
        @search="searchTo"
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
                    id="idm3759279040"
                    label="body"
                    v-model="body"
                />
            </b-form-group>
        
        <b-form-group class="abc-checkbox">
            <input
                type="checkbox"
                v-model="is_read"
                id="idm3759036368"
            />
            <label for="idm3759036368">Is Read</label>
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
        name: '',
        to: '',
        body: '',
        is_read: false,
        
    }
},
computed: {
    ...mapState({
    data: state => state.notificationForm.data,
    
            optionsTo: state => state.notificationForm.searchResultTo,
        
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
            
                    searchTo: 'notificationForm/searchTo',
                
            newHandler: 'notificationForm/newHandler'
        }),
    async submitHandler() {
        const data = {
        name: this.name,
        to: this.to,
        body: this.body,
        is_read: this.is_read,
        
        }
        
                data.to  = this.to.value
            
            try {
                await this.newHandler({data})
                this.$router.push('/admin/notification')
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e, {
                    type : 'error'
                })
            }
    },
    
        resetData() {
            
                this.name =  ''
            
                this.to = ''
            
                this.body = ''
            
                this.is_read = false
            
        },
    },
    async beforeMount() {
    
            await this.searchTo()
        
    },
    components: {ImageUploader, FileUploader}
}
</script>

<style scoped>

</style>

