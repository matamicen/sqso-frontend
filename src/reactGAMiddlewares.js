// const options = {};

const trackPage = page => {
  
  window.gtag("config", "G-H8G28LYKBY", {
    page_path: page
  });
};

let currentPage = "";

export const googleAnalytics = store => next => action => {
  
  if (action.type === "@@router/LOCATION_CHANGE") {
    const nextPage = `${action.payload.pathname}${action.payload.search}`;

    if (currentPage !== nextPage) {
      currentPage = nextPage;
      trackPage(nextPage);
    }
  }

  return next(action);
};
