import {Base64} from 'js-base64';
import {WToast} from 'react-native-smart-tip';

import config from './config';
import store from '../store';

// const headers = new Headers();
// headers.set('Content-Type', 'application/json');
// headers.set('Accept', 'application/json');
// headers.set('Authorization', 'Basic ' + Base64.encode('showtvmobi:SoX6miR7qW'));
const headers = new Headers();
headers.set('Content-Type', 'application/json');
headers.set('Accept', 'application/json');

function getErrorResponse() {
  const response = {
    success: false,
    error: {message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.'},
  };
  WToast.show({data: response.error.message});
  return response;
}
const dataTEST = require('../homePage.json');
//
export const fetchHomePage = async () => {
  //console.warn('fett');
  try {
    console.warn('fetchHomePage !!');
    const response = await fetch(`${config.API_URL}haber/anasayfa`, {
    //const response = await fetch(`${config.API_URL}node.json?node_id=homePage`, {
    //const response = await fetch('https://mocki.io/v1/c6e5b489-598f-4677-82c2-dd77d7f54430', {
        //const response = await fetch("https://api.server/api/v1app/homePage", {
        method: 'GET',
        headers,
      },
    );
    console.warn('fetchHomePage !!', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchGalleryPage = async (parameter) => {
  try {
    const response = await fetch(`${config.API_URL}${parameter}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('fetchGalleryPage !!', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchMenuModalPage = async () => {
  try {
    console.warn('fetchMenuModalPage !!');
    const response = await fetch(`${config.API_URL}ayar`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('fetchMenuModalPage !!', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp fetchMenuModalPage', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchNewsDetail = async id => {
  console.warn('fett');
  console.warn('fett IDD', id);
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
    //const response = await fetch('https://mocki.io/v1/c6e5b489-598f-4677-82c2-dd77d7f54430',{
        method: 'GET',
        headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchPhotoNewsDetail = async id => {
  // http://api.server/api/v1app/fotohaber/detay/3315295
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchAuthors = async id => {
  try {
    console.warn('fetchAuthors ', `${config.API_URL}${id}`);
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchArchiveAuthors = async id => {
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchAuthorArticles = async id => {
  try {
    //console.warn('fetchAuthorArticles ', `${config.API_URL}${id}`);
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchAuthorDetail = async id => {
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchGalleryDetail = async id => {
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};

export const fetchCategory = async categoryType => {
  try {
    const response = await fetch(`${config.API_URL}${categoryType}`,
    //const response = await fetch('https://mocki.io/v1/c6e5b489-598f-4677-82c2-dd77d7f54430',
      {
        method: 'GET',
        // headers,
      },
    );
    console.warn('nodd ', `${config.API_URL}${categoryType}`);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchVideo = async id => {
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchVideoCategory = async id => {
  try {
    //http://api.server/api/v1app/video/kategori/haber
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchStandings = async id => {
  try {
    // http://api.server/api/v1app/spor/puandurumu/4/44951     ligId/stageId
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchFixture = async id => {
  try {
    // http://api.server/api/v1app/spor/fikstur/1/44950     ligId/stageId    OR
    // http://api.server/api/v1app/spor/fikstur/1           takımId/
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchTeamDetail = async id => {
  try {
    // http://api.server/api/v1app/spor/takim/detay/101
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchLiveNarration = async id => {
  try {
    // http://api.server/api/v1app/spor/canlianlatim/1529266
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchLiveScore = async id => {
  try {
    // http://api.server/api/v1app/spor/canliskor
    // http://api.server/api/v1app/spor/canliskor/dummy
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchCrypto = async id => {
  try {
    // http://api.server/api/v1app/ekonomi/kriptopara
    // http://api.server/api/v1app/ekonomi/kriptopara/search
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchForeignCurrency = async id => {
  try {
    // http://api.server/api/v1app/ekonomi/doviz
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchStockMarket = async id => {
  try {
    // http://api.server/api/v1app/ekonomi/borsa
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchGold = async id => {
  try {
    // http://api.server/api/v1app/ekonomi/altin
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchIntro = async id => {
  try {
    //
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchTvGuide = async id => {
  // http://api.server/api/v1app/tvrehberi
  // http://api.server/api/v1app/tvrehberi/6/2022-03-19
  try {
    //
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    console.warn('response ', response);
    if (response.status === 200) {
      const responseJson = await response.json();
      console.warn('resppp', responseJson);
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchCinema = async id => {
  // http://api.server/api/v1app/sinema
  try {
    //
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchLocalNews = async id => {
  /*
  * Yerel Haberler
    http://api.server/api/v1app/yerelhaber/anasayfa
    http://api.server/api/v1app/yerelhaber/kategori/canakkale
    http://api.server/api/v1app/yerelhaber/kategori/canakkale/merkez
  * */
  try {
    //
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchLocalNewsDetail = async id => {
  /*
  * Yerel Haber detay
    http://api.server/api/v1app/yerelhaber/detay/96112039
  * */
  try {
    //
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchHighlights = async id => {
  /*
  * Son dakika anasayfa
    http://api.server/api/v1app/sondakika/kategoriler
  * */
  try {
    //
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchMovieDetail = async id => {
  /*
  * film detay
    http://api.server/api/v1app/sinema/film/8795
  * */
  try {
    //
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchHighlightCategoryDetail = async id => {
  /*
  * son dakika kategori detay
   http://api.server/api/v1app/sondakika/kategoridetay/spor/
   http://api.server/api/v1app/sondakika/kategoridetay/spor/p2
  * */
  try {
    //
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchNotificationList = async id => {

  try {
    //
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchWeather = async id => {
  try {
    //http://api.server/api/v1app/havadurumu/anasayfa
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchFileNews = async id => {
  try {
    //http://api.server/api/v1app/dosya/anasayfa
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchFileNewsDetail = async id => {
  try {
    //http://api.server/api/v1app/dosya/detay/276
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchPrayer = async id => {
  try {
    /*
  Şehir listesi:
  http://api.server/api/v1/namaz/anasayfa

  Tüm şehirlerin merkez ilçe namaz saatleri:
  http://api.server/api/v1/namaz/sehirler

  ----------------------------

  Bir ilçenin ramazan ayı namaz saatleri ve ilçe listesi:
  http://api.server/api/v1/ramazan/34/1237
    */
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchPrayerDetail = async id => {
  try {
    /*
 Bir şehrin merkez ilçesine göre aylık namaz saatleri ve ilçe listesi:
 http://api.server/api/v1/namaz/detay/34

 Bir ilçenin aylık namaz saatleri ve ilçe listesi:
 http://api.server/api/v1/namaz/detay/34/1237
   */
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchPharmacy = async id => {
  try {
    /*
  Nöbetçi Eczaneler:

http://api.server/api/v1/eczane/sehirler

http://api.server/api/v1/eczane/ilceler/%7BcitySlug%7D
     * http://api.server/api/v1/eczane/ilceler/adana

http://api.server/api/v1/eczane/%7BcitySlug%7D
    * http://api.server/api/v1/eczane/adana

http://api.server/api/v1/eczane/%7BcitySlug%7D/%7BdistrictSlug%7D
    * http://api.server/api/v1/eczane/adana/aladag
   */
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchNewsTunnel = async id => {
  try {
    /*
      Haber Tüneli
      -------------------
      Haber Tüneli Anasayfa:
      http://api.server/api/v1/habertuneli/anasayfa

      Haber Tüneli - Yıl:
      http://api.server/api/v1/habertuneli/haberler/2018

      Haber Tüneli - Yıl/Ay:
      http://api.server/api/v1/habertuneli/haberler/subat-2018

      Haber Tüneli - Sayfalama - Yıl/Ay:
      http://api.server/api/v1/habertuneli/haberler/subat-2018/haber/null/null/null/p2

      Haber Tüneli - Detay - Yıl/Ay/Veri tipi/arama kriteri/kategori/sıralama/sayfa no:
      http://api.server/api/v1/habertuneli/haberler/subat-2018/haber/gaziantep/spor/yeni/p4

      NOT: Şimdilik sadece haberler geliyor. Video, Galeri vs. eklenecek.
   */
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchNewsTunnelDetail = async id => {
  try {
    /*
      Haber Tüneli - Yıl:
      http://api.server/api/v1/habertuneli/haberler/2018

      Haber Tüneli - Yıl/Ay:
      http://api.server/api/v1/habertuneli/haberler/subat-2018

      Haber Tüneli - Sayfalama - Yıl/Ay:
      http://api.server/api/v1/habertuneli/haberler/subat-2018/haber/null/null/null/p2

      Haber Tüneli - Detay - Yıl/Ay/Veri tipi/arama kriteri/kategori/sıralama/sayfa no:
      http://api.server/api/v1/habertuneli/haberler/subat-2018/haber/gaziantep/spor/yeni/p4

      NOT: Şimdilik sadece haberler geliyor. Video, Galeri vs. eklenecek.
   */
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchTag = async id => {
  try {
    /*
      http://api.server/api/v1app/kunye
   */
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchSpecialAuthors = async id => {
  try {
    /*
     http://api.server/api/v1app/yazar/ozel/rahim-ak-ile-yatirimci-rehberi
   */
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchRadio = async id => {
  try {

    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchSearch = async id => {
  try {
/*
        * Birkaç örnek;

        sadece keyword ile arama :
        http://api.server/api/v1/ara/cinayet

        Tipe göre arama :
        http://api.server/api/v1/ara/cinayet/video

        Tarih aralığında arama:
        http://api.server/api/v1/ara/cinayet/null/2022-02-01/2022-05-30

        Kategoriye göre arama
        http://api.server/api/v1/ara/cinayet/null/null/null/dunya

        Sıralama yeni - eski - ilgili
        http://api.server/api/v1/ara/cinayet/null/null/null/null/eski

        ve sayfalama
        http://api.server/api/v1/ara/cinayet/null/null/null/null/eski/p2
* */
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchMindGames = async id => {
  // http://api.server/api/v1/akil-oyunlari
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchNotificationSettings = async id => {
  // http://api.server/api/v1app/bildirim/ayarlar
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchNotification = async id => {
  // http://api.server/api/v1app/bildirim/anasayfa
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchMindGamesDetail = async id => {
  // http://api.server/api/v1app/akil-oyunlari/detay/744
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchPolicy = async id => {
  // http://api.stage.server/api/v1/sayfa/detay/gizlilik-ve-kvk-politikasi
  // http://api.stage.server/api/v1/sayfa/detay/aydinlatma-metni
  // http://api.stage.server/api/v1/sayfa/detay/kullanim-kosullari
  // http://api.stage.server/api/v1/sayfa/detay/cerez-politikasi
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchChanceGames = async id => {
  // http://api.server/api/v1/sans-oyunlari/anasayfa
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchChanceGamesDetail = async id => {
  // http://api.server/api/v1/sans-oyunlari/super-loto
  // on-numara, sayısal loto, şans topu vs ...
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchVideoChannels = async id => {
  // http://api.server/api/v1app/video/kanal/anasayfa
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchVideoChannelDetail = async id => {
  // http://api.server/api/v1app/video/kanal/detay/sinema-sohbeti
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchLivePage = async id => {
  // http://api.server/api/v1app/canliyayin/anasayfa
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchSpecialPages = async id => {
// https://apiv2.haberturk.com/api/v1/ozel-sayfa/ne-demek
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchAdditionalPages = async id => {
  // http://api.server/api/v1app/8mart/anasayfa
  // http://api.server/api/v1app/kuresel-tehditler/anasayfa
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchContactUs = async id => {
  // http://api.server/api/v1app/bize-ulasin/anasayfa
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchHtgastro = async id => {
  // http://api.server/api/v1app/htgastro/anasayfa
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchRamazanDetail = async id => {
  // http://api.server/api/v1app/ramazan/detay/34/1237
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchEarthquake = async id => {
  // http://api.server/api/v1app/deprem/anasayfa
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
          method: 'GET',
          // headers,
        },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchAllHeadlines = async id => {
  // https://apiv2.haberturk.com/api/v1app/tummansetler
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
          method: 'GET',
          // headers,
        },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};

export const fetchSpecialPagesDetail = async id => {
  // https://apiv2.haberturk.com/api/v1/ozel-sayfa/detay/ne-demek/a-ne-anlama-gelir
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
export const fetchCurrencyConverter = async id => {
  // https://apiv2.haberturk.com/api/v1app/ekonomi/doviz/cevir/999/euro
  try {
    const response = await fetch(`${config.API_URL}${id}`, {
        method: 'GET',
        // headers,
      },
    );
    if (response.status === 200) {
      const responseJson = await response.json();
      return {success: true, payload: responseJson};
    }
    return getErrorResponse();
  } catch (error) {
    console.warn(error);
    return getErrorResponse();
  }
};
