<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-container class="d-flex">
        <v-app-bar-title>Pitchfork</v-app-bar-title>

        <v-spacer></v-spacer>

        <v-btn
          href="https://github.com/crypto2099/pitchfork/releases/latest"
          target="_blank"
          text
        >
          <span class="mr-2">Latest Release</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main></v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    //
  }),
};
</script>
