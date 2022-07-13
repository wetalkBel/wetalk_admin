
<template>
    <Widget>
        <form @submit.prevent="submitHandler">
        <h4 class="h4">Edit Sessions</h4>

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
                        value="success finished"
                        id="idm2902207556"
                        v-model="status"
                    />
                    <label for="idm2902207556">success finished</label>
                  </b-form-group>
                </b-col>

                <b-col md="3">
                  <b-form-group class="radio abc-radio">
                    <input
                        type="radio"
                        name="status"
                        value="failed"
                        id="idm2902207515"
                        v-model="status"
                    />
                    <label for="idm2902207515">failed</label>
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
               label="Age"
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
               label="Hours"
               label-for="idm2902234592"
            >
                <b-form-input
                   v-model="reportHours"
                   type="number"
                   id="idm2902234592"
                ></b-form-input>
            </b-form-group>
            
            <b-form-group
               label="Minutes"
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
        getData: 'sessionsForm/getData',
        
        searchUser: 'sessionsForm/searchUser',
        
        searchPsychologist: 'sessionsForm/searchPsychologist',
        
        searchReportGender: 'sessionsForm/searchReportGender',
        
        searchReportProblemCode: 'sessionsForm/searchReportProblemCode',
        
        edit: 'sessionsForm/edit'
    }),
    async submitHandler() {
        const data = this.data

        
        data.name = this.name
        data.time = this.time
        data.user = this.user
        data.psychologist = this.psychologist
        data.status = this.status
        data.cancellationReason = this.cancellationReason
        data.comment = this.comment
        data.rating = this.rating
        data.reportGender = this.reportGender
        data.reportAge = this.reportAge
        data.reportProblemCode = this.reportProblemCode
        data.reportAdvanced = this.reportAdvanced
        data.reportHours = this.reportHours
        data.reportMinutes = this.reportMinutes
        data.user  = this.user.value
        
        data.psychologist  = this.psychologist.value
        
        data.reportGender  = this.reportGender.value
        
        data.reportProblemCode = this.reportProblemCode.map(item => item.id)
        

        try {
            await this.edit({id: this.id, data})
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
        
        formatData() {
            
            this.name = this.data.name
            this.time = this.data.time
            this.user = dataFormatter.usersOneListFormatter(this.data.user)
            
            this.psychologist = dataFormatter.usersOneListFormatter(this.data.psychologist)
            
            this.status = this.data.status
            this.cancellationReason = this.data.cancellationReason
            this.comment = this.data.comment
            this.rating = this.data.rating
            this.reportGender = dataFormatter.gendersOneListFormatter(this.data.reportGender)
            
            this.reportAge = this.data.reportAge
            this.reportProblemCode = dataFormatter.problemCodesManyListFormatterEdit(this.data.reportProblemCode)
            
            this.reportAdvanced = this.data.reportAdvanced
            this.reportHours = this.data.reportHours
            this.reportMinutes = this.data.reportMinutes
        }
     },
    async beforeMount() {
        try {
        
                await this.searchUser()
            
                await this.searchPsychologist()
            
                await this.searchReportGender()
            
                await this.searchReportProblemCode()
            
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

