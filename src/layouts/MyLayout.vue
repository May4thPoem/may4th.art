<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title aria-label="Go to home page" @click="navTo('/')">
          May4th Poem
        </q-toolbar-title>

        <div v-if="!session.isLoggedIn">
          <q-btn flat>
            <q-icon name="input" color="white" />
            登录
            <q-popup-proxy>
              <div class="col" style="padding: 10px;">
                <div class="row items-center">
                  <div class="col-3">邮箱</div>
                  <div class="col-9">
                    <q-input
                      v-model="userEmail"
                      dense
                      autofocus
                      type="email"
                      :rules="emailValidation"
                    />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">密码</div>
                  <div class="col-9">
                    <q-input
                      v-model="userPassword"
                      dense
                      autofocus
                      :type="showPassword ? 'text' : 'password'"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="showPassword ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="showPassword = !showPassword"
                        />
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="row justify-center" style="padding-top: 10px;">
                  <q-btn
                    color="primary"
                    :disable="!validateLogIn"
                    @click="logIn"
                    >登录</q-btn
                  >
                </div>
                <error-banner
                  v-if="wrongEmailOrPassword"
                  error-message="邮箱或密码错误"
                />
              </div>
            </q-popup-proxy>
          </q-btn>
          <q-btn flat>
            <q-icon name="person_pin" color="white" />
            注册
            <q-popup-proxy>
              <div class="col" style="padding: 10px;">
                <div class="row items-center">
                  <div class="col-3">用户名</div>
                  <div class="col-9">
                    <q-input
                      v-model="newUserName"
                      dense
                      autofocus
                      :rules="[
                        val => val.length <= 16 || '用户名长度不能超过16个字符',
                      ]"
                    />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">邮箱</div>
                  <div class="col-9">
                    <q-input
                      v-model="newUserEmail"
                      dense
                      autofocus
                      type="email"
                      :rules="emailValidation"
                    />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">密码</div>
                  <div class="col-9">
                    <q-input
                      v-model="newUserPassword"
                      dense
                      autofocus
                      :type="showPassword ? 'text' : 'password'"
                      :rules="passwordValidation"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="showPassword ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="showPassword = !showPassword"
                        />
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">确认</div>
                  <div class="col-9">
                    <q-input
                      v-model="newUserPasswordConfirmation"
                      dense
                      autofocus
                      :type="showPassword ? 'text' : 'password'"
                      :rules="passwordConfirmationValidation"
                    />
                  </div>
                </div>
                <div class="row justify-center" style="padding-top: 10px;">
                  <q-btn
                    color="primary"
                    :disable="!validateSignUp"
                    @click="signUp"
                    >注册</q-btn
                  >
                </div>
              </div>
            </q-popup-proxy>
          </q-btn>
        </div>
        <div v-else class="flex">
          <q-btn flat @click="navTo('/my')">{{
            $q.platform.is.mobile
              ? '我的'
              : `欢迎来到May4th，${session.user.name}`
          }}</q-btn>
          <q-btn flat @click="navTo('/write')">
            <q-icon name="note_add" color="white" />
            写诗
          </q-btn>
          <q-btn flat @click="logOut">
            <q-icon name="exit_to_app" color="white" />
            退出
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <q-toolbar style="justify-content: center;">
        <div>洗心革面的未来生活 | May4th Poem © 2019</div>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue'
import {EMAIL_REGEX, PASSWORD_REGEX} from '../common/regex'
import ErrorBanner from '../components/ErrorBanner.vue'
import {sessionQuery} from '../gql/queries'
import {
  logInMutation,
  signUpMutation,
  logInLocalMutation,
  logOutMutation,
} from '../gql/mutations'

export default Vue.extend({
  name: 'MyLayout',
  apollo: {
    session: {
      query: sessionQuery,
    },
  },
  components: {ErrorBanner},
  data() {
    return {
      userEmail: '',
      userPassword: '',
      newUserName: '',
      newUserEmail: '',
      newUserPassword: '',
      newUserPasswordConfirmation: '',
      showPassword: false,
      wrongEmailOrPassword: false,
      session: {},
      emailValidation: [
        (val: string) =>
          !val || EMAIL_REGEX.test(val) || '请输入合法的邮箱地址',
      ],
      passwordValidation: [
        (val: string) =>
          !val ||
          PASSWORD_REGEX.test(val) ||
          '密码须为8-16位，包含数字、大写字母和小写字母',
      ],
    }
  },
  computed: {
    validateLogIn() {
      if (this.userEmail !== '' && this.userPassword !== '') return true
      else return false
    },
    validateSignUp() {
      if (
        this.newUserName !== '' &&
        this.newUserEmail !== '' &&
        this.newUserPassword !== '' &&
        this.newUserPasswordConfirmation === this.newUserPassword
      )
        return true
      else return false
    },
    passwordConfirmationValidation() {
      return [
        (val: string) => val === this.newUserPassword || '两次输入密码不一致',
      ]
    },
  },
  methods: {
    navTo(path: string) {
      this.$router.push(path)
    },
    handleError({graphQLErrors, networkError}: any) {
      if (graphQLErrors) {
        graphQLErrors.map(({message}: any) => {
          if (message.error && message.error === 'Not Found') {
            this.wrongEmailOrPassword = true
            setTimeout(() => {
              this.wrongEmailOrPassword = false
            }, 2000)
          }
        })
      }
      if (networkError) {
        console.log('网络错误')
      }
    },
    clearUserInput() {
      this.userEmail = ''
      this.userPassword = ''
      this.newUserName = ''
      this.newUserEmail = ''
      this.newUserPassword = ''
      this.newUserPasswordConfirmation = ''
    },
    logIn() {
      this.$apollo
        .mutate({
          mutation: logInMutation,
          variables: {
            email: this.userEmail,
            password: this.userPassword,
          },
        })
        .then(res => {
          this.$apollo.mutate({
            mutation: logInLocalMutation,
            variables: {
              session: {...res.data.logIn, isLoggedIn: true},
            },
          })
          this.clearUserInput()
        })
        .catch(err => this.handleError(err))
    },
    signUp() {
      this.$apollo
        .mutate({
          mutation: signUpMutation,
          variables: {
            password: this.newUserPassword,
            name: this.newUserName,
            email: this.newUserEmail,
          },
        })
        .then(res => {
          this.$apollo.mutate({
            mutation: logInLocalMutation,
            variables: {
              session: {...res.data.signUp, isLoggedIn: true},
            },
          })
          this.clearUserInput()
        })
        .catch(err => console.log(err))
    },
    logOut() {
      this.$apollo.mutate({
        mutation: logOutMutation,
      })
      this.$router.push('/')
    },
  },
})
</script>

<style lang="stylus">
.poem-title
  font-size 1.5rem
  line-height 2rem
  padding-left 10px
  padding-right 10px
  text-align center
  text-overflow ellipsis

.poem-time
  text-align right
  padding-top 10px
  padding-right 10px

.poem-content
  padding 10px
  max-height 300px
</style>
