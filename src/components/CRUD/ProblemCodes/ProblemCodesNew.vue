
        <template>
            <Widget>
                <form @submit.prevent="submitHandler">
                <h4 class="h4">New ReportsCodes</h4>
                  <b-form-group
                      label="ReportCode"
                      label-for="idm2725243920"
                  >
                        <v-select
                            inputId="idm3657346144"
                            :options="options"
                            v-model="reportCode"
                        >
                          <template #option="option">
                            {{ option.label }}
                          </template>
                        </v-select>
                  </b-form-group>
                        <b-form-group
                            label="Name"
                            label-for="idm2902169248"
                        >
                        <b-form-input
                            v-model="name"
                            type="text"
                            id="idm2902169248"
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
// import ImageUploader from '@/components/Uploaders/ImageUploader'
// import FileUploader from '@/components/Uploaders/FileUploader'

export default {
    data () {
        return {
        id: null,
        name: '',
        reportCode: '',
        options: [
          { value: 'Methods', label: 'Methods - Методы'},
          { value: 'HelpTypes', label: 'HelpTypes - Тип помощи'},
          { value: 'Appeal', label: 'Appeal - Обращение'},
          { value: 'CommunicationTypes', label: 'CommunicationTypes - Вид связи'},
          { value: 'Address', label: 'Address - Адрес'},
          { value: 'ProblemCodes', label: 'ProblemCodes - Кодировка проблемы '},
        ]
    }
},
computed: {
    ...mapState({
    data: state => state.problemCodesForm.data,
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
            
            newHandler: 'problemCodesForm/newHandler'
        }),
    async submitHandler() {
          if(this.reportCode !== '' && this.name !== '') {
            const data = {
              name: [this.reportCode.value, this.name].join('::'),
            }

            try {
              await this.newHandler({data})
              this.$router.push('/admin/reportCodes')
            } catch (e) {
              this._vm.$toasted.show('Error: ' + e, {
                type : 'error'
              })
            }
          } else {
            this.$toasted.show('Empty values! Please, choose reportCode and enter name', {
              type: 'error'
            });
          }
    },
        resetData() {
                this.name =  '',
                this.reportCode = ''
        },
    }
}
</script>

<style scoped>

</style>

