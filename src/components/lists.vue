<template>
    <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-group :value="false">
                  <template v-slot:activator>
          <v-list-item-title>Programs</v-list-item-title>
        </template>
                  <v-list-item
                  link
                ><router-link to=/programs>
                  <v-list-item-content>
                    <v-list-item-title>
                       Programs
                    </v-list-item-title>
                  </v-list-item-content>
                  </router-link>
                </v-list-item>
                <v-list-item
                  link
                ><router-link to=/programs/create>
                  <v-list-item-content>
                    <v-list-item-title>
                       Create Program
                    </v-list-item-title>
                  </v-list-item-content>
                  </router-link>
                </v-list-item>
                </v-list-group>
                <v-list-group :value="false">
                  <template v-slot:activator>
          <v-list-item-title>Keys</v-list-item-title>
        </template>
                  <v-list-item
                  link
                ><router-link to=/keys>
                  <v-list-item-content>
                    <v-list-item-title>
                       All Keys
                    </v-list-item-title>
                  </v-list-item-content>
                  </router-link>
                </v-list-item>
                <v-list-item
                  link
                ><router-link to=/keys/create>
                  <v-list-item-content>
                    <v-list-item-title>
                       Create Key
                    </v-list-item-title>
                  </v-list-item-content>
                  </router-link>
                </v-list-item>
                </v-list-group>
                 <v-list-group :value="false">
                  <template v-slot:activator>
          <v-list-item-title>My Passwords</v-list-item-title>
        </template>
                  <v-list-item
                  link
                ><router-link to=/passwords/so>
                  <v-list-item-content>
                    <v-list-item-title>
                       Social
                    </v-list-item-title>
                  </v-list-item-content>
                  </router-link>
                </v-list-item>
                <v-list-item
                  link
                ><router-link to=/passwords/so>
                  <v-list-item-content>
                    <v-list-item-title>
                       Others
                    </v-list-item-title>
                  </v-list-item-content>
                  </router-link>
                </v-list-item>
                </v-list-group>
                 <v-list-group :value="false">
                  <template v-slot:activator>
          <v-list-item-title>Chats BackUps</v-list-item-title>
        </template>
                  <v-list-item
                  link
                ><router-link to=/chats/jy>
                  <v-list-item-content>
                    <v-list-item-title>
                       SaturnJy
                    </v-list-item-title>
                  </v-list-item-content>
                  </router-link>
                </v-list-item>
                <v-list-item
                  link
                ><router-link to=/chats/php>
                  <v-list-item-content>
                    <v-list-item-title>
                       Php
                    </v-list-item-title>
                  </v-list-item-content>
                  </router-link>
                </v-list-item>
                </v-list-group>
                <v-list-group :value="false">
                  <template v-slot:activator>
          <v-list-item-title>Live Locations</v-list-item-title>
        </template>
                  <v-list-item
                  link
                ><router-link to=/live/jy>
                  <v-list-item-content>
                    <v-list-item-title>
                       SaturnJy
                    </v-list-item-title>
                  </v-list-item-content>
                  </router-link>
                </v-list-item>
                <v-list-item
                  link
                ><router-link to=/live/php>
                  <v-list-item-content>
                    <v-list-item-title>
                       Php
                    </v-list-item-title>
                  </v-list-item-content>
                  </router-link>
                </v-list-item>
                <v-list-item
                  link
                ><router-link to=/live/mom>
                  <v-list-item-content>
                    <v-list-item-title>
                       Mom
                    </v-list-item-title>
                  </v-list-item-content>
                  </router-link>
                </v-list-item>
                </v-list-group>
                 <v-list-group :value="false">
                  <template v-slot:activator>
          <v-list-item-title>Bots</v-list-item-title>
        </template>
                  <v-list-item
                  link
                ><router-link to=/bots/ad>
                  <v-list-item-content>
                    <v-list-item-title>
                       Auto Disable
                    </v-list-item-title>
                  </v-list-item-content>
                  </router-link>
                </v-list-item>
                <v-list-item
                  link
                ><router-link to=/bots/am>
                  <v-list-item-content>
                    <v-list-item-title>
                       Auto Message
                    </v-list-item-title>
                  </v-list-item-content>
                  </router-link>
                </v-list-item>
                </v-list-group>
                <v-list-item
                  link
                ><router-link to=/ssafe/pass>
                  <v-list-item-content>
                    <v-list-item-title>
                       PlayLists
                    </v-list-item-title>
                  </v-list-item-content>
                  </router-link>
                </v-list-item>
                 <v-list-item
                  link
                ><router-link to=/notes>
                  <v-list-item-content>
                    <v-list-item-title>
                       Notes
                    </v-list-item-title>
                  </v-list-item-content>
                  </router-link>
                </v-list-item>
                 <v-list-item
                  link
                ><router-link to=/pics/secrets>
                  <v-list-item-content>
                    <v-list-item-title>
                      Secret Pics (Needs Super Permission)
                    </v-list-item-title>
                  </v-list-item-content>
                  </router-link>
                </v-list-item>
              </v-list>
        </v-sheet>
</template>
<script>

</script>

<style scoped>
a {
  text-decoration: none !important;
  color:#fff !important;
}
a::hover {
  text-decoration: none !important;
}
</style>