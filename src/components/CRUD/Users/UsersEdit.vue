
<template>
    <Widget>
        <form @submit.prevent="submitHandler">
        <h4 class="h4">Edit Users</h4>
        
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
               label="age"
               label-for="idm2902108080"
            >
                <b-form-input
                   v-model="age"
                   @keypress="IsNumber($event)"
                   type="text"
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
                    <b-form-group class="checkbox abc-checkbox">
                        <input
                            type="checkbox"
                            name="role"
                            value="admin"
                            id="idm2902101968"
                            v-model="role"
                            :disabled="role && (role.includes('user') || disabled)"
                        />
                        <label for="idm2902101968">admin</label>
                    </b-form-group>
                </b-col>
                
                <b-col md="3">
                    <b-form-group class="checkbox abc-checkbox">
                        <input
                            type="checkbox"
                            name="role"
                            value="user"
                            id="idm2902101712"
                            v-model="role"
                            :disabled="role && (role.includes('psychologist') || role.includes('coordinator') || role.includes('admin'))"
                        />
                        <label for="idm2902101712">user</label>
                    </b-form-group>
                </b-col>
                
                <b-col md="3">
                    <b-form-group class="checkbox abc-checkbox">
                        <input
                            type="checkbox"
                            name="role"
                            value="coordinator"
                            id="idm2902101469"
                            v-model="role"
                            :disabled="role && (role.includes('user') || disabled)"
                        />
                        <label for="idm2902101469">coordinator</label>
                    </b-form-group>
                </b-col>

                <b-col md="3">
                  <b-form-group class="checkbox abc-checkbox">
                    <input
                        type="checkbox"
                        name="role"
                        value="psychologist"
                        id="idm2902101456"
                        v-model="role"
                        :disabled="role && (role.includes('user') || disabled)"
                    />
                    <label for="idm2902101456">psychologist</label>
                  </b-form-group>
                </b-col>
                
            </b-row>

            <b-form-group
                label="Equal Consultants"
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

            <b-form-group
                label="nickName"
                label-for="idm2902098324"
                v-if="targets.length"
            >
              <b-form-input
                  v-model="nickName"
                  type="text"
                  id="idm2902098324"
              ></b-form-input>
            </b-form-group>
            <div v-else></div>
            
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
                label="Address"
                label-for="idm2902098587"
            >
              <b-form-input
                  v-model="info.address"
                  type="text"
                  id="idm2902098587"
              ></b-form-input>
            </b-form-group>

            <b-form-group
                label="Main Education"
                label-for="idm2902098588"
            >
              <b-form-input
                  v-model="info.mainEducation"
                  type="text"
                  id="idm2902098588"
              ></b-form-input>
            </b-form-group>

            <b-form-group
                label="Speciality"
                label-for="idm2902098589"
            >
              <b-form-input
                  v-model="info.speciality"
                  type="text"
                  id="idm2902098589"
              ></b-form-input>
            </b-form-group>

            <b-form-group
                label="Experience"
                label-for="idm2902098594"
            >
              <b-form-input
                  v-model="info.experience"
                  type="text"
                  id="idm2902098594"
              ></b-form-input>
            </b-form-group>

          <b-form-group
              label="MainWorkPlace"
              label-for="idm2902098697"
          >
            <b-form-input
                v-model="info.mainWorkPlace"
                type="text"
                id="idm2902098697"
            ></b-form-input>
          </b-form-group>

          <b-form-group
              label="Position"
              label-for="idm290209879"
          >
            <b-form-input
                v-model="info.position"
                type="text"
                id="idm2902098579"
            ></b-form-input>
          </b-form-group>

          <b-form-group
              label="additionalEducation"
              label-for="idm290209887"
          >
            <b-form-input
                v-model="info.additionalEducation"
                type="text"
                id="idm290209887"
            ></b-form-input>
          </b-form-group>

          <b-form-group
              label="additionalWorkPlace"
              label-for="idm290209888"
          >
            <b-form-input
                v-model="info.additionalWorkPlace"
                type="text"
                id="idm290209888"
            ></b-form-input>
          </b-form-group>

          <b-form-group
              label="activityTypes"
              label-for="idm29020980"
          >
            <b-form-input
                v-model="info.activityTypes"
                type="text"
                id="idm29020980"
            ></b-form-input>
          </b-form-group>

          <b-form-group
              label="professionalInterests"
              label-for="idm29020980"
          >
            <b-form-input
                v-model="info.professionalInterests"
                type="text"
                id="idm29020980"
            ></b-form-input>
          </b-form-group>

            <b-form-group
                label="Addition Info"
                label-for="info"
            >
                <b-form-textarea
                  :rows="5"
                  id="idm3666492144"
                  label="info"
                  v-model="additionInfo"
                />
            </b-form-group>

              <div v-for="(item, idx) in this.faq">
                <div :key="idx" class="my-3">
                  <b-form-group
                    label="Addition Info"
                    label-for="info"
                  >
                    <b-input-group>
                      <b-form-input
                          v-model="item.title"
                          type="text"
                          id="idm29020991"
                      >
                      </b-form-input>
                      <b-input-group-append>
                        <b-button variant="outline-info" @click="faq.splice(idx, 1)">
                          Delete
                        </b-button>
                      </b-input-group-append>
                    </b-input-group>
                  </b-form-group>
                  <b-form-group>
                  <b-form-textarea
                        :rows="3"
                        id="idm3666490448"
                        label="faq"
                        v-model="item.body"
                  />
                  </b-form-group>
                </div>
<!--                <
<!--                <b-form-textarea-->
<!--                    :rows="3"-->
<!--                    id="idm3666490448"-->
<!--                    label="faq"-->
<!--                    v-model="item.body"-->
<!--                />-->
              </div>


<!--              <template #targets="props">-->
<!--              <span-->
<!--                  v-for="(item, idx) in props.row.faq"-->
<!--                  :key="idx + props.row.faq"-->
<!--                  class="d-block"-->
<!--              >-->
<!--                {{ item }}-->
<!--              </span>-->
<!--              </template>-->
            
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
        info: {
          address: '',
          mainEducation: '',
          speciality: '',
          experience: '',
          mainWorkPlace: '',
          position: '',
          additionalEducation: '',
          additionalWorkPlace: '',
          activityTypes: '',
          professionalInterests: ''
        },
        additionInfo: '',
        faq: '',
        city: '',
        gender: '',
        method:[],
        targets:[],
        nickName: ''
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
        getData: 'usersForm/getData',
        
        searchCity: 'usersForm/searchCity',
        
        searchGender: 'usersForm/searchGender',
        
        searchMethod: 'usersForm/searchMethod',
        
        searchTargets: 'usersForm/searchTargets',
        
        edit: 'usersForm/edit'
    }),
      IsNumber(event) {
        if (!/\d/.test(event.key) && event.key !== '.' && event.key !== '-') return event.preventDefault();
      },
    async submitHandler() {
        const data = this.data

        data.isOnline = this.isOnline
        data.firstName = this.firstName
        data.lastName = this.lastName
        data.age = this.age
        data.phoneNumber = this.phoneNumber
        data.email = this.email
        data.role = Object.values(this.role)
        data.disabled = this.disabled
        data.avatar = this.avatar
        data.video = this.video
        data.info = JSON.stringify(this.info)
        data.additionInfo = this.additionInfo
        data.faq = JSON.stringify(this.faq)
        data.city = this.city
        data.gender = this.gender
        data.method = this.method
        data.targets = this.targets
        data.city  = this.city.value
        data.nickName = this.nickName
        data.gender  = this.gender.value
        
        data.method = this.method.map(item => item.id)
        
        data.targets = this.targets.map(item => item.id)
        

        try {
            await this.edit({id: this.id, data})
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
        
        formatData() {
          console.log(this.data);
            this.firstName = this.data.firstName
            this.lastName = this.data.lastName
            this.age = this.data.age
            this.phoneNumber = this.data.phoneNumber
            this.email = this.data.email
            this.role = this.data.role
            this.avatar = this.data.avatar
            this.video = this.data.video
            this.info = JSON.parse(this.data.info)
            this.faq = JSON.parse(this.data.faq)
            console.log(this.faq)
            this.additionInfo = this.data.additionInfo
            this.nickName = this.data.nickName
            this.city = dataFormatter.citiesOneListFormatter(this.data.city)
            
            this.gender = dataFormatter.gendersOneListFormatter(this.data.gender)
            console.log(this.gender)
            
            this.method = dataFormatter.methodsManyListFormatterEdit(this.data.method)
            console.log(this.method)
            
            this.targets = dataFormatter.targetsManyListFormatterEdit(this.data.targets)
            console.log(this.targets)
            
        }
     },
    async beforeMount() {
        try {
        
                await this.searchCity()
            
                await this.searchGender()
            
                await this.searchMethod()
            
                await this.searchTargets()
            
            const pathArray = this.$route.fullPath.split('/')
            const id = pathArray[pathArray.length - 2]
            this.id = id
            await this.getData(id)

            this.formatData()
        } catch (e) {
          console.log(e);
            this._vm.$toasted.show('Error ' + e, {
                type : 'error'
            })
        }
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

