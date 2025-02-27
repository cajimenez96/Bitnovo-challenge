interface GenericIcons {
  [key: string]: string;
}

export const Images = {
  euro: require('../assets/countries/eur.png'),
  gbp: require('../assets/countries/gbp.png'),
  usa: require('../assets/countries/usa.png'),
  esp: require('../assets/countries/esp.png'),
  equatorial: require('../assets/countries/equatorial.png'),
  grecia: require('../assets/countries/grecia.png'),
  guatemala: require('../assets/countries/guatemala.png'),
  guyana: require('../assets/countries/guyana.png'),
  honduras: require('../assets/countries/honduras.png'),
  hongkong: require('../assets/countries/hongkong.png'),

  cardPayment: require('../assets/icons/cardPayment.png'),
  linkIcon: require('../assets/icons/link.png'),
  exportIcon: require('../assets/icons/export.png'),
  emailIcon: require('../assets/icons/sms.png'),
  whatsappIcon: require('../assets/icons/whatsapp.png'),
  newOrder: require('../assets/icons/wallet-add.png'),
  qrScan: require('../assets/icons/scan-barcode.png'),
  infoCircle: require('../assets/icons/info-circle.png'),
  bitnovoLogo: require('../assets/icons/bitnovo-qr.png'),
  success: require('../assets/icons/check-circle.png'),
}

export const countryFlag: GenericIcons = {
  'EU': Images.euro,
  'GB': Images.gbp,
  'US': Images.usa,
  'HN': Images.honduras,
  'HK': Images.hongkong,
  'GQ': Images.equatorial,
  'GR': Images.grecia,
  'GY': Images.guyana,
  'GT': Images.guatemala,
  'ES': Images.esp
}

export const shareButtonIcon: GenericIcons = {
  'link': Images.linkIcon,
  'email': Images.emailIcon,
  'whatsapp': Images.whatsappIcon,
  'others': Images.exportIcon
}