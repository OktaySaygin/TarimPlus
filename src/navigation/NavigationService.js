import { splitUrl} from "../utils";
import routes from "./routes";
import {CommonActions, StackActions} from "@react-navigation/native";
import React from "react";
import {Linking} from "react-native";

export const navigationRef = React.createRef();

function push(url = '', params = {}) {
  if (url != null){
    const {type = null, subType = null, id = 0} = splitUrl(url);
    params.id = id;

    const routeName = getCorrectRoute(type, subType, params) || "";
    if (routeName === "") {
      console.warn("Can't push, name or screen are empty.");
      return;
    }
    navigationRef.current?.dispatch(StackActions.push(routeName, params));
  }
}
function replace(url = '', params = {}) {
  if (url != null){
    const {type = null, subType = null, id = 0} = splitUrl(url);
    params.id = id;
    const routeName = getCorrectRoute(type, subType, params) || "";
    if (routeName === "") {
      console.warn("Can't push, name or screen are empty.");
      return;
    }
    navigationRef.current?.dispatch(StackActions.replace(routeName, params));
  }
}
export const openLink = (url) => {
  const supported = Linking.canOpenURL(url);
  if (supported) {
    Linking.openURL(url);
  }
};
function getCurrentRouteName() {
  if (navigationRef?.current?.getCurrentRoute()?.name == null ||
    navigationRef?.current?.getCurrentRoute()?.name === undefined) {
    return "UNDEFINED";
  }
  return navigationRef?.current?.getCurrentRoute()?.name;
}
function navigate(url = '', params = {}) {
  if (url != null){
    if (url.startsWith("http") && url !== ""){
      openLink(url);
    } else {
      const {type = null, subType = null, id = 0} = splitUrl(url);
      params.id = id;

      const routeName = getCorrectRoute(type, subType, params) || "";
      if (routeName === "") {
        console.warn("Can't push, name or screen are empty.");
        return;
      }
      navigationRef.current?.dispatch(CommonActions.navigate(routeName, params));
    }
  }
}
function replaceWithPageName(name, params) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}
function navigateModal(modalName = '', params = {}) {
  if (modalName === "") {
    console.warn("Can't push, name or screen are empty.");
    return;
  }
  navigationRef.current?.dispatch(CommonActions.navigate(modalName, params));
}

function navigateToScreenName(screenName = '', params = {}) {
  //const routeName = getCorrectRoute(screenName, "", params) || "";
  if (screenName === "") {
    console.warn("Can't push, name or screen are empty.");
    return;
  }
  navigationRef.current?.dispatch(CommonActions.navigate(screenName, params));
}

function back() {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current?.dispatch(CommonActions.goBack());
  }
}

function popToTop() {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current?.dispatch(StackActions.popToTop());
  }
}


const routeMapModal = {
  Camera: {
    // name: 'ModalStack',
    name: 'MainStack',
    screen: routes.Camera,
  },
  FontSizeModal: {
    name: 'FontSizeModal',
    screen: routes.FontSizeModal,
  },
  NewsTunnelFilterModal: {
    name: 'NewsTunnelFilterModal',
    screen: routes.NewsTunnelFilterModal,
  },
  WeatherCitiesModal: {
    name: 'WeatherCitiesModal',
    screen: routes.WeatherCitiesModal,
  },
  VideoWidgetModal: {
    name: 'VideoWidgetModal',
    screen: routes.VideoWidgetModal,
  },
  MovieWidgetModal: {
    name: 'MovieWidgetModal',
    screen: routes.MovieWidgetModal,
  },
  MovieSessionResultModal: {
    name: 'MovieSessionResultModal',
    screen: routes.MovieSessionResultModal,
  },
  SearchModal: {
    name: 'SearchModal',
    screen: routes.SearchModal,
  },
  SearchFilterModal: {
    name: 'SearchFilterModal',
    screen: routes.SearchFilterModal,
  },
  LoginModal: {
    name: 'LoginModal',
    screen: routes.LoginModal,
  },
};
const routeMapForRegister = {
  homepage: {
    name: 'MainStack',
    screen: routes.Register,
  }
}
const routeMapForLogin = {
  homepage: {
    name: 'MainStack',
    screen: routes.LoginModal,
  }
}
const routeMapForGarden = {
  homepage: {
    name: 'MainStack',
    screen: routes.Garden,
  },
};
const routeMapForAgro = {
  homepage: {
    name: 'MainStack',
    screen: routes.Agro,
  }
}
const routeMapForVegetableMarket = {
  homepage: {
    name: 'MainStack',
    screen: routes.VegetableMarket,
  },
};
const routeMapForBlog = {
  homepage: {
    name: 'MainStack',
    screen: routes.Blog,
  },
};
const routeMapForSettings = {
  homepage: {
    name: 'MainStack',
    screen: routes.Settings,
  },
};
const routeMapForCamera = {
  homepage: {
    name: 'MainStack',
    screen: routes.Camera,
  },
};
const routeMapForProfile = {
  homepage: {
    name: 'MainStack',
    screen: routes.Profile,
  },
};
const routeMapForWeather = {
  homepage: {
    name: 'MainStack',
    screen: routes.Weather,
  },
};
const routeMapForHome = {
  homepage: {
    name: 'MainStack',
    screen: routes.HomePage,
  },
};

function getCorrectRoute(type, subType, params) {
  switch (type) {
    case "home":
      return routeMapForHome[subType];
    case "garden":
      return routeMapForGarden[subType];
    case "register":
      return routeMapForRegister[subType];
    case "login":
      return routeMapForLogin[subType];
    case "agro":
      return routeMapForAgro[subType];
    case "vegetableMarket":
      return routeMapForVegetableMarket[subType];
    case "blog":
      return routeMapForBlog[subType];
    case "settings":
      return routeMapForSettings[subType];
    case "camera":
      return routeMapForCamera[subType];
    case "profile":
      return routeMapForProfile[subType];
    case "weather":

      return routeMapForWeather[subType];
  }
}
export default {
  navigate,
  navigateModal,
  push,
  replace,
  back,
  popToTop,
  navigateToScreenName,
  replaceWithPageName,
  getCurrentRouteName,
};
