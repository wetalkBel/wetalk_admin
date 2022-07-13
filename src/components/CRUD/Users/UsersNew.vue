
        <template>
            <Widget>
                <form @submit.prevent="submitHandler">
                <h4 class="h4">New Users</h4>
                
        <b-form-group class="abc-checkbox">
            <input
                type="checkbox"
                v-model="isOnline"
                id="idm2902112496"
            />
            <label for="idm2902112496">isOnline</label>
        </b-form-group>
        
                        <b-form-group
                            label="First Name"
                            label-for="idm2902111024"
                        >
                        <b-form-input
                            v-model="firstName"
                            type="text"
                            id="idm2902111024"
                        ></b-form-input>
                </b-form-group>
            
                        <b-form-group
                            label="Last Name"
                            label-for="idm2902109552"
                        >
                        <b-form-input
                            v-model="lastName"
                            type="text"
                            id="idm2902109552"
                        ></b-form-input>
                </b-form-group>
            
            <b-form-group
                label="age" int
                label-for="idm2902108080"
            >
            <b-form-input
                v-model="age"
                type="number"
                id="idm2902108080"
            ></b-form-input>
    </b-form-group>

                        <b-form-group
                            label="Phone Number"
                            label-for="idm2902106608"
                        >
                        <b-form-input
                            v-model="phoneNumber"
                            type="text"
                            id="idm2902106608"
                        ></b-form-input>
                </b-form-group>
            
                        <b-form-group
                            label="E-mail"
                            label-for="idm2902105136"
                        >
                        <b-form-input
                            v-model="email"
                            type="text"
                            id="idm2902105136"
                        ></b-form-input>
                </b-form-group>
            
        <label>Role</label>
        <b-row>
            
                <b-col md="3">
                    <b-form-group class="radio abc-radio">
                        <input
                            type="radio"
                            name="role"
                            value="admin"
                            id="idm2902101968"
                            v-model="role"
                        />
                        <label for="idm2902101968">admin</label>
                </b-form-group>
            </b-col>
        
                <b-col md="3">
                    <b-form-group class="radio abc-radio">
                        <input
                            type="radio"
                            name="role"
                            value="user"
                            id="idm2902101712"
                            v-model="role"
                        />
                        <label for="idm2902101712">user</label>
                </b-form-group>
            </b-col>
        
                <b-col md="3">
                    <b-form-group class="radio abc-radio">
                        <input
                            type="radio"
                            name="role"
                            value="psychologist"
                            id="idm2902101456"
                            v-model="role"
                        />
                        <label for="idm2902101456">psychologist</label>
                </b-form-group>
            </b-col>
        
    </b-row>
    
        <b-form-group class="abc-checkbox">
            <input
                type="checkbox"
                v-model="disabled"
                id="idm2902101200"
            />
            <label for="idm2902101200">Disabled</label>
        </b-form-group>
        
    <ImageUploader
        label="Avatar"
        id="idm2902099728"
        url="users/avatar"
        :images="avatar"
        @change="avatarAdd"
        @del="avatarDel"
    />

                        <b-form-group
                            label="Video"
                            label-for="idm2902098256"
                        >
                        <b-form-input
                            v-model="video"
                            type="text"
                            id="idm2902098256"
                        ></b-form-input>
                </b-form-group>
            
                <b-form-group
                    label="Info"
                    label-for="info"
                >
                <b-form-textarea
                    :rows="3"
                    id="idm3666492144"
                    label="info"
                    v-model="info"
                />
            </b-form-group>
        
                <b-form-group
                    label="FAQ"
                    label-for="faq"
                >
                <b-form-textarea
                    :rows="3"
                    id="idm3666490448"
                    label="faq"
                    v-model="faq"
                />
            </b-form-group>
        
    <b-form-group
        label="City"
        label-for="idm3666488752"
    >
    <v-select
        inputId="idm3666488752"
        v-model="city"
        :options="optionsCity"
        @search="searchCity"
    >
        <template #option="option">
        {{ option.label }}
        </template>
    </v-select>
    </b-form-group>
    
    <b-form-group
        label="Gender"
        label-for="idm3666486608"
    >
    <v-select
        inputId="idm3666486608"
        v-model="gender"
        :options="optionsGender"
        @search="searchGender"
    >
        <template #option="option">
        {{ option.label }}
        </template>
    </v-select>
    </b-form-group>
    
    <b-form-group
        label="Method"
        label-for="idm3666484464"
    >
        <v-select
            inputId="idm3666484464"
            :options="optionsMethod"
            v-model="method"
            @search="searchMethod"
            multiple
        >
            <template #option="option">
            {{ option.label }}
            </template>
        </v-select>
    </b-form-group>
    
    <b-form-group
        label="Targets"
        label-for="idm3666482320"
    >
        <v-select
            inputId="idm3666482320"
            :options="optionsTargets"
            v-model="targets"
            @search="searchTargets"
            multiple
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
        isOnline: false,
        firstName: '',
        lastName: '',
        age: '',
        phoneNumber: '',
        email: '',
        role: false,
        disabled: false,
        avatar: [],
        video: '',
        info: '',
        faq: '',
        city: '',
        gender: '',
        method:[],
        targets:[],
        
    }
},
computed: {
    ...mapState({
    data: state => state.usersForm.data,
    
            optionsCity: state => state.usersForm.searchResultCity,
        
            optionsGender: state => state.usersForm.searchResultGender,
        
            optionsMethod: state => state.usersForm.searchResultMethod,
        
            optionsTargets: state => state.usersForm.searchResultTargets,
        
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
            
                    searchCity: 'usersForm/searchCity',
                
                    searchGender: 'usersForm/searchGender',
                
                    searchMethod: 'usersForm/searchMethod',
                
                    searchTargets: 'usersForm/searchTargets',
                
            newHandler: 'usersForm/newHandler'
        }),
    async submitHandler() {
        const data = {
        isOnline: this.isOnline,
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age,
        phoneNumber: this.phoneNumber,
        email: this.email,
        role: this.role,
        disabled: this.disabled,
        avatar: this.avatar,
        video: this.video,
        info: this.info,
        faq: this.faq,
        city: this.city,
        gender: this.gender,
        method: this.method,
        targets: this.targets,
        
        }
        
                data.city  = this.city.value
            
                data.gender  = this.gender.value
            
                data.method = this.method.map(item => item.id)
            
                data.targets = this.targets.map(item => item.id)
            
            try {
                await this.newHandler({data})
                this.$router.push('/admin/users')
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e, {
                    type : 'error'
                })
            }
    },
    avatarAdd(val) {
            this.avatar.push(val)
        },
        avatarDel(id) {
            this.avatar = this.avatar.filter(img => img.id !== id)
        },
    
        resetData() {
            
                this.isOnline = false
            
                this.firstName =  ''
            
                this.lastName =  ''
            
                this.age = ''
            
                this.phoneNumber =  ''
            
                this.email =  ''
            
                this.role = false
            
                this.disabled = false
            
                this.avatar = []
            
                this.video =  ''
            
                this.info = ''
            
                this.faq = ''
            
                this.city = ''
            
                this.gender = ''
            
                this.method = []
            
                this.targets = []
            
        },
    },
    async beforeMount() {
    
            await this.searchCity()
        
            await this.searchGender()
        
            await this.searchMethod()
        
            await this.searchTargets()
        
    },
    components: {ImageUploader, FileUploader}
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

