import {
  User,
  Badge,
  Spacer,
  GridGroup,
  Grid,
  Link,
  Avatar,
  Card,
  Image,
} from '@fect-ui/vue'
import '@fect-ui/themes'
import '@fect-ui/vue/es/badge/style/index'
import '@fect-ui/vue/es/user/style/index'
import '@fect-ui/vue/es/spacer/style/index'
import '@fect-ui/vue/es/grid-group/style/index'
import '@fect-ui/vue/es/grid/style/index'
import '@fect-ui/vue/es/link/style/index'
import '@fect-ui/vue/es/avatar/style/index'
import '@fect-ui/vue/es/card/style/index'
import '@fect-ui/vue/es/image/style/index'

const UI = [User, Badge, Spacer, GridGroup, Grid, Link, Avatar, Card, Image]

export const UIRegister = (instance) => UI.map((_) => instance.use(_))
