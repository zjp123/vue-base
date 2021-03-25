<template>
  <div id="app">
    <!-- <router-view /> -->
    <header class="header">
      <nav class="inner">
        <router-link to="/" exact>
          <img class="logo" src="../public/logo-48.png" alt="logo">
        </router-link>
        <router-link v-for="category in categories" :to="category.path" :key="category.id">{{category.title}}</router-link>
        <a class="github" href="https://github.com/tiodot/vnews" target="_blank" rel="noopener">
          Built with Vue.js
        </a>
      </nav>
    </header>
    <transition name="fade" mode="out-in">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>
<script>
  // import Category from './config/category';
  export default {
      name: 'app',
      data() {
          return {
              categories: [
                {
                  'id': '5562b410e4b00c57d9b94a92',
                  'name': 'Android',
                  'path': 'android',
                  'title': 'android',
                  'createdAt': '2016-04-21T19:19:13Z',
                  'updatedAt': '2015-05-24T21:33:04Z',
                  'icon': 'https://dn-mhke0kuv.qbox.me/225aafca3a440e5d.png',
                  'background': 'https://dn-mhke0kuv.qbox.me/ec8d337c485c4db2.png',
                  'tagId': '5597838ee4b08a686ce2319d',
                  'weight': '1',
                  'isSubscribe': false
                },
                {
                    'id': '5562b415e4b00c57d9b94ac8',
                    'name': '前端',
                    'title': 'frontend',
                    'path': 'frontend',
                    'createdAt': '2016-03-09T00:39:02Z',
                    'updatedAt': '2015-05-24T21:33:10Z',
                    'icon': 'https://dn-mhke0kuv.qbox.me/1c40f5eaba561e32.png',
                    'background': 'https://dn-mhke0kuv.qbox.me/8c95587526f346c0.png',
                    'tagId': '5597a05ae4b08a686ce56f6f',
                    'weight': '2',
                    'isSubscribe': false
                },
                {
                    'id': '5562b405e4b00c57d9b94a41',
                    'name': 'iOS',
                    'title': 'ios',
                    'path': 'ios',
                    'createdAt': '2016-04-21T19:19:10Z',
                    'updatedAt': '2015-05-24T21:32:54Z',
                    'icon': 'https://dn-mhke0kuv.qbox.me/4a218bdf1f6969fd.png',
                    'background': 'https://dn-mhke0kuv.qbox.me/34589746327a360a.png',
                    'tagId': '5597838ae4b08a686ce23139',
                    'weight': '3',
                    'isSubscribe': false
                }
              ]
          }
      }
  }
</script>

<style lang="">
/* body
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size 15px
  background-color lighten(#eceef1, 30%)
  margin 0
  padding-top 55px
  color #34495e
  overflow-y scroll
a
  color #34495e
  text-decoration none
.header
  background-color #ff6600
  position fixed
  z-index 999
  height 55px
  top 0
  left 0
  right 0
  .inner
    max-width 800px
    box-sizing border-box
    margin 0px auto
    padding 15px 5px
  a
    flex 1
    color rgba(255, 255, 255, .8)
    line-height 24px
    transition color .15s ease
    display inline-block
    vertical-align middle
    font-weight 300
    letter-spacing .075em
    margin-right 1em
    &:hover
      color #fff
    &.router-link-active
      color #fff
      font-weight 400
  .github
    color #fff
    font-size .9em
    margin 0
    float right
.logo
  width 24px
  margin-right 10px
  display inline-block
  vertical-align middle
.view
  max-width 800px
  margin 0 auto
  position relative
.fade-enter-active, .fade-leave-active
  transition all .2s ease
.fade-enter, .fade-leave-active
  opacity 0
@media (max-width 860px)
  .header .inner
    padding 15px 30px
@media (max-width 600px)
  .header
    .inner
      padding 15px
    a
      margin-right 1em
    .github
      display none */
</style>
