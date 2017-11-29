<template>
	<div class="main_body">
		 
	</div>
</template>

<script>
export default {
	data(){
		return {
	      activeName:'first'
	    }
	},
	created: function(){
		this.$emit('refreshbizlines','other');
	},
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
}
</script>

<style>
</style>