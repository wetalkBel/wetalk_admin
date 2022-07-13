
        <template>
            <Widget>
                <form @submit.prevent="submitHandler">
                <h4 class="h4">New Chats</h4>
                
                        <b-form-group
                            label="Name"
                            label-for="idm2725011536"
                        >
                        <b-form-input
                            v-model="name"
                            type="text"
                            id="idm2725011536"
                        ></b-form-input>
                </b-form-group>
            
    <b-form-group
        label="User"
        label-for="idm2725396416"
    >
    <v-select
        inputId="idm2725396416"
        v-model="user"
        :options="optionsUser"
        @search="searchUser"
    >
        <template #option="option">
        {{ option.label }}
        </template>
    </v-select>
    </b-form-group>
    
    <b-form-group
        label="Psychologist"
        label-for="idm2725243920"
    >
    <v-select
        inputId="idm2725243920"
        v-model="psychologist"
        :options="optionsPsychologist"
        @search="searchPsychologist"
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
        user: '',
        psychologist: '',
        
    }
},
computed: {
    ...mapState({
    data: state => state.chatsForm.data,
    
            optionsUser: state => state.chatsForm.searchResultUser,
        
            optionsPsychologist: state => state.chatsForm.searchResultPsychologist,
        
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
            
                    searchUser: 'chatsForm/searchUser',
                
                    searchPsychologist: 'chatsForm/searchPsychologist',
                
            newHandler: 'chatsForm/newHandler'
        }),
    async submitHandler() {
        const data = {
        name: this.name,
        user: this.user,
        psychologist: this.psychologist,
        
        }
        
                data.user  = this.user.value
            
                data.psychologist  = this.psychologist.value
            
            try {
                await this.newHandler({data})
                this.$router.push('/admin/chats')
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e, {
                    type : 'error'
                })
            }
    },
    
        resetData() {
            
                this.name =  ''
            
                this.user = ''
            
                this.psychologist = ''
            
        },
    },
    async beforeMount() {
    
            await this.searchUser()
        
            await this.searchPsychologist()
        
    },
    components: {ImageUploader, FileUploader}
}
</script>

<style scoped>

</style>

