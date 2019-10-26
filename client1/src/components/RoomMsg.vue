<template>
  <div>
    <div class="card2">
      <div class="left">
        {{ getMsg.username }}<br>
        <small> {{ time }} </small>
      </div>
      <div class="right">
        {{ getMsg.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['getMsg'],
  computed: {
    time () {
      return this.getMsg.createdAt.split(',')[1]
    }
  }
}
</script>

<style>
.left{
  text-align: left
}
.right{
  margin-left: 100px;
}
.card2{
  display: flex;
  background-color: #fff;
  width: 50%;
  margin: auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,.7);
}
</style>