<template>
  <v-app>
    <LeftMenu />
    <v-main>
      <v-container fluid>
        <router-view />
        <spacegt-aippt @export-images="handleExportImages" @create-outline="handleCreateOutline"
          @createPPT="handleCreatePPT"></spacegt-aippt>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
const handleExportImages = (data) => {
  console.log(data)
}
const handleCreateOutline = (data) => {
  console.log(data)
}
const handleCreatePPT = (data) => {
  console.log(data)
}

</script>

<style></style>
