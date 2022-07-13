
        <template>
            <Widget>
                <form @submit.prevent="submitHandler">
                <h4 class="h4">New Sessions</h4>
                
                        <b-form-group
                            label="Name"
                            label-for="idm2902329520"
                        >
                        <b-form-input
                            v-model="name"
                            type="text"
                            id="idm2902329520"
                        ></b-form-input>
                </b-form-group>
            
        <b-form-group>
            <label class="d-block">Time</label>
            <DatePicker
                type="datetime"
                lang="en"
                input-class="form-control"
                :placeholder="dataFormatter.dateTimeFormatter(time)"
                @change="selectDateTimeTime"
                id="idm2902244240"
            >
            <i class="glyphicon glyphicon-th" slot="calendar-icon" />
        </DatePicker>
        </b-form-group>
        
    <b-form-group
        label="User"
        label-for="idm2902158512"
    >
    <v-select
        inputId="idm2902158512"
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
        label-for="idm2902190240"
    >
    <v-select
        inputId="idm2902190240"
        v-model="psychologist"
        :options="optionsPsychologist"
        @search="searchPsychologist"
    >
        <template #option="option">
        {{ option.label }}
        </template>
    </v-select>
    </b-form-group>
    
        <label>Status</label>
        <b-row>
            
                <b-col md="3">
                    <b-form-group class="radio abc-radio">
                        <input
                            type="radio"
                            name="status"
                            value="free"
                            id="idm2902221888"
                            v-model="status"
                        />
                        <label for="idm2902221888">free</label>
                </b-form-group>
            </b-col>
        
                <b-col md="3">
                    <b-form-group class="radio abc-radio">
                        <input
                            type="radio"
                            name="status"
                            value="booked"
                            id="idm2902212400"
                            v-model="status"
                        />
                        <label for="idm2902212400">booked</label>
                </b-form-group>
            </b-col>
        
                <b-col md="3">
                    <b-form-group class="radio abc-radio">
                        <input
                            type="radio"
                            name="status"
                            value="confirmed"
                            id="idm2902212144"
                            v-model="status"
                        />
                        <label for="idm2902212144">confirmed</label>
                </b-form-group>
            </b-col>
        
                <b-col md="3">
                    <b-form-group class="radio abc-radio">
                        <input
                            type="radio"
                            name="status"
                            value="cancelled"
                            id="idm2902207792"
                            v-model="status"
                        />
                        <label for="idm2902207792">cancelled</label>
                </b-form-group>
            </b-col>
        
                <b-col md="3">
                    <b-form-group class="radio abc-radio">
                        <input
                            type="radio"
                            name="status"
                            value="finished"
                            id="idm2902207536"
                            v-model="status"
                        />
                        <label for="idm2902207536">finished</label>
                </b-form-group>
            </b-col>
        
                <b-col md="3">
                    <b-form-group class="radio abc-radio">
                        <input
                            type="radio"
                            name="status"
                            value="rated"
                            id="idm2902188880"
                            v-model="status"
                        />
                        <label for="idm2902188880">rated</label>
                </b-form-group>
            </b-col>
        
    </b-row>
    
                <b-form-group
                    label="Cancellation reason"
                    label-for="cancellationReason"
                >
                <b-form-textarea
                    :rows="3"
                    id="idm2902188624"
                    label="cancellationReason"
                    v-model="cancellationReason"
                />
            </b-form-group>
        
                <b-form-group
                    label="Comment"
                    label-for="comment"
                >
                <b-form-textarea
                    :rows="3"
                    id="idm2902179312"
                    label="comment"
                    v-model="comment"
                />
            </b-form-group>
        
            <b-form-group
                label="Rating" int
                label-for="idm2902217648"
            >
            <b-form-input
                v-model="rating"
                type="number"
                id="idm2902217648"
            ></b-form-input>
    </b-form-group>

    <b-form-group
        label="ReportGender"
        label-for="idm2902208784"
    >
    <v-select
        inputId="idm2902208784"
        v-model="reportGender"
        :options="optionsReportGender"
        @search="searchReportGender"
    >
        <template #option="option">
        {{ option.label }}
        </template>
    </v-select>
    </b-form-group>
    
            <b-form-group
                label="Age" int
                label-for="idm2902331456"
            >
            <b-form-input
                v-model="reportAge"
                type="number"
                id="idm2902331456"
            ></b-form-input>
    </b-form-group>

    <b-form-group
        label="Problem code"
        label-for="idm2902180128"
    >
        <v-select
            inputId="idm2902180128"
            :options="optionsReportProblemCode"
            v-model="reportProblemCode"
            @search="searchReportProblemCode"
            multiple
        >
            <template #option="option">
            {{ option.label }}
            </template>
        </v-select>
    </b-form-group>
    
                <b-form-group
                    label="Advanced"
                    label-for="reportAdvanced"
                >
                <b-form-textarea
                    :rows="3"
                    id="idm2902278480"
                    label="reportAdvanced"
                    v-model="reportAdvanced"
                />
            </b-form-group>
        
            <b-form-group
                label="Hours" int
                label-for="idm2902234592"
            >
            <b-form-input
                v-model="reportHours"
                type="number"
                id="idm2902234592"
            ></b-form-input>
    </b-form-group>

            <b-form-group
                label="Minutes" int
                label-for="idm2902658768"
            >
            <b-form-input
                v-model="reportMinutes"
                type="number"
                id="idm2902658768"
            ></b-form-input>
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
        time: '',
        user: '',
        psychologist: '',
        status: false,
        cancellationReason: '',
        comment: '',
        rating: '',
        reportGender: '',
        reportAge: '',
        reportProblemCode:[],
        reportAdvanced: '',
        reportHours: '',
        reportMinutes: '',
        
    }
},
computed: {
    ...mapState({
    data: state => state.sessionsForm.data,
    
            optionsUser: state => state.sessionsForm.searchResultUser,
        
            optionsPsychologist: state => state.sessionsForm.searchResultPsychologist,
        
            optionsReportGender: state => state.sessionsForm.searchResultReportGender,
        
            optionsReportProblemCode: state => state.sessionsForm.searchResultReportProblemCode,
        
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
            
                    searchUser: 'sessionsForm/searchUser',
                
                    searchPsychologist: 'sessionsForm/searchPsychologist',
                
                    searchReportGender: 'sessionsForm/searchReportGender',
                
                    searchReportProblemCode: 'sessionsForm/searchReportProblemCode',
                
            newHandler: 'sessionsForm/newHandler'
        }),
    async submitHandler() {
        const data = {
        name: this.name,
        time: this.time,
        user: this.user,
        psychologist: this.psychologist,
        status: this.status,
        cancellationReason: this.cancellationReason,
        comment: this.comment,
        rating: this.rating,
        reportGender: this.reportGender,
        reportAge: this.reportAge,
        reportProblemCode: this.reportProblemCode,
        reportAdvanced: this.reportAdvanced,
        reportHours: this.reportHours,
        reportMinutes: this.reportMinutes,
        
        }
        
                data.user  = this.user.value
            
                data.psychologist  = this.psychologist.value
            
                data.reportGender  = this.reportGender.value
            
                data.reportProblemCode = this.reportProblemCode.map(item => item.id)
            
            try {
                await this.newHandler({data})
                this.$router.push('/admin/sessions')
            } catch (e) {
                this._vm.$toasted.show('Error: ' + e, {
                    type : 'error'
                })
            }
    },
    
        selectDateTimeTime(date) {
            this.time = date
        },
    
        resetData() {
            
                this.name =  ''
            
                this.time = ''
            
                this.user = ''
            
                this.psychologist = ''
            
                this.status = false
            
                this.cancellationReason = ''
            
                this.comment = ''
            
                this.rating = ''
            
                this.reportGender = ''
            
                this.reportAge = ''
            
                this.reportProblemCode = []
            
                this.reportAdvanced = ''
            
                this.reportHours = ''
            
                this.reportMinutes = ''
            
        },
    },
    async beforeMount() {
    
            await this.searchUser()
        
            await this.searchPsychologist()
        
            await this.searchReportGender()
        
            await this.searchReportProblemCode()
        
    },
    components: {ImageUploader, FileUploader}
}
</script>

<style scoped>

</style>

