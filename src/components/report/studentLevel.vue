<template>
	<div id="studentlevel">
		<PersonalAchievement></PersonalAchievement>
	</div>
</template>
<script>
	import PersonalAchievement from './studentlevel/personalAchievement.vue'
	export default {
   	components: {PersonalAchievement},
	}
</script>
<style>
#studentlevel{
	width: 1200px;
	height: 600px;
	margin: auto;
	overflow: hidden;
}
</style>