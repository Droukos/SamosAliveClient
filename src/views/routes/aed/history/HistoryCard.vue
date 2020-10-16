<template>
  <v-main>
    <h3 v-text="$t('history.main')" />

    <br /><br />
    <p v-text="$t('history.occurrence')" />
    <v-btn
      href="#"
      color="primary"
      v-text="$t('events.eventList')"
      router-link
      to="eventList"
      aria-label="ToEventList"
    />

    <br /><br /><br />
    <p v-text="$t('history.problem')" />
    <v-btn
      href="#"
      color="primary"
      v-text="$t('events.problemList')"
      router-link
      to="problemList"
      aria-label="ToProblemList"
    />
    <br />
  </v-main>
</template>

<script>
export default {};
</script>
