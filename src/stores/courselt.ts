import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { matchAuthorities, useAccountsStore } from "./data/accounts";

export const useCourseStore = defineStore("course", () => {
  const accountStore = useAccountsStore();

  const defaultItems = ref([
    {
      type: "VListItem",
      icon: "mdi-home-outline",
      title: "课程广场",
      to: "/course",
      auth: ['USER_READ'],
      color: "primary",
    },
    {
      type: "VListGroup",
      fluid: true,
      activator: {
        icon: "mdi-account-circle-outline",
        title: "课程管理",
      },
      childrenItems: [
     

         {
          link: true,
          color: "primary",
          icon: "mdi-circle-small",
          title: "课程列表",
          to: "/course",
        },
 
 
      ],
    },

   
  ]);

  const defaultItemsDynamic = computed(() => {
    return defaultItems.value.filter((item) => {
      return matchAuthorities(accountStore.authorities, item.auth);
    });
  });

  return { defaultItems: defaultItemsDynamic };
},
  {
    persist: true,
  }
);
