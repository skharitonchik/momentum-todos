<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="transparent" elevated>
      <q-toolbar>

        <q-btn class="q-mr-lg" to="/lists" round color="secondary"  icon="tips_and_updates">
          <q-tooltip class="bg-accent">
            Ideas
          </q-tooltip>
        </q-btn>

        <q-btn class="q-mr-lg"  to="/lists" round color="secondary"  icon="ssid_chart">
          <q-tooltip class="bg-accent">
            Year plans
          </q-tooltip>
        </q-btn>

        <q-btn class="q-mr-lg"  to="/lists" round color="secondary"  icon="public">
          <q-tooltip class="bg-accent">
            Global plans
          </q-tooltip>
        </q-btn>

        <q-toolbar-title>
        </q-toolbar-title>

        <q-btn class="q-ma-md"  to="/" round color="secondary" icon="today" >
          <q-tooltip class="bg-accent">
            Focus page
          </q-tooltip>
        </q-btn>

        <q-btn class="q-mr-lg" to="/lists" round color="secondary"  icon="apps">
          <q-tooltip class="bg-accent">
            All todos
          </q-tooltip>
        </q-btn>

        <q-btn class="q-mr-lg" to="/week" round color="secondary"  icon="date_range">
          <q-tooltip class="bg-accent">
            Week
          </q-tooltip>
        </q-btn>




        <q-toolbar-title>
        </q-toolbar-title>

        <q-btn class="q-mr-lg"  round color="secondary"  icon="image" @click="changeBackground()">
          <q-tooltip class="bg-accent">
            Change background
          </q-tooltip>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container class="momentum-background" v-bind:style="'background: url(' + this.imageNumber + ') no-repeat center center fixed; background-size: cover;'">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
  //import tips_and_updates_icon from '@mui/icons-material/TipsAndUpdates';
  import {defineComponent} from 'vue'

  export default defineComponent({
    name: 'MainLayout',

    setup() {
      const getImagePath =  () => {
        const MOMENTUM_DAY_KEY = 'momentum-day';
        const MOMENTUM_IMG_NUMBERDAY_KEY = 'momentum-img-number';

        const lastDay = localStorage.getItem(MOMENTUM_DAY_KEY);
        const currentDay = new Date().getDay().toString();

        let imageNumber

        if (lastDay !== currentDay) {
          imageNumber = getImageNumber();

          localStorage.setItem(MOMENTUM_DAY_KEY, currentDay);
          localStorage.setItem(MOMENTUM_IMG_NUMBERDAY_KEY, imageNumber);
        } else {
          imageNumber = localStorage.getItem(MOMENTUM_IMG_NUMBERDAY_KEY);
        }

        return `/wallpapers/${imageNumber}.jpeg`
      }

      const getImageNumber = () => {
        let currentImgNumber
        const maxImgNumber = 52

        currentImgNumber = parseInt(Math.random() * 100);

        while (currentImgNumber > maxImgNumber) {
          currentImgNumber -= maxImgNumber
        }
        return currentImgNumber
      }

      return {
        imageNumber: getImagePath(),
        changeBackground() {
          window.localStorage.clear()
          window.location.reload()
        }
      }
    }
  })
</script>
