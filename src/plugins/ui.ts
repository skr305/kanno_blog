import {
  User,
  Badge,
  Spacer,
  GridGroup,
  Grid,
  Link,
  Avatar,
} from "@fect-ui/vue";
import "@fect-ui/themes";
import "@fect-ui/vue/es/badge/style/index";
import "@fect-ui/vue/es/user/style/index";
import "@fect-ui/vue/es/spacer/style/index";
import "@fect-ui/vue/es/grid-group/style/index";
import "@fect-ui/vue/es/grid/style/index";
import "@fect-ui/vue/es/link/style/index";
import "@fect-ui/vue/es/avatar/style/index";

const UI = [User, Badge, Spacer, GridGroup, Grid, Link, Avatar];

export const UIRegister = (instance) => UI.map((_) => instance.use(_));
