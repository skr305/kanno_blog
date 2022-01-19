import { User, Badge } from "@fect-ui/vue";
import "@fect-ui/themes";
import "@fect-ui/vue/es/badge/style/index";
import "@fect-ui/vue/es/user/style/index";

const UI = [User, Badge];

export const UIRegister = (instance) => UI.map((_) => instance.use(_));
