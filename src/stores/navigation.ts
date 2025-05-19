import { defineStore } from "pinia";
import { computed, ref } from "vue";
import spacegt from "spacegt";

export const useNavigationStore = defineStore(
  "navigation",
  () => {
    const accountStore = spacegt.stores.useAccountsStore();

    const defaultItems = ref([
      {
        type: "VListItem",
        prependIcon: "mdi-home-outline",
        title: "Home",
        to: "/home",
        link: true,
        color: "primary",
      },
      {
        type: "VListSubheader",
        title: "Portal",
      },
      {
        type: "VListItem",
        prependIcon: "mdi-video-3d",
        title: "Model",
        to: "/portal/model",
        link: true,
        color: "primary",
      },
      {
        type: "VListSubheader",
        title: "AI",
      },
      {
        type: "VListItem",
        prependIcon: "mdi-chat-processing-outline",
        title: "AI Chat",
        to: "/ai/chat",
        link: true,
        color: "primary",
      },
      {
        type: "VListItem",
        prependIcon: "mdi-video-account",
        title: "AI Live",
        to: "/ai/live",
        link: true,
        color: "primary",
      },
      {
        type: "VListItem",
        prependIcon: "mdi-library",
        title: "Knowledge Library",
        to: "/ai/knowledge-library",
        link: true,
        color: "primary",
      },
      {
        type: "VListSubheader",
        title: "Ecommerce",
      },
      {
        type: "VListItem",
        prependIcon: "mdi-store-outline",
        title: "Storefront",
        to: "/ecommerce/storefront",
        link: true,
        color: "primary",
      },
      {
        type: "VListItem",
        prependIcon: "mdi-sale-outline",
        title: "Promo",
        to: "/ecommerce/promo",
        link: true,
        color: "primary",
      },
      {
        type: "VListItem",
        prependIcon: "mdi-shape-outline",
        title: "Category",
        to: "/ecommerce/category",
        link: true,
        color: "primary",
      },
      {
        type: "VListItem",
        prependIcon: "mdi-clipboard-text-clock-outline",
        title: "Order History",
        to: "/ecommerce/order-history",
        link: true,
        color: "primary",
      },

      {
        type: "VListSubheader",
        title: "Accounts",
        hasAuthority: ["ROLES_LIST", "ORGS_LIST", "USERS_MANAGE_ALL"],
      },
      {
        type: "VListItem",
        prependIcon: "mdi-shield-account-outline",
        title: "Roles",
        to: "/accounts/roles",
        link: true,
        color: "primary",
        hasAuthority: ["ROLES_LIST"],
      },
      {
        type: "VListItem",
        prependIcon: "mdi-bank",
        title: "Orgs",
        to: "/accounts/orgs",
        link: true,
        color: "primary",
        hasAuthority: ["ORGS_LIST"],
      },
      {
        type: "VListItem",
        prependIcon: "mdi-account-multiple-outline",
        title: "Users",
        subtitle: "Manage users in all roles.",
        to: "/accounts/users",
        link: true,
        color: "primary",
        hasAuthority: ["USERS_MANAGE_ALL"],
      },
      {
        type: "VListItem",
        prependIcon: "mdi-account-multiple-outline",
        title: "Users Manage USER",
        subtitle: "The user who manages the User role.",
        to: "/accounts/users/USER",
        link: true,
        color: "primary",
        hasAuthority: ["USERS_MANAGE_USER"],
      },
      {
        type: "VListSubheader",
        title: "Other",
      },
      {
        type: "VListItem",
        prependIcon: "mdi-shield-alert-outline",
        title: "404",
        to: "/404",
        link: true,
        color: "primary",
      },
      {
        type: "VListGroup",
        fluid: true,
        activator: {
          prependIcon: "mdi-account-circle-outline",
          subtitle: "Manage your account",
          title: "Accounts",
        },
        childrenItems: [
          {
            link: true,
            color: "primary",
            prependIcon: "mdi-circle-small",
            title: "Downloads",
          },
          {
            link: true,
            color: "primary",
            prependIcon: "mdi-circle-small",
            title: "Subscriptions",
          },
          {
            link: true,
            color: "primary",
            prependIcon: "mdi-circle-small",
            title: "History",
          },
        ],
      },
    ]);

    const appendItems = ref([
      {
        type: "VListItem",
        prependIcon: "mdi-cog-outline",
        title: "Settings",
        to: "/settings",
        link: true,
        nav: true,
      },
    ]);

    const defaultItemsDynamic = computed(() => {
      return defaultItems.value.filter((item) => {
        return accountStore.matchAuthorities(accountStore.authorities, item.hasAuthority);
      });
    });

    return { defaultItems: defaultItemsDynamic, appendItems };
  },
  {
    persist: true,
  }
);
