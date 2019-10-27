<template>
<div>
  <div class="msg_history">
    <div>
      <button class='btn btn-info' @click='outRoom(specRoom._id)'>Out Room</button> {{getUser}}
    </div>
    <div class="chatApp__loaderWrapper" v-if='!finish'>
      <div class="chatApp__loaderText">Loading...</div>
      <div class="chatApp__loader"></div>
    </div>
    <div v-for='(msg, i) in specMessage' :key='i'>
      <div class="outgoing_msg">
        <div class="row">
          <div class="col-4">
            <span class="time_date"> {{ msg.createdAt.split(', ')[1] }}    |    {{ msg.createdAt.split(', ')[0] }}  |  {{ msg.username }} <button class='btn btn-info btn-sm' @click='deleteMsg(msg._id)'>delete</button></span> 
          </div>
          <div class="col-8">
            <div class="sent_msg">
            <a>{{ msg.text }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="type_msg">
    <div class="input_msg_write">
      <form @submit.prevent='sendText(specRoom._id)'>
        <input type="text" class="write_msg" placeholder="Type a message" v-model='message'/>
        <button class="msg_send_btn" type="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
      </form>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import RoomMsg from '../components/RoomMsg'
import io from 'socket.io-client'

export default {
  data () {
    return {
      finish: false,
      specRoom: '',
      specMessage: '',
      message: '',
      getUser: null,
      socket: io.connect('http://localhost:3000')
    }
  },
  components: {
    RoomMsg,
  },
  methods: {
    sendText (id) {
      const text = this.message
      axios({
        method: 'post',
        url: `http://localhost:3000/msg/post/${ id }`,
        data: { text },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then( ({data})  => {
          this.socket.emit('send', data.msg)
          data.msg = null
          this.message = '';
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    outRoom (id) {
      axios({
        method: 'put',
        url: `http://localhost:3000/rooms/out/${id}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.$awn.success(data.msg)
          setTimeout(() => {
            this.$router.push('/')
            this.$emit('fetchRoom');
          }, 2000);
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
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
          this.specRoom = data;
          this.specMessage = data.MsgId.reverse()
          this.finish = true;
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg);
        })
    },
    deleteMsg (id) {
      axios({
        method: 'delete',
        url: `http://localhost:3000/msg/${ id }`,
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          id : this.specRoom._id
        }
      })
        .then( ({data}) => {
          this.$awn.success(data.msg)
          this.socket.emit('deleteMsg')
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    }
  },
  created () {
    this.fetchInRoom();
    this.getUser = this.$store.state.user.username
    this.socket.on('change-data', (data) => {
      this.specRoom.MsgId.unshift(data)
      data = null
    })

    this.socket.on('deleteMsg', () => {
      this.fetchInRoom()
    })
  }
}
</script>

<style scoped>
.loop{
  margin-top: 10px;
}
.card2 h3{
  text-align: center;
}

.card2 p{
  text-align: justify;
}
.message {
  height: 650px;
  overflow: auto;
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
