interface GenericIcons {
  [key: string]: string;
}

export const Images = {
  euro: require('../assets/icons/eur.png'),
  gbp: require('../assets/icons/gbp.png'),
  usa: require('../assets/icons/usa.png'),
  cardPayment: require('../assets/icons/cardPayment.png'),
  linkIcon: require('../assets/icons/link.png'),
  exportIcon: require('../assets/icons/export.png'),
  emailIcon: require('../assets/icons/sms.png'),
  whatsappIcon: require('../assets/icons/whatsapp.png'),
  newOrder: require('../assets/icons/wallet-add.png'),
}

export const countryFlag: GenericIcons = {
  'EU': Images.euro,
  'GB': Images.gbp,
  'US': Images.usa,
}

export const shareButtonIcon: GenericIcons = {
  'link': Images.linkIcon,
  'email': Images.emailIcon,
  'whatsapp': Images.whatsappIcon,
  'others': Images.exportIcon
}