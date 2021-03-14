export const APIRequestUrls: any = {
  recentEvents:
    'https://eigenrisk.com/wp-json/wp/v2/posts?categories=21&per_page=10',
  recentActivities:
    'https://dyz7e6r6p5.execute-api.us-east-1.amazonaws.com/search-es-api-test/recent-activities',
  workspace:
    'https://dyz7e6r6p5.execute-api.us-east-1.amazonaws.com/search-es-api-test/workspace/',
  workspaceItem:
    'https://dyz7e6r6p5.execute-api.us-east-1.amazonaws.com/search-es-api-test/',
  workspaceObjects:
    'https://dyz7e6r6p5.execute-api.us-east-1.amazonaws.com/search-es-api-test/workspace-objects/',
  sampleData:
    'https://dyz7e6r6p5.execute-api.us-east-1.amazonaws.com/search-es-api-test/support/template-data',
  getOverlayImage:
    'https://dyz7e6r6p5.execute-api.us-east-1.amazonaws.com/search-es-api-test/events/event-details/',
  getShapeData:
    'https://dyz7e6r6p5.execute-api.us-east-1.amazonaws.com/search-es-api-test/events/shape-data/',
  getRecentAlert:
    'https://dyz7e6r6p5.execute-api.us-east-1.amazonaws.com/search-es-api-test/recent-alerts/',
  profile:
    'https://dyz7e6r6p5.execute-api.us-east-1.amazonaws.com/search-es-api-test/user-profile',
  saveAlertDigestSettings:
    'https://dyz7e6r6p5.execute-api.us-east-1.amazonaws.com/search-es-api-test/user-profile/alert-digest-settings',
  importFileFileSiginedS3Url:
    'https://dyz7e6r6p5.execute-api.us-east-1.amazonaws.com/search-es-api-test/files/generate-s3fileurl',
  registerexposureupload:
    'https://dyz7e6r6p5.execute-api.us-east-1.amazonaws.com/search-es-api-test/exposure/register-exposure-upload',
  checkexposurelimit:
    'https://dyz7e6r6p5.execute-api.us-east-1.amazonaws.com/search-es-api-test/exposure/check-exposure-limit/',
  importstatus:
    'https://dyz7e6r6p5.execute-api.us-east-1.amazonaws.com/search-es-api-test/exposure/fetch-import-status/',
  getAlertDigestSettings:
    'https://dyz7e6r6p5.execute-api.us-east-1.amazonaws.com/search-es-api-test/user-profile/fetch-alert-digest-settings',
  getAlertNotification:
    'https://dyz7e6r6p5.execute-api.us-east-1.amazonaws.com/search-es-api-test/notification/alerts',
  getActivity:
    'https://dyz7e6r6p5.execute-api.us-east-1.amazonaws.com/search-es-api-test/notification/activity',
};
export const ActivityImages: any = [
  { src: 'assets/images/layout.svg', name: 'layout' },
  { src: ': assets/images/user.svg', name: 'user' },
  {
    src: 'erassets/Images/WorkSpace_Objects_Images/icon_profile.svg',
    name: 'Profile',
  },
  {
    src: 'erassets/Images/WorkSpace_Objects_Images/icon_programme.svg',
    name: 'Program',
  },
  { src: 'erassets/Images/activity_images/MEMBERS.svg', name: 'Members' },
  { src: 'erassets/Images/alerts_images/ws_icon-black.svg', name: 'Workspace' },
];

export const StaticUrls: any = {
  help: 'https://help.eigenrisk.com/hc/en-us',
};

// export const TriggerdAlertImagesPath: any = {
//     'earth movement': 'assets/images/alerts_images/earthmovement.svg',
//     'earthquake': 'assets/images/alerts_images/earthquake.png',
//     'fire': 'assets/images/alerts_images/fire.svg',
//     'extreme weather': 'assets/images/alerts_images/extremeweather.svg',
//     'terrorism': 'assets/images/alerts_images/terrorism.svg',
//     'social risk': 'assets/images/alerts_images/socialrisk.svg',
//     'severe thunderstorm': 'assets/images/alerts_images/severethunderstrom.svg',
//     'flood': 'assets/images/alerts_images/floods.png',
//     'volcano': 'assets/images/alerts_images/volano.svg',
//     'windstorm': 'assets/images/alerts_images/windstrom.svg',
//     'winter storm': 'assets/images/alerts_images/winterstrom.svg',
//     'all': 'assets/images/alerts_images/others.svg'
// }
export const MapPointers: any = {
  'earth movement': 'assets/images/alerts_images/empointer.svg',
  earthquake: 'assets/images/alerts_images/eqpointer.svg',
  fire: 'assets/images/alerts_images/fpointer.svg',
  'extreme weather': 'assets/images/alerts_images/ewpointer.svg',
  terrorism: 'assets/images/alerts_images/tpointer.svg',
  'social risk': 'assets/images/alerts_images/srpointer.svg',
  'severe thunderstorm': 'assets/images/alerts_images/tspointer.svg',
  flood: 'assets/images/alerts_images/fdpointer.svg',
  volcano: 'assets/images/alerts_images/vpointer.svg',
  windstorm: 'assets/images/alerts_images/wspointer.svg',
  'winter storm': 'assets/images/alerts_images/winspointer.svg',
  all: 'assets/images/alerts_images/opointer.svg',
};

export const TriggerdAlertImagesPath: any = {
  'earth movement': 'assets/images/peril_icons/earthmovement.svg',
  earthquake: 'assets/images/peril_icons/earthquake.png',
  fire: 'assets/images/peril_icons/fire.svg',
  'extreme weather': 'assets/images/peril_icons/extremeweather.svg',
  terrorism: 'assets/images/peril_icons/terrorism.svg',
  'social risk': 'assets/images/peril_icons/socialrisk.svg',
  'severe thunderstorm': 'assets/images/peril_icons/severethunderstrom.svg',
  flood: 'assets/images/peril_icons/floods.png',
  volcano: 'assets/images/peril_icons/volano.svg',
  windstorm: 'assets/images/peril_icons/windstrom.svg',
  'winter storm': 'assets/images/peril_icons/winterstrom.svg',
  all: 'assets/images/peril_icons/others.svg',
};

// export const MapPointers: any = {
//     'earth movement': 'assets/images/peril_icons/earthmovement.svg',
//     'earthquake': 'assets/images/peril_icons/earthquake.png',
//     'fire': 'assets/images/peril_icons/fire.svg',
//     'extreme weather': 'assets/images/peril_icons/extremeweather.svg',
//     'terrorism': 'assets/images/peril_icons/terrorism.svg',
//     'social risk': 'assets/images/peril_icons/socialrisk.svg',
//     'severe thunderstorm': 'assets/images/peril_icons/severethunderstrom.svg',
//     'flood': 'assets/images/peril_icons/floods.png',
//     'volcano': 'assets/images/peril_icons/volano.svg',
//     'windstorm': 'assets/images/peril_icons/windstrom.svg',
//     'winter storm': 'assets/images/peril_icons/winterstrom.svg',
//     'all': 'assets/images/peril_icons/others.svg'
// }
