<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          v-if="!$q.platform.is.desktop"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          May4th Poem
        </q-toolbar-title>

        <div v-if="!isLoggedIn">
          <q-btn flat>
            登录
            <q-popup-proxy>
              <div class="col" style="padding: 10px;">
                <div class="row items-center">
                  <div class="col-3">用户名</div>
                  <div class="col-9">
                    <q-input dense autofocus v-model="userName" />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">密码</div>
                  <div class="col-9">
                    <q-input
                      dense
                      autofocus
                      v-model="userPassword"
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
              </div>
            </q-popup-proxy>
          </q-btn>
          <q-btn flat>
            注册
            <q-popup-proxy>
              <div class="col" style="padding: 10px;">
                <div class="row items-center">
                  <div class="col-3">用户名</div>
                  <div class="col-9">
                    <q-input
                      dense
                      autofocus
                      v-model="newUserName"
                      :rules="[
                        val => val.length <= 16 || '用户名长度不能超过16个字符',
                      ]"
                    />
                  </div>
                </div>
                <div class="row items-center">
                  <div class="col-3">密码</div>
                  <div class="col-9">
                    <q-input
                      dense
                      autofocus
                      v-model="newUserPassword"
                      :type="showPassword ? 'text' : 'password'"
                      :rules="[
                        val => !val || val.length >= 8 || '密码不能少于8位',
                      ]"
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
                      dense
                      autofocus
                      v-model="newUserPasswordConfirmation"
                      :type="showPassword ? 'text' : 'password'"
                      :rules="[
                        val =>
                          val === this.newUserPassword || '两次输入密码不一致',
                      ]"
                    />
                  </div>
                </div>
                <div class="row justify-center" style="padding-top: 10px;">
                  <q-btn
                    color="primary"
                    :disable="!validateSignUp"
                    @click="logIn"
                    >注册</q-btn
                  >
                </div>
              </div>
            </q-popup-proxy>
          </q-btn>
        </div>
        <q-btn flat v-else @click="logOut">
          退出
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="http://v1.quasar-framework.org"
        >
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Docs</q-item-label>
            <q-item-label caption>v1.quasar-framework.org</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://github.com/quasarframework/"
        >
          <q-item-section avatar>
            <q-icon name="code" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Github</q-item-label>
            <q-item-label caption>github.com/quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="http://chat.quasar-framework.org"
        >
          <q-item-section avatar>
            <q-icon name="chat" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Discord Chat Channel</q-item-label>
            <q-item-label caption>chat.quasar-framework.org</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://forum.quasar-framework.org"
        >
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar-framework.org</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          tag="a"
          target="_blank"
          href="https://twitter.com/quasarframework"
        >
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

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

<script>
import gql from 'graphql-tag'
import {LOG_IN, LOG_OUT} from '../common/mutation-types.js'

export default {
  name: 'MyLayout',
  data() {
    return {
      // leftDrawerOpen: this.$q.platform.is.desktop,
      leftDrawerOpen: false,
      userName: '',
      userPassword: '',
      newUserName: '',
      newUserPassword: '',
      newUserPasswordConfirmation: '',
      showPassword: false,
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn
    },
    validateLogIn() {
      if (this.userName !== '' && this.userPassword !== '') return true
      else return false
    },
    validateSignUp() {
      if (
        this.newUserName !== '' &&
        this.newUserPassword !== '' &&
        this.newUserPasswordConfirmation === this.newUserPassword
      )
        return true
      else return false
    },
  },
  methods: {
    logIn() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation {
              logIn(email: "aaa@123.com", password: "12345678") {
                token
                user {
                  id
                  name
                }
              }
            }
          `,
        })
        .then(res => {
          this.$store.commit(LOG_IN, res.data.logIn)
        })
        .catch(err => console.log(err))
    },
    logOut() {
      this.$store.commit(LOG_OUT)
    },
  },
}
</script>

<style></style>
