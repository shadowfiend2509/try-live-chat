<template>
  <div class="home">
    <div v-for='(room, i) in getRooms' :key='i'>
      <div class="card card-1">
        <div class='top'>
          {{i+1}}
          <span> {{ room.title.toUpperCase() }} </span>
          <hr>
        </div>
        <div class="main">
          <router-link :to="{ name: 'room', params: { id: room._id } }"><button> Room</button></router-link> {{ room.UserId.length }} User join this Room
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
// @ is an alias to /src
export default {
  name: 'home',
  data () {
    return {
      getRooms: ''
    }
  },
  methods: {
    fetchingRoom () {
      this.$awn.success('Fetching Rooms!')
      axios({
        method: 'get',
        url: 'http://localhost:3000/rooms'
      })
        .then(({data}) => {
          console.log(data)
          this.getRooms = data;
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg);
        })
    }
  },
  created () {
    this.fetchingRoom()
  }
}
</script>

<style>
span{
  letter-spacing: 2px;
}
.top {
  padding-top: 5px;
  height: 30px;
}
body {
  background: #e2e1e0;
  text-align: center;
}

.card {
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 100%;
  margin: 1rem;
  position: relative;
  width: 500px;
}

.card-1 {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.card-1:hover {
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

</style>