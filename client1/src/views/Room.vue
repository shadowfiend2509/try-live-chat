<template>
  <section id="chatApp" class="chatApp">
	<div class="chatApp__loaderWrapper" v-if='!finish'>
		<div class="chatApp__loaderText">Loading...</div>
		<div class="chatApp__loader"></div>
	</div>
  <div id='chatApp2'>
    <div class="message">
      <div class="card2">
        <h3>Card Title</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque lacus ex, maxim.</p>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      finish: false,
      specRoom: ''
    }
  },
  methods: {
    fetchInRoom () {
      const id = this.$route.params.id;
      axios({
        method: 'get',
        url: `http://localhost:3000/rooms/src/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          console.log(data)
          this.specRoom = data;
          this.finish = true;
          this.$awn.success('Success in Room')
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg);
        })
    }
  },
  created () {
    this.fetchInRoom()
  }
}
</script>

<style scoped>
.card2{
  background-color: #fff;
  width: 50%;
  margin: auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,.7);
}

.card2 h3{
  text-align: center;
}

.card2 p{
  text-align: justify;
}
.message {
  height: 650px;
  background-color:aqua;
}
#chatApp2{
  padding: 20px;
  height: 700px;
  width: 50%;
  background-color:#4870df
}
.clearfix::after {
	content: "";
	display: block;
	clear: both;
}
html, body {
	margin: 0;
	padding: 0;
	background: #181b21 url(https://www.toptal.com/designers/subtlepatterns/patterns/nami.png);
	font-family: 'Quicksand', sans-serif;
	letter-spacing: -0.23px;
}
.chatApp__loaderWrapper {
	margin: 80px auto;
	text-align: center;
}
.chatApp__loaderText {
	color: #4870df;
	font-weight: bold;
}
.chatApp__loader,
.chatApp__loader::before,
.chatApp__loader::after {
	border-radius: 1em;
	width: 1em;
	height: 1em;
	animation-fill-mode: both;
	animation: loading 1.8s infinite ease-in-out;
}
.chatApp__loader {
	margin: auto;
	color: #4870df;
	font-size: 12px;
	position: relative;
	animation-delay: -0.16s;
}
.chatApp__loader::before,
.chatApp__loader::after {
	content: '';
	position: absolute;
	top: 0;
}
.chatApp__loader::before {
	left: -1.5em;
	animation-delay: -0.32s;
}
.chatApp__loader::after {
	left: 1.5em;
}
@keyframes loading {
	0%, 80%, 100% { box-shadow: 0 1em 0 -1.3em; }
	40% { box-shadow: 0 1em 0 0; }
}
</style>